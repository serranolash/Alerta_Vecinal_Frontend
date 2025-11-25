// src/routes/HelpDirectory.jsx
import React, { useState, useMemo } from 'react'

const CONTACTS = [
  {
    id: 1,
    name: 'Policía / 911',
    category: 'Emergencias',
    phone: '911',
    area: 'Emergencia policial inmediata',
    type: 'emergencia',
  },
  {
    id: 2,
    name: 'Bomberos',
    category: 'Emergencias',
    phone: '100',
    area: 'Incendios, fugas de gas, rescates',
    type: 'emergencia',
  },
  {
    id: 3,
    name: 'Emergencias médicas',
    category: 'Emergencias',
    phone: '107',
    area: 'Ambulancia, urgencias médicas',
    type: 'emergencia',
  },
  {
    id: 4,
    name: 'Guardia municipal',
    category: 'Municipal',
    phone: '0800-123-000',
    area: 'Ruidos molestos, espacio público, tránsito',
    type: 'municipal',
  },
  {
    id: 5,
    name: 'Gasista matriculado',
    category: 'Servicios',
    phone: '+54 9 11 5555-1111',
    area: 'Instalaciones de gas, pérdidas, calefones',
    type: 'servicio',
  },
  {
    id: 6,
    name: 'Electricista de guardia',
    category: 'Servicios',
    phone: '+54 9 11 5555-2222',
    area: 'Cortes internos, tableros, cortocircuitos',
    type: 'servicio',
  },
  {
    id: 7,
    name: 'Técnico en refrigeración',
    category: 'Servicios',
    phone: '+54 9 11 5555-3333',
    area: 'Heladeras, freezers, aires acondicionados',
    type: 'servicio',
  },
]

export default function HelpDirectory() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return CONTACTS
    return CONTACTS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.area.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="directory-page">
      <div className="directory-inner">
        <header className="directory-header">
          <h2 style={{ margin: 0 }}>Directorio de emergencias y servicios</h2>
          <p className="muted">
            Números críticos a un toque: emergencias oficiales, contactos municipales y servicios
            de confianza del barrio (gasistas, electricistas, técnicos).
          </p>
        </header>

        <div className="directory-layout">
          <section className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Contactos del barrio</h3>
                <p className="card-subtitle">
                  Este es un ejemplo de cómo se vería el directorio. Luego se alimentará desde el
                  panel de administración.
                </p>
              </div>
            </div>

            <div className="contact-search">
              <label className="field">
                <span>Buscar contacto</span>
                <input
                  type="text"
                  placeholder="Ej: policía, gasista, bomberos, médico..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
            </div>

            <div className="contact-grid">
              {filtered.map((c) => (
                <div key={c.id} className="contact-card">
                  <div className="contact-title">{c.name}</div>
                  <div className="contact-category">{c.category}</div>
                  <div className="contact-phone">📞 {c.phone}</div>
                  <div className="contact-meta">{c.area}</div>
                  <div
                    className={
                      'contact-tag ' +
                      (c.type === 'emergencia'
                        ? 'emergencia'
                        : c.type === 'municipal'
                        ? 'municipal'
                        : 'servicio')
                    }
                  >
                    {c.type === 'emergencia'
                      ? 'Emergencia'
                      : c.type === 'municipal'
                      ? 'Municipal'
                      : 'Servicio del barrio'}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Cómo se monetiza este módulo</h3>
                <p className="card-subtitle">
                  Pensado para municipios, barrios privados y consorcios.
                </p>
              </div>
            </div>
            <ul className="muted" style={{ fontSize: '0.82rem', paddingLeft: '1.1rem' }}>
              <li>
                Panel para que la administración cargue y verifique proveedores autorizados
                (gasistas, electricistas, técnicos).
              </li>
              <li>
                Espacios destacados para comercios y servicios del barrio (modelo de suscripción /
                publicidad local).
              </li>
              <li>
                Integración con las alertas: por ejemplo, sugerir electricista cuando se reporta
                corte interno o problemas eléctricos.
              </li>
              <li>
                Exportar el directorio como PDF / cartelería para el edificio o el barrio.
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  )
}
