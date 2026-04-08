const fs = require('fs');
const content = fs.readFileSync('src/lib/theme/index.ts', 'utf8');

const updated = content.replace(/export\s+\{([^}]+)\}\s+from\s+('[^']+');/g, (match, vars, path) => {
  return `import {${vars}} from ${path};\nexport {${vars}};`;
});

fs.writeFileSync('src/lib/theme/index.ts.new', updated);
