// src/pages/AdminArea.jsx
import React, { useEffect, useState } from 'react'
import { API_BASE } from '../api'
import { AdminReportTable } from '../components/AdminReportTable'
import { TrackViewer } from '../components/TrackViewer'

export default function AdminArea() {
  const [reports, setReports] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [trackReport, setTrackReport] = useState(null)

  const loadReports = async (status) => {
    setLoading(true)
    setError('')
    try {
      let url = `${API_BASE}/api/admin/reports`
      if (status) {
        url += `?status=${encodeURIComponent(status)}`
      }
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      if (!json.ok) throw new Error(json.error || 'Error en la API')

      const items = json.items || json.data || json.reports || []
      setReports(items)
    } catch (err) {
      console.error('[AdminArea] Error cargando reportes:', err)
      setError('No se pudieron cargar los reportes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReports(statusFilter)
  }, [statusFilter])

  const handleChangeStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/reports/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      if (!json.ok) throw new Error(json.error || 'Error en la API')

      // actualizar en memoria sin re-cargar todo
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      )
    } catch (err) {
      console.error('[AdminArea] Error cambiando estado:', err)
      alert('No se pudo cambiar el estado del reporte.')
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <h1>Panel de autoridades</h1>
        <div className="admin-filters">
          <label>
            Filtrar por estado:{' '}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="verificado">Verificado</option>
              <option value="falso">Falso</option>
            </select>
          </label>
        </div>
      </header>

      {loading && <p>Cargando reportes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <AdminReportTable
          reports={reports}
          onChangeStatus={handleChangeStatus}
          onViewTrack={(report) => setTrackReport(report)}
        />
      )}

      {trackReport && (
        <TrackViewer
          report={trackReport}
          onClose={() => setTrackReport(null)}
        />
      )}
    </div>
  )
}
