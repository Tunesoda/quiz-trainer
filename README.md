# 🎓 Quiz Trainer MIC - PWA

Progressive Web App per la preparazione al concorso del Ministero della Cultura - 1500 posti.

## ✨ Caratteristiche

- ✅ **Funziona offline** - Studia ovunque, anche senza connessione
- 📱 **Installabile** - Si installa sul telefono come un'app nativa
- 💾 **Salvataggio automatico** - I progressi sono salvati in locale
- 🌙 **Dark mode** - Design moderno con modalità chiara opzionale
- 📊 **Statistiche dettagliate** - Monitora i tuoi progressi
- 🎯 **6 modalità di quiz** - Completo, per categoria, errori, omesse, random, normativa
- ⚡ **Veloce e leggera** - Ottimizzata per mobile

## 🚀 Deploy su GitHub Pages

### 1. Crea il repository su GitHub

1. Vai su https://github.com/Tunesoda
2. Clicca su "New repository"
3. Nome repository: `quiz-trainer`
4. Seleziona "Public"
5. **NON** selezionare "Initialize with README"
6. Clicca "Create repository"

### 2. Carica il codice

Apri il terminale nella cartella del progetto ed esegui:

```bash
# Inizializza git
git init

# Aggiungi tutti i file
git add .

# Fai il primo commit
git commit -m "Initial commit - Quiz Trainer PWA"

# Collega al repository GitHub
git remote add origin https://github.com/Tunesoda/quiz-trainer.git

# Pusha il codice
git branch -M main
git push -u origin main
```

### 3. Configura GitHub Pages

1. Vai su https://github.com/Tunesoda/quiz-trainer
2. Clicca su "Settings" (Impostazioni)
3. Nel menu laterale, clicca su "Pages"
4. In "Source", seleziona "GitHub Actions"

### 4. Crea il workflow di deploy

1. Nella tua repository, vai su "Actions"
2. Clicca su "New workflow"
3. Clicca su "set up a workflow yourself"
4. Incolla questo contenuto:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

5. Salva il file come `.github/workflows/deploy.yml`
6. Committa il file

### 5. Attendi il deploy

- Il deploy inizierà automaticamente
- Vai su "Actions" per vedere il progresso
- Dopo 2-3 minuti, l'app sarà online!

### 6. Accedi all'app

La tua app sarà disponibile all'indirizzo:
```
https://tunesoda.github.io/quiz-trainer/
```

## 📱 Come installare l'app sul telefono

### Android (Chrome)
1. Apri l'URL nel browser Chrome
2. Tocca il menu (⋮) in alto a destra
3. Seleziona "Aggiungi a Home" o "Installa app"
4. Conferma
5. L'icona apparirà nella schermata home!

### iOS (Safari)
1. Apri l'URL in Safari
2. Tocca il pulsante "Condividi" (quadrato con freccia)
3. Scorri e tocca "Aggiungi alla schermata Home"
4. Conferma
5. L'icona apparirà nella schermata home!

## 🛠️ Sviluppo Locale

Se vuoi testare l'app localmente prima del deploy:

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Apri http://localhost:5173
```

Per creare la build di produzione:

```bash
npm run build
npm run preview
```

## 📂 Struttura del Progetto

```
quiz-trainer/
├── public/              # File statici (icone, manifest)
├── src/
│   ├── components/      # Componenti React
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── QuizPage.jsx
│   │   ├── QuizSetup.jsx
│   │   ├── QuizQuestion.jsx
│   │   ├── QuizResults.jsx
│   │   ├── Statistics.jsx
│   │   └── Settings.jsx
│   ├── data/           # Database domande
│   │   └── domande.json
│   ├── styles/         # CSS
│   │   └── index.css
│   ├── utils/          # Utility functions
│   │   └── storage.js
│   ├── App.jsx         # Componente principale
│   └── main.jsx        # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 💾 Gestione Dati

L'app usa **localStorage** per salvare:
- Progressi delle domande (risposte errate, omesse)
- Statistiche dei quiz completati
- Preferenze utente (tema)

### Backup e Sincronizzazione

Per sincronizzare i dati tra dispositivi:

1. Nel dispositivo A: vai in Impostazioni → Esporta Dati
2. Invia il file JSON al dispositivo B (email, cloud, ecc.)
3. Nel dispositivo B: vai in Impostazioni → Importa Dati
4. Seleziona il file JSON

**Consiglio**: Fai backup regolari esportando i dati!

## 🔄 Aggiornamenti Futuri

Per aggiornare l'app dopo modifiche:

```bash
# Fai le modifiche al codice
git add .
git commit -m "Descrizione modifiche"
git push

# Il deploy automatico partirà
```

L'app si aggiornerà automaticamente al prossimo accesso degli utenti.

## 🎯 Modalità Quiz

1. **Quiz Completo** - Tutte le 471 domande
2. **Per Categoria** - Filtra per argomento specifico
3. **Solo Errori** - Ripassa le domande sbagliate (PRIORITÀ!)
4. **Solo Omesse** - Recupera le domande saltate
5. **Quiz Random** - 10 domande casuali per allenamento
6. **Cerca Normativa** - Filtra per riferimento normativo

## 📊 Sistema Punteggi

- Risposta corretta: **+0.75 punti** (situazionali +1)
- Risposta errata: **-0.25 punti** (situazionali -1)
- Domanda omessa: **0 punti**

## 🐛 Troubleshooting

### L'app non si installa
- Assicurati di usare Chrome/Safari
- Prova a ricaricare la pagina
- Controlla che sia HTTPS

### I dati non si salvano
- Controlla che il browser non sia in modalità incognito
- Verifica che localStorage sia abilitato
- Prova a fare un backup/restore

### L'app non funziona offline
- Apri l'app online almeno una volta
- Attendi che tutti i file siano scaricati
- Ricarica la pagina

## 👤 Autore

Alessio - Preparazione Concorso MIC 2026

## 📄 Licenza

MIT License - Uso libero per scopo di studio personale

---

## 🎓 Buono Studio!

Per qualsiasi problema o domanda, apri una Issue su GitHub.
