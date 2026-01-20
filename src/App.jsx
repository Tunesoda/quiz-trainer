import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import QuizPage from './components/QuizPage'
import Statistics from './components/Statistics'
import Settings from './components/Settings'
import { loadDomande, saveDomande, loadStats, getTheme, setTheme } from './utils/storage'
import domandeDefault from './data/domande.json'

function App() {
  const [domande, setDomande] = useState([])
  const [stats, setStats] = useState(null)
  const [theme, setThemeState] = useState('dark')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carica tema
    const savedTheme = getTheme()
    setThemeState(savedTheme)
    setTheme(savedTheme)

    // Carica dati
    const loadedDomande = loadDomande(domandeDefault.domande)
    const loadedStats = loadStats()
    
    setDomande(loadedDomande)
    setStats(loadedStats)
    setLoading(false)

    // Salva domande se non presenti in localStorage
    if (!localStorage.getItem('quiz_domande')) {
      saveDomande(domandeDefault.domande)
    }
  }, [])

  const updateDomande = (newDomande) => {
    setDomande(newDomande)
    saveDomande(newDomande)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setThemeState(newTheme)
    setTheme(newTheme)
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-secondary)' }}>Caricamento Quiz Trainer...</p>
      </div>
    )
  }

  return (
    <Router basename="/quiz-trainer">
      <div className="app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <main style={{ flex: 1, paddingBottom: '2rem' }}>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  domande={domande} 
                  stats={stats}
                />
              } 
            />
            
            <Route 
              path="/quiz/:mode" 
              element={
                <QuizPage 
                  domande={domande}
                  updateDomande={updateDomande}
                  stats={stats}
                  setStats={setStats}
                />
              } 
            />
            
            <Route 
              path="/statistics" 
              element={
                <Statistics 
                  domande={domande}
                  stats={stats}
                />
              } 
            />
            
            <Route 
              path="/settings" 
              element={
                <Settings 
                  theme={theme}
                  toggleTheme={toggleTheme}
                  domande={domande}
                  updateDomande={updateDomande}
                  stats={stats}
                  setStats={setStats}
                />
              } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
