const fs = require('fs');

const filePath = './lib/thought-processes.ts';
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let inMultilineString = false;
let stringStartLine = -1;
let propName = '';
let stringContent = [];
let result = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (!inMultilineString) {
    // Check if this line starts a multiline string
    const match = line.match(/^(\s*)(thoughtProcess1|thoughtProcess2|output):\s*"(.*)$/);
    if (match) {
      const indent = match[1];
      propName = match[2];
      const rest = match[3];

      // Check if string ends on same line
      if (rest.endsWith('"') && !rest.endsWith('\\"')) {
        // Single line string, keep as is
        result.push(line);
      } else {
        // Multi-line string starts here
        inMultilineString = true;
        stringStartLine = i;
        stringContent = [rest];
      }
    } else {
      result.push(line);
    }
  } else {
    // We're inside a multi-line string
    // Check if this line ends the string
    const trimmed = line.trimEnd();

    // Look for closing quote that's not escaped
    // The pattern is: content ends with " (not preceded by \)
    if (trimmed.endsWith('"') && !trimmed.endsWith('\\"')) {
      // String ends here
      stringContent.push(line.slice(0, -1)); // Remove the closing quote

      // Escape backticks in the content
      const escapedContent = stringContent.join('\n').replace(/`/g, '\\`');

      // Get the indent from the original line
      const origLine = lines[stringStartLine];
      const indentMatch = origLine.match(/^(\s*)/);
      const indent = indentMatch ? indentMatch[1] : '';

      // Reconstruct with template literal
      result.push(`${indent}${propName}: \`${escapedContent}\``);

      inMultilineString = false;
      stringContent = [];
    } else {
      stringContent.push(line);
    }
  }
}

fs.writeFileSync(filePath, result.join('\n'), 'utf8');
console.log('Fixed multi-line strings!');
