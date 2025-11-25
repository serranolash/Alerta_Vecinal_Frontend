// src/components/LandingPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import PhoneMock from './PhoneMock'

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-shell">
        {/* HERO */}
        <section className="landing-hero">
          <div className="landing-hero-grid">
            {/* Texto principal */}
            <div className="landing-hero-text">
              <h1>ALERTAVECINAL</h1>
              <h2>La seguridad del futuro, en tu bolsillo y en tu planta.</h2>
              <p className="landing-hero-lead">
                Reportes en segundos, IA que detecta riesgo, mapa vivo de incidentes y un
                módulo HSEQ para empresas y plantas industriales.
              </p>

              <div className="landing-hero-actions">
                <Link to="/app" className="btn btn-primary">
                  Probar demo ciudadana
                </Link>
                <Link to="/admin" className="btn btn-outline">
                  Ver panel de autoridades
                </Link>
              </div>

              <Link to="/hseq" className="landing-hero-link">
                Solución empresas HSEQ+
              </Link>

              <p className="landing-hero-note">
                MVP v3.0 — orientado a municipios, fuerzas de seguridad, empresas, industrias y
                refinerías.
              </p>
            </div>

            {/* Mockup del celular (el que se veía bien antes) */}
            <div className="landing-hero-mockup">
              <PhoneMock />
              <p className="landing-hero-caption">
                Mockup ilustrativo de la app móvil con IA de riesgo, mapa de incidentes y rutas de
                escape.
              </p>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA – versión explícita que te gustaba */}
        <section className="landing-section">
          <h2 className="landing-subtitle">¿Cómo funciona en la ciudad?</h2>
          <ol className="landing-howto">
            <li>
              <strong>El ciudadano reporta en 3 segundos.</strong> Toma una foto, la app captura
              ubicación automática y escribe una descripción corta.
            </li>
            <li>
              <strong>La IA analiza y clasifica el riesgo.</strong> Detecta palabras clave de robo,
              arma, violencia, secuestro y vehículo para marcar el incidente como alto, medio o bajo.
            </li>
            <li>
              <strong>El mapa se actualiza en tiempo real.</strong> Los reportes aparecen con pines
              de colores, zonas calientes y rutas de escape registradas.
            </li>
            <li>
              <strong>Las autoridades priorizan y actúan.</strong> Ven riesgo, distancia, foto de
              evidencia, lectura de patente y link directo a Google Maps.
            </li>
          </ol>
        </section>

        {/* PARA QUIÉN ES */}
        <section className="landing-section">
          <h2 className="landing-subtitle">¿Para quién es AlertaVecinal?</h2>
          <div className="landing-grid">
            <div className="landing-card">
              <h3>Ciudadanos y barrios</h3>
              <ul>
                <li>✅ Sentirse acompañados ante robos y emergencias.</li>
                <li>✅ Saber qué pasa en el barrio en tiempo real.</li>
                <li>✅ Alertas inteligentes según zona, horario y reincidencias.</li>
              </ul>
            </div>
            <div className="landing-card">
              <h3>Autoridades</h3>
              <ul>
                <li>✅ Mapa unificado de incidentes con IA y nivel de riesgo.</li>
                <li>✅ Priorización por riesgo, cercanía y reincidencia por patente.</li>
                <li>✅ Evidencias listas (foto, ubicación, narrativa, ruta de escape).</li>
              </ul>
            </div>
            <div className="landing-card">
              <h3>Empresas & HSEQ</h3>
              <ul>
                <li>✅ Reportes de accidentes, casi accidentes y condiciones inseguras.</li>
                <li>✅ Tablero HSEQ+ con KPIs, áreas críticas y acciones correctivas.</li>
                <li>✅ Mismo ADN de la app vecinal, adaptado a plantas y refinerías.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="landing-section landing-demo">
          <h3>Ver la app en acción</h3>
          <p>
            Probá la app desde el lado del ciudadano, explorá el panel de autoridades o mirá el
            módulo HSEQ+ para empresas y plantas industriales.
          </p>
          <div className="landing-hero-actions">
            <Link to="/app" className="btn btn-primary">
              Abrir app ciudadana
            </Link>
            <Link to="/admin/mapa" className="btn btn-outline">
              Ver mapa de incidentes
            </Link>
            <Link to="/hseq" className="btn btn-outline">
              Ver módulo HSEQ+
            </Link>
          </div>
        </section>

        <footer className="landing-footer">
          <p>AlertaVecinal · MVP v3.0 · IA + geolocalización · Listo para pilotos reales.</p>
        </footer>
      </div>
    </div>
  )
}
