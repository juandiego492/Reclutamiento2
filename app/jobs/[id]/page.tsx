// Código corregido para la página principal (app/page.tsx)
"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import React from 'react'; // Importa React para los tipos de eventos

// Importa las imágenes desde la carpeta /public
import logo from '/public/logo.jpg';
import hr from '/public/hr.jpg';

const jobs = [
  {
    id: "data-engineer",
    title: "Data Analyst & Engineer",
    description: "Versátil profesional que construye pipelines y transforma datos en decisiones estratégicas.",
  },
  {
    id: "sales-marketing-specialist",
    title: "Sales & Marketing Specialist (Female)",
    description: "Profesional dinámica en ventas y marketing, bilingüe y creativa para campañas exitosas.",
  },
  {
    id: "website-specialist",
    title: "Website Specialist",
    description: "Experta en plataformas de cursos, funnels y CRM para optimizar la experiencia del usuario.",
  },
  {
    id: "solution-integration-specialist",
    title: "Solution Integrations Specialist",
    description: "Especialista en integración de soluciones TI, documentación y soporte técnico de proyectos.",
  },
  {
    id: "digital-advertising-specialist",
    title: "Digital Advertising Specialist",
    description: "Gestiona y optimiza campañas digitales con análisis de datos y estrategia de ROI.",
  },
  {
    id: "system-administrator",
    title: "System Administrator",
    description: "Encargado de mantener la infraestructura TI, seguridad y soporte técnico profesional.",
  },
];

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    cv: null as File | null,
  });

  // Función handleChange con tipado y lógica correctos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue;

    // Usa un "type guard" para verificar si el input tiene la propiedad `files`.
    if ('files' in e.target) {
      newValue = e.target.files?.[0] || null;
    } else {
      newValue = value;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Función handleSubmit con tipado correcto
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("✅ Tu aplicación ha sido enviada con éxito!");
    setFormData({ name: "", email: "", phone: "", position: "", cv: null });
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#1F2937", lineHeight: 1.6 }}>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          textAlign: "center",
          padding: "6rem 1rem",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            backgroundImage: `url(${hr.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.25,
            filter: 'grayscale(100%)',
          }}
        />
        {/* Color de texto cambiado a negro */}
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#1F2937" }}>Únete a Nuestro Equipo</h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem", color: "#1F2937" }}>Construye tu futuro con nosotros 🚀</p>
        <Link href="#jobs">
          <button
            style={{
              padding: "0.8rem 2rem",
              fontSize: "1rem",
              borderRadius: "12px",
              background: "blue",
              color: "#ffffffff",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
              transition: "all 0.2s",
            }}
          >
            Ver Vacantes
          </button>
        </Link>
      </section>

      {/* Jobs Section */}
      <section id="jobs" style={{ maxWidth: "900px", margin: "4rem auto", padding: "0 1rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>Vacantes Disponibles</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            alignItems: "stretch", // Esto es lo que soluciona la alineación
          }}
        >
          {jobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  border: "1px solid #1F2937",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  background: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  transition: "all 0.3s",
                  cursor: "pointer",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget).style.transform = "translateY(-5px)";
                  (e.currentTarget).style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget).style.transform = "translateY(0)";
                  (e.currentTarget).style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
                }}
              >
                <div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#1F2937" }}>{job.title}</h3>
                  <p style={{ marginBottom: "1rem", color: "#4B5563", fontSize: "0.95rem" }}>{job.description}</p>
                </div>
                <button
                  style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "12px",
                    background: "#4F46E5",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    border: "none",
                    alignSelf: "flex-start",
                  }}
                >
                  Ver Puesto
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Apply Now Form */}
      <section style={{ maxWidth: "600px", margin: "4rem auto", padding: "2rem", background: "#F3F4F6", borderRadius: "16px" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", textAlign: "center" }}>Aplica Ahora</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder="Nombre Completo"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "12px", border: "1px solid #D1D5DB" }}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "12px", border: "1px solid #D1D5DB" }}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "12px", border: "1px solid #D1D5DB" }}
          />
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "12px", border: "1px solid #D1D5DB" }}
          >
            <option value="">Selecciona el puesto</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.title}>{job.title}</option>
            ))}
          </select>
          <input
            type="file"
            name="cv"
            onChange={handleChange}
            style={{ padding: "0.8rem", borderRadius: "12px", border: "1px solid #D1D5DB" }}
          />
          <button
            type="submit"
            style={{
              padding: "0.8rem",
              borderRadius: "12px",
              background: "#4F46E5",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              border: "none",
              marginTop: "0.5rem",
            }}
          >
            Enviar Aplicación
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "2rem 1rem", background: "#1F2937", color: "white", display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <Image src={logo} alt="IronVoice Solutions Logo" width={100} height={100} />
        <p>© {new Date().getFullYear()} IronVoice Solutions. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}