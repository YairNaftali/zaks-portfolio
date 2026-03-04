// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO DATA
// type: 'item'    → single piece (has title, tool, date, description, image?)
// type: 'project' → a folder of related pieces (has title, items: [...])
//
// To add images: drop files in public/images/<category>/<subcategory>/
// File naming: lowercase-with-dashes matching the title.
// ─────────────────────────────────────────────────────────────────────────────
const portfolioItems = [
    // ── DRAWING / MEDICAL ──────────────────────────────────────────────────────
    { type: 'item', title: 'Colostomy', category: 'illustration', subcategory: 'commissioned', tool: 'Procreate', date: '2025', description: 'Illustrated diagram commissioned by General Surgeon Racquel Gaetani (Beth Israel) to help patients understand the colostomy procedure.', image: '/images/drawing/medical/colostomy-procreate-2025.webp' },
    { type: 'item', title: 'Colostomy Detail', category: 'illustration', subcategory: 'commissioned', tool: 'Procreate', date: '2025', description: 'Illustrated diagram commissioned by General Surgeon Racquel Gaetani (Beth Israel) to help patients understand the colostomy procedure.', image: '/images/drawing/medical/colostomy-detail-procreate-2025.webp' },
    { type: 'item', title: 'DaVinci', category: 'illustration', subcategory: 'commissioned', tool: 'Pencil', date: '2023', description: 'Commissioned illustration to advertise and commemorate the opening of Methodist\'s Center for Simulation and Wellness to surgery residents.', image: '/images/drawing/medical/davinci-pencil-2023.webp' },
    { type: 'item', title: 'Heartwork in the Garden', category: 'illustration', subcategory: 'commissioned', tool: 'Color Pencil', date: '2024', description: 'Commissioned wall piece for Methodist Health System\'s newest clinic at Bonton Farms.', image: '/images/drawing/medical/heartwork-in-the-garden-color-pencil-2024.webp' },
    { type: 'item', title: 'Intercostal Injection', category: 'illustration', subcategory: 'commissioned', tool: 'Procreate', date: '2024', description: 'Published medical drawing explaining an experimental operation for surgeons on Methodist Hospital\'s research team.', image: '/images/drawing/medical/intercostal-injection-procreate-2024.webp' },
    { type: 'item', title: 'Intercostal Nerve Injection', category: 'illustration', subcategory: 'commissioned', tool: 'Procreate', date: '2023', description: 'Published medical drawing explaining an experimental operation for surgeons on Methodist Hospital\'s research team.', image: '/images/drawing/medical/intercostal-nerve-injection-procreate2023.webp' },
    { type: 'item', title: 'Necrotizing Fasciitis Diagram', category: 'illustration', subcategory: 'commissioned', tool: 'Procreate', date: '2023', description: '', image: '/images/drawing/medical/necrotizing-fasciitis-diagram-procreate-2023.webp' },

    // ── DRAWING / PERSONAL ─────────────────────────────────────────────────────
    { type: 'item', title: 'A Little Batty', category: 'illustration', subcategory: 'personal', tool: 'Color Pencil', date: '2021', description: '', image: '/images/drawing/personal/a-little-batty-color-pencil-2021.webp' },
    { type: 'item', title: 'Bang Yer Head', category: 'illustration', subcategory: 'personal', tool: 'Pencil', date: '2025', description: 'Personal drawing investigating the inner layers of the cranium and inspecting expressional muscular anatomy.', image: '/images/drawing/personal/bang-yer-head-pencil-2025.webp' },
    { type: 'item', title: 'Bucky', category: 'illustration', subcategory: 'personal', tool: 'Pencil', date: '2022', description: 'Traditional pencil piece exploring the aesthetics and beauty of chemical compounds.', image: '/images/drawing/personal/bucky-pencil-2022.webp' },
    { type: 'item', title: 'MFA Meltdown', category: 'illustration', subcategory: 'personal', tool: 'Procreate', date: '2025', description: '', image: '/images/drawing/personal/mfa-meltdown-procreate-2025.webp' },
    { type: 'item', title: 'Mischevious Miscreants', category: 'illustration', subcategory: 'personal', tool: 'Color Pencil', date: '2020', description: '', image: '/images/drawing/personal/mischevious-miscreants-color-pencil-2020-.webp' },
    { type: 'item', title: 'Spill Yer Guts', category: 'illustration', subcategory: 'personal', tool: 'Pencil', date: '2025', description: 'Playful pencil piece dissecting the torso and exploring literal interpretations of idiomatic phrases.', image: '/images/drawing/personal/spill-yer-guts-pencil-2025-.webp' },
    { type: 'item', title: "They're Grreat", category: 'illustration', subcategory: 'personal', tool: 'Pencil', date: '2021', description: '', image: '/images/drawing/personal/they_re-grreat-pencil-2021-.webp' },
    { type: 'item', title: 'Topsy-Turvy Bike', category: 'illustration', subcategory: 'personal', tool: 'Pencil', date: '2020', description: '', image: '/images/drawing/personal/topsy-turvy-bike-pencil-2020-.webp' },
    { type: 'item', title: 'Touch Fuzzy', category: 'illustration', subcategory: 'personal', tool: 'Color Pencil', date: '2025', description: '', image: '/images/drawing/personal/touch-fuzzy-color-pencil-2025.webp' },

    // ── PAINTING / SINGLE PIECES ───────────────────────────────────────────────
    { type: 'item', title: 'Animal Mischief Sketch', category: 'illustration', subcategory: '', tool: 'Procreate', date: '2025', description: '', image: '/images/painting/animal-mischief-sketch-procreate-2025-.webp' },
    { type: 'item', title: 'Proteinz in Motion', category: 'illustration', subcategory: '', tool: 'Acrylic', date: '2023', description: '', image: '/images/painting/proteinz-in-motion-acrylic-2023-.webp' },

    // ── PAINTING / HELLO DUMPLING MURAL (FOLDER) ──────────────────────────────
    {
        type: 'project',
        title: 'Hello Dumpling Mural',
        category: 'illustration',
        subcategory: 'personal',
        description: 'Selected sketches and pieces from a 12-year zodiac mural project commissioned by Beijing street food restaurant Hello Dumpling.',
        image: '/images/painting/hello-dumpling-mural/rabbit-zodiac-acrylic-on-fence-2023.webp',
        items: [
            { title: 'Dragon Zodiac Mockup', tool: 'Procreate', date: '2024', image: '/images/painting/hello-dumpling-mural/dragon-zodiac-mockup-procreate-2024-.webp' },
            { title: 'Rabbit Zodiac', tool: 'Acrylic on fence', date: '2023', image: '/images/painting/hello-dumpling-mural/rabbit-zodiac-acrylic-on-fence-2023.webp' },
            { title: 'Snake Zodiac', tool: 'Acrylic on fence', date: '2025', image: '/images/painting/hello-dumpling-mural/snake-zodiac-acrylic-on-fence-2025.webp' },
            { title: 'Tiger Zodiac', tool: 'Acrylic on fence', date: '2022', image: '/images/painting/hello-dumpling-mural/tiger-zodiac-acrylic-on-fence-2022.webp' },
        ],
    },

    // ── GRAPHIC DESIGN / PERSONAL ──────────────────────────────────────────────
    { type: 'item', title: 'BIGG LYPS Art Toy Poster', category: 'graphic design', subcategory: 'personal', tool: 'Illustrator', date: '2026', description: 'Branding concept featuring a transportation-inspired character for a self-created series of marketable art toys.', image: '/images/graphic-design/personal/bigg-lyps-art-toy-poster-illust-2026.webp' },
    {
        type: 'project',
        title: 'Infinity',
        category: 'graphic design', subcategory: 'personal',
        description: 'Design stencil for a series of light-based photographs (cyanotypes) critiquing the infinite scrolls that trap us.',
        image: '/images/graphic-design/personal/infinity-1-illustrator-2025.webp',
        items: [
            { title: 'Infinity 1', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/personal/infinity-1-illustrator-2025.webp' },
            { title: 'Infinity 2', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/personal/infinity-2-illustrator-2025.webp' },
            { title: 'Infinity 3', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/personal/infinity-3-illustrator-2025.webp' },
            { title: 'Infinity 4', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/personal/infinity-4-illustrator-2025.webp' },
        ],
    },
    {
        type: 'project',
        title: 'Stickers',
        category: 'graphic design', subcategory: 'personal',
        description: 'Design mock-ups for an interactive street art piece where visitors can "graffiti bomb" a stop sign.',
        image: '/images/graphic-design/personal/stickers/sticker-1-illustrator-2024.png',
        items: [
            { title: 'Sticker 1', tool: 'Illustrator', date: '2024', image: '/images/graphic-design/personal/stickers/sticker-1-illustrator-2024.png' },
            { title: 'Sticker 2', tool: 'Illustrator', date: '2024', image: '/images/graphic-design/personal/stickers/sticker-2-illustrator-2024.png' },
            { title: 'Sticker 3', tool: 'Illustrator', date: '2024', image: '/images/graphic-design/personal/stickers/sticker-3-illustrator-2024.png' },
            { title: 'Sticker 4', tool: 'Illustrator', date: '2024', image: '/images/graphic-design/personal/stickers/sticker-4-illustrator-2024.png' },
            { title: 'Sticker 5', tool: 'Illustrator', date: '2024', image: '/images/graphic-design/personal/stickers/sticker-5-illustrator-2024.png' },
            { title: 'Sticker 6', tool: 'Illustrator', date: '2024', image: '/images/graphic-design/personal/stickers/sticker-6-illustrator-2024.png' },
            { title: 'Sticker 7', tool: 'Illustrator', date: '2024', image: '/images/graphic-design/personal/stickers/sticker-7-illustrator-2024.png' },
            { title: 'Sticker 8', tool: 'Illustrator', date: '2024', image: '/images/graphic-design/personal/stickers/sticker-8-illustrator-2024.png' },
            { title: 'Sticker 9', tool: 'Illustrator', date: '2024', image: '/images/graphic-design/personal/stickers/sticker-9-illustrator-2024.png' },
            { title: 'Sticker 10', tool: 'Illustrator', date: '2024', image: '/images/graphic-design/personal/stickers/sticker-10-illustrator-2024.png' },
        ],
    },
    { type: 'item', title: 'Vaporeon Logo Mockup', category: 'graphic design', subcategory: 'personal', tool: 'Photoshop & Illustrator', date: '2025', description: '', image: '/images/graphic-design/personal/vaporeon-logo-mockup-photoshop-illust-2025_.webp' },
    { type: 'item', title: 'Who Do I Know', category: 'graphic design', subcategory: 'personal', tool: 'Color Pencil & Cardstock', date: '2025', description: '', image: '/images/graphic-design/personal/who-do-i-know-color-pencil-cardstock-2025.webp' },
    { type: 'item', title: 'YIEL Art Toy Poster', category: 'graphic design', subcategory: 'personal', tool: 'Illustrator', date: '2026', description: 'Branding concept featuring a rock-inspired character for a self-created series of marketable art toys.', image: '/images/graphic-design/personal/yiel-art-toy-poster-illust-2026.webp' },

    // ── GRAPHIC DESIGN / PROFESSIONAL (ALL FOLDERS) ────────────────────────────
    {
        type: 'project',
        title: 'Adrian Album Covers',
        category: 'graphic design', subcategory: 'professional',
        description: 'Final cover and gatefold designs for the vinyl pressing of "Here to Love You", plus early album cover sketches for Berklee instructor Adrian Sicam\'s upcoming LP.',
        image: '/images/graphic-design/professional/adrian-album-covers/adrian-final-album-front-back-illustrator-2025.webp',
        items: [
            { title: 'Final Cover Front & Back', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-final-album-front-back-illustrator-2025.webp' },
            { title: 'Final Gatefold', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-final-album-cover-gatefold-illustrator-2025-.webp' },
            { title: 'Early Concept 1', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-early-concept-1-illustrator-2025-.webp' },
            { title: 'Early Concept 2', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-early-concept-2-illustrator-2025.webp' },
            { title: 'Early Concept 3', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-early-concept-3-illustrator-2025.webp' },
            { title: 'Early Concept 4', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-early-concept-4-illustrator-2025.webp' },
            { title: 'Early Concept 5', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-early-concept-5-illustrator-2025.webp' },
            { title: 'Early Concept 6', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-early-concept-6-illustrator-2025.webp' },
            { title: 'Early Concept 7', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-early-concept-7-illustrator-2025.webp' },
            { title: 'Early Concept 8', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-early-concept-8-illustrator-2025.webp' },
            { title: 'Early Concept 9', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-early-concept-9-illustrator-2025.webp' },
            { title: 'Early Concept 10', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-early-concept-10-illustrator-2025.webp' },
            { title: 'Early Concept 11', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/adrian-early-concept-11-illustrator-2025.webp' },
            { title: 'Detail View', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/adrian-album-covers/screenshot-2026-02-11-at-5.32.31-pm.webp' },
        ],
    },
    {
        type: 'project',
        title: 'Adrian Groovin',
        category: 'graphic design', subcategory: 'professional',
        description: 'Posters to promote Adrian Sicam\'s exclusive performance of "Here to Love You" on the Berklee campus.',
        image: '/images/graphic-design/professional/adrian-groovin/adrian-groovin-poster-final-photoshop-2025.webp',
        items: [
            { title: 'Final Poster', tool: 'Photoshop', date: '2025', image: '/images/graphic-design/professional/adrian-groovin/adrian-groovin-poster-final-photoshop-2025.webp' },
            { title: 'Poster Concept', tool: 'Procreate', date: '2025', image: '/images/graphic-design/professional/adrian-groovin/adrain-groovin-poster-concept-procreate-2025_.webp' },
        ],
    },
    {
        type: 'project',
        title: 'Antony Gormley Ads',
        category: 'graphic design', subcategory: 'professional',
        description: 'Digital ads, banners, and collateral to advertise the Nasher\'s recent Antony Gormley exhibit.',
        image: '/images/graphic-design/professional/antony-gormley-ads/antony-gormley-ad-detail-4-illustrator-2025.webp',
        items: [
            { title: 'Ad Detail 1', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/antony-gormley-ads/antony-gormley-ad-detail-1-illustrator-2025.webp' },
            { title: 'Ad Detail 2', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/antony-gormley-ads/antony-gormley-ad-detail-2-illustrator-2025.webp' },
            { title: 'Ad Detail 3', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/antony-gormley-ads/antony-gormley-ad-detail-3-illustrator-2025.webp' },
            { title: 'Ad Detail 4', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/antony-gormley-ads/antony-gormley-ad-detail-4-illustrator-2025.webp' },
            { title: 'Ad Detail 5', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/antony-gormley-ads/antony-gormley-ad-detail-5-illustrator-2025.webp' },
        ],
    },
    {
        type: 'project',
        title: 'Antony Gormley Brochure',
        category: 'graphic design', subcategory: 'professional',
        description: 'Selected spreads from a translated and reformatted exhibit guide to help Spanish-speaking visitors navigate the Gormley show.',
        image: '/images/graphic-design/professional/antony-gormley-brochure/antony-gormley-brochure-detail-1-indesign-2025.webp',
        items: [
            { title: 'Brochure Detail 1', tool: 'InDesign', date: '2025', image: '/images/graphic-design/professional/antony-gormley-brochure/antony-gormley-brochure-detail-1-indesign-2025.webp' },
            { title: 'Brochure Detail 2', tool: 'InDesign', date: '2025', image: '/images/graphic-design/professional/antony-gormley-brochure/antony-gormley-brochure-detail-2-indesign-2025.webp' },
            { title: 'Brochure Detail 3', tool: 'InDesign', date: '2025', image: '/images/graphic-design/professional/antony-gormley-brochure/antony-gormley-brochure-detail-3-indesign-2025.webp' },
            { title: 'Brochure Detail 4', tool: 'InDesign', date: '2025', image: '/images/graphic-design/professional/antony-gormley-brochure/antony-gormley-brochure-detail-4-indesign-2025.webp' },
        ],
    },
    {
        type: 'project',
        title: 'FFS Ads',
        category: 'graphic design', subcategory: 'professional',
        description: 'Selected ads from an upcoming year-long campaign updating the Nasher\'s monthly Free First Saturdays program.',
        image: '/images/graphic-design/professional/ffs-ads/free-first-saturdays-rebrand-detail-7-illust-2025.webp',
        items: [
            { title: 'Rebrand Detail 1', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/ffs-ads/free-first-saturdays-rebrand-detail-1-illust-2025-.webp' },
            { title: 'Rebrand Detail 2', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/ffs-ads/free-first-saturdays-rebrand-detail-2-illust-2025.webp' },
            { title: 'Rebrand Detail 3', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/ffs-ads/free-first-saturdays-rebrand-detail-3-illust-2025.webp' },
            { title: 'Rebrand Detail 4', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/ffs-ads/free-first-saturdays-rebrand-detail-4-illust-2025.webp' },
            { title: 'Rebrand Detail 5', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/ffs-ads/free-first-saturdays-rebrand-detail-5-illust-2025.webp' },
            { title: 'Rebrand Detail 6', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/ffs-ads/free-first-saturdays-rebrand-detail-6-illust-2025.webp' },
            { title: 'Rebrand Detail 7', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/ffs-ads/free-first-saturdays-rebrand-detail-7-illust-2025.webp' },
        ],
    },
    {
        type: 'project',
        title: 'Martin Kindley Logo',
        category: 'graphic design', subcategory: 'professional',
        description: 'Logo design for Martin Kindley.',
        image: '/images/graphic-design/professional/martin-kindley-logo/martin-kindley-logo-concept-final-illustrator-2025.webp',
        items: [
            { title: 'Final Logo', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/martin-kindley-logo/martin-kindley-logo-concept-final-illustrator-2025.webp' },
            { title: 'Concept 1', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/martin-kindley-logo/martin-kindley-logo-concept-1-illustrator-2025.webp' },
            { title: 'Concept 2', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/martin-kindley-logo/martin-kindley-logo-concept-2-illustrator-2025.webp' },
            { title: 'Concept 3', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/martin-kindley-logo/martin-kindley-logo-concept-3-illustrator-2025.webp' },
            { title: 'Concept 4', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/martin-kindley-logo/martin-kindley-logo-concept-4-illustrator-2025.webp' },
        ],
    },
    {
        type: 'project',
        title: 'Nasher Mini Brochure',
        category: 'graphic design', subcategory: 'professional',
        description: 'Selected spreads and details from an updated museum guide designed to inform visitors on the museum\'s history and events.',
        image: '/images/graphic-design/professional/nasher-mini-brochure/nasher-mini-brochure-detail-1-indesign-2025.webp',
        items: [
            { title: 'Brochure Detail 1', tool: 'InDesign', date: '2025', image: '/images/graphic-design/professional/nasher-mini-brochure/nasher-mini-brochure-detail-1-indesign-2025.webp' },
            { title: 'Brochure Detail 2', tool: 'InDesign', date: '2025', image: '/images/graphic-design/professional/nasher-mini-brochure/nasher-mini-brochure-detail-2-indesign-2025.webp' },
            { title: 'Brochure Detail 3', tool: 'InDesign', date: '2025', image: '/images/graphic-design/professional/nasher-mini-brochure/nasher-mini-brochure-detail-3-indesign-2025.webp' },
        ],
    },
    {
        type: 'project',
        title: 'Nasher Pride Zine',
        category: 'graphic design', subcategory: 'professional',
        description: 'Early concept for a Pride Month-themed zine highlighting LGBTQ+ artists in the Nasher\'s collection.',
        image: '/images/graphic-design/professional/nasher-pride-zine/nasher-pride-zine-detail-3-indesign-2025.webp',
        items: [
            { title: 'Zine Detail 1', tool: 'InDesign', date: '2025', image: '/images/graphic-design/professional/nasher-pride-zine/nasher-pride-zine-detail-1-indesign-2025.webp' },
            { title: 'Zine Detail 2', tool: 'InDesign', date: '2025', image: '/images/graphic-design/professional/nasher-pride-zine/nasher-pride-zine-detail-2-indesign-2025.webp' },
            { title: 'Zine Detail 3', tool: 'InDesign', date: '2025', image: '/images/graphic-design/professional/nasher-pride-zine/nasher-pride-zine-detail-3-indesign-2025.webp' },
        ],
    },
    {
        type: 'project',
        title: 'Sensory Days Dallas Logo',
        category: 'graphic design', subcategory: 'professional',
        description: 'Proposed logo concepts and final logomarks for a rebrand of Dallas-based autism awareness association Sensory Days Dallas.',
        image: '/images/graphic-design/professional/sensory-days-dallas-logo/sensory-days-dallas-concepts-illustrator-2025.webp',
        items: [
            { title: 'Logo Concepts', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/sensory-days-dallas-logo/sensory-days-dallas-concepts-illustrator-2025.webp' },
            { title: 'Final Logo', tool: 'Illustrator', date: '2025', image: '/images/graphic-design/professional/sensory-days-dallas-logo/sensory-days-dallas-final-logo-illust-2025.webp' },
        ],
    },

    // ── MISC / 3D ──────────────────────────────────────────────────────────────
    { type: 'item', title: 'Bird and Bust', category: 'misc', subcategory: '3d', tool: 'Cinema4D', date: '2022', description: '', image: '/images/misc/3d/bird-and-bust-cinema4d-2022.webp' },
    { type: 'item', title: 'Fatcap Turnaround', category: 'misc', subcategory: '3d', tool: 'NomadSculpt & Photoshop', date: '2026', description: 'Reference sheet of a graffiti-inspired character for a self-created series of marketable art toys.', image: '/images/misc/3d/fatcap-turnaround-nomadsculpt-phtoshop-2026-.webp' },
    { type: 'item', title: 'Highway 109', category: 'misc', subcategory: '3d', tool: 'Cinema4D', date: '2022', description: 'Selected 3D composition from a series exploring the inner worlds within our bodies.', image: '/images/misc/3d/highway-109-cinema4d-2022.webp' },
    { type: 'item', title: "Neurons Firin'", category: 'misc', subcategory: '3d', tool: 'Cinema4D', date: '2022', description: '', image: '/images/misc/3d/neurons-firin_-cinema4d-2022-.webp' },
    { type: 'item', title: 'Pepper Turnaround', category: 'misc', subcategory: '3d', tool: 'NomadSculpt & Photoshop', date: '', description: 'Reference sheet of a food-inspired character for a self-created series of marketable art toys.', image: '/images/misc/3d/pepper-turnaround-nomadsculpt-phtoshop.webp' },
    { type: 'item', title: 'Rami Turnaround', category: 'misc', subcategory: '3d', tool: 'NomadSculpt & Photoshop', date: '2026', description: 'Reference sheet of an animal character for a self-created series of marketable art toys.', image: '/images/misc/3d/rami-turnaround-nomadsculpt-phtoshop-2026.webp' },
    { type: 'item', title: 'The Big Idea', category: 'misc', subcategory: '3d', tool: 'Cinema4D', date: '2022', description: '', image: '/images/misc/3d/the-big-idea-cinema4d-2022.webp' },
    { type: 'item', title: "Them Apples Neurons Firin'", category: 'misc', subcategory: '3d', tool: 'Cinema4D', date: '2022', description: '', image: '/images/misc/3d/them-apples-neurons-firin_-cinema4d-2022-.webp' },
    { type: 'item', title: 'Tooth', category: 'misc', subcategory: '3d', tool: 'Cinema4D', date: '2022', description: '', image: '/images/misc/3d/tooth-cinema4d-2022.webp' },
    { type: 'item', title: 'Yiel Turnaround', category: 'misc', subcategory: '3d', tool: 'NomadSculpt & Photoshop', date: '', description: 'Reference sheet of a transportation-inspired character for a self-created series of marketable art toys.', image: '/images/misc/3d/yiel-turnaround-nomadsculpt-phtoshop.webp' },

    // ── MISC / PHOTO ───────────────────────────────────────────────────────────
    { type: 'item', title: 'The Beauty of Nature (or Whatever)', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/_the-beauty-of-nature_-or-whatever-photo-2024-.webp' },
    { type: 'item', title: 'All in My Hand', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/all-in-my-hand-photo-2024-.webp' },
    { type: 'item', title: 'Bedroom', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/bedroom-photo-2024-.webp' },
    { type: 'item', title: 'Candid', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/candid-photo-2024-.webp' },
    { type: 'item', title: 'Drip', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/drip-photo-2024-.webp' },
    { type: 'item', title: 'Gigi', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/gigi-photo-2024-.webp' },
    { type: 'item', title: 'Layla', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/layla-photo-2024_.webp' },
    { type: 'item', title: 'Leftovers', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/leftovers-photo-2024-.webp' },
    { type: 'item', title: 'Lynn', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/lynn-photo-2024-.webp' },
    { type: 'item', title: 'Michelle', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/michelle-photo-2024-.webp' },
    { type: 'item', title: 'Peter', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/peter-photo-2024-.webp' },
    { type: 'item', title: 'Sharan', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/sharan-photo-2024_.webp' },
    { type: 'item', title: 'Speed Limit', category: 'misc', subcategory: 'photo', tool: 'Photo', date: '2024', description: '', image: '/images/misc/photo/speed-limit-photo-2024-.webp' },
];

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

// After innerHTML is set, preload all images and set src only when ready
function loadGalleryImages(container) {
    container.querySelectorAll('img[data-src]').forEach(img => {
        const src = img.dataset.src;
        const fallback = img.dataset.fallback;
        const test = new Image();
        const reveal = (resolvedSrc) => {
            img.src = resolvedSrc;
            // use rAF so the browser paints the src before triggering the fade
            requestAnimationFrame(() => requestAnimationFrame(() => img.classList.add('loaded')));
        };
        test.onload = () => reveal(src);
        test.onerror = () => reveal(fallback);
        test.src = src;
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX / PROJECT MODAL
// ─────────────────────────────────────────────────────────────────────────────
let currentProject = null;
let currentGalleryItems = [];

function openProject(projectTitle) {
    currentProject = portfolioItems.find(p => p.type === 'project' && p.title === projectTitle);
    if (!currentProject) return;

    const modal = document.getElementById('project-modal');
    document.getElementById('modal-title').textContent = currentProject.title;
    document.getElementById('modal-desc').textContent = currentProject.description || '';

    const grid = document.getElementById('modal-grid');
    if (currentProject.items.length === 0) {
        grid.innerHTML = `<p class="modal-empty">Images coming soon — drop them in:<br><code>public/images/${toSlug(currentProject.category)}/${toSlug(currentProject.subcategory || currentProject.title)}/</code></p>`;
    } else {
        grid.innerHTML = currentProject.items.map(sub => {
            const src = sub.image || buildImagePath(sub, currentProject);
            const fb = fallbackSrc(currentProject.category, sub.title);
            const meta = [sub.tool, sub.date].filter(Boolean).join(', ');
            return `
        <div class="modal-item" data-title="${sub.title.replace(/"/g, '&quot;')}">
          ${imgTag(src, sub.title, fb)}
          <p class="modal-item-title">${sub.title}</p>
          ${meta ? `<p class="modal-item-meta">${meta}</p>` : ''}
        </div>`;
        }).join('');
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    loadGalleryImages(grid);
}

function closeModal() {
    document.getElementById('project-modal').classList.remove('open');
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
    let items = category === 'all'
        ? portfolioItems
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
    if (lbOpen) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lbNav(-1);
        if (e.key === 'ArrowRight') lbNav(1);
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
initFilters();
navigatePage(); // routes via hash, or renders all if no hash
