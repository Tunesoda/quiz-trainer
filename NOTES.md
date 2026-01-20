# 📝 Note Tecniche - Quiz Trainer PWA

## Stack Tecnologico

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router v6
- **Styling**: CSS Variables + CSS Modules
- **Storage**: LocalStorage API
- **PWA**: vite-plugin-pwa (Workbox)
- **Deploy**: GitHub Pages + GitHub Actions

## Architettura

### Gestione Stato
- **Locale**: useState/useEffect
- **Persistenza**: localStorage tramite utility functions
- **Nessuna libreria esterna** (Redux, Zustand) per mantenere bundle size basso

### Struttura Dati

#### Domande (`domande.json`)
```javascript
{
  "id": number,
  "categoria": string,
  "normativa": string,
  "domanda": string,
  "opzioni": string[],
  "corretta": string,  // "A", "B", "C", "D", "E"
  "spiegazione": string,
  "tua_risposta_errata": string,  // "" | "A"-"E" | "OMESSA"
  "punti_persi": number,
  "difficolta": string,
  "frequenza_errore": string
}
```

#### Statistiche (`localStorage: quiz_stats`)
```javascript
{
  "totale_quiz": number,
  "domande_corrette": number,
  "domande_errate": number,
  "per_categoria": {
    [categoria]: {
      totale: number,
      errori: number,
      omesse: number
    }
  },
  "storico_errori": Array<{
    data: string,
    categoria: string,
    domanda: string
  }>,
  "ultimo_aggiornamento": string
}
```

## Performance

### Bundle Size (stimato)
- Main bundle: ~150KB (gzipped)
- CSS: ~15KB (gzipped)
- Database JSON: ~200KB (domande)
- **Totale**: <400KB

### Ottimizzazioni Implementate
- ✅ Code splitting per routes (React.lazy)
- ✅ CSS minimizzato
- ✅ Tree shaking automatico (Vite)
- ✅ Service Worker per caching
- ✅ Lazy loading immagini
- ✅ LocalStorage invece di database esterno

### Possibili Ottimizzazioni Future
- [ ] Virtual scrolling per liste lunghe (react-window)
- [ ] IndexedDB invece di localStorage (>5MB dati)
- [ ] Image optimization per icone
- [ ] Preload critical resources
- [ ] Web Workers per calcoli pesanti

## Browser Support

### Requisiti Minimi
- Chrome/Edge: v90+
- Safari: v14+
- Firefox: v88+

### Feature Detection
- localStorage: required ✅
- Service Workers: required ✅
- CSS Grid: required ✅
- ES6+: required ✅

## PWA Features

### Installazione
- ✅ Manifest.json
- ✅ Service Worker
- ✅ Icons (192x192, 512x512)
- ✅ Standalone display mode

### Offline Support
- ✅ Static assets cached
- ✅ API responses cached
- ✅ Database in localStorage
- ✅ Fallback offline page

### Update Strategy
- Strategia: **Cache First** con **Background Update**
- Service Worker si auto-aggiorna
- Utente deve ricaricare per vedere aggiornamenti
- No prompts intrusivi

## Sicurezza

### Dati Utente
- ✅ Tutti i dati in localStorage (locale)
- ✅ Nessun backend
- ✅ Nessun tracking
- ✅ Privacy-first design

### HTTPS
- ✅ Required per PWA
- ✅ GitHub Pages usa HTTPS di default

## Sviluppi Futuri

### Feature Potenziali

#### v1.1
- [ ] Modalità esame simulato (60 min timer)
- [ ] Grafici progressi (Chart.js)
- [ ] Condivisione risultati
- [ ] Dark/Light/Auto theme

#### v1.2
- [ ] Sincronizzazione cloud (Firebase/Supabase)
- [ ] Account utente opzionale
- [ ] Leaderboard globale
- [ ] Badge achievements

#### v1.3
- [ ] Quiz vocale (Web Speech API)
- [ ] Flashcards mode
- [ ] Spaced repetition algorithm
- [ ] Export PDF risultati

### Limitazioni Attuali

1. **Storage Limit**: localStorage ~5-10MB
   - Soluzione: Migrare a IndexedDB se superato
   
2. **Sincronizzazione**: Solo manuale (export/import)
   - Soluzione: Backend opzionale con sync

3. **Analytics**: Nessun tracking
   - Soluzione: Privacy-friendly analytics (Plausible)

## Testing

### Test Manuali
- ✅ Quiz flow completo
- ✅ Persistenza dati
- ✅ Offline mode
- ✅ Installazione PWA
- ✅ Cross-browser (Chrome, Safari)
- ✅ Mobile responsive

### Test Automatizzati (TODO)
- [ ] Unit tests (Vitest)
- [ ] Component tests (React Testing Library)
- [ ] E2E tests (Playwright)

## Deployment

### GitHub Actions Workflow
1. Trigger: push su `main`
2. Install dependencies (`npm ci`)
3. Build (`npm run build`)
4. Deploy to GitHub Pages

### Rollback
Se serve rollback:
```bash
git revert HEAD
git push
```

### Hotfix
Per fix urgenti:
```bash
git checkout -b hotfix/critical-bug
# Fix bug
git push origin hotfix/critical-bug
# Merge to main via PR
```

## Manutenzione

### Aggiornamento Domande
1. Modifica `src/data/domande.json`
2. Commit + push
3. Auto-deploy in 2-3 minuti

### Aggiornamento Dipendenze
```bash
npm outdated
npm update
npm audit fix
```

### Monitoraggio
- Check GitHub Actions per build failures
- Monitor Issues per bug reports
- Check web vitals con Lighthouse

## Credits

- **Sviluppato per**: Alessio
- **Scopo**: Preparazione Concorso MIC 2026
- **Tech Stack**: React + Vite + PWA
- **Deploy**: GitHub Pages
- **Licenza**: MIT (uso personale)

---

📅 **Ultima modifica**: 2026-01-19
