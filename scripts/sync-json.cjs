/**
 * sync-json.cjs
 * Removes every portfolio.json entry (or project sub-item) whose image file
 * does not exist on disk. Projects that lose all sub-items are dropped.
 * Project cover images are updated to the first surviving sub-item.
 */

const fs   = require('fs');
const path = require('path');

const ROOT      = path.resolve(__dirname, '..');
const IMG_DIR   = path.join(ROOT, 'public/images');
const JSON_PATH = path.join(ROOT, 'public/data/portfolio.json');

// ── Build a set of every web path that exists on disk ────────────────────────
function walk(dir) {
    const out = [];
    for (const e of fs.readdirSync(dir)) {
        if (e.startsWith('.')) continue;
        const full = path.join(dir, e);
        if (fs.statSync(full).isDirectory()) out.push(...walk(full));
        else out.push(full);
    }
    return out;
}

const onDisk = new Set(
    walk(IMG_DIR).map(f => '/images/' + path.relative(IMG_DIR, f))
);

// ── Process portfolio.json ────────────────────────────────────────────────────
const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

let removedItems = 0;
let removedProjects = 0;
const before = data.length;

const synced = data.reduce((acc, entry) => {
    if (entry.type === 'item') {
        if (!entry.image || onDisk.has(entry.image)) {
            acc.push(entry);
        } else {
            console.log(`  ✗ item removed:   ${entry.title} (${entry.image})`);
            removedItems++;
        }
        return acc;
    }

    if (entry.type === 'project') {
        // Filter sub-items
        const before = entry.items.length;
        entry.items = entry.items.filter(sub => {
            if (!sub.image || onDisk.has(sub.image)) return true;
            console.log(`  ✗ sub-item removed from "${entry.title}": ${sub.title} (${sub.image})`);
            removedItems++;
            return false;
        });

        if (entry.items.length === 0) {
            console.log(`  ✗ project removed (no items left): ${entry.title}`);
            removedProjects++;
            return acc;
        }

        // Update cover image if it's now missing
        if (!entry.image || !onDisk.has(entry.image)) {
            entry.image = entry.items[0].image;
            console.log(`  ↻ cover updated for "${entry.title}": ${entry.image}`);
        }

        acc.push(entry);
        return acc;
    }

    acc.push(entry); // unknown type — keep as-is
    return acc;
}, []);

fs.writeFileSync(JSON_PATH, JSON.stringify(synced, null, 2) + '\n');

console.log(`\n✓ Done. ${removedItems} items removed, ${removedProjects} projects removed.`);
console.log(`  portfolio.json: ${before} → ${synced.length} top-level entries`);
