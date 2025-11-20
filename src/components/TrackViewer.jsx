// src/components/TrackViewer.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import { api } from "../api";

export function TrackViewer({ report, onClose }) {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!report?.id) return;
    let cancelled = false;

    const loadTrack = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await api.getTrack(report.id);
        const items = data.items || data.data || data.points || [];
        if (!cancelled) {
          setPoints(items);
        }
      } catch (err) {
        console.error("[TrackViewer] Error cargando ruta:", err);
        if (!cancelled) {
          setError("No se pudo cargar la ruta de escape.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadTrack();
    return () => {
      cancelled = true;
    };
  }, [report?.id]);

  if (!report) return null;

  const center =
    points.length > 0
      ? [points[0].latitude, points[0].longitude]
      : [report.latitude, report.longitude];

  const polylinePositions =
    points.length > 0
      ? points.map((p) => [p.latitude, p.longitude])
      : [];

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
  };

  const cardStyle = {
    background: "#020617",
    borderRadius: "16px",
    border: "1px solid rgba(148,163,184,0.4)",
    width: "100%",
    maxWidth: "960px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    padding: "1.25rem",
    color: "#e5e7eb",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  };

  const mapStyle = {
    marginTop: "0.75rem",
    height: "60vh",
    width: "100%",
    borderRadius: "12px",
    overflow: "hidden",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
  };

  const closeBtnStyle = {
    border: "none",
    borderRadius: "999px",
    padding: "0.4rem 0.9rem",
    background:
      "linear-gradient(135deg, rgba(248,113,113,0.9), rgba(220,38,38,0.95))",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: 600,
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={cardStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <div>
            <h2 style={{ margin: 0 }}>
              Ruta de escape · Reporte #{report.id}
            </h2>
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.9rem", opacity: 0.8 }}>
              Tipo: {report.report_type} · Riesgo: {report.risk_level || "bajo"}
            </p>
          </div>
          <button type="button" style={closeBtnStyle} onClick={onClose}>
            Cerrar
          </button>
        </div>

        {loading && <p style={{ marginTop: "0.75rem" }}>Cargando ruta...</p>}
        {error && <p className="error" style={{ marginTop: "0.75rem" }}>{error}</p>}

        {!loading && !error && (
          <div style={mapStyle}>
            <MapContainer center={center} zoom={15} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> colaboradores'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Punto inicial */}
              {polylinePositions.length > 0 && (
                <>
                  <Marker position={polylinePositions[0]}>
                    <Popup>Inicio de la ruta</Popup>
                  </Marker>
                  <Marker position={polylinePositions[polylinePositions.length - 1]}>
                    <Popup>Último punto registrado</Popup>
                  </Marker>
                  <Polyline positions={polylinePositions} />
                </>
              )}

              {/* Si no hay puntos de track, al menos mostramos la ubicación del reporte */}
              {polylinePositions.length === 0 && (
                <Marker position={center}>
                  <Popup>Ubicación del reporte</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
}
