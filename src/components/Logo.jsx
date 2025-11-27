// src/components/Logo.jsx
import React from "react"

export default function Logo({ size = 34 }) {
  return (
    <svg
      className="logo-mark-guardia"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="guardia-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      {/* Fondo circular suave */}
      <circle cx="20" cy="20" r="19" fill="#020617" />
      <circle cx="20" cy="20" r="18" fill="#020617" stroke="#1E293B" strokeWidth="1.4" />

      {/* Escudo */}
      <path
        d="M20 7.5L11 10.5v9.2c0 6.1 3.8 11.6 9 13.8c5.2-2.2 9-7.7 9-13.8v-9.2L20 7.5z"
        fill="url(#guardia-gradient)"
        stroke="#38BDF8"
        strokeWidth="1.2"
      />

      {/* Centro tipo radar / ojo */}
      <circle cx="20" cy="18.5" r="4.2" fill="#020617" stroke="#E5F2FF" strokeWidth="1" />
      <circle cx="20" cy="18.5" r="2.1" fill="#22D3EE" />

      {/* Arcos de señal / IA */}
      <path
        d="M14.5 24.8c1.6 2 3.4 3.2 5.5 3.9"
        stroke="#93C5FD"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M25.5 24.8c-1.6 2-3.4 3.2-5.5 3.9"
        stroke="#93C5FD"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
    </svg>
  )
}
