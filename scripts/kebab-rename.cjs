#!/usr/bin/env node
/**
 * kebab-rename.cjs
 * 1. Deletes all tracked (kebab-named) image files that already exist in git.
 * 2. Renames every untracked original file to kebab-case in-place,
 *    routing project-group files into their correct subdirectories.
 * 3. Strips leading display-order prefixes like "(3) " before converting.
 * 4. Patches portfolio.json image paths to match the new filenames/locations.
 */

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT   = path.resolve(__dirname, '..');
const IMAGES = path.join(ROOT, 'public/images');

// ── Helpers ──────────────────────────────────────────────────────────────────

function toKebab(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

function walk(dir) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    for (const e of fs.readdirSync(dir)) {
        if (e.startsWith('.')) continue;
        const full = path.join(dir, e);
        if (fs.statSync(full).isDirectory()) out.push(...walk(full));
        else out.push(full);
    }
    return out;
}

// ── Step 1: Delete tracked kebab image files ─────────────────────────────────

const tracked = execSync('git ls-files public/images/', { cwd: ROOT })
    .toString().trim().split('\n').filter(Boolean);

let deleted = 0;
for (const rel of tracked) {
    const abs = path.join(ROOT, rel);
    if (fs.existsSync(abs)) { fs.unlinkSync(abs); deleted++; }
}
console.log(`✓ Deleted ${deleted} tracked files`);

// Clean up empty dirs
try { execSync('find public/images -type d -empty -delete', { cwd: ROOT }); } catch {}

// ── Step 2: Compute rename targets for remaining originals ───────────────────

/**
 * Returns the project subdirectory slug for a file that lives directly
 * inside a parent dir but should be nested into a project folder.
 */
function projectSubdir(basename, relParentDir) {
    const b = basename.toLowerCase();
    if (relParentDir === 'graphic-design/professional') {
        if (/free first saturdays/.test(b))                          return 'ffs-ads';
        if (/antony gormley ad detail/.test(b))                     return 'antony-gormley-ads';
        if (/gormley brochure/.test(b))                             return 'antony-gormley-brochure';
        if (/nasher mini brochure/.test(b))                         return 'nasher-mini-brochure';
        if (/nasher pride/.test(b))                                 return 'nasher-pride-zine';
        if (/martin kindley/.test(b))                               return 'martin-kindley-logo';
        if (/sensory days/.test(b))                                 return 'sensory-days-dallas-logo';
        if (/adrian (early concept|albums web|final album)/.test(b)) return 'adrian-album-covers';
        if (/adra?in groovin/.test(b))                              return 'adrian-groovin';
    }
    if (relParentDir === 'graphic-design/personal') {
        if (/^stickers/.test(b)) return 'street-sign-stickers';
    }
    return null;
}

const originals = walk(IMAGES);
console.log(`✓ Found ${originals.length} original files to process`);

const renames = [];
const seenTarget = new Map(); // targetPath → source path

for (const src of originals.sort()) {
    const dir     = path.dirname(src);
    const base    = path.basename(src);
    const ext     = path.extname(base);
    const relDir  = path.relative(IMAGES, dir);

    // Strip leading "(N) " display-order prefix
    const stem    = path.basename(base, ext).replace(/^\(\d+\)\s*/, '');
    const newName = toKebab(stem) + ext;

    const sub        = projectSubdir(base, relDir);
    const tgtRelDir  = sub ? path.join(relDir, sub) : relDir;
    const tgtDir     = path.join(IMAGES, tgtRelDir);
    const tgtPath    = path.join(tgtDir, newName);

    if (seenTarget.has(tgtPath)) {
        console.warn(`  ⚠ COLLISION: "${base}" → "${newName}" already claimed by "${path.basename(seenTarget.get(tgtPath))}"`);
        continue;
    }
    seenTarget.set(tgtPath, src);

    if (src !== tgtPath) renames.push({ src, tgtDir, tgtPath });
}

// ── Step 3: Execute renames ──────────────────────────────────────────────────

for (const { src, tgtDir, tgtPath } of renames) {
    fs.mkdirSync(tgtDir, { recursive: true });
    fs.renameSync(src, tgtPath);
}
console.log(`✓ Renamed ${renames.length} files`);

// ── Step 4: Build on-disk index: basename → web path ────────────────────────

const fileIndex = new Map();
for (const f of walk(IMAGES)) {
    fileIndex.set(path.basename(f), '/images/' + path.relative(IMAGES, f));
}

// ── Step 5: Sticker special-case mapping ─────────────────────────────────────
// portfolio.json had stickers-recovered-18 … -26 + stickers-recovered (10 entries).
// Originals stickers (1)…(10) rename to stickers-1…stickers-10.
// Map by position so every slot gets a real image.

const STICKER_SUBDIR = '/images/graphic-design/personal/street-sign-stickers/';
const stickerOldNames = [
    'stickers-recovered-18.webp', 'stickers-recovered-19.webp',
    'stickers-recovered-20.webp', 'stickers-recovered-21.webp',
    'stickers-recovered-22.webp', 'stickers-recovered-23.webp',
    'stickers-recovered-24.webp', 'stickers-recovered-25.webp',
    'stickers-recovered-26.webp', 'stickers-recovered.webp',
];
const stickerNewPaths = Array.from({ length: 10 }, (_, i) => `${STICKER_SUBDIR}stickers-${i + 1}.webp`);
const stickerMap = new Map(stickerOldNames.map((old, i) => [old, stickerNewPaths[i]]));

// ── Step 6: Patch portfolio.json ─────────────────────────────────────────────

const JSON_PATH  = path.join(ROOT, 'public/data/portfolio.json');
const data       = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
let patchCount   = 0;
const unresolved = [];

function fixPath(imgPath) {
    if (!imgPath) return imgPath;

    const bname = path.basename(imgPath);

    // Sticker special case
    if (stickerMap.has(bname)) { patchCount++; return stickerMap.get(bname); }

    // File already exists at declared path → nothing to do
    if (fs.existsSync(path.join(ROOT, 'public', imgPath))) return imgPath;

    // Basename lookup
    if (fileIndex.has(bname)) { patchCount++; return fileIndex.get(bname); }

    // Genuinely missing
    unresolved.push(imgPath);
    return imgPath;
}

function fixEntry(e) {
    if (e.image) e.image = fixPath(e.image);
    if (e.items) e.items.forEach(fixEntry);
}
data.forEach(fixEntry);

fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2) + '\n');
console.log(`✓ Patched ${patchCount} paths in portfolio.json`);

if (unresolved.length) {
    console.log(`\n⚠  ${unresolved.length} paths have no matching file on disk:`);
    unresolved.forEach(p => console.log('   ', p));
    console.log('\nThese portfolio entries will show placeholder images until their files are supplied.');
}

console.log('\n✓ Done!');
