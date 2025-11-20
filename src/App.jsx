import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { CitizenApp } from './routes/CitizenApp'
import { Logo } from './components/Logo'
import LandingPage from './components/LandingPage'
import AdminMap from './components/AdminMap'
import AdminArea from './pages/AdminArea' // 🆕 nuevo import

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <div className="brand">
            <Logo />
            <div className="brand-text">
              <h1>AlertaVecinal</h1>
              <p>Red comunitaria de emergencias en tiempo real</p>
            </div>
            <nav className="nav-links">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
              <Link to="/app" className="nav-link">
                App
              </Link>
              <Link to="/admin" className="nav-link">
                Autoridades
              </Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/app" element={<CitizenApp />} />
          {/* 🆕 ahora /admin usa AdminArea */}
          <Route path="/admin" element={<AdminArea />} />
          <Route path="/admin/mapa" element={<AdminMap />} />
          <Route path="/" element={<LandingPage />} />
        </Routes>

        <footer className="app-footer">
          <small>AlertaVecinal v2.0 · MVP PWA · Diseñado por Alex & ChatGPT</small>
        </footer>
      </div>
    </BrowserRouter>
  )
}
