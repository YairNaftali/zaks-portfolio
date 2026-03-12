const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '../public/images');
const outFile = path.join(__dirname, '../public/data/portfolio.json');

const data = [];

function parseFilename(filename) {
    let base = filename.replace(/\.(webp|jpg|png|gif|jpeg)$/i, '');

    // Clean up leading numbers like (1) first so they aren't parsed as the tool block
    base = base.replace(/^\(\d+\)\s*/, '');

    // Use greedy match for title so we get the LAST parenthesis block
    const match = base.match(/^(.*)\s*\(([^,)]+)(?:,\s*([^)]+))?\)[-_]*(.*)$/);
    let title, tool, date;

    if (!match) {
        title = base;
        tool = '';
        date = '';
    } else {
        title = match[1].trim();
        tool = match[2].trim();
        date = match[3] ? match[3].trim() : '';
    }

    // Cleanup trailing garbage from title and date
    title = title.replace(/[_\s-]+(copy|modified|_)$/gi, '').trim();
    title = title.replace(/_$/, '').trim();

    if (date) {
        date = date.replace(/[_\s-]+(copy|modified|_)$/gi, '').trim();
    }

    return { title, tool, date };
}

// Depth 1: Categories
const categories = fs.readdirSync(imgDir).filter(f => !f.startsWith('.') && fs.statSync(path.join(imgDir, f)).isDirectory());

for (const cat of categories) {
    const catDir = path.join(imgDir, cat);
    const subcats = fs.readdirSync(catDir).filter(f => !f.startsWith('.'));

    for (const sub of subcats) {
        const subDir = path.join(catDir, sub);
        const stat = fs.statSync(subDir);

        if (stat.isFile()) {
            // file directly in category dir (e.g. painting/item.webp)
            const parsed = parseFilename(sub);
            data.push({
                type: 'item',
                title: parsed.title,
                category: (cat === 'drawing' || cat === 'painting') ? 'illustration' : cat.replace(/-/g, ' '),
                subcategory: '',
                tool: parsed.tool,
                date: parsed.date,
                description: "",
                image: `/images/${cat}/${sub}`
            });
        } else {
            // it's a subcategory (e.g. drawing/medical)
            const items = fs.readdirSync(subDir).filter(f => !f.startsWith('.'));

            for (const item of items) {
                const itemPath = path.join(subDir, item);
                if (fs.statSync(itemPath).isFile()) {
                    // regular item in subcategory
                    const parsed = parseFilename(item);
                    data.push({
                        type: 'item',
                        title: parsed.title,
                        category: (cat === 'drawing' || cat === 'painting') ? 'illustration' : cat.replace(/-/g, ' '),
                        subcategory: sub.replace(/-/g, ' '),
                        tool: parsed.tool,
                        date: parsed.date,
                        description: "",
                        image: `/images/${cat}/${sub}/${item}`
                    });
                } else {
                    // it's a project folder within a subcategory
                    const projectDir = itemPath;
                    const projectTitle = item; // Folder name
                    const projectFiles = fs.readdirSync(projectDir).filter(f => !f.startsWith('.') && fs.statSync(path.join(projectDir, f)).isFile());

                    const projectItems = [];
                    let coverImage = null;

                    projectFiles.forEach(pf => {
                        const parsed = parseFilename(pf);
                        const fileWebPath = `/images/${cat}/${sub}/${projectTitle}/${pf}`;
                        if (!coverImage) coverImage = fileWebPath;

                        projectItems.push({
                            title: parsed.title,
                            tool: parsed.tool,
                            date: parsed.date,
                            image: fileWebPath
                        });
                    });

                    data.push({
                        type: 'project',
                        title: projectTitle,
                        category: (cat === 'drawing' || cat === 'painting') ? 'illustration' : cat.replace(/-/g, ' '),
                        subcategory: sub.replace(/-/g, ' '),
                        description: "",
                        image: coverImage,
                        items: projectItems
                    });
                }
            }
        }
    }
}

fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
console.log('Rebuilt portfolio.json with ' + data.length + ' items/projects.');
