// src/components/HeatmapPreview.jsx
import React from "react"

export function HeatmapPreview({ cells }) {
  const safeCells = Array.isArray(cells) ? cells : []

  if (safeCells.length === 0) {
    return (
      <p className="muted">
        Todavía no hay suficientes reportes para mostrar el mapa de calor.
      </p>
    )
  }

  return (
    <div className="heatmap-grid">
      {safeCells.map((cell, idx) => {
        // Aceptamos distintos nombres de propiedades
        const lat =
          typeof cell.lat === "number"
            ? cell.lat
            : typeof cell.latitude === "number"
            ? cell.latitude
            : null

        const lng =
          typeof cell.lng === "number"
            ? cell.lng
            : typeof cell.longitude === "number"
            ? cell.longitude
            : null

        const count = cell.count ?? cell.value ?? 1

        // Si por algún motivo no hay coordenadas válidas, saltamos la celda
        if (lat == null || lng == null) {
          return null
        }

        return (
          <div
            key={cell.id || `${lat}-${lng}-${idx}`}
            className="heatmap-cell"
          >
            <div className="heatmap-cell-header">
              {lat.toFixed(3)}, {lng.toFixed(3)}
            </div>
            <div className="heatmap-cell-count">Reportes: {count}</div>
          </div>
        )
      })}
    </div>
  )
}
