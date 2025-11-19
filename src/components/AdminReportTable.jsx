// src/components/AdminReportTable.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { API_BASE } from '../api'

const getRiskBadgeClass = (risk) => {
  switch ((risk || '').toLowerCase()) {
    case 'alto':
      return 'risk-badge risk-badge-high'
    case 'medio':
      return 'risk-badge risk-badge-medium'
    default:
      return 'risk-badge risk-badge-low'
  }
}

export function AdminReportTable({ reports, onChangeStatus }) {
  if (!reports || reports.length === 0) {
    return <p className="muted">No hay reportes para este filtro.</p>
  }

  return (
    <div className="admin-table-wrapper">
      <header className="admin-header">
        <h1>Panel de autoridades</h1>
        <div className="admin-actions">
          <Link to="/admin/mapa" className="btn btn-secondary">
            Ver mapa de incidentes
          </Link>
        </div>
      </header>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Riesgo / Estado</th>
            <th>Ubicación / Imagen</th>
            <th>Extras</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.report_type}</td>

              {/* Descripción + análisis IA */}
              <td>
                <div className="admin-report-desc">
                  <div className="admin-report-text">{r.description || '—'}</div>
                  {r.ai_raw_summary && (
                    <div className="admin-report-ai">
                      <strong>Análisis IA:</strong> {r.ai_raw_summary}
                    </div>
                  )}
                </div>
              </td>

              {/* Riesgo + distancia + estado */}
              <td>
                <div className="admin-report-risk">
                  <span className={getRiskBadgeClass(r.risk_level)}>
                    Riesgo: {r.risk_level || 'bajo'}
                  </span>

                  {/* Banderitas de IA */}
                  {r.weapon_detected && (
                    <div className="risk-flag">Arma detectada por IA</div>
                  )}
                  {r.plate_text && (
                    <div className="plate-flag">Patente: {r.plate_text}</div>
                  )}

                  {typeof r.distance_km === 'number' && (
                    <div className="admin-report-distance">
                      A ~{r.distance_km} km del centro
                    </div>
                  )}
                  <div className="admin-report-status">
                    Estado: <strong>{r.status}</strong>
                  </div>
                </div>
              </td>

              {/* Geolocalización + mapa + imagen (ajustado “a la antigua”) */}
              <td>
                <div className="admin-report-location">
                  {typeof r.latitude === 'number' &&
                    typeof r.longitude === 'number' && (
                      <>
                        <div>
                          {r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}
                        </div>
                        {typeof r.distance_km === 'number' && (
                          <div className="muted">
                            A ~{r.distance_km} km del centro
                          </div>
                        )}
                        <a
                          className="link"
                          href={`https://www.google.com/maps?q=${r.latitude},${r.longitude}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ver en mapa
                        </a>
                      </>
                    )}

                  {/* 👇 Enlace directo, sin window.open raro ni about:blank */}
                  {r.image_path ? (
                    <div className="admin-report-image-link" style={{ marginTop: 4 }}>
                      <a
                        className="link"
                        href={`${API_BASE}${r.image_path}`}
                        
                      >
                        Ver imagen
                      </a>
                    </div>
                  ) : (
                    <div className="muted" style={{ marginTop: 4 }}>
                      Sin imagen
                    </div>
                  )}
                </div>
              </td>

              {/* Extras (armas, vehículo, patente) */}
              <td>
                {r.has_weapon && <span className="badge-danger">Arma</span>}{' '}
                {r.has_vehicle && <span className="badge-neutral">Vehículo</span>}{' '}
                {r.plate_text && <span className="badge-plate">{r.plate_text}</span>}
              </td>

              {/* Acciones */}
              <td>
                <div className="admin-actions">
                  <button
                    className="btn-small btn-verify"
                    onClick={() => onChangeStatus(r.id, 'verificado')}
                  >
                    Verificado
                  </button>
                  <button
                    className="btn-small btn-false"
                    onClick={() => onChangeStatus(r.id, 'falso')}
                  >
                    Falso
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
