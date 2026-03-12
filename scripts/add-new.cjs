/**
 * add-new.cjs
 * Adds every on-disk image that is not yet referenced in portfolio.json.
 */
const fs   = require('fs');
const path = require('path');

const ROOT      = path.resolve(__dirname, '..');
const JSON_PATH = path.join(ROOT, 'public/data/portfolio.json');

const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

// ── Helper: parse a human-readable title from a kebab filename ───────────────
function titleFromKebab(fname) {
    const stem = path.basename(fname, path.extname(fname));
    // strip trailing -modified / -copy / -YYYY
    const cleaned = stem
        .replace(/-modified$/, '')
        .replace(/-copy$/, '')
        .replace(/-\d{4}$/, '');
    return cleaned
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}

// ── New images to insert ──────────────────────────────────────────────────────

// 1. Adrian Album Covers — add two new "final" images at front of items list
{
    const proj = data.find(e => e.type === 'project' && e.title === 'Adrian Album Covers');
    const newItems = [
        {
            title: 'Final Cover Front & Back',
            tool: 'illustrator',
            date: '2025',
            image: '/images/graphic-design/professional/adrian-album-covers/adrian-albums-web-49.webp'
        },
        {
            title: 'Final Gatefold',
            tool: 'illustrator',
            date: '2025',
            image: '/images/graphic-design/professional/adrian-album-covers/adrian-albums-web-39.webp'
        },
    ];
    proj.items.unshift(...newItems);
    proj.image = newItems[0].image;
    console.log(`✓ Added ${newItems.length} items to "Adrian Album Covers"`);
}

// 2. Martin Kindley Logo — add the four new variant images as extra concepts
{
    const proj = data.find(e => e.type === 'project' && e.title === 'Martin Kindley Logo');
    const newItems = [
        {
            title: 'Concept 1',
            tool: 'illustrator',
            date: '2025',
            image: '/images/graphic-design/professional/martin-kindley-logo/martin-kindley-logo-concept-1-illustrator-2025-modified.webp'
        },
        {
            title: 'Concept 3',
            tool: 'illustrator',
            date: '2025',
            image: '/images/graphic-design/professional/martin-kindley-logo/martin-kindley-logo-concept-3-illustrator-2025-modified.webp'
        },
        {
            title: 'Concept 3 (Alt)',
            tool: 'illustrator',
            date: '2025',
            image: '/images/graphic-design/professional/martin-kindley-logo/martin-kindley-logo-concept-3-illustrator-2025-copy.webp'
        },
        {
            title: 'Concept 4',
            tool: 'illustrator',
            date: '2025',
            image: '/images/graphic-design/professional/martin-kindley-logo/martin-kindley-logo-concept-4-illustrator-2025-modified.webp'
        },
    ];
    // Insert before the existing concept-4 entry so final is still first
    proj.items.push(...newItems);
    console.log(`✓ Added ${newItems.length} items to "Martin Kindley Logo"`);
}

// 3. Sensory Days Dallas Logo — add concept 1–4 to the project
{
    const proj = data.find(e => e.type === 'project' && e.title === 'Sensory Days Dallas Logo');
    const newItems = [
        {
            title: 'Logo Concepts',
            tool: 'illustrator',
            date: '2025',
            image: '/images/graphic-design/professional/sensory-days-dallas-logo/sensory-days-dallas-concept-1-illustrator-2025.webp'
        },
        {
            title: 'Concept 2',
            tool: 'illustrator',
            date: '2025',
            image: '/images/graphic-design/professional/sensory-days-dallas-logo/sensory-days-dallas-concept-2-illustrator-2025.webp'
        },
        {
            title: 'Concept 3',
            tool: 'illustrator',
            date: '2025',
            image: '/images/graphic-design/professional/sensory-days-dallas-logo/sensory-days-dallas-concept-3-illustrator-2025.webp'
        },
        {
            title: 'Concept 4',
            tool: 'illustrator',
            date: '2025',
            image: '/images/graphic-design/professional/sensory-days-dallas-logo/sensory-days-dallas-concept-4-illustrator-2025.webp'
        },
    ];
    proj.items.unshift(...newItems);
    proj.image = newItems[0].image;
    console.log(`✓ Added ${newItems.length} items to "Sensory Days Dallas Logo"`);
}

// 4. Misc / Photo — add Embrace and Speed Limit as standalone items
{
    const insertIdx = data.findIndex(e => e.type === 'item' && e.category === 'misc' && e.subcategory === 'photo');
    const newItems = [
        {
            type: 'item',
            title: 'Embrace',
            category: 'misc',
            subcategory: 'photo',
            tool: 'photo',
            date: '2024',
            description: '',
            image: '/images/misc/photo/embrace-2024-photo.webp'
        },
        {
            type: 'item',
            title: 'Speed Limit',
            category: 'misc',
            subcategory: 'photo',
            tool: 'photo',
            date: '2024',
            description: '',
            image: '/images/misc/photo/speed-limit-photo-2024.webp'
        },
    ];
    if (insertIdx !== -1) {
        data.splice(insertIdx, 0, ...newItems);
    } else {
        data.push(...newItems);
    }
    console.log(`✓ Added ${newItems.length} photo items to misc/photo`);
}

fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2) + '\n');
console.log('\n✓ portfolio.json updated');
