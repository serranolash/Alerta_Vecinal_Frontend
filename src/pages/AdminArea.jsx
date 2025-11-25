//src/pages/AdminArea.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { AdminReportTable } from '../components/AdminReportTable'

export default function AdminArea() {
  const [reports, setReports] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [plateFilter, setPlateFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const loadReports = async () => {
    setLoading(true)
    setError('')
    try {
      const params = {
        status: statusFilter || undefined,
      }
      if (plateFilter.trim()) {
        params.plate = plateFilter.trim()
      }

      const resp = await api.adminListReports(params)
      const items = resp.items || resp.data || resp.reports || []
      setReports(items)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al cargar reportes')
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
      loadReports()
    } catch (err) {
      console.error(err)
      alert(err.message || 'Error cambiando estado')
    }
  }

  const handleViewTrack = (report) => {
    navigate(`/admin/mapa?reportId=${report.id}`)
  }

  return (
    <div className="admin-area">
      <div className="admin-filters">
        <div className="filter-group">
          <label>
            Estado:&nbsp;
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="pendiente">Pendientes</option>
              <option value="verificado">Verificados</option>
              <option value="falso">Falsos</option>
            </select>
          </label>
        </div>

        <div className="filter-group">
          <label>
            Patente:&nbsp;
            <input
              type="text"
              placeholder="Ej: ABC123"
              value={plateFilter}
              onChange={(e) => setPlateFilter(e.target.value.toUpperCase())}
            />
          </label>
        </div>

        <button className="btn-secondary" type="button" onClick={loadReports}>
          Actualizar
        </button>
      </div>

      {loading && <p className="muted">Cargando reportes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <AdminReportTable
          reports={reports}
          onChangeStatus={handleChangeStatus}
          onViewTrack={handleViewTrack}
        />
      )}
    </div>
  )
}

