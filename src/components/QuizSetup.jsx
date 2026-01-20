import { useState } from 'react'
import { filterDomande, groupByCategory } from '../utils/storage'

function QuizSetup({ mode, domande, startQuiz, goHome, selectedCategory, setSelectedCategory, searchTerm, setSearchTerm }) {
  const getModeConfig = () => {
    switch (mode) {
      case 'completo':
        return {
          title: 'Quiz Completo',
          icon: '📝',
          description: 'Tutte le domande del database',
          domande: domande
        }
      
      case 'errori':
        return {
          title: 'Solo Errori',
          icon: '❌',
          description: 'Ripassa le domande sbagliate',
          domande: filterDomande(domande, { tipo: 'errori' })
        }
      
      case 'omesse':
        return {
          title: 'Solo Omesse',
          icon: '⏭️',
          description: 'Recupera le domande saltate',
          domande: filterDomande(domande, { tipo: 'omesse' })
        }
      
      case 'random':
        return {
          title: 'Quiz Random',
          icon: '🎲',
          description: '10 domande casuali',
          domande: filterDomande(domande, { tipo: 'random', numero: 10 })
        }
      
      case 'categoria':
        const categorized = groupByCategory(domande)
        return {
          title: 'Quiz per Categoria',
          icon: '📂',
          description: 'Scegli una categoria',
          needsSelection: true,
          categories: Object.keys(categorized).sort(),
          categorized: categorized
        }
      
      case 'normativa':
        return {
          title: 'Cerca per Normativa',
          icon: '🔍',
          description: 'Filtra per riferimento normativo',
          needsSearch: true
        }
      
      default:
        return {
          title: 'Quiz',
          icon: '📝',
          domande: domande
        }
    }
  }

  const config = getModeConfig()
  
  const handleStart = () => {
    let domandeToUse = config.domande

    if (config.needsSelection && selectedCategory) {
      domandeToUse = config.categorized[selectedCategory]
    } else if (config.needsSearch && searchTerm) {
      domandeToUse = filterDomande(domande, { tipo: 'normativa', termine: searchTerm })
    }

    if (!domandeToUse || domandeToUse.length === 0) {
      alert('Nessuna domanda trovata!')
      return
    }

    startQuiz(domandeToUse)
  }

  const canStart = () => {
    if (config.needsSelection) {
      return selectedCategory !== null
    }
    if (config.needsSearch) {
      return searchTerm.trim().length > 0
    }
    return config.domande && config.domande.length > 0
  }

  return (
    <div className="quiz-setup">
      <div className="container">
        <div className="setup-card">
          <div className="setup-header">
            <div className="setup-icon">{config.icon}</div>
            <h1 className="setup-title">{config.title}</h1>
            <p className="setup-description">{config.description}</p>
          </div>

          {config.needsSelection && (
            <div className="category-selection">
              <h3 className="selection-title">Seleziona Categoria</h3>
              <div className="category-grid">
                {config.categories.map(cat => {
                  const count = config.categorized[cat].length
                  return (
                    <button
                      key={cat}
                      className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <span className="category-name">{cat}</span>
                      <span className="category-count">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {config.needsSearch && (
            <div className="search-section">
              <h3 className="selection-title">Cerca Normativa</h3>
              <div className="input-group">
                <input
                  type="text"
                  className="input"
                  placeholder="es. '81/2008', '42/2004', 'GDPR'..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && canStart() && handleStart()}
                />
              </div>
              {searchTerm && (
                <p className="search-info">
                  {filterDomande(domande, { tipo: 'normativa', termine: searchTerm }).length} domande trovate
                </p>
              )}
            </div>
          )}

          {!config.needsSelection && !config.needsSearch && (
            <div className="quiz-info">
              <div className="info-item">
                <span className="info-icon">📚</span>
                <div>
                  <div className="info-value">{config.domande?.length || 0}</div>
                  <div className="info-label">Domande</div>
                </div>
              </div>
              
              <div className="info-divider"></div>
              
              <div className="info-item">
                <span className="info-icon">⏱️</span>
                <div>
                  <div className="info-value">{Math.ceil((config.domande?.length || 0) * 1.5)}</div>
                  <div className="info-label">Minuti consigliati</div>
                </div>
              </div>
            </div>
          )}

          <div className="setup-actions">
            <button className="btn btn-secondary btn-lg" onClick={goHome}>
              ← Indietro
            </button>
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleStart}
              disabled={!canStart()}
            >
              Inizia Quiz →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizSetup
