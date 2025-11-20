// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import 'leaflet/dist/leaflet.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// 🔥 IMPORTANTE PARA ESTABILIDAD EN CELULAR:
// Desregistrar cualquier Service Worker viejo y limpiar caches antiguas.
// Así nos aseguramos que siempre se use la versión nueva desde Vercel.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((regs) => {
      regs.forEach((reg) => reg.unregister())
    })
    .catch(() => {})

  if ('caches' in window) {
    caches
      .keys()
      .then((keys) => {
        keys.forEach((key) => {
          if (key.startsWith('alerta-cache-')) {
            caches.delete(key)
          }
        })
      })
      .catch(() => {})
  }
}
