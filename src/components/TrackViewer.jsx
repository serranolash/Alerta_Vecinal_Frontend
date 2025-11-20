// src/components/TrackViewer.jsx
import React, { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, CircleMarker, Polyline } from 'react-leaflet'
import { api } from '../api'

export function TrackViewer({ report, onClose }) {
  const [track, setTrack] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await api.getTrack(report.id)
        setTrack(data.items || [])
      } catch (err) {
        console.error('[TrackViewer] Error cargando ruta', err)
        setError('No se pudo cargar la ruta de escape.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [report.id])

  const center = useMemo(() => {
    if (track.length > 0) {
      return [track[0].latitude, track[0].longitude]
    }
    return [report.latitude, report.longitude]
  }, [track, report.latitude, report.longitude])

  const polylinePositions = track.map((p) => [p.latitude, p.longitude])

  return (
    <div className="track-overlay">
      <div className="track-panel card">
        <div className="track-header">
          <div>
            <h3>Ruta del incidente #{report.id}</h3>
            <p className="muted">
              {report.report_type} · Riesgo {report.risk_level} · Estado{' '}
              {report.status}
            </p>
          </div>
          <button className="btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>

        {loading && <p>Cargando ruta...</p>}
        {error && <p className="error">{error}</p>}

        <div className="map-wrapper track-map-wrapper">
          <MapContainer
            center={center}
            zoom={15}
            scrollWheelZoom={false}
            className="map-container"
            style={{ height: '60vh', width: '100%' }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Punto inicial del incidente */}
            <CircleMarker
              center={[report.latitude, report.longitude]}
              radius={10}
            />

            {/* Puntos de la ruta */}
            {track.map((p) => (
              <CircleMarker
                key={p.id}
                center={[p.latitude, p.longitude]}
                radius={6}
              />
            ))}

            {/* Polilínea */}
            {polylinePositions.length > 1 && (
              <Polyline positions={polylinePositions} />
            )}
          </MapContainer>
        </div>

        {!loading && track.length === 0 && (
          <p className="muted">
            Todavía no hay puntos de ruta registrados para este reporte. El
            seguimiento se activa desde el celular de la víctima o testigo.
          </p>
        )}
      </div>
    </div>
  )
}
