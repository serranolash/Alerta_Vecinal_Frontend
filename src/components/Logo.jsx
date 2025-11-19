import React from 'react'

// Logo simple: escudo con punto rojo, estilo alerta
export function Logo() {
  return (
    <div className="logo-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <path
          d="M32 4L10 12v18c0 15 9.3 23.4 22 30 12.7-6.6 22-15 22-30V12L32 4z"
          className="logo-shield"
        />
        <circle cx="32" cy="28" r="10" className="logo-dot" />
      </svg>
    </div>
  )
}
