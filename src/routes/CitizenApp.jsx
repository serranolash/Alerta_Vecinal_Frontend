// src/routes/CitizenApp.jsx
import React, { useEffect, useState, useCallback } from "react"
import { api } from "../api"
import { ReportForm } from "../components/ReportForm"
import { ReportsList } from "../components/ReportsList"
import { HeatmapPreview } from "../components/HeatmapPreview"
import { NearbyAlertsBar } from "../components/NearbyAlertsBar"
import { PanicButton } from "../components/PanicButton"

export function CitizenApp() {
  const [reports, setReports] = useState([])
  const [heatmap, setHeatmap] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [coords, setCoords] = useState({ lat: null, lng: null })

  // --- cargar reportes ---
  const loadReports = useCallback(async () => {
    try {
      setLoading(true)
      setError("")

      const res = await api.listReports({ limit: 50 })
      // backend: { ok, data: [...] }
      const payload = res.data || res.items || res.reports || []
      const list = Array.isArray(payload) ? payload : []

      setReports(list)
    } catch (e) {
      console.error("Error cargando reportes", e)
      setError(e?.message || "Error cargando reportes")
    } finally {
      setLoading(false)
    }
  }, [])

  // --- cargar heatmap ---
  const loadHeatmap = useCallback(async () => {
    try {
      const res = await api.getHeatmap()
      const payload = res.data || res.items || res.points || []
      const mapa = Array.isArray(payload) ? payload : []
      setHeatmap(mapa)
    } catch (e) {
      console.error("Error cargando mapa de calor", e)
    }
  }, [])

  useEffect(() => {
    loadReports()
    loadHeatmap()
  }, [loadReports, loadHeatmap])

  // --- geolocalización para alertas y botón de pánico ---
  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      (err) => {
        console.warn("No se pudo obtener la ubicación", err)
      }
    )
  }, [])

  return (
    <main className="app-main app-main-grid">
      {/* Columna 1: creación de reporte */}
      <section className="card">
        <NearbyAlertsBar coords={coords} />

        <h2>Nuevo reporte ciudadano</h2>
        <p className="muted">
          Esta es la vista que usa el vecino para informar lo que está viendo en tiempo real.
          Tu ubicación se toma automáticamente. Si podés, agregá detalles: vehículo, patente,
          cantidad de personas, si viste un arma y hacia dónde se mueven.
        </p>

        {error && (
          <p style={{ color: "#f87171", fontWeight: 500 }}>
            {error}
          </p>
        )}

        <ReportForm
          onReportCreated={() => {
            loadReports()
            loadHeatmap()
          }}
        />
      </section>

      {/* Columna 2: lista de reportes recientes */}
      <section className="card">
        <div className="card-header">
          <div>
            <h2>Reportes recientes</h2>
            <p className="muted">
              Últimos incidentes enviados por la comunidad. Esta información alimenta el
              panel de autoridades y el mapa de incidentes.
            </p>
          </div>
          <button className="btn-secondary" onClick={loadReports}>
            Actualizar
          </button>
        </div>
        {loading ? (
          <p>Cargando reportes recientes...</p>
        ) : (
          <ReportsList reports={reports} />
        )}
      </section>

      {/* Fila completa: mini-mapa / heatmap */}
      <section className="card full-width-card">
        <div className="card-header">
          <div>
            <h2>Mapa rápido de zonas con reportes</h2>
            <p className="muted">
              Vista simplificada de concentración de incidentes reportados. El panel de
              autoridades cuenta además con un mapa táctico completo.
            </p>
          </div>
          <button className="btn-secondary" onClick={loadHeatmap}>
            Actualizar mapa
          </button>
        </div>
        <HeatmapPreview cells={heatmap} />
      </section>

      {/* Botón de pánico (acción directa) */}
      <PanicButton coords={coords} userId={null} />
    </main>
  )
}
