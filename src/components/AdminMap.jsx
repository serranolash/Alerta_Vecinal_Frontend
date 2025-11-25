//src/components/AdminMap.jsx
import React, { useEffect, useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup } from 'react-leaflet'
import { api } from '../api'

const CITY_CENTER = {
  lat: -34.6037, // Obelisco - ejemplo
  lng: -58.3816,
}

const getRiskColor = (risk) => {
  switch ((risk || '').toLowerCase()) {
    case 'alto':
      return '#d32f2f'
    case 'medio':
      return '#f9a825'
    default:
      return '#388e3c'
  }
}

export default function AdminMap() {
  const [searchParams] = useSearchParams()
  const reportId = searchParams.get('reportId')
  const plateFromQuery = searchParams.get('plate') || ''

  const [mode, setMode] = useState('incidents') // 'incidents' | 'heatmap'
  const [reports, setReports] = useState([])
  const [trackPoints, setTrackPoints] = useState([])
  const [heatPoints, setHeatPoints] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true)
      setError('')
      try {
        const params = {}
        if (plateFromQuery.trim()) {
          params.plate = plateFromQuery.trim()
        }
        const resp = await api.adminListReports(params)
        const items = resp.items || resp.data || resp.reports || []
        setReports(items)
      } catch (err) {
        console.error(err)
        setError('Error al cargar incidentes para el mapa.')
      } finally {
        setLoading(false)
      }
    }

    loadReports()
  }, [plateFromQuery])

  useEffect(() => {
    const loadTrack = async () => {
      if (!reportId) {
        setTrackPoints([])
        return
      }
      try {
        const resp = await api.getTrack(reportId)
        setTrackPoints(resp.items || [])
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar la ruta de escape de este reporte.')
      }
    }

    loadTrack()
  }, [reportId])

  useEffect(() => {
    const loadHeatmap = async () => {
      if (mode !== 'heatmap') return
      try {
        const resp = await api.getHeatmap()
        setHeatPoints(resp.data || [])
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar el mapa de calor.')
      }
    }

    loadHeatmap()
  }, [mode])

  const mapCenter = useMemo(() => {
    if (trackPoints.length > 0) {
      return {
        lat: trackPoints[0].latitude,
        lng: trackPoints[0].longitude,
      }
    }
    if (reports.length > 0) {
      return {
        lat: reports[0].latitude,
        lng: reports[0].longitude,
      }
    }
    return CITY_CENTER
  }, [trackPoints, reports])

  return (
    <div className="admin-map-page">
      <div className="admin-map-toolbar">
        <h2>Mapa de incidentes</h2>
        <div className="map-mode-toggle">
          <button
            type="button"
            className={mode === 'incidents' ? 'btn-secondary active' : 'btn-secondary'}
            onClick={() => setMode('incidents')}
          >
            Incidentes
          </button>
          <button
            type="button"
            className={mode === 'heatmap' ? 'btn-secondary active' : 'btn-secondary'}
            onClick={() => setMode('heatmap')}
          >
            Mapa de calor
          </button>
        </div>
        {plateFromQuery && (
          <p className="muted">
            Filtrando por patente: <strong>{plateFromQuery}</strong>
          </p>
        )}
        {reportId && (
          <p className="muted">
            Mostrando ruta de escape para reporte ID: <strong>{reportId}</strong>
          </p>
        )}
      </div>

      {loading && <p className="muted">Cargando datos...</p>}
      {error && <p className="error">{error}</p>}

      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '80vh', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {mode === 'incidents' && (
          <>
            {reports.map((r) => (
              <CircleMarker
                key={r.id}
                center={[r.latitude, r.longitude]}
                radius={6}
                pathOptions={{ color: getRiskColor(r.risk_level) }}
              >
                <Popup>
                  <div>
                    <strong>ID:</strong> {r.id}
                    <br />
                    <strong>Tipo:</strong> {r.report_type}
                    <br />
                    <strong>Riesgo:</strong> {r.risk_level}
                    <br />
                    {r.plate_text && (
                      <>
                        <strong>Patente:</strong> {r.plate_text}
                        <br />
                      </>
                    )}
                    <small>{r.description?.slice(0, 120) || 'Sin descripción'}</small>
                  </div>
                </Popup>
              </CircleMarker>
            ))}

            {trackPoints.length > 1 && (
              <Polyline
                positions={trackPoints.map((p) => [p.latitude, p.longitude])}
              />
            )}
            {trackPoints.map((p) => (
              <CircleMarker
                key={p.id}
                center={[p.latitude, p.longitude]}
                radius={4}
              >
                <Popup>Punto #{p.id}</Popup>
              </CircleMarker>
            ))}
          </>
        )}

        {mode === 'heatmap' && (
          <>
            {heatPoints.map((p, idx) => (
              <CircleMarker
                key={idx}
                center={[p.lat, p.lng]}
                radius={4 + Math.min(p.count, 10)}
                pathOptions={{ color: '#f97316' }}
              >
                <Popup>
                  <div>
                    <strong>Incidentes en zona:</strong> {p.count}
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </>
        )}
      </MapContainer>
    </div>
  )
}
