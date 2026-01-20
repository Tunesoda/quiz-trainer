import { formatTime } from '../utils/storage'

function QuizResults({ risposte, timeElapsed, restartQuiz, goHome }) {
  const corrette = risposte.filter(r => r.corretta).length
  const errate = risposte.filter(r => !r.corretta && r.risposta).length
  const omesse = risposte.filter(r => !r.risposta).length
  const totale = risposte.length
  const punteggio = risposte.reduce((sum, r) => sum + r.punteggio, 0)
  const percentuale = totale > 0 ? (corrette / totale * 100) : 0

  const getPerformanceMessage = () => {
    if (percentuale >= 90) return { emoji: '🏆', text: 'Eccellente!', color: 'success' }
    if (percentuale >= 75) return { emoji: '🎉', text: 'Ottimo lavoro!', color: 'success' }
    if (percentuale >= 60) return { emoji: '👍', text: 'Buon risultato', color: 'info' }
    if (percentuale >= 50) return { emoji: '📚', text: 'Continua a studiare', color: 'warning' }
    return { emoji: '💪', text: 'Serve più pratica', color: 'danger' }
  }

  const performance = getPerformanceMessage()

  // Raggruppa errori per categoria
  const erroriPerCategoria = {}
  risposte.filter(r => !r.corretta).forEach(r => {
    const cat = r.domanda.categoria
    if (!erroriPerCategoria[cat]) {
      erroriPerCategoria[cat] = []
    }
    erroriPerCategoria[cat].push(r)
  })

  return (
    <div className="quiz-results fade-in">
      <div className="container">
        {/* Results Header */}
        <div className="results-header">
          <div className="results-icon">{performance.emoji}</div>
          <h1 className="results-title">{performance.text}</h1>
          <p className="results-subtitle">Quiz completato in {formatTime(timeElapsed)}</p>
        </div>

        {/* Score Card */}
        <div className="score-card">
          <div className="score-main">
            <div className="score-value" style={{ color: `var(--accent-${performance.color})` }}>
              {punteggio.toFixed(2)}
            </div>
            <div className="score-label">Punteggio Totale</div>
          </div>
          
          <div className="score-percentage">
            <div className="percentage-circle">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="var(--bg-tertiary)"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={`var(--accent-${performance.color})`}
                  strokeWidth="10"
                  strokeDasharray={`${percentuale * 2.827} 282.7`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="percentage-text">
                {percentuale.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="results-stats">
          <div className="stat-card success">
            <div className="stat-icon">✅</div>
            <div className="stat-value">{corrette}</div>
            <div className="stat-label">Corrette</div>
          </div>
          
          <div className="stat-card danger">
            <div className="stat-icon">❌</div>
            <div className="stat-value">{errate}</div>
            <div className="stat-label">Errate</div>
          </div>
          
          <div className="stat-card warning">
            <div className="stat-icon">⏭️</div>
            <div className="stat-value">{omesse}</div>
            <div className="stat-label">Omesse</div>
          </div>
          
          <div className="stat-card info">
            <div className="stat-icon">📝</div>
            <div className="stat-value">{totale}</div>
            <div className="stat-label">Totale</div>
          </div>
        </div>

        {/* Errori per Categoria */}
        {Object.keys(erroriPerCategoria).length > 0 && (
          <div className="errors-section">
            <h2 className="section-title">
              <span className="section-icon">📊</span>
              Analisi Errori per Categoria
            </h2>
            
            <div className="errors-list">
              {Object.entries(erroriPerCategoria)
                .sort((a, b) => b[1].length - a[1].length)
                .map(([categoria, errori]) => (
                  <div key={categoria} className="error-category">
                    <div className="error-category-header">
                      <span className="error-category-name">{categoria}</span>
                      <span className="badge badge-danger">{errori.length} errori</span>
                    </div>
                    <div className="error-items">
                      {errori.map((err, idx) => (
                        <div key={idx} className="error-item">
                          <div className="error-question">
                            {err.domanda.domanda.substring(0, 100)}...
                          </div>
                          {err.risposta ? (
                            <div className="error-detail">
                              <span className="error-your-answer">
                                Tua risposta: <strong>{err.risposta}</strong>
                              </span>
                              <span className="error-correct-answer">
                                Corretta: <strong>{err.domanda.corretta}</strong>
                              </span>
                            </div>
                          ) : (
                            <div className="error-detail">
                              <span className="error-skipped">Domanda omessa</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="results-actions">
          <button className="btn btn-secondary btn-lg" onClick={goHome}>
            🏠 Home
          </button>
          <button className="btn btn-primary btn-lg" onClick={restartQuiz}>
            🔄 Rifai Quiz
          </button>
        </div>

        {/* Tips */}
        {errate + omesse > 0 && (
          <div className="results-tips">
            <h3>💡 Suggerimenti</h3>
            <ul>
              <li>Rivedi subito le domande sbagliate usando la modalità "Solo Errori"</li>
              <li>Le domande omesse vanno recuperate con la modalità "Solo Omesse"</li>
              <li>Concentrati sulle categorie dove hai fatto più errori</li>
              <li>Leggi attentamente le spiegazioni per consolidare la conoscenza</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizResults
