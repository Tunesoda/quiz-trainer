# 🚀 Guida Rapida al Deploy

## Prima di iniziare

Assicurati di avere:
- ✅ Un account GitHub (già ce l'hai: Tunesoda)
- ✅ Git installato sul computer
- ✅ Il codice del progetto

## 📝 Step-by-Step

### STEP 1: Crea il Repository su GitHub

1. Vai su https://github.com/new
2. **Repository name**: `quiz-trainer`
3. **Public** (selezionato)
4. **NON** selezionare "Add README"
5. Clicca **"Create repository"**

### STEP 2: Carica il Codice (dal tuo computer)

Apri il terminale nella cartella `quiz-trainer` ed esegui questi comandi:

```bash
git init
git add .
git commit -m "Initial commit - Quiz Trainer PWA"
git branch -M main
git remote add origin https://github.com/Tunesoda/quiz-trainer.git
git push -u origin main
```

Se Git ti chiede username e password:
- Username: `Tunesoda`
- Password: usa un **Personal Access Token** (vedi sotto)

#### Come creare un Personal Access Token:
1. Vai su https://github.com/settings/tokens
2. Clicca "Generate new token" → "Generate new token (classic)"
3. Nome: `quiz-trainer-deploy`
4. Seleziona scope: `repo` (tutto)
5. Clicca "Generate token"
6. **COPIA IL TOKEN** (lo vedi solo una volta!)
7. Usalo come password quando Git te lo chiede

### STEP 3: Configura GitHub Pages

1. Vai su https://github.com/Tunesoda/quiz-trainer
2. Clicca su **"Settings"**
3. Nel menu laterale → **"Pages"**
4. Sotto "Build and deployment":
   - Source: **"GitHub Actions"** (NON "Deploy from branch")
5. Fatto! Non serve altro qui.

### STEP 4: Verifica il Deploy

1. Vai su https://github.com/Tunesoda/quiz-trainer/actions
2. Dovresti vedere il workflow "Deploy to GitHub Pages" in esecuzione
3. Attendi 2-3 minuti
4. Quando vedi la spunta verde ✅, il deploy è completato!

### STEP 5: Accedi all'App

L'app è online a questo URL:
```
https://tunesoda.github.io/quiz-trainer/
```

## 🎉 Fatto!

L'app è online e funzionante. Ora puoi:
1. Aprire l'URL sul telefono
2. Installare l'app (vedi README)
3. Iniziare a studiare ovunque!

## 🔄 Come aggiornare l'app in futuro

Quando vuoi aggiornare (es. aggiungere domande):

```bash
# Fai le modifiche ai file
git add .
git commit -m "Aggiunta nuove domande"
git push
```

L'app si aggiornerà automaticamente in 2-3 minuti!

## ❓ Problemi Comuni

### "Permission denied" durante git push
- Hai usato il Personal Access Token come password?
- Il token ha i permessi giusti (scope `repo`)?

### Il workflow fallisce
- Controlla su Actions quale step è fallito
- Potrebbe essere un errore nel codice
- Riprova con: `git push --force`

### L'app non si vede all'URL
- Attendi 5 minuti dopo il deploy
- Ricarica la pagina con Ctrl+F5 (forza refresh)
- Controlla che GitHub Pages sia configurato correttamente

## 📱 Installazione su Telefono

### Android
1. Apri Chrome
2. Vai su `https://tunesoda.github.io/quiz-trainer/`
3. Menu (⋮) → "Aggiungi a Home"
4. Fatto!

### iPhone
1. Apri Safari
2. Vai su `https://tunesoda.github.io/quiz-trainer/`
3. Pulsante Condividi → "Aggiungi a Home"
4. Fatto!

## 💾 Backup Dati

**IMPORTANTE**: Esporta i dati regolarmente!

1. Apri l'app
2. Vai in Impostazioni
3. "Esporta Dati"
4. Salva il file JSON in un posto sicuro

## 🆘 Serve Aiuto?

Se hai problemi:
1. Controlla questa guida
2. Leggi il README.md
3. Apri una Issue su GitHub

---

## 🎯 Checklist Veloce

- [ ] Repository creato su GitHub
- [ ] Codice pushato con git
- [ ] GitHub Pages configurato (Source: GitHub Actions)
- [ ] Workflow eseguito con successo (Actions)
- [ ] App accessibile all'URL
- [ ] App installata sul telefono
- [ ] Primo backup dei dati fatto

✅ Tutto fatto? Sei pronto per studiare ovunque!
