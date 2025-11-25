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
            <h1>ALERTAVECINAL</h1>
            <h2>La seguridad del futuro, en tu bolsillo y en tu planta.</h2>
            <p>
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

            <div className="landing-hero-links">
              <Link to="/hseq" className="landing-link">
                Solución empresas HSEQ+
              </Link>
            </div>

            <p className="landing-hero-note">
              MVP v3.0 — orientado a municipios, fuerzas de seguridad, empresas, industrias y
              refinerías.
            </p>
          </div>

          {/* 📱 Mockup de celular (vuelve el diseño anterior) */}
          <div className="landing-hero-mockup">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header-row">
                  <span className="phone-app-name">ALERTA VECINAL</span>
                  <span className="phone-status-pill">LTE · 08:32</span>
                </div>

                <div className="phone-section phone-main-alert">
                  <div className="phone-section-title">Robo en proceso</div>
                  <div className="phone-chips-row">
                    <span className="phone-chip phone-chip-red">Riesgo alto</span>
                    <span className="phone-chip phone-chip-dark">Hace 2 min</span>
                  </div>
                  <p className="phone-text">
                    Moto roja, 2 personas, arma a la vista. Vecino reportando a 120 m de tu
                    ubicación.
                  </p>
                  <div className="phone-meta">
                    <span>📍 Av. Principal y Sarmiento</span>
                    <span>⏱ Zona caliente</span>
                  </div>
                </div>

                <div className="phone-section phone-map-skeleton" />

                <div className="phone-section phone-card-list">
                  <div className="phone-card-row">
                    <span className="phone-pill phone-pill-yellow">Vehículo sospechoso</span>
                    <span className="phone-tag-pill">Medio</span>
                  </div>
                  <div className="phone-card-meta">
                    <span>Patente LCG303</span>
                    <span>4 vecinos mirando</span>
                  </div>

                  <div className="phone-divider" />

                  <div className="phone-card-row">
                    <span className="phone-pill phone-pill-blue">Botón de pánico</span>
                    <span className="phone-tag-pill phone-tag-alert">Alerta</span>
                  </div>
                  <div className="phone-card-meta">
                    <span>Depto 3B · 1 min</span>
                    <span>Policía notificada</span>
                  </div>

                  <div className="phone-divider" />

                  <div className="phone-card-row">
                    <span className="phone-pill phone-pill-green">
                      Corte de luz en el barrio
                    </span>
                    <span className="phone-tag-pill">Comunidad</span>
                  </div>
                  <div className="phone-card-meta">
                    <span>Zona norte · 15 vecinos sin luz</span>
                    <span>Empresa eléctrica avisada</span>
                  </div>
                </div>

                <div className="phone-bottom-nav">
                  <button className="phone-nav-btn phone-nav-btn-primary">Reporte</button>
                  <button className="phone-nav-btn">Mapa</button>
                  <button className="phone-nav-btn">Noticias</button>
                  <button className="phone-nav-btn">Pánico</button>
                </div>
              </div>
            </div>
            <p className="landing-hero-caption">
              Mockup ilustrativo de la app móvil con IA de riesgo, mapa de incidentes y rutas de
              escape.
            </p>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="landing-section">
          <h3>¿Cómo funciona en la ciudad?</h3>
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
          <h3>¿Para quién es AlertaVecinal?</h3>
          <div className="landing-grid">
            <div className="landing-card">
              <h4>Ciudadanos y barrios</h4>
              <ul>
                <li>✅ Sentirse acompañados ante robos y emergencias.</li>
                <li>✅ Saber qué pasa en el barrio en tiempo real.</li>
                <li>✅ Alertas inteligentes según zona, horario y reincidencias.</li>
              </ul>
            </div>
            <div className="landing-card">
              <h4>Autoridades</h4>
              <ul>
                <li>✅ Mapa unificado de incidentes con IA y nivel de riesgo.</li>
                <li>✅ Priorización por riesgo, cercanía y reincidencia por patente.</li>
                <li>✅ Evidencias listas (foto, ubicación, narrativa, ruta de escape).</li>
              </ul>
            </div>
            <div className="landing-card">
              <h4>Empresas &amp; HSEQ</h4>
              <ul>
                <li>✅ Reportes de accidentes, casi accidentes y condiciones inseguras.</li>
                <li>✅ Dashboard de áreas críticas y acciones correctivas.</li>
                <li>✅ Misma tecnología aplicada a plantas, depósitos y refinerías.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* DEMO CTA */}
        <section className="landing-section landing-demo">
          <h3>Ver la app en acción</h3>
          <p>
            Probá la app desde el lado del ciudadano o explorá el panel de autoridades con mapa en
            tiempo real, IA de riesgo y rutas de escape.
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
          <p>AlertaVecinal · MVP v3.0 · IA + geolocalización · Listo para pilotos reales.</p>
        </footer>
      </div>
    </div>
  )
}
