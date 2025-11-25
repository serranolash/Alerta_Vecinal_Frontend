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
            <h2>Seguridad vecinal + comunidad inteligente.</h2>
            <p>
              Reportes en 3 segundos, IA que detecta riesgo, mapa de incidentes y muro vecinal
              para saber qué pasa en tu barrio, en tiempo real.
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
              MVP listo para pilotos reales · PWA + IA de visión · Rutas de escape · Mapa de
              calor de incidentes.
            </p>
          </div>

          <div className="landing-hero-mockup">
            <div className="phone-frame">
              <div className="phone-notch" />
              <div className="phone-screen">
                <div className="phone-status-bar">
                  <span>08:32</span>
                  <span>LTE ● ● ●</span>
                </div>
                <div className="phone-pill">
                  <span>ALERTA VECINAL</span>
                </div>
                <div className="phone-alert-header">
                  <div className="phone-alert-header-title">Robo en proceso</div>
                  <div className="phone-alert-header-badge">Riesgo alto</div>
                </div>
                <div className="phone-alert-body">
                  Moto roja, 2 personas, arma a la vista. Vecino reportando a 120 m de tu
                  ubicación.
                </div>
                <div className="phone-map-preview" />
              </div>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="landing-section">
          <div className="landing-section-header">
            <h3>Cómo funciona</h3>
            <p>
              Ciudadanos reportan. IA analiza. Autoridades y vecinos ven todo en un único mapa,
              con contexto y prioridad.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <h5>1. Reporte ciudadano</h5>
              <h4>Alertas en 3 segundos</h4>
              <p>
                El vecino saca una foto, escribe dos líneas y envía. La app toma ubicación,
                fecha y hora automáticamente.
              </p>
            </div>
            <div className="feature-card">
              <h5>2. IA + mapa</h5>
              <h4>Análisis y mapa de incidentes</h4>
              <p>
                IA evalúa riesgo, detecta armas y lee patentes. Todo se vuelca en un mapa vivo
                con zonas calientes, tipo SoSafe.
              </p>
            </div>
            <div className="feature-card">
              <h5>3. Acción coordinada</h5>
              <h4>Autoridades y vecinos sincronizados</h4>
              <p>
                Policía, municipio y comunidad comparten la misma información: incidentes,
                reincidencias por patente y rutas de escape.
              </p>
            </div>
          </div>
        </section>

        {/* PARA QUIÉN ES */}
        <section className="landing-section">
          <div className="landing-section-header">
            <h3>Para quién es</h3>
            <p>
              AlertaVecinal está pensada para vecinos, municipios, fuerzas de seguridad e
              inversores que buscan una solución escalable.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <h5>Para vecinos</h5>
              <h4>Seguridad y comunidad</h4>
              <ul>
                <li>✅ Sentirse acompañados ante robos, ruidos extraños y emergencias.</li>
                <li>
                  ✅ Ver qué pasa en tu barrio en tiempo real (mapa de incidentes y zonas
                  calientes).
                </li>
                <li>
                  ✅ Nuevo: muro vecinal y directorio de ayuda con teléfonos de emergencia y
                  servicios de confianza (gasistas, electricistas, técnicos, etc.).
                </li>
              </ul>
            </div>

            <div className="feature-card">
              <h5>Para municipios y fuerzas de seguridad</h5>
              <h4>Visión centralizada del territorio</h4>
              <ul>
                <li>
                  ✅ Mapa unificado de incidentes con IA + mapa de calor estilo SoSafe para
                  detectar puntos rojos.
                </li>
                <li>
                  ✅ Priorización de casos por riesgo, ubicación, patentes reincidentes y rutas
                  de escape.
                </li>
                <li>
                  ✅ Evidencias listas para actuar (foto + ubicación + narrativa) y panel para
                  coordinar recursos.
                </li>
              </ul>
            </div>

            <div className="feature-card">
              <h5>Para inversores</h5>
              <h4>Producto con camino a SaaS + hardware</h4>
              <ul>
                <li>
                  ✅ MVP funcionando con PWA, IA, mapa y ruta de escape en tiempo real.
                </li>
                <li>
                  ✅ Roadmap claro a cámaras conectadas, IA de visión propia y expansión
                  regional.
                </li>
                <li>
                  ✅ Módulos monetizables: licencias para municipios, barrios privados,
                  consorcios y venta de kits de cámaras integradas.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* DEMO / LLAMADO A ACCIÓN */}
        <section className="landing-section">
          <div className="landing-section-header">
            <h3>Listo para un piloto real</h3>
            <p>
              Podemos arrancar con un barrio, un municipio o un consorcio y medir impacto en
              menos de 30 días.
            </p>
          </div>

          <div className="demo-cta">
            <div className="demo-info">
              <p>
                • Reportes ciudadanos con foto + ubicación + IA de riesgo.<br />
                • Mapa de incidentes, zonas calientes y rutas de escape.<br />
                • Panel de autoridades con filtro por patentes y reincidencias.
              </p>
              <p>
                Próximos módulos: muro vecinal, directorio de servicios del barrio, cámaras IP
                integradas y tablero analítico de delitos.
              </p>
              <div className="demo-metrics">
                <div className="demo-metric">PWA lista para usar</div>
                <div className="demo-metric">Backend Flask + PostgreSQL</div>
                <div className="demo-metric">IA de visión conectada</div>
              </div>
            </div>

            <div>
              <p className="muted" style={{ marginBottom: '0.4rem' }}>
                ¿Querés ver el producto en acción?
              </p>
              <div className="landing-hero-actions">
                <Link to="/app" className="btn btn-primary">
                  Abrir demo ciudadana
                </Link>
                <Link to="/admin" className="btn btn-outline">
                  Abrir panel de autoridades
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
