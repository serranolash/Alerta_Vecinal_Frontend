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
                La app muestra incidentes, nivel de riesgo, patentes reincidentes y acciones
                rápidas en un solo lugar, al estilo de las mejores plataformas ciudadanas.
              </p>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA – 3 PASOS EXPLÍCITOS */}
        <section className="landing-section">
          <h2 className="landing-subtitle">Cómo funciona Alerta Vecinal</h2>
          <div className="landing-section-grid">
            <article className="landing-card">
              <h3>1. Reporte ciudadano en 3 segundos</h3>
              <p>
                El vecino abre la app, elige el tipo de incidente (robo, sospechoso, violencia,
                emergencia, etc.), opcionalmente carga foto y patente, y envía.
              </p>
              <ul>
                <li>Ubicación tomada automáticamente por GPS.</li>
                <li>Posibilidad de adjuntar evidencia (foto/video) y patente.</li>
                <li>Modo pánico para situaciones críticas.</li>
              </ul>
            </article>

            <article className="landing-card">
              <h3>2. IA + mapa de incidentes y calor</h3>
              <p>
                La IA analiza la evidencia, detecta armas y patentes, calcula nivel de riesgo y
                actualiza el mapa de incidentes en tiempo real.
              </p>
              <ul>
                <li>Mapa de calor de incidentes por zona y horario.</li>
                <li>Historial por patente y detección de reincidencias.</li>
                <li>Rutas de escape registradas desde el celular del vecino.</li>
              </ul>
            </article>

            <article className="landing-card">
              <h3>3. Acción coordinada con autoridades y barrio</h3>
              <p>
                Autoridades, municipio y vecinos ven el mismo tablero: alertas priorizadas,
                ubicación exacta y contexto para tomar decisiones rápidas.
              </p>
              <ul>
                <li>
                  Panel de autoridades con listado de incidentes, mapa y cambio de estado
                  (pendiente, verificado, falso).
                </li>
                <li>
                  Muro vecinal para ver qué está pasando en el barrio y recibir noticias relevantes.
                </li>
                <li>
                  Directorio de emergencias y servicios (gasistas, electricistas, técnicos) para
                  resolver problemas cotidianos.
                </li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}
