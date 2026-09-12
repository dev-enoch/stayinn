import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
        if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
            results = results.concat(walk(file));
        }
    } else { 
      if (file.match(/\.(tsx|ts|js|jsx|json|md|yml|css|env.*)$/)) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('.');
let changed = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/Stayinn/g, 'Monarch Stay')
    .replace(/STAYINN/g, 'MONARCH_STAY')
    .replace(/stayinn/g, 'monarchstay')
    .replace(/StayInn/g, 'Monarch Stay');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    changed++;
    console.log(`Updated ${file}`);
  }
}
console.log(`Total files updated: ${changed}`);
