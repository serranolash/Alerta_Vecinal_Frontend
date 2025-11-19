import React from 'react'
import { API_BASE } from '../api'

export function ReportsList({ reports }) {
  if (!reports || reports.length === 0) {
    return <p className="muted">Todavía no hay reportes.</p>
  }

  const riskClass = (risk) => {
    if (risk === 'alto') return 'chip chip-alto'
    if (risk === 'medio') return 'chip chip-medio'
    return 'chip chip-bajo'
  }

  return (
    <ul className="reports-list">
      {reports.map((r) => (
        <li key={r.id} className="report-item">
          <div className="report-header">
            <span className={riskClass(r.risk_level || 'bajo')}>{r.report_type}</span>
            <span className="timestamp">
              {new Date(r.created_at).toLocaleString('es-AR', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </span>
          </div>

          {r.description && <p className="description">{r.description}</p>}

          <div className="report-meta">
            <span className="coords">
              ({r.latitude.toFixed(4)}, {r.longitude.toFixed(4)})
            </span>
            <span className="status-tag">
              Estado: <strong>{r.status}</strong>
            </span>
            <a
              className="link"
              href={`https://www.google.com/maps?q=${r.latitude},${r.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              Ver en mapa
            </a>
          </div>

          <div className="report-meta">
            {r.has_weapon && <span className="badge-danger">Posible arma</span>}
            {r.has_vehicle && <span className="badge-neutral">Vehículo implicado</span>}
            {r.plate_text && <span className="badge-plate">Patente: {r.plate_text}</span>}
          </div>

          {r.image_path && (() => {
            const imageUrl = r.image_path.startsWith('http')
              ? r.image_path
              : `${API_BASE}${r.image_path}`

            return (
              <a href={imageUrl} target="_blank" rel="noreferrer" className="link">
                Ver imagen
              </a>
            )
          })()}
        </li>
      ))}
    </ul>
  )
}
