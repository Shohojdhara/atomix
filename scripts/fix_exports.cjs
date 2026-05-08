const fs = require('fs');

let content = fs.readFileSync('src/lib/theme/index.ts', 'utf8');

// Find all export blocks ending with "from '...';"
const regex = /export\s+\{([\s\S]*?)\}\s+from\s+('[^']+');/g;

content = content.replace(regex, (match, body, source) => {
    // We want to turn this into:
    // import { body } from source;
    // export { cleanBody };
    
    // cleanBody should only contain the exported identifiers. 
    // Types have "type X" which needs to be handled for the export. 
    // In TypeScript 4.5+, export { type X } is valid, but the user is using `export { type ThemeMode }`.
    
    // Let's extract the actual identifiers from the body.
    const cleanBody = body
        .split('\n')
        .map(line => line.replace(/\/\/.*$/, '')) // strip comments
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('//'))
        .join('\n');
    
    return `import {\n${body}\n} from ${source};\nexport {\n${cleanBody}\n};`;
});

fs.writeFileSync('src/lib/theme/index.ts', content);
