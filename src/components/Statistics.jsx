import { calculateDomandeStats, formatDate } from '../utils/storage'
import './Statistics.css'

function Statistics({ domande, stats }) {
  const domandeStats = calculateDomandeStats(domande)
  
  const totalResponses = (stats?.domande_corrette || 0) + (stats?.domande_errate || 0)
  const successRate = totalResponses > 0 
    ? ((stats?.domande_corrette || 0) / totalResponses * 100).toFixed(1)
    : 0

  return (
    <div className="statistics">
      <div className="container">
        {/* Header */}
        <div className="stats-header">
          <h1>
            <span className="section-icon">📊</span>
            Statistiche Dettagliate
          </h1>
          <p>Monitora i tuoi progressi e identifica le aree di miglioramento</p>
        </div>

        {/* Performance Overview */}
        <div className="performance-section">
          <h2 className="section-title">🎯 Performance Generale</h2>
          
          <div className="performance-grid">
            <div className="performance-card primary">
              <div className="performance-icon">🎓</div>
              <div className="performance-value">{stats?.totale_quiz || 0}</div>
              <div className="performance-label">Quiz Completati</div>
            </div>
            
            <div className="performance-card success">
              <div className="performance-icon">✅</div>
              <div className="performance-value">{stats?.domande_corrette || 0}</div>
              <div className="performance-label">Risposte Corrette</div>
            </div>
            
            <div className="performance-card danger">
              <div className="performance-icon">❌</div>
              <div className="performance-value">{stats?.domande_errate || 0}</div>
              <div className="performance-label">Risposte Errate</div>
            </div>
            
            <div className="performance-card info">
              <div className="performance-icon">📈</div>
              <div className="performance-value">{successRate}%</div>
              <div className="performance-label">Tasso di Successo</div>
            </div>
          </div>
        </div>

        {/* Database Stats */}
        <div className="database-section">
          <h2 className="section-title">📚 Stato Database</h2>
          
          <div className="database-grid">
            <div className="stat-box">
              <div className="stat-icon">📝</div>
              <div>
                <div className="stat-value">{domandeStats.totale}</div>
                <div className="stat-label">Domande Totali</div>
              </div>
            </div>
            
            <div className="stat-box">
              <div className="stat-icon">❌</div>
              <div>
                <div className="stat-value danger">{domandeStats.errate}</div>
                <div className="stat-label">Con Errori</div>
              </div>
            </div>
            
            <div className="stat-box">
              <div className="stat-icon">⏭️</div>
              <div>
                <div className="stat-value warning">{domandeStats.omesse}</div>
                <div className="stat-label">Omesse</div>
              </div>
            </div>
            
            <div className="stat-box">
              <div className="stat-icon">⚠️</div>
              <div>
                <div className="stat-value danger">{domandeStats.daRivedere}</div>
                <div className="stat-label">Da Rivedere</div>
              </div>
            </div>
          </div>
        </div>

        {/* Per Categoria */}
        <div className="category-section">
          <h2 className="section-title">📂 Performance per Categoria</h2>
          
          <div className="category-list">
            {Object.entries(domandeStats.perCategoria)
              .sort((a, b) => (b[1].errori + b[1].omesse) - (a[1].errori + a[1].omesse))
              .map(([categoria, stats]) => {
                const total = stats.totale
                const problemi = stats.errori + stats.omesse
                const percentage = total > 0 ? ((total - problemi) / total * 100) : 100
                
                return (
                  <div key={categoria} className="category-item">
                    <div className="category-header">
                      <span className="category-name">{categoria}</span>
                      <span className="category-total">{stats.totale} domande</span>
                    </div>
                    
                    <div className="category-bar">
                      <div 
                        className="category-bar-fill"
                        style={{ 
                          width: `${percentage}%`,
                          background: percentage >= 80 ? 'var(--accent-success)' :
                                     percentage >= 60 ? 'var(--accent-warning)' :
                                     'var(--accent-danger)'
                        }}
                      />
                    </div>
                    
                    <div className="category-stats">
                      <span className="category-stat">
                        <span className="stat-icon-small">❌</span>
                        {stats.errori} errori
                      </span>
                      <span className="category-stat">
                        <span className="stat-icon-small">⏭️</span>
                        {stats.omesse} omesse
                      </span>
                      <span className="category-stat success">
                        {percentage.toFixed(0)}% completato
                      </span>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Recent Errors */}
        {stats?.storico_errori && stats.storico_errori.length > 0 && (
          <div className="recent-errors-section">
            <h2 className="section-title">🔴 Ultimi Errori</h2>
            
            <div className="errors-timeline">
              {stats.storico_errori.slice(0, 10).map((error, idx) => (
                <div key={idx} className="error-timeline-item">
                  <div className="error-marker"></div>
                  <div className="error-content">
                    <div className="error-date">
                      {formatDate(error.data)}
                    </div>
                    <div className="error-category-badge">
                      {error.categoria}
                    </div>
                    <div className="error-text">
                      {error.domanda}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Last Update */}
        {stats?.ultimo_aggiornamento && (
          <div className="last-update">
            <span className="update-icon">🕒</span>
            Ultimo aggiornamento: {formatDate(stats.ultimo_aggiornamento)}
          </div>
        )}
      </div>
    </div>
  )
}

export default Statistics
