import fs from 'fs';

const reportPath = 'eslint-report.json';
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

let filesModified = 0;

report.forEach(fileResult => {
  let content = fs.readFileSync(fileResult.filePath, 'utf8');
  let lines = content.split(/\r?\n/);
  let modified = false;

  // Process from bottom to top of the file to avoid line shifting if we add/remove lines.
  // Wait, we are modifying within the line, so column shifting matters.
  // Group messages by line, sort by column descending.
  let lineMessages = {};
  fileResult.messages.forEach(msg => {
    if (!lineMessages[msg.line]) lineMessages[msg.line] = [];
    lineMessages[msg.line].push(msg);
  });

  for (let lineNum in lineMessages) {
    let msgs = lineMessages[lineNum];
    msgs.sort((a, b) => b.column - a.column);

    msgs.forEach(msg => {
      const lineIdx = msg.line - 1;
      const colIdx = msg.column - 1;
      let text = lines[lineIdx];

      if (msg.ruleId === 'react/no-unescaped-entities') {
        if (msg.suggestions && msg.suggestions.length > 0) {
           const alt = msg.suggestions[0].data.alt;
           // Usually the unescaped char is 1 char long (like ' or ")
           lines[lineIdx] = text.slice(0, colIdx) + alt + text.slice(colIdx + 1);
           modified = true;
        }
      } else if (msg.ruleId === '@typescript-eslint/no-explicit-any') {
         // It points to the 'any' keyword. Let's change it to 'unknown'
         lines[lineIdx] = text.slice(0, colIdx) + 'unknown' + text.slice(colIdx + 3);
         modified = true;
      }
    });
  }

  if (modified) {
    // join with original newline style. We'll use \n and prettier will fix it.
    fs.writeFileSync(fileResult.filePath, lines.join('\n'), 'utf8');
    filesModified++;
  }
});

console.log(`Modified ${filesModified} files successfully.`);
