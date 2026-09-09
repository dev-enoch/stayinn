const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

const replacements = [
  { regex: /\+234 800 STAYINN/g, replacement: '+234 813 000 7829' },
  { regex: /tel:\+2348007829466/g, replacement: 'tel:+2348130007829' },
  { regex: /\+234 1 888 STAY/g, replacement: '+234 813 000 7829' },
  { regex: /tel:\+23418887829/g, replacement: 'tel:+2348130007829' },
  { regex: /wa\.me\/2348007829466/g, replacement: 'wa.me/2348130007829' },
  // Remove links pointing to #faq by making them point to /support#faq or actual route
  { regex: /href="#faq"/g, replacement: 'href="/support#faq"' },
  { regex: /href="#"/g, replacement: 'href="/privacy"' } // We'll fix specific terms/privacy later
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
