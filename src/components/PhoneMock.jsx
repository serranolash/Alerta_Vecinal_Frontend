// src/components/PhoneMock.jsx
import React from 'react'

export default function PhoneMock() {
  return (
    <div className="phone-mockup">
      <div className="phone-frame">
        <div className="phone-notch" />

        <div className="phone-screen">
          {/* Barra superior */}
          <div className="phone-status-bar">
            <span className="phone-status-title">ALERTA VECINAL</span>
            <span className="phone-status-meta">LTE • 08:32</span>
          </div>

          {/* Bloque principal: alerta activa */}
          <div className="phone-alert-card">
            <div className="phone-alert-header">
              <span className="phone-alert-type">Robo en proceso</span>
              <span className="phone-chip phone-chip-high">Riesgo alto</span>
            </div>
            <p className="phone-alert-text">
              Moto roja, 2 personas, arma a la vista. Vecino reportando a 120 m de tu ubicación.
            </p>
            <div className="phone-alert-meta">
              <span>📍 Av. Principal y Sarmiento</span>
              <span>⏱ Hace 2 min</span>
            </div>
          </div>

          {/* Mini mapa / zona caliente */}
          <div className="phone-map-preview">
            <div className="phone-heat-dot phone-heat-dot-1" />
            <div className="phone-heat-dot phone-heat-dot-2" />
            <div className="phone-heat-dot phone-heat-dot-3" />
          </div>

          {/* Lista de últimas alertas */}
          <div className="phone-feed">
            <div className="phone-feed-item">
              <div className="phone-feed-main">
                <span className="phone-feed-title">Vehículo sospechoso</span>
                <span className="phone-chip phone-chip-medium">Medio</span>
              </div>
              <div className="phone-feed-meta">
                <span>Patente LGC303 · 3 min</span>
                <span>👁 4 vecinos atentos</span>
              </div>
            </div>

            <div className="phone-feed-item">
              <div className="phone-feed-main">
                <span className="phone-feed-title">Botón de pánico</span>
                <span className="phone-chip phone-chip-high">Alerta</span>
              </div>
              <div className="phone-feed-meta">
                <span>Depto 3B · 8 min</span>
                <span>👮 Policía notificada</span>
              </div>
            </div>

            <div className="phone-feed-item">
              <div className="phone-feed-main">
                <span className="phone-feed-title">Corte de luz en el barrio</span>
                <span className="phone-chip phone-chip-low">Comunidad</span>
              </div>
              <div className="phone-feed-meta">
                <span>Zona norte · 15 min</span>
                <span>💡 Empresa eléctrica avisada</span>
              </div>
            </div>
          </div>

          {/* Íconos inferiores tipo SoSafe */}
          <div className="phone-actions-row">
            <button type="button" className="phone-action-btn">
              <span className="phone-action-icon">📷</span>
              <span className="phone-action-label">Nuevo reporte</span>
            </button>
            <button type="button" className="phone-action-btn">
              <span className="phone-action-icon">📍</span>
              <span className="phone-action-label">Mapa</span>
            </button>
            <button type="button" className="phone-action-btn">
              <span className="phone-action-icon">🚨</span>
              <span className="phone-action-label">Pánico</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
