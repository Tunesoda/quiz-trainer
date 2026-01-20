// localStorage keys
const STORAGE_KEYS = {
  DOMANDE: 'quiz_domande',
  STATS: 'quiz_stats',
  THEME: 'quiz_theme',
  LAST_SYNC: 'quiz_last_sync'
};

// Carica domande da localStorage o usa quelle di default
export const loadDomande = (defaultDomande) => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DOMANDE);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.domande || defaultDomande;
    }
  } catch (error) {
    console.error('Errore caricamento domande:', error);
  }
  return defaultDomande;
};

// Salva domande in localStorage
export const saveDomande = (domande) => {
  try {
    const data = {
      versione: '1.0',
      ultima_modifica: new Date().toISOString(),
      totale_domande: domande.length,
      domande: domande
    };
    localStorage.setItem(STORAGE_KEYS.DOMANDE, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Errore salvataggio domande:', error);
    return false;
  }
};

// Carica statistiche
export const loadStats = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STATS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Errore caricamento statistiche:', error);
  }
  
  return createEmptyStats();
};

// Crea statistiche vuote
export const createEmptyStats = () => ({
  totale_quiz: 0,
  domande_corrette: 0,
  domande_errate: 0,
  per_categoria: {},
  storico_errori: [],
  ultimo_aggiornamento: new Date().toISOString()
});

// Salva statistiche
export const saveStats = (stats) => {
  try {
    const updatedStats = {
      ...stats,
      ultimo_aggiornamento: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
    return true;
  } catch (error) {
    console.error('Errore salvataggio statistiche:', error);
    return false;
  }
};

// Aggiorna statistiche dopo un quiz
export const updateStatsAfterQuiz = (stats, risultati) => {
  const newStats = { ...stats };
  
  newStats.totale_quiz += 1;
  newStats.domande_corrette += risultati.corrette;
  newStats.domande_errate += risultati.errate;
  
  // Aggiorna storico errori
  if (risultati.errori && risultati.errori.length > 0) {
    newStats.storico_errori = [
      ...risultati.errori.map(err => ({
        data: new Date().toISOString(),
        categoria: err.categoria,
        domanda: err.domanda.substring(0, 100)
      })),
      ...newStats.storico_errori
    ].slice(0, 50); // Mantieni solo ultimi 50 errori
  }
  
  return newStats;
};

// Calcola statistiche domande
export const calculateDomandeStats = (domande) => {
  const errate = domande.filter(d => 
    d.tua_risposta_errata && 
    d.tua_risposta_errata !== '' && 
    d.tua_risposta_errata !== 'OMESSA'
  );
  
  const omesse = domande.filter(d => 
    d.tua_risposta_errata === 'OMESSA'
  );
  
  const perCategoria = {};
  domande.forEach(d => {
    if (!perCategoria[d.categoria]) {
      perCategoria[d.categoria] = {
        totale: 0,
        errori: 0,
        omesse: 0
      };
    }
    perCategoria[d.categoria].totale += 1;
    
    if (d.tua_risposta_errata) {
      if (d.tua_risposta_errata === 'OMESSA') {
        perCategoria[d.categoria].omesse += 1;
      } else if (d.tua_risposta_errata !== '') {
        perCategoria[d.categoria].errori += 1;
      }
    }
  });
  
  return {
    totale: domande.length,
    errate: errate.length,
    omesse: omesse.length,
    daRivedere: errate.length + omesse.length,
    perCategoria
  };
};

// Calcola punteggio
export const calculateScore = (domanda, rispostaUtente) => {
  if (!rispostaUtente) return 0; // Omessa
  
  const isSituazionale = domanda.categoria?.toLowerCase().includes('situazional');
  
  if (rispostaUtente === domanda.corretta) {
    return isSituazionale ? 1 : 0.75;
  } else {
    return isSituazionale ? -1 : -0.25;
  }
};

// Gestione tema
export const getTheme = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    return stored || 'dark';
  } catch (error) {
    return 'dark';
  }
};

export const setTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
    return true;
  } catch (error) {
    console.error('Errore salvataggio tema:', error);
    return false;
  }
};

// Filtra domande
export const filterDomande = (domande, filtro) => {
  switch (filtro.tipo) {
    case 'errori':
      return domande.filter(d => 
        d.tua_risposta_errata && 
        d.tua_risposta_errata !== '' && 
        d.tua_risposta_errata !== 'OMESSA'
      );
    
    case 'omesse':
      return domande.filter(d => 
        d.tua_risposta_errata === 'OMESSA'
      );
    
    case 'categoria':
      return domande.filter(d => 
        d.categoria === filtro.categoria
      );
    
    case 'normativa':
      return domande.filter(d => 
        d.normativa && 
        d.normativa.toLowerCase().includes(filtro.termine.toLowerCase())
      );
    
    case 'random':
      const shuffled = [...domande].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, filtro.numero || 10);
    
    default:
      return domande;
  }
};

// Raggruppa per categoria
export const groupByCategory = (domande) => {
  const grouped = {};
  
  domande.forEach(d => {
    if (!grouped[d.categoria]) {
      grouped[d.categoria] = [];
    }
    grouped[d.categoria].push(d);
  });
  
  return grouped;
};

// Formatta data
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    return 'N/A';
  }
};

// Formatta tempo
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Export/Import dati
export const exportData = () => {
  try {
    const domande = localStorage.getItem(STORAGE_KEYS.DOMANDE);
    const stats = localStorage.getItem(STORAGE_KEYS.STATS);
    
    const data = {
      domande: domande ? JSON.parse(domande) : null,
      stats: stats ? JSON.parse(stats) : null,
      exported_at: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Errore export:', error);
    return false;
  }
};

export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.domande) {
          localStorage.setItem(STORAGE_KEYS.DOMANDE, JSON.stringify(data.domande));
        }
        
        if (data.stats) {
          localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(data.stats));
        }
        
        resolve(true);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Errore lettura file'));
    reader.readAsText(file);
  });
};

// Reset dati
export const resetData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.DOMANDE);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    return true;
  } catch (error) {
    console.error('Errore reset:', error);
    return false;
  }
};
