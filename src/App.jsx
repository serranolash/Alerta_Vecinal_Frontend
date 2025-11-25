// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { CitizenApp } from './routes/CitizenApp'
import { AdminPanel } from './routes/AdminPanel'
import { Logo } from './components/Logo'
import LandingPage from './components/LandingPage'
import AdminMap from './components/AdminMap'
import NeighborhoodNews from './routes/NeighborhoodNews'
import HelpDirectory from './routes/HelpDirectory'
import { HseqReportApp } from './routes/HseqReportApp'
import HseqDashboard from './routes/HseqDashboard'


export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <div className="brand">
            <Logo />
            <div className="brand-text">
              <h1>ALERTAVECINAL</h1>
              <p>Red comunitaria de emergencias en tiempo real</p>
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
               {/* 🏭 Nuevo: acceso directo a módulo empresas */}
              <Link to="/hseq/dashboard" className="nav-link">
                HSEQ empresas
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
        </Routes>

        <footer className="app-footer">
          <small>AlertaVecinal v2.1 · MVP PWA · IA + comunidad · Diseñado para pilotos reales Desarrollado Por Ing Alex Serrano</small>
        </footer>
      </div>
    </BrowserRouter>
  )
}
