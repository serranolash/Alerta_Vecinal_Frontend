// src/components/TrackViewer.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Polyline } from 'react-leaflet'
import { API_BASE } from '../api'

export function TrackViewer({ report, onClose }) {
  const [track, setTrack] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE}/api/reports/${report.id}/track`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if (!json.ok) throw new Error(json.error || 'Error en la API')

        setTrack(json.items || [])
      } catch (err) {
        console.error('[TrackViewer] Error cargando ruta:', err)
        setError('No se pudo cargar la ruta de este reporte.')
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
    <div className="track-panel card" style={{ marginTop: '1.5rem' }}>
      <div className="track-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3>Ruta del incidente #{report.id}</h3>
          <p className="muted">
            {report.report_type} · Riesgo {report.risk_level || 'bajo'} · Estado {report.status}
          </p>
        </div>
        <button className="btn-secondary" type="button" onClick={onClose}>
          Cerrar
        </button>
      </div>

      {loading && <p>Cargando ruta...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div
            className="track-map-wrapper"
            style={{ height: '320px', borderRadius: '12px', overflow: 'hidden', marginTop: '0.75rem' }}
          >
            <MapContainer
              center={center}
              zoom={14}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> colaboradores'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Punto inicial (reporte) */}
              <CircleMarker
                center={[report.latitude, report.longitude]}
                radius={10}
                pathOptions={{ color: '#22c55e', fillOpacity: 0.9 }}
              />

              {/* Puntos de la ruta */}
              {track.map((p) => (
                <CircleMarker
                  key={p.id}
                  center={[p.latitude, p.longitude]}
                  radius={6}
                  pathOptions={{ color: '#f97316', fillOpacity: 0.8 }}
                />
              ))}

              {/* Línea de la ruta */}
              {polylinePositions.length > 1 && (
                <Polyline positions={polylinePositions} pathOptions={{ color: '#f97316' }} />
              )}
            </MapContainer>
          </div>

          {track.length === 0 && (
            <p className="muted" style={{ marginTop: '0.75rem' }}>
              Todavía no hay puntos de ruta registrados para este reporte.  
              El seguimiento se activa desde el celular de la víctima o testigo.
            </p>
          )}
        </>
      )}
    </div>
  )
}
