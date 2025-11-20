// src/pages/AdminArea.jsx
import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { AdminReportTable } from '../components/AdminReportTable'
import { TrackViewer } from '../components/TrackViewer'

export default function AdminArea() {
  const [reports, setReports] = useState([])
  const [statusFilter, setStatusFilter] = useState('todos')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [trackReport, setTrackReport] = useState(null)

  const loadReports = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.listReports({
        status: statusFilter === 'todos' ? undefined : statusFilter,
      })
      const items = data.items || data.data || data.reports || []
      setReports(items)
    } catch (err) {
      console.error('[AdminArea] Error cargando reportes', err)
      setError('No se pudieron cargar los reportes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReports()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  const handleChangeStatus = async (id, status) => {
    try {
      await api.changeStatus(id, status)
      await loadReports()
    } catch (err) {
      console.error('[AdminArea] Error cambiando estado', err)
      alert('No se pudo actualizar el estado del reporte.')
    }
  }

  return (
    <div className="admin-page">
      <section className="admin-filters">
        <h1>Panel de autoridades</h1>

        <div className="admin-filter-row">
          <label>
            Filtrar por estado:{' '}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="todos">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="verificado">Verificado</option>
              <option value="falso">Falso</option>
            </select>
          </label>

          <button className="btn-secondary" onClick={loadReports}>
            Actualizar
          </button>
        </div>
      </section>

      {loading && <p>Cargando reportes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <AdminReportTable
          reports={reports}
          onChangeStatus={handleChangeStatus}
          onViewTrack={(report) => setTrackReport(report)} // 🆕 acá enganchamos la ruta
        />
      )}

      {/* 🆕 Overlay con el mapa de la ruta */}
      {trackReport && (
        <TrackViewer
          report={trackReport}
          onClose={() => setTrackReport(null)}
        />
      )}
    </div>
  )
}
