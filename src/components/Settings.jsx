import { useState } from 'react'
import { exportData, importData, resetData, saveStats, createEmptyStats } from '../utils/storage'
import './Settings.css'

function Settings({ theme, toggleTheme, domande, updateDomande, stats, setStats }) {
  const [importing, setImporting] = useState(false)

  const handleExport = () => {
    const success = exportData()
    if (success) {
      alert('✅ Dati esportati con successo!')
    } else {
      alert('❌ Errore durante l\'esportazione')
    }
  }

  const handleImport = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!confirm('⚠️ Questo sostituirà tutti i dati attuali. Continuare?')) {
      e.target.value = ''
      return
    }

    setImporting(true)
    try {
      await importData(file)
      alert('✅ Dati importati con successo! Ricarica la pagina per vedere le modifiche.')
      window.location.reload()
    } catch (error) {
      alert('❌ Errore durante l\'importazione: ' + error.message)
    } finally {
      setImporting(false)
      e.target.value = ''
    }
  }

  const handleReset = () => {
    if (!confirm('⚠️ ATTENZIONE: Questo eliminerà TUTTI i progressi e le statistiche. Questa azione NON può essere annullata. Sei sicuro?')) {
      return
    }

    if (!confirm('⚠️ ULTIMA CONFERMA: Tutti i dati verranno persi permanentemente. Procedere?')) {
      return
    }

    const success = resetData()
    if (success) {
      // Reset stats in state
      setStats(createEmptyStats())
      saveStats(createEmptyStats())
      
      alert('✅ Dati resettati. Ricarica la pagina.')
      window.location.reload()
    } else {
      alert('❌ Errore durante il reset')
    }
  }

  const installPWA = () => {
    alert('ℹ️ Per installare l\'app:\n\n1. Apri il menu del browser (⋮)\n2. Seleziona "Aggiungi a Home" o "Installa app"\n3. L\'icona apparirà nella schermata home')
  }

  return (
    <div className="settings">
      <div className="container">
        <div className="settings-header">
          <h1>
            <span className="section-icon">⚙️</span>
            Impostazioni
          </h1>
          <p>Personalizza l'app e gestisci i tuoi dati</p>
        </div>

        {/* Appearance */}
        <div className="settings-section">
          <h2 className="section-title">🎨 Aspetto</h2>
          
          <div className="setting-card">
            <div className="setting-info">
              <div className="setting-icon">{theme === 'dark' ? '🌙' : '☀️'}</div>
              <div>
                <h3 className="setting-name">Tema</h3>
                <p className="setting-description">
                  Attualmente: {theme === 'dark' ? 'Scuro' : 'Chiaro'}
                </p>
              </div>
            </div>
            <button className="btn btn-secondary" onClick={toggleTheme}>
              Cambia Tema
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="settings-section">
          <h2 className="section-title">💾 Gestione Dati</h2>
          
          <div className="setting-card">
            <div className="setting-info">
              <div className="setting-icon">📥</div>
              <div>
                <h3 className="setting-name">Esporta Dati</h3>
                <p className="setting-description">
                  Scarica un backup di domande e statistiche
                </p>
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleExport}>
              Esporta
            </button>
          </div>
          
          <div className="setting-card">
            <div className="setting-info">
              <div className="setting-icon">📤</div>
              <div>
                <h3 className="setting-name">Importa Dati</h3>
                <p className="setting-description">
                  Ripristina da un file di backup precedente
                </p>
              </div>
            </div>
            <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
              {importing ? 'Importazione...' : 'Importa'}
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
                disabled={importing}
              />
            </label>
          </div>
          
          <div className="setting-card danger">
            <div className="setting-info">
              <div className="setting-icon">🗑️</div>
              <div>
                <h3 className="setting-name">Reset Completo</h3>
                <p className="setting-description">
                  Elimina tutti i progressi e le statistiche
                </p>
              </div>
            </div>
            <button className="btn btn-danger" onClick={handleReset}>
              Reset Dati
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="settings-section">
          <h2 className="section-title">📱 App</h2>
          
          <div className="setting-card">
            <div className="setting-info">
              <div className="setting-icon">⬇️</div>
              <div>
                <h3 className="setting-name">Installa App</h3>
                <p className="setting-description">
                  Aggiungi alla schermata home per accesso rapido
                </p>
              </div>
            </div>
            <button className="btn btn-primary" onClick={installPWA}>
              Istruzioni
            </button>
          </div>
          
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">📚 Domande</span>
              <span className="info-value">{domande.length}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">🎯 Quiz Completati</span>
              <span className="info-value">{stats?.totale_quiz || 0}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">📱 Versione</span>
              <span className="info-value">1.0.0</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">💾 Storage</span>
              <span className="info-value">LocalStorage</span>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="settings-section">
          <h2 className="section-title">ℹ️ Informazioni</h2>
          
          <div className="about-card">
            <h3>Quiz Trainer MIC</h3>
            <p>
              Applicazione Progressive Web App per la preparazione al concorso
              del Ministero della Cultura - 1500 posti.
            </p>
            <p>
              Sviluppata con React e ottimizzata per funzionare offline.
              Tutti i dati sono salvati localmente sul tuo dispositivo.
            </p>
            <div className="about-footer">
              <span>👤 By Alessio</span>
              <span>📅 2026</span>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="tips-box">
          <h3>💡 Consigli Utili</h3>
          <ul>
            <li>Esporta regolarmente i tuoi dati come backup</li>
            <li>Installa l'app per un accesso più rapido</li>
            <li>L'app funziona completamente offline</li>
            <li>I dati sono salvati solo sul tuo dispositivo</li>
            <li>Puoi usare l'app su più dispositivi importando/esportando i dati</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Settings
