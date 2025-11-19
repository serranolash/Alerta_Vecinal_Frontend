// src/components/LandingPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-shell">
        {/* HERO */}
        <section className="landing-hero">
          <div className="landing-hero-text">
            <h1>Alerta Vecinal</h1>
            <h2>La seguridad del futuro, en tu bolsillo.</h2>
            <p>
              Reportes en 3 segundos. IA que detecta riesgo. Un mapa vivo de lo que pasa en tu
              barrio, en tiempo real.
            </p>
            <div className="landing-hero-actions">
              <Link to="/app" className="btn btn-primary">
                Probar demo ciudadana
              </Link>
              <Link to="/admin" className="btn btn-outline">
                Ver panel de autoridades
              </Link>
            </div>
            <p className="landing-hero-note">
              Versión MVP v3.0 — ideal para demo a municipios, policías y seguridad privada.
            </p>
          </div>

          <div className="landing-hero-mockup">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header">Reporte de emergencia</div>
                <div className="phone-body">
                  <div className="phone-map-skeleton" />
                  <div className="phone-card">
                    <div className="phone-chip phone-chip-red">Riesgo alto</div>
                    <p>Dos hombres en moto con arma, robo de celular.</p>
                    <div className="phone-meta">
                      <span>⚠ Zona caliente</span>
                      <span>⏱ Hace 2 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="landing-hero-caption">
              Mockup ilustrativo de la app móvil con IA de riesgo y geolocalización.
            </p>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="landing-section">
          <h3>¿Cómo funciona?</h3>
          <ol className="landing-howto">
            <li>
              <strong>El ciudadano reporta en 3 segundos.</strong> Toma una foto, la app captura
              ubicación automática y escribe una descripción corta.
            </li>
            <li>
              <strong>La IA analiza y clasifica el riesgo.</strong> Detecta palabras clave de robo,
              arma, violencia, secuestro y vehículo para marcar el incidente como alto, medio o
              bajo.
            </li>
            <li>
              <strong>El mapa se actualiza en tiempo real.</strong> Los reportes aparecen con pines
              de colores y zonas calientes donde se concentra el riesgo.
            </li>
            <li>
              <strong>Las autoridades priorizan y actúan.</strong> Ven riesgo, distancia, foto de
              evidencia y link directo a Google Maps para llegar al lugar.
            </li>
          </ol>
        </section>

        {/* PARA QUIÉN ES */}
        <section className="landing-section">
          <div className="landing-grid">
            <div className="landing-card">
              <h3>Para ciudadanos</h3>
              <ul>
                <li>✅ Sentirse acompañados ante robos y emergencias.</li>
                <li>✅ Saber qué pasa en el barrio en tiempo real.</li>
                <li>✅ Alertas inteligentes según zona y horario.</li>
              </ul>
            </div>
            <div className="landing-card">
              <h3>Para autoridades</h3>
              <ul>
                <li>✅ Mapa unificado de incidentes con IA.</li>
                <li>✅ Priorización de casos por riesgo y ubicación.</li>
                <li>✅ Evidencias listas para actuar (foto + ubicación + narrativa).</li>
              </ul>
            </div>
            <div className="landing-card">
              <h3>Para inversores</h3>
              <ul>
                <li>✅ MVP funcionando con PWA, IA y mapa.</li>
                <li>✅ Roadmap claro a video, IA de visión y expansión nacional.</li>
                <li>✅ Modelo B2G + B2B: municipios y seguridad privada.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* DEMO CTA */}
        <section className="landing-section landing-demo">
          <h3>Ver la app en acción</h3>
          <p>
            Probá la app desde el lado del ciudadano o explorá el panel de autoridades con mapa en
            tiempo real y clasificación automática de riesgo.
          </p>
          <div className="landing-hero-actions">
            <Link to="/app" className="btn btn-primary">
              Abrir app ciudadana
            </Link>
            <Link to="/admin/mapa" className="btn btn-outline">
              Ver mapa de incidentes
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="landing-footer">
          <p>Alerta Vecinal · MVP v3.0 · IA + geolocalización · Listo para pilotos reales.</p>
        </footer>
      </div>
    </div>
  )
}
