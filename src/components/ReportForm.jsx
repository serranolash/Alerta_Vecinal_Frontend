// src/components/ReportForm.jsx
import React, { useState, useEffect } from 'react'
import { api } from '../api'

const REPORT_TYPES = [
  { value: 'robo', label: 'Robo / Asalto' },
  { value: 'secuestro', label: 'Secuestro / Intento' },
  { value: 'violencia', label: 'Violencia / Agresión' },
  { value: 'sospechoso', label: 'Persona / Vehículo sospechoso' },
  { value: 'otro', label: 'Otro' },
]

export function ReportForm({ onReportCreated }) {
  const [reportType, setReportType] = useState('robo')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [plate, setPlate] = useState('')
  const [coords, setCoords] = useState({ lat: null, lng: null })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [allowFallback, setAllowFallback] = useState(false)

  // 🆕 estados para tracking / ruta de escape
  const [lastReportId, setLastReportId] = useState(null)
  const [trackingActive, setTrackingActive] = useState(false)
  const [watchId, setWatchId] = useState(null)
  const [trackError, setTrackError] = useState('')
  const [pointsSent, setPointsSent] = useState(0)

  // 🆕 detectar si estamos en entorno de desarrollo (para permitir BA como ejemplo SOLO en dev)
  const isDev =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1')

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Tu dispositivo no permite geolocalización.')
      setAllowFallback(true)
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
        setError('No se pudo obtener la ubicación automática. Revisá permisos del GPS.')
        setAllowFallback(true)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!coords.lat || !coords.lng) {
      setError('Todavía no tenemos tu ubicación. Intenta de nuevo en unos segundos.')
      return
    }

    setStatus('sending')
    try {
      const resp = await api.createReport({
        report_type: reportType,
        description,
        latitude: coords.lat,
        longitude: coords.lng,
        image: imageFile,
        plate_text: plate,
      })

      // 🆕 guardar ID del reporte creado para la ruta de escape
      const reportId = resp.report?.id
      if (reportId) {
        setLastReportId(reportId)
        setTrackingActive(false)
        setPointsSent(0)
        setTrackError('')
      }

      setStatus('success')
      setDescription('')
      setImageFile(null)
      setPlate('')
      if (onReportCreated) onReportCreated()
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al enviar el reporte')
      setStatus('error')
    }
    // 🔁 sin setTimeout para que no se pierda el panel de tracking
  }

  // 🆕 empezar a enviar puntos de ruta
  const startTracking = () => {
    if (!lastReportId) {
      setTrackError('No hay un reporte reciente para asociar la ruta.')
      return
    }

    if (!navigator.geolocation) {
      setTrackError('Tu dispositivo no soporta geolocalización.')
      return
    }

    setTrackError('')
    setTrackingActive(true)

    const id = navigator.geolocation.watchPosition(
      async (pos) => {
        try {
          await api.sendTrackPoint(lastReportId, {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          })
          setPointsSent((n) => n + 1)
        } catch (err) {
          console.error(err)
          setTrackError('Error enviando punto de ruta.')
        }
      },
      (err) => {
        console.error(err)
        setTrackError('No se pudo seguir tu ubicación. Revisá permisos del GPS.')
        setTrackingActive(false)
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    )

    setWatchId(id)
  }

  // 🆕 detener seguimiento
  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
    }
    setWatchId(null)
    setTrackingActive(false)
  }

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Tipo de incidente</span>
        <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
          {REPORT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Descripción (opcional)</span>
        <textarea
          placeholder="Ej: Moto roja, 2 personas, arma a la vista..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </label>

      <label className="field">
        <span>Patente / Placa (opcional)</span>
        <input
          type="text"
          placeholder="ABC123 o similar"
          value={plate}
          onChange={(e) => setPlate(e.target.value.toUpperCase())}
        />
      </label>

      <label className="field">
        <span>Foto de evidencia (opcional)</span>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
      </label>

      <div className="location-status">
        {coords.lat && coords.lng ? (
          <span>
            📍 Ubicación lista ({coords.lat.toFixed(4)}, {coords.lng.toFixed(4)})
          </span>
        ) : (
          <span>Obteniendo ubicación...</span>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      {/* Fallback SOLO visible en entorno de desarrollo (para pruebas locales) */}
      {allowFallback && !coords.lat && isDev && (
        <div className="fallback-location">
          <p className="muted">
            (DEV) Para pruebas desde el celular en local, podés usar una ubicación de ejemplo.
          </p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() =>
              setCoords({
                lat: -34.6037, // Buenos Aires centro (ejemplo SOLO DEV)
                lng: -58.3816,
              })
            }
          >
            Usar ubicación de ejemplo (Buenos Aires)
          </button>
        </div>
      )}

      <button className="btn-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Enviar alerta'}
      </button>

      {status === 'success' && (
        <>
          <p className="success">✅ Alerta enviada</p>

          {lastReportId && !trackingActive && (
            <div className="tracker-panel">
              <p className="muted">
                Si es seguro, podés registrar la ruta de escape (tu trayectoria o la del sospechoso a distancia).
              </p>
              <button
                type="button"
                className="btn-secondary"
                onClick={startTracking}
              >
                Comenzar seguimiento
              </button>
            </div>
          )}

          {trackingActive && (
            <div className="tracker-panel">
              <p className="muted">
                Seguimiento activo. Puntos enviados: {pointsSent}.
                Podés detenerlo cuando quieras.
              </p>
              {trackError && <p className="error">{trackError}</p>}
              <button
                type="button"
                className="btn-secondary"
                onClick={stopTracking}
              >
                Detener seguimiento
              </button>
            </div>
          )}
        </>
      )}
    </form>
  )
}
