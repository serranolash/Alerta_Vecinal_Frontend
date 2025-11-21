// src/components/AdminMap.jsx
import React, { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { useLocation } from 'react-router-dom'
import { API_BASE } from '../api'

const CITY_CENTER = {
  lat: -34.6037, // mismo centro que el backend (Obelisco Bs.As. como ejemplo)
  lng: -58.3816,
}

const getRiskColor = (risk) => {
  switch ((risk || '').toLowerCase()) {
    case 'alto':
      return '#d32f2f' // rojo
    case 'medio':
      return '#f9a825' // amarillo
    default:
      return '#388e3c' // verde
  }
}

export default function AdminMap() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const plateFilter = (searchParams.get('plate') || '').trim().toUpperCase()

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/reports`)
        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`)
        }
        const json = await res.json()
        if (!json.ok) throw new Error('Error en la API')
        const items = json.items || json.data || json.reports || []
        setReports(items)
      } catch (err) {
        console.error('[AdminMap] Error cargando reportes:', err)
        setError('No se pudieron cargar los reportes.')
      } finally {
        setLoading(false)
      }
    }
    loadReports()
  }, [])

  // 🔍 aplicamos filtro por patente si viene en la URL
  const filteredReports = useMemo(() => {
    if (!plateFilter) return reports
    return reports.filter((r) => {
      const plate = (r.plate_text || '').trim().toUpperCase()
      return plate === plateFilter
    })
  }, [reports, plateFilter])

  // Centro del mapa: si hay reportes visibles, centrar en el primero; si no, en la ciudad
  const center = filteredReports.length
    ? { lat: filteredReports[0].latitude, lng: filteredReports[0].longitude }
    : CITY_CENTER

  return (
    <div className="admin-map-page">
      <header className="admin-map-header">
        <h1>Mapa de incidentes</h1>
        <p>
          Cada punto representa un reporte. El color indica el nivel de riesgo:
          <span className="badge-demo badge-high">Alto</span>
          <span className="badge-demo badge-medium">Medio</span>
          <span className="badge-demo badge-low">Bajo</span>
        </p>

        {plateFilter && (
          <p className="muted">
            Filtrando por patente:{' '}
            <strong>{plateFilter}</strong> · incidentes:{' '}
            <strong>{filteredReports.length}</strong>
          </p>
        )}
      </header>

      {loading && <p>Cargando reportes...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={13}
          style={{ height: '70vh', width: '100%', borderRadius: '12px', overflow: 'hidden' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> colaboradores'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredReports.map((r) => {
            const imgUrl = r.image_path
              ? r.image_path.startsWith('http')
                ? r.image_path
                : `${API_BASE}${r.image_path}`
              : null

            return (
              <CircleMarker
                key={r.id}
                center={[r.latitude, r.longitude]}
                radius={10}
                color={getRiskColor(r.risk_level)}
                fillColor={getRiskColor(r.risk_level)}
                fillOpacity={0.7}
                stroke={true}
                weight={2}
              >
                <Popup>
                  <div style={{ maxWidth: 220 }}>
                    <strong>Reporte #{r.id}</strong>
                    <br />
                    <strong>Riesgo:</strong> {r.risk_level || 'bajo'}
                    <br />
                    <strong>Estado:</strong> {r.status}
                    <br />
                    <strong>Tipo:</strong> {r.report_type}
                    <br />
                    {r.plate_text && (
                      <>
                        <strong>Patente:</strong> {(r.plate_text || '').toUpperCase()}
                        <br />
                      </>
                    )}
                    <br />
                    <em>{r.description}</em>

                    {imgUrl && (
                      <>
                        <br />
                        <a href={imgUrl} target="_blank" rel="noreferrer">
                          Ver imagen
                        </a>
                      </>
                    )}

                    <br />
                    <a
                      href={`https://www.google.com/maps?q=${r.latitude},${r.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir en Google Maps
                    </a>
                  </div>
                </Popup>
              </CircleMarker>
            )
          })}
        </MapContainer>
      )}
    </div>
  )
}
