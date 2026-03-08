// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO DATA
// type: 'item'    → single piece (has title, tool, date, description, image?)
// type: 'project' → a folder of related pieces (has title, items: [...])
// ─────────────────────────────────────────────────────────────────────────────
let portfolioItems = [];
let shuffledItems = [];

async function loadPortfolioData() {
    try {
        const res = await fetch('/data/portfolio.json');
        portfolioItems = await res.json();

        // Shuffled copy used only for the main 'all' view
        shuffledItems = [...portfolioItems];
        for (let i = shuffledItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
        }
    } catch (err) {
        console.error("Failed to load portfolio data", err);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE PATH HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function toSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function buildImagePath(item, parentProject = null) {
    if (item.image) return item.image;
    const cat = toSlug(parentProject ? parentProject.category : item.category);
    const sub = parentProject
        ? `/${toSlug(parentProject.subcategory || parentProject.title)}/${toSlug(item.title)}`
        : (item.subcategory ? `/${toSlug(item.subcategory)}/${toSlug(item.title)}` : `/${toSlug(item.title)}`);
    return `/images/${cat}${sub}.webp`;
}

function fallbackSrc(category, label) {
    const colors = { illustration: 'E8D5CF/B23C22', 'graphic design': 'D4B8B1/B23C22', misc: 'C9A89E/7A2015' };
    return `https://placehold.co/600x600/${colors[category] || 'F1D0C9/B23C22'}?text=${encodeURIComponent(label.slice(0, 18))}`;
}

// Render an img tag with data-src (src is set by JS after testing load)
function imgTag(src, alt, fallback) {
    return `<img data-src="${src}" data-fallback="${fallback}" alt="${alt}" />`;
}

// Shared IntersectionObserver — fires only when an image is ~300px from view
const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        const src = img.dataset.src;
        const fallback = img.dataset.fallback;
        const reveal = (resolvedSrc) => {
            img.src = resolvedSrc;
            requestAnimationFrame(() => requestAnimationFrame(() => img.classList.add('loaded')));
        };
        const test = new Image();
        test.onload = () => reveal(src);
        test.onerror = () => reveal(fallback);
        test.src = src;
        imgObserver.unobserve(img);
    });
}, { rootMargin: '300px 0px' });

// Register all data-src images in container with the observer
function loadGalleryImages(container) {
    container.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX / PROJECT MODAL
// ─────────────────────────────────────────────────────────────────────────────
let currentProject = null;
let currentGalleryItems = [];

const projectNodeCache = new Map();

function openProject(projectTitle) {
    currentProject = portfolioItems.find(p => p.type === 'project' && p.title === projectTitle);
    if (!currentProject) return;

    openSpreadViewer(currentProject);
}

function closeModal() {
    document.getElementById('project-modal').classList.remove('open');
    document.body.style.overflow = '';
    document.body.style.overflowY = 'auto';
}

// ─────────────────────────────────────────────────────────────────────────────
// SPREAD VIEWER  (for brochures, zines, anything with spreads)
// ─────────────────────────────────────────────────────────────────────────────
const spreadNodeCache = new Map();

function openSpreadViewer(project) {
    document.getElementById('spread-title').textContent = project.title;
    const desc = document.getElementById('spread-desc');
    desc.textContent = project.description || '';
    desc.style.display = project.description ? '' : 'none';

    const scroll = document.getElementById('spread-scroll');
    scroll.innerHTML = '';

    if (spreadNodeCache.has(project.title)) {
        scroll.appendChild(spreadNodeCache.get(project.title));
    } else {
        const container = document.createElement('div');
        container.style.display = 'contents';
        container.innerHTML = project.items.map((sub, i) => {
            const src = sub.image || buildImagePath(sub, project);
            const fb = fallbackSrc(project.category, sub.title);
            const meta = [sub.tool, sub.date].filter(Boolean).join(' · ');
            return `
        <div class="spread-img-wrap">
          ${imgTag(src, sub.title, fb)}
          <p class="spread-caption">${sub.title}${meta ? ' &nbsp;·&nbsp; ' + meta : ''}</p>
        </div>`;
        }).join('');

        spreadNodeCache.set(project.title, container);
        scroll.appendChild(container);
        loadGalleryImages(container);
    }

    scroll.scrollTop = 0;
    document.getElementById('spread-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSpreadViewer() {
    document.getElementById('spread-modal').classList.remove('open');
    document.body.style.overflow = '';
    document.body.style.overflowY = 'auto';
}

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────
const lb = { items: [], index: 0 };

function openLightbox(items, startIndex) {
    lb.items = items;
    lb.index = startIndex;
    lbRender();
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function lbRender() {
    const { items, index } = lb;
    const cur = items[index];
    const img = document.getElementById('lightbox-img');
    img.style.animation = 'none';
    img.offsetHeight;
    img.style.animation = '';
    img.src = cur.src;
    img.alt = cur.alt;

    // Counter
    const counter = document.getElementById('lightbox-counter');
    counter.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
    const show = items.length > 1;
    document.getElementById('lightbox-prev').style.display = show ? '' : 'none';
    document.getElementById('lightbox-next').style.display = show ? '' : 'none';

    // Caption
    const titleEl = document.getElementById('lightbox-title');
    const metaEl = document.getElementById('lightbox-meta');
    const descEl = document.getElementById('lightbox-desc');
    const caption = document.getElementById('lightbox-caption');
    titleEl.textContent = cur.title || '';
    metaEl.textContent = cur.meta || '';
    descEl.textContent = cur.description || '';
    descEl.classList.toggle('desc-empty', !cur.description);
    descEl.textContent = cur.description || 'Description coming soon.';
    caption.style.display = cur.title ? '' : 'none';
}

function lbNav(dir) {
    lb.index = (lb.index + dir + lb.items.length) % lb.items.length;
    lbRender();
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
    document.body.style.overflowY = 'auto';
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY RENDERER
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIES = ['all', 'illustration', 'graphic design', 'misc'];

function renderGallery(category = 'all', subcategory = null) {
    const gallery = document.getElementById('gallery-grid');
    const workHeading = document.querySelector('.work-heading span');
    const footnote = document.querySelector('.gallery-footnote');
    const exploreHome = document.getElementById('explore-home');

    const isAll = category === 'all' && !subcategory;
    if (workHeading) workHeading.textContent = isAll ? 'SELECTED WORK*' : 'WORK';
    if (footnote) footnote.style.display = isAll ? '' : 'none';
    if (exploreHome) exploreHome.style.display = 'flex';

    let items = isAll
        ? shuffledItems
        : portfolioItems.filter(i => i.category === category);
    if (subcategory) {
        items = items.filter(i => i.subcategory === subcategory);
    }
    currentGalleryItems = items;

    gallery.innerHTML = items.map(item => {
        const meta = item.type === 'item' ? [item.tool, item.date].filter(Boolean).join(', ') : '';
        const subcatBadge = item.subcategory
            ? `<span class="item-subcategory">${item.subcategory}</span>`
            : '';

        if (item.type === 'project') {
            // ── PROJECT / FOLDER CARD ──────────────────────────────────────────────
            // Use explicit cover image, or first sub-item image, or placeholder
            const coverSrc = item.image || (item.items[0] && item.items[0].image) || null;
            const coverFb = fallbackSrc(item.category, item.title);
            const count = item.items.length;
            return `
        <div class="gallery-item project-card" data-category="${item.category}" data-project="${item.title.replace(/"/g, '&quot;')}">
          <div class="item-img-wrap">
            ${coverSrc ? imgTag(coverSrc, item.title, coverFb) : `<div class="img-placeholder" style="background:var(--color-pink)"></div>`}
            <div class="folder-badge">${count > 0 ? count + ' pieces' : 'Project'}</div>
            <div class="item-overlay">
              <span class="overlay-title">${item.title}</span>
              <span class="overlay-meta">Click to open →</span>
            </div>
          </div>
        </div>`;
        } else {
            // ── REGULAR ITEM CARD ──────────────────────────────────────────────────
            const src = item.image || buildImagePath(item);
            const fb = fallbackSrc(item.category, item.title);
            return `
        <div class="gallery-item" data-category="${item.category}" data-title="${item.title.replace(/"/g, '&quot;')}">
          <div class="item-img-wrap">
            ${imgTag(src, item.title, fb)}
            <div class="item-overlay">
              <span class="overlay-title">${item.title}</span>
              <span class="overlay-meta">${meta}</span>
            </div>
          </div>
        </div>`;
        }
    }).join('');

    // Preload images without flashing
    loadGalleryImages(gallery);
}

function formatSubcat(sub) {
    if (sub.toLowerCase() === '3d') return '3D';
    return sub.charAt(0).toUpperCase() + sub.slice(1);
}

function getSubcategories(category) {
    return [...new Set(
        portfolioItems
            .filter(i => i.category === category && i.subcategory)
            .map(i => i.subcategory)
    )];
}

function showSubfilters(category) {
    const subBar = document.getElementById('subcategory-filters');
    subBar.innerHTML = '';

    if (category === 'all') {
        subBar.classList.remove('visible');
        return;
    }

    const subs = getSubcategories(category);
    if (subs.length < 2) {
        subBar.classList.remove('visible');
        return;
    }

    // "All" button resets to full category
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn sub-filter-btn active';
    allBtn.textContent = 'All';
    allBtn.addEventListener('click', () => {
        subBar.querySelectorAll('.sub-filter-btn').forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
        renderGallery(category);
    });
    subBar.appendChild(allBtn);

    subs.forEach(sub => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn sub-filter-btn';
        btn.textContent = formatSubcat(sub);
        btn.addEventListener('click', () => {
            subBar.querySelectorAll('.sub-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGallery(category, sub);
        });
        subBar.appendChild(btn);
    });

    subBar.classList.add('visible');
}

// ─────────────────────────────────────────────────────────────────────────────
// HASH ROUTING
// ─────────────────────────────────────────────────────────────────────────────
const HASH_MAP = {
    '#graphic-design': 'graphic design',
    '#illustration': 'illustration',
    '#other-projects': 'misc',
};

function getPageFromHash() {
    return HASH_MAP[window.location.hash] ?? null;
}

function renderSplash() {
    const pool = portfolioItems.filter(i => i.type === 'item');
    const picks = pool.sort(() => Math.random() - 0.5).slice(0, 3);
    currentGalleryItems = picks;
    const gallery = document.getElementById('gallery-grid');
    gallery.innerHTML = picks.map(item => {
        const src = item.image || buildImagePath(item);
        const fb = fallbackSrc(item.category, item.title);
        const meta = [item.tool, item.date].filter(Boolean).join(', ');
        return `
        <div class="gallery-item" data-category="${item.category}" data-title="${item.title.replace(/"/g, '&quot;')}">
          <div class="item-img-wrap">
            ${imgTag(src, item.title, fb)}
            <div class="item-overlay">
              <span class="overlay-title">${item.title}</span>
              <span class="overlay-meta">${meta}</span>
            </div>
          </div>
        </div>`;
    }).join('');
    loadGalleryImages(gallery);
    showSubfilters('all'); // hide subcategory bar
    const exploreHome = document.getElementById('explore-home');
    if (exploreHome) exploreHome.style.display = 'flex';
}

function navigatePage() {
    const hash = window.location.hash;
    if (hash === '#contact') {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    const category = getPageFromHash();
    if (category) {
        renderGallery(category);
        showSubfilters(category);
        document.getElementById('work').scrollIntoView({ behavior: 'smooth' });
    } else {
        // No hash — show 3 random photos
        renderSplash();
    }
}

// Intercept hero nav clicks for smooth scroll + render without full page jump
document.querySelector('.hero-nav').addEventListener('click', e => {
    const link = e.target.closest('.hero-nav-item');
    if (!link) return;
    e.preventDefault();
    const hash = new URL(link.href).hash;
    history.pushState(null, '', hash);
    navigatePage();
});

window.addEventListener('hashchange', navigatePage);

function initFilters() {
    // Category-level filter bar is hidden; subcategory bar still works.
    // Called from init to keep the subcategory system wired (showSubfilters uses it).
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FORM
// ─────────────────────────────────────────────────────────────────────────────
document.querySelector('#contact-form').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.submit-btn');
    const originalText = btn.textContent;

    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
        const response = await fetch('https://formspree.io/f/mwvngkqj', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form),
        });

        if (response.ok) {
            btn.textContent = 'Sent ✓';
            btn.style.background = '#5a8f60';
            form.reset();
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        } else {
            throw new Error('Server error');
        }
    } catch {
        btn.textContent = 'Failed — try again';
        btn.style.background = '#b23c22';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// MODAL CLOSE EVENTS
// ─────────────────────────────────────────────────────────────────────────────
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('project-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
});

// Spread viewer close
document.getElementById('spread-close').addEventListener('click', closeSpreadViewer);
document.getElementById('spread-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeSpreadViewer();
});

// Lightbox controls
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', () => lbNav(-1));
document.getElementById('lightbox-next').addEventListener('click', () => lbNav(1));
document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLightbox();
});

// Keyboard: route to whichever layer is open
document.addEventListener('keydown', e => {
    const lbOpen = document.getElementById('lightbox').classList.contains('open');
    const spreadOpen = document.getElementById('spread-modal').classList.contains('open');
    if (lbOpen) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lbNav(-1);
        if (e.key === 'ArrowRight') lbNav(1);
    } else if (spreadOpen) {
        if (e.key === 'Escape') closeSpreadViewer();
    } else {
        if (e.key === 'Escape') closeModal();
    }
});

// Gallery grid: event delegation for folder cards + regular items
document.getElementById('gallery-grid').addEventListener('click', e => {
    const projectCard = e.target.closest('.project-card');
    if (projectCard) {
        openProject(projectCard.dataset.project);
        return;
    }

    const clickedCard = e.target.closest('.gallery-item[data-title]');
    if (!clickedCard) return;

    const clickedTitle = clickedCard.dataset.title;
    const regularItems = currentGalleryItems.filter(i => i.type !== 'project');
    const idx = regularItems.findIndex(i => i.title === clickedTitle);
    const lbItems = regularItems.map(i => ({
        src: i.image || buildImagePath(i),
        alt: i.title,
        title: i.title,
        meta: [i.tool, i.date].filter(Boolean).join(' · '),
        description: i.description || '',
    }));
    openLightbox(lbItems, Math.max(0, idx));
});

// Modal grid: clicking an image opens lightbox scoped to that project
document.getElementById('modal-grid').addEventListener('click', e => {
    const item = e.target.closest('.modal-item[data-title]');
    if (item && currentProject) {
        const clickedTitle = item.dataset.title;
        const idx = currentProject.items.findIndex(i => i.title === clickedTitle);
        const lbItems = currentProject.items.map(sub => ({
            src: sub.image || buildImagePath(sub, currentProject),
            alt: sub.title,
        }));
        openLightbox(lbItems, Math.max(0, idx));
    }
});

// Always start at the top on page load/refresh
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);


// Unlock scrolling after the hero animation completes (matches --anim-duration: 2s)
setTimeout(() => { document.body.style.overflowY = 'auto'; }, 2000);

// ─────────────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────────────
async function initApp() {
    await loadPortfolioData();
    initFilters();
    navigatePage(); // routes via hash, or renders all if no hash
}

initApp();
