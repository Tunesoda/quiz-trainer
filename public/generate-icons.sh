#!/bin/bash
# Genera icone PNG dalle SVG usando ImageMagick o rsvg-convert

# Nota: questo script richiede imagemagick o librsvg installato
# Su Ubuntu: sudo apt-get install imagemagick librsvg2-bin

if command -v convert &> /dev/null; then
    echo "Usando ImageMagick..."
    convert -background none icon.svg -resize 192x192 icon-192.png
    convert -background none icon.svg -resize 512x512 icon-512.png
    convert -background none icon.svg -resize 180x180 apple-touch-icon.png
    echo "✅ Icone generate con successo!"
elif command -v rsvg-convert &> /dev/null; then
    echo "Usando librsvg..."
    rsvg-convert -w 192 -h 192 icon.svg -o icon-192.png
    rsvg-convert -w 512 -h 512 icon.svg -o icon-512.png
    rsvg-convert -w 180 -h 180 icon.svg -o apple-touch-icon.png
    echo "✅ Icone generate con successo!"
else
    echo "⚠️ ImageMagick o librsvg non trovati."
    echo "Usa un servizio online per convertire icon.svg in PNG:"
    echo "- https://cloudconvert.com/svg-to-png"
    echo "- Genera: icon-192.png (192x192), icon-512.png (512x512), apple-touch-icon.png (180x180)"
fi
