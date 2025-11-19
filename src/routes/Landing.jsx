import React from 'react'
import { Link } from 'react-router-dom'

export function Landing() {
  return (
    <main className="landing-main app-main">
      <section className="hero card">
        <h2>AlertaVecinal: cuando pasa algo, pasa acá primero.</h2>
        <p className="muted">
          Una sola app para reportar robos, secuestros, violencia y situaciones sospechosas. En segundos,
          tu alerta llega a vecinos y autoridades.
        </p>
        <div className="hero-actions">
          <Link className="btn-primary" to="/app">
            Abrir app de emergencias
          </Link>
          <Link className="btn-secondary" to="/admin">
            Panel para autoridades
          </Link>
        </div>
        <ul className="hero-list">
          <li>📸 Foto o video como evidencia (v2 futura)</li>
          <li>📍 Ubicación automática en el mapa</li>
          <li>🧠 Análisis inteligente del riesgo (simulado en v2.0)</li>
          <li>🔥 Zonas calientes según reportes recientes</li>
        </ul>
      </section>

      <section className="card landing-grid">
        <div>
          <h3>¿Cómo funciona?</h3>
          <ol className="muted">
            <li>Abrís la PWA desde tu celular.</li>
            <li>Si ves algo grave, enviás una alerta en menos de 10 segundos.</li>
            <li>La alerta viaja con tu ubicación y evidencia.</li>
            <li>Las autoridades la ven en el panel y pueden marcarla como verificada.</li>
          </ol>
        </div>
        <div>
          <h3>Beneficios para tu ciudad</h3>
          <ul className="muted">
            <li>Mejor tiempo de respuesta ante delitos.</li>
            <li>Mapa vivo de zonas peligrosas.</li>
            <li>Historial de reportes para tomar decisiones.</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
