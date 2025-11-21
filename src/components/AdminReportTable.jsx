// src/components/AdminReportTable.jsx
import React, { useMemo, useState } from 'react'
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

export function AdminReportTable({ reports, onChangeStatus, onViewTrack }) {
  const [plateFilter, setPlateFilter] = useState('')

  // 🔢 Mapa patente -> cantidad de incidentes (reincidencia)
  const plateStats = useMemo(() => {
    const stats = {}
    ;(reports || []).forEach((r) => {
      const plate = (r.plate_text || '').trim().toUpperCase()
      if (!plate) return
      stats[plate] = (stats[plate] || 0) + 1
    })
    return stats
  }, [reports])

  // 🔍 Filtro local por patente
  const normalizedFilter = plateFilter.trim().toUpperCase()
  const visibleReports = useMemo(() => {
    if (!normalizedFilter) return reports || []
    return (reports || []).filter((r) => {
      const plate = (r.plate_text || '').toUpperCase()
      return plate.includes(normalizedFilter)
    })
  }, [reports, normalizedFilter])

  if (!visibleReports || visibleReports.length === 0) {
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

        <div className="admin-filters-inline">
          <label className="field-inline">
            <span>Buscar por patente</span>
            <input
              type="text"
              value={plateFilter}
              onChange={(e) => setPlateFilter(e.target.value.toUpperCase())}
              placeholder="Ej: AA021ID"
            />
          </label>
        </div>

        <p className="muted">No hay reportes para este filtro.</p>
      </div>
    )
  }

  const handlePlateClick = (plate) => {
    if (!plate) return
    // 👇 abre el mapa general pero filtrado por patente (?plate=XXX)
    const url = `/admin/mapa?plate=${encodeURIComponent(plate)}`
    window.open(url, '_blank', 'noopener,noreferrer')
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

      {/* 🔍 Filtro local por patente */}
      <div className="admin-filters-inline">
        <label className="field-inline">
          <span>Buscar por patente</span>
          <input
            type="text"
            value={plateFilter}
            onChange={(e) => setPlateFilter(e.target.value.toUpperCase())}
            placeholder="Ej: AA021ID"
          />
        </label>
      </div>

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
          {visibleReports.map((r) => {
            const plate = (r.plate_text || '').trim().toUpperCase()
            const timesSeen = plate ? plateStats[plate] || 1 : 0
            const isRecurrent = timesSeen > 1

            return (
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

                    {r.weapon_detected && (
                      <div className="risk-flag">Arma detectada por IA</div>
                    )}
                    {r.plate_text && (
                      <div className="plate-flag">Patente: {plate}</div>
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

                {/* Geolocalización + mapa + imagen */}
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

                    {r.image_path ? (
                      <div className="admin-report-image-link" style={{ marginTop: 4 }}>
                        <a
                          className="link"
                          href={`${API_BASE}${r.image_path}`}
                          target="_blank"
                          rel="noreferrer"
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

                {/* Extras: armas, vehículo, patente, reincidencia */}
                <td>
                  {r.has_weapon && <span className="badge-danger">Arma</span>}{' '}
                  {r.has_vehicle && <span className="badge-neutral">Vehículo</span>}{' '}
                  {plate && (
                    <button
                      type="button"
                      className={`badge-plate ${isRecurrent ? 'badge-plate-recurrent' : ''}`}
                      onClick={() => handlePlateClick(plate)}
                      title={
                        isRecurrent
                          ? `Patente reincidente: ${timesSeen} incidentes. Click para ver historial en mapa.`
                          : 'Click para ver historial en mapa de esta patente'
                      }
                    >
                      {plate}
                      {isRecurrent ? ` · ${timesSeen}` : ''}
                    </button>
                  )}
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

                    {/* Botón de ruta de escape (ya existente) */}
                    {typeof onViewTrack === 'function' && (
                      <button
                        className="btn-small btn-secondary"
                        onClick={() => onViewTrack(r.id)}
                      >
                        Ver ruta
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
