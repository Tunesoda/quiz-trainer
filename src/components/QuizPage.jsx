import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  filterDomande, 
  groupByCategory, 
  calculateScore, 
  saveStats, 
  updateStatsAfterQuiz,
  formatTime 
} from '../utils/storage'
import QuizSetup from './QuizSetup'
import QuizQuestion from './QuizQuestion'
import QuizResults from './QuizResults'
import './QuizPage.css'

function QuizPage({ domande, updateDomande, stats, setStats }) {
  const { mode } = useParams()
  const navigate = useNavigate()
  
  const [quizState, setQuizState] = useState('setup') // 'setup', 'active', 'results'
  const [currentQuizDomande, setCurrentQuizDomande] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [risposte, setRisposte] = useState([])
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Timer
  useEffect(() => {
    let interval
    if (timerActive && quizState === 'active') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive, quizState])

  const startQuiz = (filteredDomande) => {
    if (!filteredDomande || filteredDomande.length === 0) {
      alert('Nessuna domanda disponibile per questa modalità!')
      return
    }
    
    // Shuffle domande
    const shuffled = [...filteredDomande].sort(() => Math.random() - 0.5)
    
    setCurrentQuizDomande(shuffled)
    setCurrentIndex(0)
    setRisposte([])
    setTimeElapsed(0)
    setQuizState('active')
    setTimerActive(true)
  }

  const handleAnswer = (risposta) => {
    const currentDomanda = currentQuizDomande[currentIndex]
    const punteggio = calculateScore(currentDomanda, risposta)
    
    const newRisposta = {
      domanda: currentDomanda,
      risposta: risposta,
      corretta: risposta === currentDomanda.corretta,
      punteggio: punteggio
    }
    
    setRisposte([...risposte, newRisposta])
    
    // Aggiorna domanda nel database se sbagliata o omessa
    if (!newRisposta.corretta) {
      const updatedDomande = domande.map(d => {
        if (d.id === currentDomanda.id) {
          return {
            ...d,
            tua_risposta_errata: risposta || 'OMESSA',
            punti_persi: punteggio
          }
        }
        return d
      })
      updateDomande(updatedDomande)
    }
  }

  const nextQuestion = () => {
    if (currentIndex < currentQuizDomande.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = () => {
    setTimerActive(false)
    
    const corrette = risposte.filter(r => r.corretta).length
    const errate = risposte.filter(r => !r.corretta && r.risposta).length
    const omesse = risposte.filter(r => !r.risposta).length
    const punteggioTotale = risposte.reduce((sum, r) => sum + r.punteggio, 0)
    
    const risultati = {
      corrette,
      errate,
      omesse,
      punteggio: punteggioTotale,
      tempo: timeElapsed,
      errori: risposte.filter(r => !r.corretta).map(r => ({
        categoria: r.domanda.categoria,
        domanda: r.domanda.domanda
      }))
    }
    
    // Aggiorna statistiche
    const newStats = updateStatsAfterQuiz(stats, risultati)
    setStats(newStats)
    saveStats(newStats)
    
    setQuizState('results')
  }

  const restartQuiz = () => {
    setQuizState('setup')
    setCurrentIndex(0)
    setRisposte([])
    setTimeElapsed(0)
    setSelectedCategory(null)
    setSearchTerm('')
  }

  const goHome = () => {
    navigate('/')
  }

  // Render basato sullo stato
  if (quizState === 'setup') {
    return (
      <QuizSetup
        mode={mode}
        domande={domande}
        startQuiz={startQuiz}
        goHome={goHome}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    )
  }

  if (quizState === 'results') {
    return (
      <QuizResults
        risposte={risposte}
        timeElapsed={timeElapsed}
        restartQuiz={restartQuiz}
        goHome={goHome}
      />
    )
  }

  // Quiz attivo
  return (
    <div className="quiz-page">
      <div className="container">
        {/* Quiz Header */}
        <div className="quiz-header">
          <div className="quiz-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentIndex + 1) / currentQuizDomande.length) * 100}%` }}
              />
            </div>
            <div className="progress-text">
              {currentIndex + 1} / {currentQuizDomande.length}
            </div>
          </div>
          
          <div className="quiz-timer">
            ⏱️ {formatTime(timeElapsed)}
          </div>
        </div>

        {/* Question */}
        <QuizQuestion
          domanda={currentQuizDomande[currentIndex]}
          risposta={risposte[currentIndex]}
          onAnswer={handleAnswer}
          onNext={nextQuestion}
          isLast={currentIndex === currentQuizDomande.length - 1}
        />
      </div>
    </div>
  )
}

export default QuizPage
