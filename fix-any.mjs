import fs from 'fs';

const reportPath = 'eslint-report.json';
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

let filesModified = 0;

report.forEach(fileResult => {
  let content = fs.readFileSync(fileResult.filePath, 'utf8');
  let lines = content.split('\n');
  let modified = false;

  fileResult.messages.forEach(msg => {
    if (msg.ruleId === '@typescript-eslint/no-explicit-any') {
      const lineIdx = msg.line - 1;
      if (lines[lineIdx] !== undefined) {
          if (lines[lineIdx].includes(': any')) {
            lines[lineIdx] = lines[lineIdx].replace(/: any\b/g, ': unknown');
            modified = true;
          } else if (lines[lineIdx].includes('as any')) {
            lines[lineIdx] = lines[lineIdx].replace(/as any\b/g, 'as unknown');
            modified = true;
          } else if (lines[lineIdx].includes('<any>')) {
            lines[lineIdx] = lines[lineIdx].replace(/<any>/g, '<unknown>');
            modified = true;
          }
      }
    }
  });

  if (modified) {
    fs.writeFileSync(fileResult.filePath, lines.join('\n'), 'utf8');
    filesModified++;
  }
});

console.log(`Modified ${filesModified} files to replace any with unknown.`);
