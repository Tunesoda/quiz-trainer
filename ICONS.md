# 🎨 Guida Generazione Icone PWA

Le icone sono necessarie per l'installazione della PWA sul telefono.

## File Necessari

Devi avere questi file in `public/`:
- `icon-192.png` (192x192 pixel)
- `icon-512.png` (512x512 pixel)  
- `apple-touch-icon.png` (180x180 pixel)
- `icon.svg` (già presente)

## Opzione 1: Generazione Automatica (Linux/Mac)

Se hai ImageMagick o librsvg installato:

```bash
cd public
./generate-icons.sh
```

## Opzione 2: Conversione Online (RACCOMANDATO)

1. Vai su https://cloudconvert.com/svg-to-png
2. Carica `public/icon.svg`
3. Converti in PNG con queste dimensioni:
   - 192x192 → salva come `icon-192.png`
   - 512x512 → salva come `icon-512.png`
   - 180x180 → salva come `apple-touch-icon.png`
4. Metti i file generati in `public/`

## Opzione 3: Usa GIMP/Photoshop

1. Apri `icon.svg` con GIMP o Photoshop
2. Esporta in PNG alle dimensioni richieste
3. Salva in `public/`

## Opzione 4: Icone Già Pronte (Temporaneo)

Se hai fretta, puoi usare queste icone placeholder:

1. Scarica da: https://via.placeholder.com/192 → `icon-192.png`
2. Scarica da: https://via.placeholder.com/512 → `icon-512.png`
3. Scarica da: https://via.placeholder.com/180 → `apple-touch-icon.png`

**Nota**: Sostituiscile con icone personalizzate appena possibile!

## Verifica

Controlla che i file siano in `public/`:
```
public/
├── icon.svg ✅
├── icon-192.png ✅
├── icon-512.png ✅
└── apple-touch-icon.png ✅
```

## Personalizzazione

Se vuoi cambiare l'emoji dell'icona:
1. Apri `public/icon.svg`
2. Cambia 🎓 con un altro emoji
3. Rigenera le PNG

Emoji consigliate: 📚 📖 ✍️ 🎯 📝 💡

---

**IMPORTANTE**: Le icone devono essere generate prima del deploy su GitHub Pages!
