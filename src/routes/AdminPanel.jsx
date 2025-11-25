// src/routes/AdminPanel.jsx
import React, { useEffect, useState } from 'react'
import { AdminReportTable } from '../components/AdminReportTable'
import { api } from '../api'
import { TrackViewer } from '../components/TrackViewer'

export function AdminPanel() {
  const [reports, setReports] = useState([])
  const [statusFilter, setStatusFilter] = useState('todos')
  const [plateFilter, setPlateFilter] = useState('')   // 🆕 filtro por patente
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [trackReport, setTrackReport] = useState(null) // 🆕 reporte seleccionado para ver ruta

  const loadReports = async () => {
    setLoading(true)
    setError('')
    try {
      // usamos el endpoint admin de tu api.js
      const resp = await api.adminListReports({
        status: statusFilter === 'todos' ? undefined : statusFilter,
      })
      let items = resp.items || resp.data || resp.reports || []

      // 🆕 filtro por patente SOLO en front
      if (plateFilter.trim()) {
        const plate = plateFilter.trim().toUpperCase()
        items = items.filter((r) => {
          const rp = (r.plate_text || '').trim().toUpperCase()
          return rp.includes(plate)
        })
      }

      setReports(items)
    } catch (err) {
      console.error('[AdminPanel] Error cargando reportes:', err)
      setError('No se pudieron cargar los reportes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReports()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, plateFilter])

  const handleChangeStatus = async (id, newStatus) => {
    try {
      await api.adminChangeStatus(id, newStatus)
      await loadReports()
    } catch (err) {
      console.error('[AdminPanel] Error cambiando estado:', err)
      alert('No se pudo actualizar el estado del reporte.')
    }
  }

  return (
    <main className="admin-page">
      <section className="admin-section">
        <header className="admin-page-header">
          <h1>Panel de autoridades</h1>
          <p className="muted">
            Visualizá los reportes en tiempo real, filtrá por estado y revisá
            la información que envían los vecinos.
          </p>
        </header>

        <div className="admin-filters">
          <label>
            Estado:&nbsp;
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

          <label>
            Patente:&nbsp;
            <input
              type="text"
              placeholder="Ej: ABC123"
              value={plateFilter}
              onChange={(e) => setPlateFilter(e.target.value.toUpperCase())}
            />
          </label>

          <button
            type="button"
            className="btn-secondary"
            onClick={loadReports}
          >
            Actualizar
          </button>
        </div>

        {loading && <p>Cargando reportes...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <AdminReportTable
            reports={reports}
            onChangeStatus={handleChangeStatus}
            // 🔑 AQUÍ se abre el modal de TrackViewer (igual que en tu código “bueno”)
            onViewTrack={(report) => setTrackReport(report)}
          />
        )}
      </section>

      {/* Modal de ruta de escape (el mismo que ya tenías funcionando) */}
      {trackReport && (
        <TrackViewer
          report={trackReport}
          onClose={() => setTrackReport(null)}
        />
      )}
    </main>
  )
}

export default AdminPanel
