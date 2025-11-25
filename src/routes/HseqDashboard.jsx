// src/pages/HseqDashboard.jsx
import React, { useEffect, useState } from 'react'
import { API_BASE } from '../api'

const riskBadgeClass = (risk) => {
  switch ((risk || '').toLowerCase()) {
    case 'alto':
      return 'badge badge-high'
    case 'medio':
      return 'badge badge-medium'
    default:
      return 'badge badge-low'
  }
}

const statusBadgeClass = (status) => {
  switch ((status || '').toLowerCase()) {
    case 'abierto':
      return 'badge-pill badge-open'
    case 'en_progreso':
      return 'badge-pill badge-progress'
    case 'cerrado':
      return 'badge-pill badge-closed'
    case 'vencido':
      return 'badge-pill badge-overdue'
    default:
      return 'badge-pill'
  }
}

export function HseqDashboard() {
  const [summary, setSummary] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const [summaryRes, reportsRes] = await Promise.all([
        fetch(`${API_BASE}/api/hseq/summary`),
        fetch(`${API_BASE}/api/hseq/reports`),
      ])

      if (!summaryRes.ok) throw new Error('Error cargando resumen HSEQ')
      if (!reportsRes.ok) throw new Error('Error cargando eventos HSEQ')

      const summaryJson = await summaryRes.json()
      const reportsJson = await reportsRes.json()

      if (summaryJson.ok === false) throw new Error(summaryJson.error || 'Error en resumen')
      if (reportsJson.ok === false) throw new Error(reportsJson.error || 'Error en eventos')

      setSummary(summaryJson.data || summaryJson)
      setEvents(reportsJson.items || reportsJson.data || [])
    } catch (err) {
      console.error('[HseqDashboard] Error:', err)
      setError(err.message || 'No se pudo cargar el módulo HSEQ.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <main className="page hseq-page">
      <header className="page-header">
        <h1>AlertaVecinal HSEQ+</h1>
        <p className="muted">
          Reportes de seguridad, salud y ambiente para plantas, fábricas, depósitos y refinerías,
          conectados con el mismo motor de IA y geolocalización de AlertaVecinal.
        </p>
        <div className="page-header-actions">
          <button type="button" className="btn-secondary" onClick={loadData}>
            Actualizar
          </button>
        </div>
      </header>

      {loading && <p>Cargando panel HSEQ...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && summary && (
        <>
          {/* Tarjetas de resumen */}
          <section className="cards-grid">
            <article className="stat-card">
              <h2>Eventos últimos 30 días</h2>
              <p className="stat-number">{summary.total_last_30}</p>
              <p className="muted">
                {summary.accidents_last_30} accidentes ·{' '}
                {summary.near_misses_last_30} casi accidentes.
              </p>
            </article>

            <article className="stat-card">
              <h2>Top áreas críticas</h2>
              {summary.top_areas && summary.top_areas.length > 0 ? (
                <ul className="stat-list">
                  {summary.top_areas.map((a) => (
                    <li key={a.area}>
                      <strong>{a.area}</strong> — {a.count} eventos
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="muted">Aún no hay áreas críticas registradas.</p>
              )}
            </article>

            <article className="stat-card">
              <h2>Acciones correctivas</h2>
              <p className="stat-number">{summary.open_actions}</p>
              <p className="muted">
                {summary.closed_actions} cerradas · {summary.overdue_actions} vencidas.
              </p>
            </article>
          </section>

          {/* Eventos recientes con más visibilidad */}
          <section className="hseq-events">
            <header className="section-header">
              <div>
                <h2>Eventos recientes</h2>
                <p className="muted">
                  Vista operativa para HSEQ: riesgo, estado, ubicación y evidencia visual
                  para cada incidente reportado por los trabajadores.
                </p>
              </div>
            </header>

            {events.length === 0 ? (
              <p className="muted">Todavía no hay eventos HSEQ registrados.</p>
            ) : (
              <div className="table-wrapper">
                <table className="admin-table hseq-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tipo</th>
                      <th>Área / Turno</th>
                      <th>Descripción</th>
                      <th>Riesgo / Estado</th>
                      <th>Ubicación</th>
                      <th>Evidencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((e) => {
                      const imgUrl = e.image_path
                        ? e.image_path.startsWith('http')
                          ? e.image_path
                          : `${API_BASE}${e.image_path}`
                        : null

                      const hasCoords =
                        typeof e.latitude === 'number' &&
                        typeof e.longitude === 'number'

                      return (
                        <tr key={e.id}>
                          <td>{e.id}</td>
                          <td>{e.type}</td>

                          <td>
                            <div className="cell-stack">
                              <span>{e.area || '—'}</span>
                              <span className="muted small">Turno: {e.shift || '—'}</span>
                            </div>
                          </td>

                          <td>
                            <div className="cell-desc">
                              <span>{e.description || '—'}</span>
                            </div>
                          </td>

                          <td>
                            <div className="cell-stack">
                              <span className={riskBadgeClass(e.risk_level)}>
                                Riesgo: {e.risk_level || 'bajo'}
                              </span>
                              <span className={statusBadgeClass(e.status)}>
                                {e.status || '—'}
                              </span>
                            </div>
                          </td>

                          <td>
                            {hasCoords ? (
                              <div className="cell-stack">
                                <span>
                                  {e.latitude.toFixed(4)}, {e.longitude.toFixed(4)}
                                </span>
                                <a
                                  href={`https://www.google.com/maps?q=${e.latitude},${e.longitude}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="link small"
                                >
                                  Ver en mapa
                                </a>
                              </div>
                            ) : (
                              <span className="muted small">Sin coordenadas</span>
                            )}
                          </td>

                          <td>
                            {imgUrl ? (
                              <a
                                href={imgUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="link small"
                              >
                                Ver imagen
                              </a>
                            ) : (
                              <span className="muted small">Sin evidencia</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  )
}

export default HseqDashboard
