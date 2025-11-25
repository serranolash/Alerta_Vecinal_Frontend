// src/components/PhoneMock.jsx
import React from 'react'

export default function PhoneMock() {
  return (
    <div className="phone-mockup">
      <div className="phone-frame">
        {/* Barra superior */}
        <div className="phone-status-bar">
          <span className="phone-status-app">ALERTA VECINAL</span>
          <span className="phone-status-time">08:32</span>
        </div>

        <div className="phone-screen">
          {/* Card principal */}
          <div className="phone-card phone-card-alert">
            <div className="phone-card-header">
              <span className="phone-card-title">Robo en proceso</span>
              <span className="phone-chip phone-chip-danger">Riesgo alto</span>
            </div>
            <p className="phone-card-text">
              Moto roja, 2 personas, arma a la vista. Vecino reportando a 120 m de tu
              ubicación.
            </p>
            <div className="phone-card-meta">
              <span>📍 Av. Principal y Sarmiento</span>
              <span>⏱ Hace 2 min</span>
            </div>
          </div>

          {/* Burbujas tipo mapa de calor */}
          <div className="phone-heatmap">
            <div className="heat-dot heat-dot-1" />
            <div className="heat-dot heat-dot-2" />
            <div className="heat-dot heat-dot-3" />
            <div className="heat-dot heat-dot-4" />
          </div>

          {/* Lista de incidentes */}
          <div className="phone-card phone-card-secondary">
            <div className="phone-card-row">
              <span className="phone-card-label">Vehículo sospechoso</span>
              <span className="phone-chip phone-chip-warning">Medio</span>
            </div>
            <div className="phone-card-meta">
              <span>Patente LCG303 · 3 min</span>
              <span>👀 4 vecinos atentos</span>
            </div>
          </div>

          <div className="phone-card phone-card-secondary">
            <div className="phone-card-row">
              <span className="phone-card-label">Botón de pánico</span>
              <span className="phone-chip phone-chip-danger">Alerta</span>
            </div>
            <div className="phone-card-meta">
              <span>Depto 3B · 1 min</span>
              <span>🚓 Policía notificada</span>
            </div>
          </div>

          <div className="phone-card phone-card-secondary">
            <div className="phone-card-row">
              <span className="phone-card-label">Corte de luz en el barrio</span>
              <span className="phone-chip phone-chip-info">Comunidad</span>
            </div>
            <div className="phone-card-meta">
              <span>Zona norte · 15 min</span>
              <span>⚡ Empresa eléctrica avisada</span>
            </div>
          </div>
        </div>

        {/* Barra inferior de navegación */}
        <div className="phone-footer-nav">
          <button type="button" className="phone-nav-btn phone-nav-btn-active">
            Reporte
          </button>
          <button type="button" className="phone-nav-btn">
            Mapa
          </button>
          <button type="button" className="phone-nav-btn">
            Noticias
          </button>
          <button type="button" className="phone-nav-btn">
            Pánico
          </button>
        </div>
      </div>
    </div>
  )
}
