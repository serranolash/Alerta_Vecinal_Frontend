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
            <h1>AlertaVecinal</h1>
            <h2>La seguridad del futuro, en tu bolsillo y en tu planta.</h2>
            <p>
              Reportes en segundos, IA que detecta riesgo, mapa vivo de incidentes y un módulo HSEQ
              para empresas y plantas industriales.
            </p>
            <div className="landing-hero-actions">
              <Link to="/app" className="btn btn-primary">
                Probar demo ciudadana
              </Link>
              <Link to="/admin" className="btn btn-outline">
                Ver panel de autoridades
              </Link>
              <Link to="/hseq/dashboard" className="btn btn-ghost">
                Solución empresas HSEQ+
              </Link>
            </div>
            <p className="landing-hero-note">
              MVP v3.0 — orientado a municipios, fuerzas de seguridad, empresas, industrias y
              refinerías.
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
              Mockup ilustrativo de la app móvil con IA de riesgo, ruta de escape y geolocalización.
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
                <li>✅ Asignación de responsables y seguimiento de acciones correctivas.</li>
                <li>✅ Tablero HSEQ con áreas críticas y cumplimiento por planta.</li>
              </ul>
            </div>
            <div className="landing-card">
              <h3>Inversores</h3>
              <ul>
                <li>✅ MVP funcionando con PWA, IA, mapa y módulo HSEQ.</li>
                <li>✅ Modelo B2G + B2B: municipios, empresas, industrias, petroleras.</li>
                <li>✅ Roadmap claro a visión por computadora e integración con cámaras.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* MÓDULO EMPRESAS / HSEQ */}
        <section className="landing-section landing-section-alt">
          <h3>Módulo HSEQ+ para empresas, plantas y minería</h3>
          <p className="landing-intro">
            AlertaVecinal HSEQ+ transforma los hallazgos de seguridad en acciones concretas. Empleados
            y contratistas reportan desde el celular; la plataforma asigna responsables, fija fechas
            límite y ofrece una vista ejecutiva del riesgo en toda la operación.
          </p>

          <div className="landing-grid">
            <div className="landing-card">
              <h4>Hallazgos e incidentes</h4>
              <ul>
                <li>
                  Reporte de accidentes, casi accidentes, actos y condiciones inseguras, acoso,
                  derrames y más.
                </li>
                <li>
                  Evidencia completa: fotos, ubicación, descripción y clasificación de riesgo por
                  tipo de evento.
                </li>
                <li>
                  Notificación inmediata a supervisores y responsables definidos por área o turno.
                </li>
              </ul>
            </div>

            <div className="landing-card">
              <h4>Inspecciones y auditorías</h4>
              <ul>
                <li>Checklists dinámicos para rutina diaria, permisos de trabajo y auditorías.</li>
                <li>Asignación de tareas correctivas a equipos o personas específicas.</li>
                <li>Soporte para trabajo en campo, incluso en zonas con conectividad limitada.</li>
              </ul>
            </div>

            <div className="landing-card">
              <h4>Tablero y analítica HSEQ</h4>
              <ul>
                <li>Panel ejecutivo con eventos por área, turno, tipo y criticidad.</li>
                <li>
                  Identificación de áreas críticas y brechas abiertas para enfocar recursos donde
                  más duele.
                </li>
                <li>
                  Base lista para conectarse con BI (Power BI, etc.) y sistemas corporativos
                  existentes.
                </li>
              </ul>
            </div>
          </div>

          <div className="landing-hero-actions" style={{ marginTop: '1.5rem' }}>
            <Link to="/hseq" className="btn btn-primary">
              Abrir app HSEQ para empleados
            </Link>
            <Link to="/hseq/dashboard" className="btn btn-outline">
              Ver dashboard HSEQ ejecutivo
            </Link>
          </div>
        </section>

        {/* CASOS DE USO / ROADMAP */}
        <section className="landing-section">
          <h3>Casos de uso y roadmap</h3>
          <div className="landing-grid">
            <div className="landing-card">
              <h4>Casos de uso</h4>
              <ul>
                <li>🏙 Municipios y barrios que quieren mapas de delito en tiempo real.</li>
                <li>🚔 Fuerzas de seguridad y empresas de vigilancia privada.</li>
                <li>🏭 Plantas industriales, depósitos y logística.</li>
                <li>⛽ Refinerías, petróleo & gas con foco en prevención de pérdidas.</li>
              </ul>
            </div>
            <div className="landing-card">
              <h4>Roadmap AlertaVecinal 5.0</h4>
              <ul>
                <li>🔍 Visión por computadora integrada a cámaras (armas, patentes, rostros).</li>
                <li>🎥 Monitoreo de video en tiempo real con alertas automáticas.</li>
                <li>📡 Integración con hardware: cámaras, botones físicos de pánico, sensores.</li>
                <li>📊 Módulos avanzados de analítica de delito y riesgo HSEQ.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* DEMO CTA */}
        <section className="landing-section landing-demo">
          <h3>Ver la plataforma en acción</h3>
          <p>
            Probá la app desde el lado del ciudadano, explorá el panel de autoridades con mapa en
            tiempo real y conocé el módulo HSEQ+ para empresas e industria.
          </p>
          <div className="landing-hero-actions">
            <Link to="/app" className="btn btn-primary">
              Abrir app ciudadana
            </Link>
            <Link to="/admin/mapa" className="btn btn-outline">
              Ver mapa de incidentes
            </Link>
            <Link to="/hseq/dashboard" className="btn btn-ghost">
              Explorar módulo HSEQ+
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="landing-footer">
          <p>
            AlertaVecinal · MVP v3.0 · IA + geolocalización + HSEQ · Listo para pilotos con
            municipios, empresas e industria pesada.
          </p>
        </footer>
      </div>
    </div>
  )
}
