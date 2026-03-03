#!/bin/bash
# Renames portfolio images from "title-tool-year.webp" → "title.webp"
# Also removes the duplicate files that have parentheses in their names.
# Run from: /Users/yair/.gemini/antigravity/scratch/zaks-portfolio
#
# Usage: bash scripts/rename-images.sh

set -e
IMG_DIR="public/images"

echo "──────────────────────────────────────────"
echo " Portfolio Image Renamer"
echo "──────────────────────────────────────────"

# Step 1: Delete any files with parentheses in the name (old duplicates)
echo ""
echo "► Removing files with parentheses (duplicates)..."
find "$IMG_DIR" -name "*(*" -o -name "*)*" | while read f; do
  echo "  DELETE: $f"
  rm "$f"
done

# Step 2: Rename clean files to title-only slug.
# Known mappings: expected-output → current-file-stem
# Format: "expected|current_stem" (file stem only, no extension)
declare -a RENAMES=(
  # drawing/medical
  "drawing/medical/colostomy|drawing/medical/colostomy-procreate-2025"
  "drawing/medical/colostomy-detail|drawing/medical/cosotomy-detail-procreate-2025"
  "drawing/medical/davinci|drawing/medical/davinci-pencil-2023"
  "drawing/medical/heartwork-in-the-garden|drawing/medical/heartwork-in-the-graden-color-pencil-2024-"
  "drawing/medical/intercostal-injection|drawing/medical/intercostal-injection-procreate-2024"
  "drawing/medical/intercostal-nerve-injection|drawing/medical/intercostal-nerve-injection-procreate-2023"
  "drawing/medical/necrotizing-fasciitis-diagram|drawing/medical/necrotizing-fasciitis-diagram-procreate-2023"

  # drawing/personal
  "drawing/personal/a-little-batty|drawing/personal/a-little-batty-color-pencil-2021"
  "drawing/personal/bang-yer-head|drawing/personal/bang-yer-head-pencil-2025"
  "drawing/personal/bucky|drawing/personal/bucky-pencil-2022"
  "drawing/personal/mfa-meltdown|drawing/personal/mfa-meltdown-procreate-2025"
  "drawing/personal/mischevious-miscreants|drawing/personal/mischevious-miscreants-color-pencil-2020-"
  "drawing/personal/spill-yer-guts|drawing/personal/spill-yer-guts-pencil-2025-"
  "drawing/personal/they-re-grreat|drawing/personal/they-re-grreat-pencil-2021"
  "drawing/personal/topsy-turvy-bike|drawing/personal/topsy-turvy-bike-pencil-2020-"
  "drawing/personal/touch-fuzzy|drawing/personal/touch-fuzzy-color-pencil-2025"

  # painting
  "painting/animal-mischief-sketch|painting/animal-mischief-sketch-procreate-2025"
  "painting/proteinz-in-motion|painting/proteinz-in-motion-acrylic-2023"
  "painting/hello-dumpling-mural/dragon-zodiac-mockup|painting/hello-dumpling-mural/dragon-zodiac-mockup-procreate-2024"
  "painting/hello-dumpling-mural/rabbit-zodiac|painting/hello-dumpling-mural/rabbit-zodiac-acrylic-on-fence-2023"
  "painting/hello-dumpling-mural/snake-zodiac|painting/hello-dumpling-mural/snake-zodiac-acrylic-on-fence-2025"
  "painting/hello-dumpling-mural/tiger-zodiac|painting/hello-dumpling-mural/tiger-zodiac-acrylic-on-fence-2022"

  # graphic-design/personal
  "graphic-design/personal/bigg-lyps-art-toy-poster|graphic-design/personal/bigg-lyps-art-toy-poster-illust-2026"
  "graphic-design/personal/infinity-1|graphic-design/personal/infinity-1-illustrator-2025"
  "graphic-design/personal/infinity-2|graphic-design/personal/infinity-2-illustrator-2025"
  "graphic-design/personal/infinity-3|graphic-design/personal/infinity-3-illustrator-2025"
  "graphic-design/personal/infinity-4|graphic-design/personal/infinity-4-illustrator-2025"
  "graphic-design/personal/intrusive-thoughts|graphic-design/personal/intrusive-thoughts-illust-2026"
  "graphic-design/personal/pepper-art-toy-poster|graphic-design/personal/pepper-art-toy-poster-illust-2026"
  "graphic-design/personal/street-sign-stickers|graphic-design/personal/street-sign-stickers-illust-2024"
  "graphic-design/personal/street-sign-stickers-2|graphic-design/personal/street-sign-stickers-2-illust-2024"
  "graphic-design/personal/vaporeon-logo-mockup|graphic-design/personal/vaporeon-logo-mockup-photoshop-illust-2025"
  "graphic-design/personal/who-do-i-know|graphic-design/personal/who-do-i-know-color-pencil-cardstock-2025"
  "graphic-design/personal/yiel-art-toy-poster|graphic-design/personal/yiel-art-toy-poster-illust-2026"

  # misc/3d
  "misc/3d/bird-and-bust|misc/3d/bird-and-bust-cinema4d-2022"
  "misc/3d/fatcap-turnaround|misc/3d/fatcap-turnaround-nomadsculpt-photoshop-2026"
  "misc/3d/highway-109|misc/3d/highway-109-cinema4d-2022"
  "misc/3d/neurons-firin|misc/3d/neurons-firin-cinema4d-2022"
  "misc/3d/pepper-turnaround|misc/3d/pepper-turnaround-nomadsculpt-photoshop"
  "misc/3d/rami-turnaround|misc/3d/rami-turnaround-nomadsculpt-photoshop-2026"
  "misc/3d/the-big-idea|misc/3d/the-big-idea-cinema4d-2022"
  "misc/3d/them-apples-neurons-firin|misc/3d/them-apples-neurons-firin-cinema4d-2022"
  "misc/3d/tooth|misc/3d/tooth-cinema4d-2022"
  "misc/3d/yiel-turnaround|misc/3d/yiel-turnaround-nomadsculpt-photoshop"

  # misc/photo
  "misc/photo/the-beauty-of-nature-or-whatever|misc/photo/the-beauty-of-nature-or-whatever-photo-2024"
  "misc/photo/all-in-my-hand|misc/photo/all-in-my-hand-photo-2024"
  "misc/photo/bedroom|misc/photo/bedroom-photo-2024"
  "misc/photo/candid|misc/photo/candid-photo-2024"
  "misc/photo/drip|misc/photo/drip-photo-2024"
  "misc/photo/gigi|misc/photo/gigi-photo-2024"
  "misc/photo/layla|misc/photo/layla-photo-2024"
  "misc/photo/leftovers|misc/photo/leftovers-photo-2024"
  "misc/photo/lynn|misc/photo/lynn-photo-2024"
  "misc/photo/michelle|misc/photo/michelle-photo-2024"
  "misc/photo/peter|misc/photo/peter-photo-2024"
  "misc/photo/sharan|misc/photo/sharan-photo-2024"
  "misc/photo/speed-limit|misc/photo/speed-limit-photo-2024"
)

echo ""
echo "► Renaming files..."
for pair in "${RENAMES[@]}"; do
  target="${pair%%|*}"
  source="${pair##*|}"
  src="$IMG_DIR/${source}.webp"
  dst="$IMG_DIR/${target}.webp"

  if [ -f "$src" ]; then
    if [ "$src" != "$dst" ]; then
      mv "$src" "$dst"
      echo "  ✓ $(basename $dst)"
    else
      echo "  = $(basename $dst) (already correct)"
    fi
  else
    echo "  ⚠ NOT FOUND: $src"
  fi
done

echo ""
echo "── Done! Refresh http://localhost:5174 to see your images. ──"
