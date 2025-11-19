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
        setError('No se pudo obtener la ubicación automática.')
        setAllowFallback(true)
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
      await api.createReport({
        report_type: reportType,
        description,
        latitude: coords.lat,
        longitude: coords.lng,
        image: imageFile,
        plate_text: plate,
      })
      setStatus('success')
      setDescription('')
      setImageFile(null)
      setPlate('')
      if (onReportCreated) onReportCreated()
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al enviar el reporte')
      setStatus('error')
    } finally {
      setTimeout(() => setStatus('idle'), 2500)
    }
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

      {allowFallback && !coords.lat && (
        <div className="fallback-location">
          <p className="muted">
            Para pruebas desde el celular, podés usar una ubicación aproximada de ejemplo (no precisa).
          </p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() =>
              setCoords({
                lat: -34.6037, // Buenos Aires centro (ejemplo)
                lng: -58.3816,
              })
            }
          >
            Usar ubicación de ejemplo
          </button>
        </div>
      )}

      <button className="btn-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando...' : 'Enviar alerta'}
      </button>

      {status === 'success' && <p className="success">✅ Alerta enviada</p>}
    </form>
  )
}
