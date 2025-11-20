// src/components/NearbyAlertsBar.jsx
import React, { useEffect, useState, useRef } from 'react'
import { api } from '../api'

export function NearbyAlertsBar() {
  const [enabled, setEnabled] = useState(true)
  const [radiusKm, setRadiusKm] = useState(0.5) // 0.5 = 500m, 1 = 1km
  const [coords, setCoords] = useState({ lat: null, lng: null })
  const [alerts, setAlerts] = useState([])
  const seenIdsRef = useRef(new Set())
  const [error, setError] = useState('')

  // Obtener ubicación del usuario
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Tu dispositivo no permite geolocalización.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      () => {
        setError('No se pudo obtener la ubicación para alertas cercanas.')
      }
    )
  }, [])

  // Polling de alertas cercanas
  useEffect(() => {
    if (!enabled || !coords.lat || !coords.lng) return

    const interval = setInterval(async () => {
      try {
        const data = await api.nearbyReports({
          lat: coords.lat,
          lng: coords.lng,
          radius_km: radiusKm,
        })
        // 👇 ahora soporta diferentes formatos de respuesta
        const items = data.items || data.data || data.reports || []

        // Tomamos solo las de últimos 20 minutos aprox.
        const now = Date.now()
        const fresh = items.filter((r) => {
          if (!r.created_at) return false
          const t = new Date(r.created_at).getTime()
          const diffMin = (now - t) / 1000 / 60
          return diffMin <= 20
        })

        const newOnes = []
        const seen = seenIdsRef.current
        for (const r of fresh) {
          if (!seen.has(r.id)) {
            seen.add(r.id)
            newOnes.push(r)
          }
        }

        if (newOnes.length > 0) {
          // agregamos las nuevas al principio
          setAlerts((prev) => [...newOnes, ...prev].slice(0, 5))
        }
      } catch (err) {
        console.error('Error chequeando alertas cercanas', err)
      }
    }, 15000) // cada 15 segundos

    return () => clearInterval(interval)
  }, [enabled, coords.lat, coords.lng, radiusKm])

  if (!enabled && alerts.length === 0) {
    return null
  }

  return (
    <div className="nearby-bar">
      <div className="nearby-header">
        <label className="nearby-switch">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <span>Alertas cercanas activas</span>
        </label>

        <select
          className="nearby-select"
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
        >
          <option value={0.5}>500 m</option>
          <option value={1}>1 km</option>
        </select>
      </div>

      {error && <p className="nearby-error">{error}</p>}

      {!error && alerts.length === 0 && (
        <p className="nearby-empty">No hay nuevas alertas en tu radio por ahora.</p>
      )}

      {!error && alerts.length > 0 && (
        <ul className="nearby-list">
          {alerts.map((r) => (
            <li key={r.id} className="nearby-item">
              <span className="nearby-type">
                {r.report_type} · {r.risk_level || 'riesgo desconocido'}
              </span>
              {typeof r.distance_km === 'number' && (
                <span className="nearby-distance">
                  a {Math.round(r.distance_km * 1000)} m aprox.
                </span>
              )}
              <span className="nearby-time">
                {new Date(r.created_at).toLocaleTimeString('es-AR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
