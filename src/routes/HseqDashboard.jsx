// src/routes/HseqDashboard.jsx
import React, { useEffect, useState } from 'react'
import { api } from '../api'

export function HseqDashboard() {
  const [summary, setSummary] = useState(null)
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const [sumRes, listRes] = await Promise.all([
        api.getHseqSummary(),
        api.listHseqReports(),
      ])
      setSummary(sumRes.data || sumRes)
      setReports(listRes.items || listRes.data || [])
    } catch (err) {
      console.error(err)
      setError('No se pudieron cargar los datos HSEQ.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <main className="hseq-dashboard-page">
      <section className="hseq-dashboard-shell">
        <header className="hseq-dashboard-header">
          <div>
            <h1>HSEQ+ empresas / plantas</h1>
            <p className="muted">
              Visión centralizada de incidentes, casi accidentes y condiciones inseguras
              en tiempo real.
            </p>
          </div>
          <button type="button" className="btn-secondary" onClick={loadData}>
            Actualizar
          </button>
        </header>

        {summary && (
          <div className="hseq-dashboard-cards">
            <div className="hseq-card">
              <h3>Eventos últimos 30 días</h3>
              <p className="hseq-card-number">
                {summary.total_last_30 || 0}
              </p>
              <p className="muted">
                {summary.accidents_last_30 || 0} accidentes ·{' '}
                {summary.near_misses_last_30 || 0} casi accidentes.
              </p>
            </div>
            <div className="hseq-card">
              <h3>Top áreas críticas</h3>
              <ul>
                {(summary.top_areas || []).map((a) => (
                  <li key={a.area}>
                    <strong>{a.area}</strong> — {a.count} eventos
                  </li>
                ))}
              </ul>
            </div>
            <div className="hseq-card">
              <h3>Acciones correctivas</h3>
              <p className="hseq-card-number">
                {summary.open_actions || 0}
              </p>
              <p className="muted">
                {summary.closed_actions || 0} cerradas ·{' '}
                {summary.overdue_actions || 0} vencidas.
              </p>
            </div>
          </div>
        )}

        {error && <p className="error">{error}</p>}
        {loading && <p>Cargando datos...</p>}

        {!loading && !error && (
          <div className="hseq-table-wrapper">
            <h2>Eventos recientes</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Área</th>
                  <th>Turno</th>
                  <th>Descripción</th>
                  <th>Riesgo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.type}</td>
                    <td>{r.area}</td>
                    <td>{r.shift}</td>
                    <td>{r.description}</td>
                    <td>{r.risk_level || 'pendiente'}</td>
                    <td>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default HseqDashboard
