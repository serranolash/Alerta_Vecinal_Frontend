// src/components/LandingPage.jsx
import React from "react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <main className="landing">
      <div className="landing-shell">
        {/* HERO PRINCIPAL */}
        <section className="landing-hero">
          <div className="landing-hero-grid">
            {/* Lado izquierdo: texto */}
            <div className="landing-hero-text">
              <h1>ALERTAVECINAL</h1>
              <h2>Seguridad colaborativa, en tiempo real.</h2>
              <p className="landing-hero-lead">
                Tu barrio conectado a una red de emergencias inteligente:
                reportes geolocalizados, IA para priorizar riesgo y panel
                especial para municipios y fuerzas de seguridad.
              </p>

              <div className="landing-hero-actions">
                <Link to="/app" className="btn btn-primary">
                  Abrir app ciudadana
                </Link>
                <Link to="/admin" className="btn btn-secondary">
                  Panel para autoridades
                </Link>
              </div>

              <p className="landing-hero-note">
                Demo en vivo · ideal para municipios, comisarías y centros de monitoreo.
              </p>

              <div className="landing-feature-row">
                <div className="landing-feature-pill">
                  <span className="pill-icon">🧠</span>
                  IA para clasificar riesgo
                </div>
                <div className="landing-feature-pill">
                  <span className="pill-icon">📍</span>
                  Reportes con ubicación precisa
                </div>
                <div className="landing-feature-pill">
                  <span className="pill-icon">🚨</span>
                  Botón de pánico ciudadano
                </div>
                <div className="landing-feature-pill">
                  <span className="pill-icon">🗺️</span>
                  Mapa de incidentes en vivo
                </div>
              </div>
            </div>

            {/* Lado derecho: mockup teléfono */}
            <div className="landing-hero-mockup">
              <div className="phone-mockup">
                <div className="phone-frame">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    {/* Status superior */}
                    <div className="phone-status-bar">
                      <div className="phone-status-title">ALERTAS EN VIVO</div>
                      <div className="phone-status-meta">Barrio Demo · 21:37</div>
                    </div>

                    {/* Alerta principal */}
                    <div className="phone-alert-card">
                      <div className="phone-alert-header">
                        <span className="phone-alert-type">Robo en progreso</span>
                        <span className="phone-chip phone-chip-high">Riesgo alto</span>
                      </div>
                      <p className="phone-alert-text">
                        Moto roja, 2 personas, arma a la vista. Último reporte a 150 m.
                      </p>
                      <div className="phone-alert-meta">
                        <span>Hace 2 min</span>
                        <span>3 reportes ciudadanos</span>
                      </div>
                    </div>

                    {/* Mini mapa / heatmap */}
                    <div className="phone-map-preview">
                      <div className="phone-heat-dot phone-heat-dot-1" />
                      <div className="phone-heat-dot phone-heat-dot-2" />
                      <div className="phone-heat-dot phone-heat-dot-3" />
                    </div>

                    {/* Feed de otras alertas */}
                    <div className="phone-feed">
                      <div className="phone-feed-item">
                        <div className="phone-feed-main">
                          <div className="phone-feed-title">Persona sospechosa</div>
                          <span className="phone-chip phone-chip-medium">Riesgo medio</span>
                        </div>
                        <div className="phone-feed-meta">
                          <span>Puerta edificio forzada</span>
                          <span>Hace 6 min</span>
                        </div>
                      </div>

                      <div className="phone-feed-item">
                        <div className="phone-feed-main">
                          <div className="phone-feed-title">Ruidos de disparos</div>
                          <span className="phone-chip phone-chip-high">Riesgo alto</span>
                        </div>
                        <div className="phone-feed-meta">
                          <span>Vecinos confirman</span>
                          <span>Hace 11 min</span>
                        </div>
                      </div>

                      <div className="phone-feed-item">
                        <div className="phone-feed-main">
                          <div className="phone-feed-title">Vehículo sospechoso</div>
                          <span className="phone-chip phone-chip-low">Riesgo bajo</span>
                        </div>
                        <div className="phone-feed-meta">
                          <span>Patente registrada</span>
                          <span>Hace 18 min</span>
                        </div>
                      </div>
                    </div>

                    {/* Acciones inferiores */}
                    <div className="phone-actions-row">
                      <button type="button" className="phone-action-btn">
                        <span className="phone-action-icon">📸</span>
                        <span className="phone-action-label">Nuevo reporte</span>
                      </button>
                      <button type="button" className="phone-action-btn">
                        <span className="phone-action-icon">📍</span>
                        <span className="phone-action-label">Alertas cercanas</span>
                      </button>
                      <button type="button" className="phone-action-btn">
                        <span className="phone-action-icon">🚨</span>
                        <span className="phone-action-label">Botón de pánico</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p className="landing-hero-caption">
                Vista simulada del app ciudadana: reportes geolocalizados, prioridad por riesgo
                y mapa de calor para el centro de monitoreo.
              </p>
            </div>
          </div>
        </section>

        {/* SECCIÓN: CÓMO FUNCIONA */}
        <section style={{ marginTop: "1.8rem" }}>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">¿Cómo funciona AlertaVecinal?</h2>
              <p className="card-subtitle">
                Pensado para que cualquier vecino pueda pedir ayuda en segundos y que las autoridades vean todo en un panel unificado.
              </p>
            </div>

            <ul className="contact-benefits">
              <li>
                <strong>1. El vecino reporta en 10 segundos.</strong> Abre la app, toca “Nuevo
                reporte”, saca una foto y se envía su ubicación automática.
              </li>
              <li>
                <strong>2. La IA prioriza por riesgo.</strong> Analizamos la evidencia (texto,
                imagen, patente) y clasificamos como riesgo alto, medio o bajo.
              </li>
              <li>
                <strong>3. El municipio ve todo en un mapa de incidentes.</strong> El panel para
                autoridades muestra un mapa en vivo, tabla de casos, filtros por zona y por
                reincidencia de patentes.
              </li>
            </ul>
          </div>
        </section>

        {/* SECCIÓN: PARA VECINOS Y MUNICIPIOS */}
        <section style={{ marginTop: "1.6rem" }}>
          <div className="directory-layout">
            {/* Para vecinos */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Para vecinos y barrios</h2>
              </div>
              <p className="muted">
                Pensado para que tu comunidad tenga una única app para emergencias, sospechas
                y comunicación rápida.
              </p>
              <ul className="contact-benefits">
                <li>Reportes con foto, ubicación y descripción en segundos.</li>
                <li>Alertas cercanas para saber qué pasa en tu zona ahora mismo.</li>
                <li>Botón de pánico para emergencias críticas.</li>
                <li>Registro de patentes sospechosas y rutas de escape.</li>
              </ul>
            </div>

            {/* Para municipios */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Para municipios y centros de monitoreo</h2>
              </div>
              <p className="muted">
                Una capa de inteligencia arriba de los llamados al 911: consolidamos la mirada
                del barrio en un panel profesional.
              </p>
              <ul className="contact-benefits">
                <li>Mapa de incidentes en vivo para patrullaje inteligente.</li>
                <li>Panel con filtros por riesgo, estado, zona y patente.</li>
                <li>Historial de casos para detectar puntos calientes y reincidencia.</li>
                <li>Listo para pilotos rápidos en 1 o varios barrios de tu ciudad.</li>
              </ul>
              <div style={{ marginTop: "0.6rem" }}>
                <Link to="/admin" className="btn btn-secondary">
                  Ver demo del panel de autoridades
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
