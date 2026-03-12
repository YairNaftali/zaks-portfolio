/**
 * find-new.cjs
 * Prints every image file on disk that is NOT referenced in portfolio.json.
 * Excludes site-asset images (halftone, zak portrait).
 */
const fs   = require('fs');
const path = require('path');

const ROOT      = path.resolve(__dirname, '..');
const IMG_DIR   = path.join(ROOT, 'public/images');
const JSON_PATH = path.join(ROOT, 'public/data/portfolio.json');

const SKIP = new Set([
    '/images/halftone-fading.webp',
    '/images/halftone-original.png',
    '/images/halftone-original.webp',
    '/images/halftone.webp',
    '/images/zak.webp',
]);

function walk(dir) {
    const out = [];
    for (const e of fs.readdirSync(dir)) {
        if (e.startsWith('.')) continue;
        const full = path.join(dir, e);
        if (fs.statSync(full).isDirectory()) out.push(...walk(full));
        else out.push('/images/' + path.relative(IMG_DIR, full));
    }
    return out;
}

const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const referenced = new Set();
function collectRefs(e) {
    if (e.image) referenced.add(e.image);
    if (e.items) e.items.forEach(collectRefs);
}
data.forEach(collectRefs);

const newFiles = walk(IMG_DIR).filter(p => !SKIP.has(p) && !referenced.has(p));
newFiles.forEach(p => console.log(p));
