// src/components/LandingPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import PhoneMock from './PhoneMock'

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-shell">
        {/* HERO PRINCIPAL */}
        <section className="landing-hero">
          <div className="landing-hero-grid">
            {/* Texto principal orientado a inversores */}
            <div className="landing-hero-text">
              <h1>ALERTAVECINAL</h1>
              <h2>Seguridad colaborativa con IA para ciudades, barrios e industrias.</h2>

              <p className="landing-hero-lead">
                Plataforma que combina reportes ciudadanos, análisis de riesgo con IA, mapa vivo de
                incidentes y un módulo HSEQ+ para plantas industriales y empresas. Listo para
                pilotos reales con municipios y sector privado.
              </p>

              <div className="landing-hero-actions">
                <Link to="/app" className="btn btn-primary">
                  Probar demo ciudadana
                </Link>
                <Link to="/admin" className="btn btn-outline">
                  Ver panel de autoridades
                </Link>
              </div>

              <Link to="/hseq" className="landing-hero-link">
                Ver solución HSEQ+ para empresas
              </Link>

              <p className="landing-hero-note">
                MVP v3.0 — pensado para municipios, fuerzas de seguridad, consorcios, barrios
                privados, refinerías y plantas industriales que necesitan trazabilidad de
                incidentes en tiempo real.
              </p>
            </div>

            {/* Mockup del celular (tu componente actual) */}
            <div className="landing-hero-mockup">
              <PhoneMock />
              <p className="landing-hero-caption">
                Vista simulada de la app: reportes en segundos, lectura de patentes, botón de
                pánico, mapa de calor y rutas de escape registradas.
              </p>
            </div>
          </div>
        </section>

        {/* QUÉ ES LA PLATAFORMA – foco producto */}
        <section className="landing-section">
          <h2 className="landing-subtitle">¿Qué es AlertaVecinal?</h2>
          <div className="landing-grid">
            <div className="landing-card">
              <h3>App ciudadana</h3>
              <p>
                Vecinos que reportan robos, violencia, personas o vehículos sospechosos y emergencias
                con foto, ubicación automática y descripción breve. Pensado para usarse en segundos,
                bajo estrés.
              </p>
            </div>

            <div className="landing-card">
              <h3>Panel de autoridades</h3>
              <p>
                Dashboard web con listado de incidentes, nivel de riesgo, lectura de patente,
                geolocalización, evidencia y estado de cada caso. Incluye mapa táctico y rutas de
                escape asociadas a cada reporte.
              </p>
            </div>

            <div className="landing-card">
              <h3>Módulo HSEQ+ para empresas</h3>
              <p>
                Extensión para industrias y refinerías: reportes de incidentes en planta, botón de
                pánico para operarios, clasificación por tipo de evento y mapas de riesgo para
                seguridad industrial y medioambiente.
              </p>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA – simple y claro */}
        <section className="landing-section">
          <h2 className="landing-subtitle">¿Cómo funciona AlertaVecinal?</h2>
          <ol className="landing-howto">
            <li>
              <strong>El ciudadano u operario reporta en 3 segundos.</strong> Toma una foto, la app
              captura la ubicación automática y añade una descripción corta del incidente.
            </li>
            <li>
              <strong>La IA analiza y clasifica el riesgo.</strong> Detecta patrones de robo,
              violencia, presencia de armas y vehículos para marcar el incidente como alto, medio o
              bajo.
            </li>
            <li>
              <strong>El mapa se actualiza en tiempo real.</strong> Los incidentes aparecen con
              pines de colores, zonas calientes y rutas de escape registradas para cada reporte.
            </li>
            <li>
              <strong>Las autoridades priorizan y actúan.</strong> Ven riesgo, distancia, patente,
              evidencia y ubicación exacta, optimizando patrullaje, respuesta y seguimiento.
            </li>
          </ol>
        </section>

        {/* PARA QUIÉN ES – segmentos para el pitch */}
        <section className="landing-section">
          <h2 className="landing-subtitle">¿Para quién es AlertaVecinal?</h2>
          <div className="landing-grid">
            <div className="landing-card">
              <h3>Municipios y fuerzas de seguridad</h3>
              <p>
                Centralizan reportes de vecinos, identifican zonas de mayor riesgo, coordinan
                patrullajes y mejoran tiempos de respuesta con datos en tiempo real.
              </p>
            </div>

            <div className="landing-card">
              <h3>Barrios, consorcios y countries</h3>
              <p>
                Comunidad conectada: vecinos que reportan lo que ven, seguridad privada con panel
                único y registro histórico de incidentes por edificio, torre o manzana.
              </p>
            </div>

            <div className="landing-card">
              <h3>Empresas, refinerías e industrias</h3>
              <p>
                Gestión unificada de incidentes de seguridad y HSEQ: reportes en planta, plan de
                respuesta, mapa de riesgo por sector y evidencia organizada para auditorías y
                compliance.
              </p>
            </div>
          </div>
        </section>

        {/* CTA FINAL – modo demo / piloto */}
        <section className="landing-section landing-demo">
          <h3>Ver la plataforma en acción</h3>
          <p>
            Probá la app desde el lado del ciudadano, explorá el panel de autoridades y mirá el
            módulo HSEQ+ para ver cómo se adapta tanto a ciudades como a entornos industriales.
          </p>
          <div className="landing-hero-actions">
            <Link to="/app" className="btn btn-primary">
              Abrir demo ciudadana
            </Link>
            <Link to="/admin/mapa" className="btn btn-outline">
              Ver mapa de incidentes
            </Link>
            <Link to="/hseq" className="btn btn-outline">
              Ver módulo HSEQ+
            </Link>
          </div>
        </section>

        <footer className="landing-footer">
          <p>
            AlertaVecinal · MVP v3.0 · IA + geolocalización · Listo para pilotos reales en Argentina
            y LatAm.
          </p>
        </footer>
      </div>
    </div>
  )
}
