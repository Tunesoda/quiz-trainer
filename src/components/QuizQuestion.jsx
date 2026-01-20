import { useState } from 'react'

function QuizQuestion({ domanda, risposta, onAnswer, onNext, isLast }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleSelect = (option) => {
    if (showExplanation) return // Non permettere cambio risposta dopo conferma
    setSelectedAnswer(option)
  }

  const handleConfirm = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer)
      setShowExplanation(true)
    } else {
      alert('Seleziona una risposta prima di confermare!')
    }
  }

  const handleSkip = () => {
    onAnswer(null) // Risposta omessa
    setShowExplanation(true)
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
    onNext()
  }

  const getOptionLetter = (opzione) => {
    return opzione.charAt(0) // 'A)', 'B)', etc.
  }

  const isCorrect = selectedAnswer === domanda.corretta
  const wasSkipped = !selectedAnswer && showExplanation

  return (
    <div className="quiz-question fade-in">
      {/* Categoria e Normativa */}
      <div className="question-meta">
        <span className="badge badge-info">{domanda.categoria}</span>
        {domanda.normativa && (
          <span className="question-normativa">📜 {domanda.normativa}</span>
        )}
      </div>

      {/* Domanda */}
      <div className="question-text">
        <h2>{domanda.domanda}</h2>
      </div>

      {/* Alert se già sbagliata in passato */}
      {domanda.tua_risposta_errata && domanda.tua_risposta_errata !== '' && domanda.tua_risposta_errata !== 'OMESSA' && !showExplanation && (
        <div className="alert alert-warning">
          <strong>⚠️ Attenzione!</strong> Hai già sbagliato questa domanda in passato.
          <br />
          Risposta errata precedente: <strong>{domanda.tua_risposta_errata}</strong>
        </div>
      )}

      {/* Opzioni */}
      <div className="options-grid">
        {domanda.opzioni.map((opzione, index) => {
          const letter = getOptionLetter(opzione)
          const isSelected = selectedAnswer === letter
          const isCorrectAnswer = letter === domanda.corretta
          
          let optionClass = 'option-card'
          if (isSelected && !showExplanation) {
            optionClass += ' selected'
          }
          if (showExplanation) {
            if (isCorrectAnswer) {
              optionClass += ' correct'
            } else if (isSelected && !isCorrectAnswer) {
              optionClass += ' wrong'
            }
          }

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => handleSelect(letter)}
              disabled={showExplanation}
            >
              <div className="option-letter">{letter}</div>
              <div className="option-text">{opzione.substring(3)}</div>
              {showExplanation && isCorrectAnswer && (
                <div className="option-icon">✓</div>
              )}
              {showExplanation && isSelected && !isCorrectAnswer && (
                <div className="option-icon">✗</div>
              )}
            </button>
          )
        })}
      </div>

      {/* Spiegazione */}
      {showExplanation && (
        <div className={`explanation-box ${wasSkipped ? 'skipped' : (isCorrect ? 'correct' : 'wrong')}`}>
          <div className="explanation-header">
            {wasSkipped ? (
              <>
                <span className="explanation-icon">⏭️</span>
                <strong>Domanda Omessa</strong>
              </>
            ) : isCorrect ? (
              <>
                <span className="explanation-icon">✅</span>
                <strong>Risposta Corretta!</strong>
              </>
            ) : (
              <>
                <span className="explanation-icon">❌</span>
                <strong>Risposta Errata</strong>
              </>
            )}
          </div>
          
          <div className="explanation-content">
            <p><strong>Risposta corretta:</strong> {domanda.corretta})</p>
            {domanda.spiegazione && (
              <p><strong>Spiegazione:</strong> {domanda.spiegazione}</p>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="question-actions">
        {!showExplanation ? (
          <>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={handleSkip}
            >
              ⏭️ Salta
            </button>
            <button 
              className="btn btn-primary btn-lg"
              onClick={handleConfirm}
              disabled={!selectedAnswer}
            >
              Conferma →
            </button>
          </>
        ) : (
          <button 
            className="btn btn-primary btn-lg btn-full"
            onClick={handleNext}
          >
            {isLast ? '🏁 Termina Quiz' : 'Prossima Domanda →'}
          </button>
        )}
      </div>
    </div>
  )
}

export default QuizQuestion
