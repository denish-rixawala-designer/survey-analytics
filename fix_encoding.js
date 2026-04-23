const fs = require('fs');

const file = 'c:\\Users\\DenishRixawala\\Downloads\\survey-company-analytics\\src\\Analytics.tsx';
let content = fs.readFileSync(file, 'utf8');

// The replacement mapping
const replacements = {
  'Â·': '·',
  'â€”': '—',
  'â€“': '–',
  'â–¼': '▼',
  'â–²': '▲',
  'â†“': '↓',
  'âˆ’': '−',
  'â€¦': '…',
  'Â': '' // sometimes stray Â are left over
};

for (const [bad, good] of Object.entries(replacements)) {
  content = content.split(bad).join(good);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed encoding artifacts successfully.');
