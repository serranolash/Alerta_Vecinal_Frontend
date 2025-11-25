// src/routes/HseqReportApp.jsx
import React, { useState } from 'react'
import { api } from '../api'

const HSEQ_TYPES = [
  { value: 'accidente', label: 'Accidente' },
  { value: 'casi_accidente', label: 'Casi accidente' },
  { value: 'condicion_insegura', label: 'Condición insegura' },
  { value: 'acto_inseguro', label: 'Acto inseguro' },
  { value: 'derrame', label: 'Derrame / Fuga' },
  { value: 'otro', label: 'Otro' },
]

export function HseqReportApp() {
  const [type, setType] = useState('accidente')
  const [area, setArea] = useState('')
  const [shift, setShift] = useState('dia')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [coords, setCoords] = useState({ lat: null, lng: null })

  // Tomar ubicación si existe (igual que la app ciudadana)
  React.useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => {}
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setStatus('sending')

    try {
      const formData = new FormData()
      formData.append('type', type)
      formData.append('area', area)
      formData.append('shift', shift)
      formData.append('description', description)
      if (coords.lat && coords.lng) {
        formData.append('latitude', String(coords.lat))
        formData.append('longitude', String(coords.lng))
      }
      if (imageFile) {
        formData.append('image', imageFile)
      }

      await api.createHseqReport(formData)
      setStatus('success')
      setDescription('')
      setImageFile(null)
      setArea('')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setError(err.message || 'No se pudo enviar el reporte HSEQ.')
    }
  }

  return (
    <main className="hseq-app">
      <header className="hseq-header">
        <h1>AlertaVecinal HSEQ+</h1>
        <p className="muted">
          Reportes de seguridad y ambiente para plantas, fábricas y refinerías.
        </p>
      </header>

      <form className="hseq-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Tipo de evento</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {HSEQ_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Área / Unidad</span>
          <input
            type="text"
            placeholder="Ej: Planta 2 - Compresores"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Turno</span>
          <select value={shift} onChange={(e) => setShift(e.target.value)}>
            <option value="dia">Día</option>
            <option value="tarde">Tarde</option>
            <option value="noche">Noche</option>
          </select>
        </label>

        <label className="field">
          <span>Descripción</span>
          <textarea
            rows={3}
            placeholder="Describe qué ocurrió, quiénes estaban involucrados y qué consecuencias tuvo o pudo tener."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label className="field">
          <span>Foto (opcional)</span>
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
              📍 Ubicación registrada ({coords.lat.toFixed(4)},{' '}
              {coords.lng.toFixed(4)})
            </span>
          ) : (
            <span>Ubicación no disponible (se puede reportar igual).</span>
          )}
        </div>

        {error && <p className="error">{error}</p>}

        <button
          className="btn-primary"
          type="submit"
          disabled={status === 'sending'}
        >
          {status === 'sending'
            ? 'Enviando reporte HSEQ...'
            : 'Enviar reporte HSEQ'}
        </button>

        {status === 'success' && (
          <p className="success">✅ Reporte HSEQ enviado correctamente.</p>
        )}
      </form>
    </main>
  )
}

export default HseqReportApp
