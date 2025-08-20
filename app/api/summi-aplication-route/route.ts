// app/api/submit-application/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const position = data.get('position') as string;
    const cvFile = data.get('cv') as File | null;

    if (!name || !email || !phone || !position) {
      return NextResponse.json({ success: false, message: 'Faltan datos en la aplicación.' }, { status: 400 });
    }

    if (!cvFile) {
      return NextResponse.json({ success: false, message: 'Falta el archivo CV.' }, { status: 400 });
    }

    // Configura el transportador de Nodemailer usando variables de entorno
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Usando la variable de entorno
        pass: process.env.GMAIL_PASS, // Usando la variable de entorno
      },
    });

    const fileBuffer = Buffer.from(await cvFile.arrayBuffer());

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'davidferrer1773@gmail.com', // El correo al que se envía la solicitud
      subject: `Nueva Aplicación: ${name} para ${position}`,
      html: `
        <h2>Nueva Aplicación de Empleo</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Puesto Solicitado:</strong> ${position}</p>
      `,
      attachments: [
        {
          filename: cvFile.name,
          content: fileBuffer,
          contentType: cvFile.type,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Aplicación recibida y enviada por correo con éxito.' }, { status: 200 });

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json({ success: false, message: 'Error interno del servidor.' }, { status: 500 });
  }
}