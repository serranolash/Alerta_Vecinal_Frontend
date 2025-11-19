import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { AdminReportTable } from '../components/AdminReportTable'

export function AdminPanel() {
  const [reports, setReports] = useState([])
  const [statusFilter, setStatusFilter] = useState('pendiente')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadReports = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.adminListReports({ status: statusFilter || undefined })
      setReports(data.items || [])
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error cargando reportes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReports()
  }, [statusFilter])

  const handleChangeStatus = async (id, status) => {
    try {
      await api.adminChangeStatus(id, status)
      await loadReports()
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error cambiando estado')
    }
  }

  return (
    <main className="app-main single-column">
      <section className="card">
        <div className="card-header">
          <h2>Panel de autoridades</h2>
          <select
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="pendiente">Pendientes</option>
            <option value="verificado">Verificados</option>
            <option value="falso">Marcados como falso</option>
            <option value="">Todos</option>
          </select>
        </div>
        <p className="muted">
          Este panel muestra las alertas enviadas por la comunidad. Podés marcarlas como{' '}
          <strong>verificadas</strong> o <strong>falsas</strong> para mejorar la confianza del sistema.
        </p>
        {error && <p className="error">{error}</p>}
        {loading ? <p>Cargando...</p> : <AdminReportTable reports={reports} onChangeStatus={handleChangeStatus} />}
      </section>
    </main>
  )
}
