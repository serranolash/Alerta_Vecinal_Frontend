// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { CitizenApp } from './routes/CitizenApp'
import { AdminPanel } from './routes/AdminPanel'
import Logo from './components/Logo'
import LandingPage from './components/LandingPage'
import AdminMap from './components/AdminMap'
import NeighborhoodNews from './routes/NeighborhoodNews'
import HelpDirectory from './routes/HelpDirectory'
import { HseqReportApp } from './routes/HseqReportApp'
import HseqDashboard from './routes/HseqDashboard'
import { ContactPage } from './routes/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <div className="brand">
            <Logo />
            <div className="brand-text">
              <h1>GUARDIA AI</h1>
              <p>Plataforma inteligente de seguridad ciudadana</p>
            </div>

            <nav className="nav-links">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
              <Link to="/app" className="nav-link">
                App
              </Link>
              <Link to="/barrio" className="nav-link">
                Barrio
              </Link>
              <Link to="/directorio" className="nav-link">
                Directorio
              </Link>
              <Link to="/admin" className="nav-link">
                Autoridades
              </Link>
              {/* 🏭 Nuevo: botón directo para que empleados reporten HSEQ */}
              <Link to="/hseq" className="nav-link">
                HSEQ reportes
              </Link>
              {/* 🏭 Nuevo: dashboard ejecutivo para empresas */}
              <Link to="/hseq/dashboard" className="nav-link">
                HSEQ empresas
              </Link>
              <Link to="/contacto" className="nav-link">
                Contacto
              </Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/app" element={<CitizenApp />} />
          <Route path="/barrio" element={<NeighborhoodNews />} />
          <Route path="/directorio" element={<HelpDirectory />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/mapa" element={<AdminMap />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/hseq" element={<HseqReportApp />} />
          <Route path="/hseq/dashboard" element={<HseqDashboard />} />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>

        <footer className="app-footer">
          <small>
            GUARDIA AI v2.1 · Plataforma inteligente de seguridad ciudadana · IA + comunidad · Diseñado para pilotos reales · Desarrollado por Ing. Alex Serrano
          </small>
        </footer>
      </div>
    </BrowserRouter>
  )
}
