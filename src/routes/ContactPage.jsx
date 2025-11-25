// src/routes/ContactPage.jsx
import React, { useState } from 'react'

export function ContactPage() {
  const [type, setType] = useState('comunidad')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Más adelante acá podemos integrar backend / email / CRM
    setSent(true)
  }

  return (
    <main className="contact-page">
      <div className="contact-inner">
        <div className="contact-shell">
          <section className="contact-grid">
            {/* Lado izquierdo: texto + tipos */}
            <div className="contact-intro">
              <div className="contact-badge">Contáctanos 👋</div>
              <h1 className="contact-title">Hablemos de seguridad inteligente</h1>
              <p className="contact-lead">
                Seas una comunidad 🏡, una empresa 🏭 o un municipio 🏛️, diseñamos pilotos y
                soluciones a medida con AlertaVecinal, IA de riesgo, módulo HSEQ y mapa de
                incidentes en tiempo real.
              </p>

              <div className="contact-type-row">
                <button
                  type="button"
                  className={
                    'contact-type-pill' + (type === 'comunidad' ? ' contact-type-pill-active' : '')
                  }
                  onClick={() => setType('comunidad')}
                >
                  🏡 Comunidad / edificio
                </button>
                <button
                  type="button"
                  className={
                    'contact-type-pill' + (type === 'empresa' ? ' contact-type-pill-active' : '')
                  }
                  onClick={() => setType('empresa')}
                >
                  🏢 Empresa / industria
                </button>
                <button
                  type="button"
                  className={
                    'contact-type-pill' + (type === 'municipio' ? ' contact-type-pill-active' : '')
                  }
                  onClick={() => setType('municipio')}
                >
                  🏛️ Municipio / gobierno
                </button>
              </div>

              <ul className="contact-benefits">
                <li>⚡ Pilotos rápidos con app vecinal + panel autoridades.</li>
                <li>🧠 IA para riesgo, patentes reincidentes y HSEQ en plantas.</li>
                <li>🎯 Roadmap a integración con cámaras y visión computarizada.</li>
              </ul>
            </div>

            {/* Lado derecho: formulario */}
            <div className="contact-form-wrapper">
              <form className="card contact-form" onSubmit={handleSubmit}>
                <h2 className="contact-form-title">Cuéntanos qué necesitas</h2>
                <p className="contact-form-subtitle">
                  Completa el formulario y te contactaremos para armar un piloto o demo personalizada.
                </p>

                <div className="field">
                  <span>Nombre y apellido</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ej: María Pérez"
                    required
                  />
                </div>

                <div className="field">
                  <span>Correo electrónico</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="nombre@organizacion.com"
                    required
                  />
                </div>

                <div className="field">
                  <span>Teléfono / WhatsApp</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+54 9 11 ..."
                  />
                </div>

                <div className="field">
                  <span>Tipo de organización</span>
                  <select
                    name="org_type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="comunidad">Comunidad / consorcio / edificio</option>
                    <option value="empresa">Empresa / planta / industria</option>
                    <option value="municipio">Municipio / policía / gobierno</option>
                  </select>
                </div>

                <div className="field">
                  <span>Nombre de la comunidad / empresa / municipio</span>
                  <input
                    type="text"
                    name="org_name"
                    placeholder="Ej: Consorcio San Martín 123, Refinería XYZ..."
                  />
                </div>

                <div className="field">
                  <span>País y ciudad</span>
                  <input
                    type="text"
                    name="location"
                    placeholder="Ej: Rosario, Argentina / Anzoátegui, Venezuela"
                  />
                </div>

                <div className="field">
                  <span>¿Qué te interesa?</span>
                  <div className="contact-checkbox-group">
                    <label>
                      <input type="checkbox" name="interest_vecinal" />
                      <span>App vecinal + mapa de incidentes</span>
                    </label>
                    <label>
                      <input type="checkbox" name="interest_hseq" />
                      <span>Módulo HSEQ para empresas</span>
                    </label>
                    <label>
                      <input type="checkbox" name="interest_camaras" />
                      <span>Integración con cámaras e IA de visión</span>
                    </label>
                    <label>
                      <input type="checkbox" name="interest_piloto" />
                      <span>Piloto en mi barrio / planta / ciudad</span>
                    </label>
                  </div>
                </div>

                <div className="field">
                  <span>Mensaje</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Cuéntanos el contexto, cantidad de vecinos/empleados, principales problemas de seguridad..."
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Enviar consulta
                </button>

                {sent && (
                  <p className="success" style={{ marginTop: '0.5rem' }}>
                    ✅ Gracias por tu interés. Registramos tu consulta y nos pondremos en contacto.
                  </p>
                )}
              </form>

              <p className="contact-legal">
                🔒 Usamos estos datos sólo para contactarte respecto a AlertaVecinal. No compartimos
                tu información con terceros.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default ContactPage
