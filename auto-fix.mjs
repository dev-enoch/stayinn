import fs from 'fs';

const reportPath = 'eslint-report.json';
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

let filesModified = 0;

report.forEach(fileResult => {
  if (fileResult.errorCount === 0 && fileResult.warningCount === 0) return;
  
  let content = fs.readFileSync(fileResult.filePath, 'utf8');
  let modified = false;

  let fixes = [];

  fileResult.messages.forEach(msg => {
    if (msg.fix) {
      fixes.push(msg.fix);
    } else if (msg.suggestions && msg.suggestions.length > 0) {
      if (msg.ruleId === 'react/no-unescaped-entities') {
        fixes.push(msg.suggestions[0].fix);
      }
    }
  });

  if (fixes.length > 0) {
    // Deduplicate ranges (sometimes suggestions overlap)
    fixes = fixes.filter((v, i, a) => a.findIndex(t => (t.range[0] === v.range[0] && t.range[1] === v.range[1])) === i);
    
    // Sort descending by range start
    fixes.sort((a, b) => b.range[0] - a.range[0]);

    for (const fix of fixes) {
      const before = content.slice(0, fix.range[0]);
      const after = content.slice(fix.range[1]);
      content = before + fix.text + after;
    }
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(fileResult.filePath, content, 'utf8');
    filesModified++;
  }
});

console.log(`Modified ${filesModified} files using ESLint auto-fixes and suggestions.`);
