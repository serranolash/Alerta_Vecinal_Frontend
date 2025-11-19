// src/components/AdminMap.jsx
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import { API_BASE } from '../api'   // 👈 usamos tu base real de Railway

const CITY_CENTER = {
  lat: -34.6037,  // Obelisco Bs.As. como ejemplo
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

  useEffect(() => {
    const loadReports = async () => {
      try {
        // 👇 AHORA usamos API_BASE (Railway), no localhost
        const res = await fetch(`${API_BASE}/api/admin/reports`)
        if (!res.ok) {
          throw new Error(`Error HTTP ${res.status}`)
        }
        const json = await res.json()
        if (!json.ok) throw new Error('Error en la API')
        setReports(json.items || json.data || json.reports || [])
      } catch (err) {
        console.error('[AdminMap] Error cargando reportes:', err)
        setError('No se pudieron cargar los reportes.')
      } finally {
        setLoading(false)
      }
    }
    loadReports()
  }, [])

  // Centro del mapa: si hay reportes, centrar en el primero; si no, en la ciudad
  const center = reports.length
    ? { lat: reports[0].latitude, lng: reports[0].longitude }
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

          {reports.map((r) => {
            const imgUrl = r.image_path
              ? (r.image_path.startsWith('http')
                  ? r.image_path
                  : `${API_BASE}${r.image_path}`) // 👈 también usamos API_BASE aquí
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
                    <strong>Distancia:</strong>{' '}
                    {typeof r.distance_km === 'number'
                      ? `${r.distance_km} km del centro`
                      : 'N/D'}
                    <br />
                    <br />
                    <em>{r.description}</em>

                    {imgUrl && (
                      <>
                        <br />
                        <a
                          href={imgUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
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
