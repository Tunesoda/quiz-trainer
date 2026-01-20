# ⚡ Quick Start - 5 Minuti per Avere l'App Online!

## Prima di Iniziare
- ✅ Account GitHub: `Tunesoda` ✅

## 🚀 Deploy in 5 Step

### 1️⃣ Genera le Icone (OPZIONALE ma raccomandato)

**Opzione A - Online** (2 minuti):
1. Vai su https://cloudconvert.com/svg-to-png
2. Carica `public/icon.svg`
3. Converti in 192x192, 512x512, 180x180
4. Scarica e metti in `public/` con nomi:
   - `icon-192.png`
   - `icon-512.png`
   - `apple-touch-icon.png`

**Opzione B - Salta** (puoi farlo dopo):
L'app funzionerà comunque, solo le icone potrebbero non apparire perfette.

### 2️⃣ Crea Repository GitHub

1. Vai su https://github.com/new
2. Nome: `quiz-trainer`
3. Public
4. **NON** selezionare "Add README"
5. Create repository

### 3️⃣ Carica Codice

Apri terminale nella cartella `quiz-trainer`:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Tunesoda/quiz-trainer.git
git push -u origin main
```

**Nota**: Se chiede password, usa un [Personal Access Token](https://github.com/settings/tokens)

### 4️⃣ Attiva GitHub Pages

1. Vai su https://github.com/Tunesoda/quiz-trainer/settings/pages
2. Source: **"GitHub Actions"** (NON "Deploy from a branch")
3. Salva

### 5️⃣ Attendi Deploy

1. Vai su https://github.com/Tunesoda/quiz-trainer/actions
2. Guarda il workflow in esecuzione (2-3 minuti)
3. Quando vedi ✅ → FATTO!

## 🎉 App Online!

Apri: **https://tunesoda.github.io/quiz-trainer/**

## 📱 Installa sul Telefono

### Android (Chrome):
Menu (⋮) → "Aggiungi a Home"

### iPhone (Safari):
Condividi → "Aggiungi a Home"

## 🆘 Problemi?

### Deploy fallisce?
- Controlla Actions per vedere l'errore
- Riprova: `git commit --allow-empty -m "Retry" && git push`

### Icone mancanti?
- Genera le PNG e ripeti step 3 (git add/commit/push)

### App non si vede?
- Attendi 5 minuti
- Ricarica con Ctrl+F5

## 📚 Documenti Utili

- **DEPLOY.md** → Guida completa deploy
- **README.md** → Documentazione app
- **ICONS.md** → Come generare icone
- **NOTES.md** → Note tecniche

## ✅ Checklist Rapida

- [ ] Icone generate (opzionale)
- [ ] Repository creato
- [ ] Codice pushato
- [ ] GitHub Pages attivato
- [ ] Workflow completato ✅
- [ ] App accessibile online
- [ ] App installata su telefono

## 🎯 Fatto!

Ora hai l'app sempre con te per studiare ovunque! 

**Prossimi step:**
1. Fai un backup dei dati (Impostazioni → Esporta)
2. Inizia a fare quiz!
3. Controlla le statistiche per monitorare i progressi

---

**Tempo totale**: ~5 minuti (o 10 con le icone) ⚡

Buono studio! 🎓
