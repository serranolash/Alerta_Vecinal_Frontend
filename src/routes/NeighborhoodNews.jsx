// src/routes/NeighborhoodNews.jsx
import React from 'react'

const MOCK_POSTS = [
  {
    id: 1,
    title: 'Reunión vecinal este sábado a las 18:00',
    tag: 'comunidad',
    author: 'Consorcio Torre A',
    time: 'Hace 2 horas',
    body: 'Nos juntamos en el SUM para coordinar medidas de seguridad, cámaras y mejoras en la iluminación de la cuadra.',
  },
  {
    id: 2,
    title: 'Patrullero fijo en la esquina de Belgrano y San Martín',
    tag: 'seguridad',
    author: 'Comisaría 12',
    time: 'Hoy 08:15',
    body: 'Durante las próximas semanas habrá presencia fija en el corredor donde se detectaron más incidentes nocturnos.',
  },
  {
    id: 3,
    title: 'Corte programado de luz mañana de 9 a 11',
    tag: 'servicio',
    author: 'Cooperativa eléctrica',
    time: 'Ayer',
    body: 'Se harán tareas de mantenimiento preventivo en el transformador del barrio. Se recomienda desenchufar equipos sensibles.',
  },
]

export default function NeighborhoodNews() {
  return (
    <div className="barrio-page">
      <div className="barrio-inner">
        <header className="barrio-header">
          <h2 style={{ margin: 0 }}>Noticias del barrio</h2>
          <p className="muted">
            Un muro vecinal para enterarte de cortes de luz, alertas de seguridad,
            reuniones y novedades de tu comunidad.
          </p>
        </header>

        <div className="barrio-layout">
          <section className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Últimas novedades</h3>
                <p className="card-subtitle">
                  Información relevante publicada por vecinos, administración y autoridades.
                </p>
              </div>
            </div>

            <div className="feed-list">
              {MOCK_POSTS.map((post) => (
                <article key={post.id} className="feed-item">
                  <div className="feed-meta">
                    {post.tag === 'seguridad' && (
                      <span className="feed-tag seguridad">Seguridad</span>
                    )}
                    {post.tag === 'servicio' && (
                      <span className="feed-tag servicio">Servicios</span>
                    )}
                    {post.tag === 'comunidad' && (
                      <span className="feed-tag comunidad">Comunidad</span>
                    )}
                    <span>
                      {post.author} · {post.time}
                    </span>
                  </div>
                  <div className="feed-title">{post.title}</div>
                  <div className="feed-body">{post.body}</div>
                </article>
              ))}
            </div>
          </section>

          <aside className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Próximos pasos del módulo vecinal</h3>
                <p className="card-subtitle">
                  Este muro es un MVP. El plan para la versión 5.0 incluye:
                </p>
              </div>
            </div>
            <ul className="muted" style={{ fontSize: '0.82rem', paddingLeft: '1.1rem' }}>
              <li>Publicaciones desde la app ciudadana con moderación por administradores.</li>
              <li>Segmentación por barrio, edificio o consorcio.</li>
              <li>
                Integración con notificaciones push para avisar de eventos relevantes (robos,
                cortes de servicios, asambleas).
              </li>
              <li>
                Enlazar noticia con incidentes reales del mapa (por ejemplo, serie de robos en una
                zona específica).
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  )
}
