// src/components/PanicButton.jsx
import { useState } from 'react'
import { api } from '../api'

export function PanicButton({ coords, userId }) {
  const [pressing, setPressing] = useState(false)
  const [timerId, setTimerId] = useState(null)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  const startPress = () => {
    setError(null)
    setSent(false)
    setPressing(true)
    const id = setTimeout(() => {
      sendPanic({ underDuress: false })
    }, 3000)
    setTimerId(id)
    if (navigator.vibrate) navigator.vibrate([100, 100, 100])
  }

  const cancelPress = () => {
    setPressing(false)
    if (timerId) clearTimeout(timerId)
    setTimerId(null)
  }

  const sendPanic = async ({ underDuress }) => {
    try {
      if (!coords?.lat || !coords?.lng) {
        throw new Error('Sin ubicación. Activa el GPS.')
      }

      await api.panic({
        latitude: coords.lat,
        longitude: coords.lng,
        underDuress,
        mode: 'normal',
        userId: userId || null,
      })

      setSent(true)
      setPressing(false)
      if (timerId) clearTimeout(timerId)
      setTimerId(null)
    } catch (err) {
      console.error('[panic] error', err)
      setError(err.message || 'Error al enviar pánico')
      setPressing(false)
      if (timerId) clearTimeout(timerId)
      setTimerId(null)
    }
  }

  return (
    <div className="panic-container">
      {error && <p className="panic-error">{error}</p>}
      {sent && <p className="panic-ok">Alerta de pánico enviada.</p>}
      <button
        className={`panic-button ${pressing ? 'panic-button-hold' : ''}`}
        onMouseDown={startPress}
        onMouseUp={cancelPress}
        onMouseLeave={cancelPress}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
      >
        MANTENÉ 3s PARA ENVIAR PÁNICO
      </button>
    </div>
  )
}
