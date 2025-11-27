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

        {/* Acá después podemos sumar secciones tipo “para Municipios”, “para Barrios”, etc. */}
      </div>
    </main>
  )
}
