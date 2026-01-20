import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header({ theme, toggleTheme }) {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">Quiz Trainer MIC</span>
          </Link>
          
          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </Link>
            
            <Link to="/statistics" className={`nav-link ${isActive('/statistics')}`}>
              <span className="nav-icon">📊</span>
              <span className="nav-text">Statistiche</span>
            </Link>
            
            <Link to="/settings" className={`nav-link ${isActive('/settings')}`}>
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Impostazioni</span>
            </Link>
            
            <button 
              onClick={toggleTheme} 
              className="theme-toggle"
              aria-label={`Passa a tema ${theme === 'dark' ? 'chiaro' : 'scuro'}`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
