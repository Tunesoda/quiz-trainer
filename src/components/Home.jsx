import { Link } from 'react-router-dom'
import { calculateDomandeStats } from '../utils/storage'
import './Home.css'

function Home({ domande, stats }) {
  const domandeStats = calculateDomandeStats(domande)
  
  const quizModes = [
    {
      id: 'completo',
      title: 'Quiz Completo',
      icon: '📝',
      description: 'Tutte le domande del database',
      count: domandeStats.totale,
      color: 'primary',
      path: '/quiz/completo'
    },
    {
      id: 'categoria',
      title: 'Per Categoria',
      icon: '📂',
      description: 'Focus su un\'area specifica',
      count: Object.keys(domandeStats.perCategoria).length + ' categorie',
      color: 'info',
      path: '/quiz/categoria'
    },
    {
      id: 'errori',
      title: 'Solo Errori',
      icon: '❌',
      description: 'Ripassa le domande sbagliate',
      count: domandeStats.errate,
      color: 'danger',
      path: '/quiz/errori',
      priority: true
    },
    {
      id: 'omesse',
      title: 'Solo Omesse',
      icon: '⏭️',
      description: 'Recupera le domande saltate',
      count: domandeStats.omesse,
      color: 'warning',
      path: '/quiz/omesse'
    },
    {
      id: 'random',
      title: 'Quiz Random',
      icon: '🎲',
      description: 'Allenamento con 10 domande casuali',
      count: '10 domande',
      color: 'secondary',
      path: '/quiz/random'
    },
    {
      id: 'normativa',
      title: 'Cerca Normativa',
      icon: '🔍',
      description: 'Filtra per riferimento normativo',
      count: 'Ricerca',
      color: 'success',
      path: '/quiz/normativa'
    }
  ]

  return (
    <div className="home">
      <div className="container">
        {/* Hero Section */}
        <div className="hero">
          <h1 className="hero-title">
            <span className="gradient-text">Quiz Trainer</span>
          </h1>
          <p className="hero-subtitle">
            Preparazione Concorso MIC - 1500 Posti
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-icon">📚</span>
              <div className="stat-content">
                <div className="stat-value">{domandeStats.totale}</div>
                <div className="stat-label">Domande</div>
              </div>
            </div>
            
            <div className="stat-divider"></div>
            
            <div className="stat-item">
              <span className="stat-icon">⚠️</span>
              <div className="stat-content">
                <div className="stat-value danger">{domandeStats.daRivedere}</div>
                <div className="stat-label">Da rivedere</div>
              </div>
            </div>
            
            <div className="stat-divider"></div>
            
            <div className="stat-item">
              <span className="stat-icon">🎯</span>
              <div className="stat-content">
                <div className="stat-value success">{stats?.totale_quiz || 0}</div>
                <div className="stat-label">Quiz fatti</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Modes */}
        <div className="quiz-modes">
          <h2 className="section-title">
            <span className="section-icon">🎯</span>
            Modalità di Allenamento
          </h2>
          
          <div className="modes-grid">
            {quizModes.map(mode => (
              <Link 
                key={mode.id} 
                to={mode.path}
                className={`mode-card ${mode.color} ${mode.priority ? 'priority' : ''}`}
              >
                {mode.priority && (
                  <div className="priority-badge">Priorità</div>
                )}
                
                <div className="mode-icon">{mode.icon}</div>
                
                <div className="mode-content">
                  <h3 className="mode-title">{mode.title}</h3>
                  <p className="mode-description">{mode.description}</p>
                  
                  <div className="mode-count">
                    {typeof mode.count === 'number' ? (
                      <span className={`badge badge-${mode.color}`}>
                        {mode.count} {mode.count === 1 ? 'domanda' : 'domande'}
                      </span>
                    ) : (
                      <span className={`badge badge-${mode.color}`}>
                        {mode.count}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mode-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="tips-section">
          <h2 className="section-title">
            <span className="section-icon">💡</span>
            Consigli Rapidi
          </h2>
          
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">⏱️</div>
              <div className="tip-content">
                <h4>Tempo Consigliato</h4>
                <p>1.5 minuti per domanda per simulare l'esame reale</p>
              </div>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">🎯</div>
              <div className="tip-content">
                <h4>Focus sugli Errori</h4>
                <p>Rivedere subito le domande sbagliate aumenta la retention</p>
              </div>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">📊</div>
              <div className="tip-content">
                <h4>Monitora i Progressi</h4>
                <p>Controlla regolarmente le statistiche per identificare aree deboli</p>
              </div>
            </div>
            
            <div className="tip-card">
              <div className="tip-icon">🔄</div>
              <div className="tip-content">
                <h4>Pratica Costante</h4>
                <p>Anche 10-15 minuti al giorno fanno la differenza</p>
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="app-info">
          <div className="info-card">
            <span className="info-icon">📱</span>
            <div>
              <strong>Funziona Offline</strong>
              <p>Studia ovunque, anche senza connessione</p>
            </div>
          </div>
          
          <div className="info-card">
            <span className="info-icon">💾</span>
            <div>
              <strong>Salvataggio Automatico</strong>
              <p>I tuoi progressi sono sempre al sicuro</p>
            </div>
          </div>
          
          <div className="info-card">
            <span className="info-icon">🚀</span>
            <div>
              <strong>Sempre Aggiornato</strong>
              <p>Database costantemente migliorato</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
