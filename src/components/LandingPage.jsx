// src/components/LandingPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import PhoneMock from './PhoneMock'

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-shell">
        {/* HERO */}
        <section className="landing-hero">
          <div className="landing-hero-grid">
            {/* Texto principal */}
            <div className="landing-hero-text">
              <h1>Alerta Vecinal</h1>
              <h2>Seguridad vecinal + comunidad inteligente.</h2>
              <p className="landing-hero-lead">
                Reportes en 3 segundos, IA que detecta riesgo, mapa de incidentes y muro vecinal
                para saber qué pasa en tu barrio, en tiempo real.
              </p>

              <div className="landing-hero-actions">
                <Link to="/app" className="btn btn-primary">
                  Probar demo ciudadana
                </Link>
                <Link to="/admin" className="btn btn-outline">
                  Ver panel de autoridades
                </Link>
              </div>
              <p className="landing-hero-note">
                MVP listo para pilotos reales · PWA + IA de visión · Rutas de escape · Mapa de calor
                de incidentes.
              </p>

              {/* Mini features tipo SoSafe */}
              <div className="landing-feature-row">
                <div className="landing-feature-pill">
                  <span className="pill-icon">🔔</span>
                  Alertas de seguridad geolocalizadas
                </div>
                <div className="landing-feature-pill">
                  <span className="pill-icon">🧠</span>
                  IA para riesgo y patentes reincidentes
                </div>
                <div className="landing-feature-pill">
                  <span className="pill-icon">👥</span>
                  Vecinos, municipios y fuerzas coordinados
                </div>
              </div>
            </div>

            {/* Mockup del celular */}
            <div className="landing-hero-mockup">
              <PhoneMock />
              <p className="landing-hero-caption">
                Ejemplo de cómo la app muestra incidentes, riesgo y acciones rápidas en un solo
                lugar, al estilo de las mejores plataformas ciudadanas.
              </p>
            </div>
          </div>
        </section>

        {/* BLOQUES RESUMEN (similar a secciones de SoSafe) */}
        <section className="landing-section landing-section-grid">
          <article className="landing-card">
            <h3>Alertas inteligentes</h3>
            <p>
              Desde robos y vehículos sospechosos hasta emergencias médicas o incidentes en el
              edificio. Todo con IA que ayuda a priorizar lo urgente.
            </p>
          </article>
          <article className="landing-card">
            <h3>Mapa de incidentes + calor</h3>
            <p>
              Autoridades y vecinos ven en un mapa vivo dónde se concentran incidentes,
              reincidencias por patente y rutas de escape registradas.
            </p>
          </article>
          <article className="landing-card">
            <h3>Barrio y directorio</h3>
            <p>
              Noticias del barrio, directorio de emergencias y servicios (gasistas, electricistas,
              técnicos) y un canal directo con el municipio.
            </p>
          </article>
        </section>
      </div>
    </div>
  )
}
