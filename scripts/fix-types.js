/**
 * This script fixes issues with TypeScript declaration files after they're generated
 * It ensures proper exports and fixes common issues with the generated types
 */

const fs = require('fs');
const path = require('path');

// Paths
const TYPES_DIR = path.resolve(__dirname, '../dist/types');
const COMPONENTS_DIR = path.resolve(TYPES_DIR, 'components');

// Ensure directories exist
if (!fs.existsSync(TYPES_DIR)) {
  console.error('Types directory does not exist. Run tsc first.');
  process.exit(1);
}

// Fix component index file to ensure proper exports
function fixComponentIndexFile() {
  const indexPath = path.join(COMPONENTS_DIR, 'index.d.ts');
  
  if (!fs.existsSync(indexPath)) {
    console.warn('Components index.d.ts file not found, skipping fix');
    return;
  }
  
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Fix imports and exports to ensure they're properly exported
  const componentFiles = fs.readdirSync(COMPONENTS_DIR)
    .filter(file => fs.statSync(path.join(COMPONENTS_DIR, file)).isDirectory());
  
  // Create a new index file with proper exports
  let newContent = '// Auto-generated component type exports\n\n';
  
  componentFiles.forEach(componentDir => {
    const componentFile = path.join(componentDir, componentDir + '.d.ts');
    if (fs.existsSync(path.join(COMPONENTS_DIR, componentFile))) {
      newContent += `export * from './${componentFile.replace(/\.d\.ts$/, '')}';\n`;
    }
  });
  
  // Add form components separately
  if (fs.existsSync(path.join(COMPONENTS_DIR, 'Form'))) {
    const formComponents = ['Form', 'Input', 'Textarea', 'Select', 'Checkbox', 'Radio'];
    formComponents.forEach(component => {
      if (fs.existsSync(path.join(COMPONENTS_DIR, 'Form', component + '.d.ts'))) {
        newContent += `export * from './Form/${component}';\n`;
      }
    });
  }
  
  // Write the fixed content
  fs.writeFileSync(indexPath, newContent);
  console.log('✅ Fixed component index.d.ts file');
}

// Fix main index file
function fixMainIndexFile() {
  const indexPath = path.join(TYPES_DIR, 'index.d.ts');
  
  if (!fs.existsSync(indexPath)) {
    console.warn('Main index.d.ts file not found, skipping fix');
    return;
  }
  
  // Create a proper main index file
  const newContent = `// Type definitions for @shohojdhara/atomix

// Export all components
export * from './components/index';

// Export lib utilities
export * from './lib/index';

// Export layouts
export * from './layouts/index';

// Define the default export
declare const atomix: {
  [key: string]: any;
  
  // Explicitly include lib namespaces
  composables: any;
  utils: any;
  constants: any;
  layouts: any;
};

// Default export
export default atomix;
`;
  
  // Write the fixed content
  fs.writeFileSync(indexPath, newContent);
  console.log('✅ Fixed main index.d.ts file');
}

// Fix individual component files if needed
function fixComponentFiles() {
  // Walk through all component directories
  const componentDirs = fs.readdirSync(COMPONENTS_DIR)
    .filter(file => fs.statSync(path.join(COMPONENTS_DIR, file)).isDirectory());
  
  componentDirs.forEach(dir => {
    const componentPath = path.join(COMPONENTS_DIR, dir, `${dir}.d.ts`);
    
    if (fs.existsSync(componentPath)) {
      let content = fs.readFileSync(componentPath, 'utf8');
      
      // Fix common issues with generated component files
      
      // 1. Ensure named exports are properly exported
      if (!content.includes('export declare const')) {
        content = content.replace(
          /declare const (\w+):/g, 
          'export declare const $1:'
        );
      }
      
      // 2. Fix interface exports
      if (!content.includes('export interface')) {
        content = content.replace(
          /interface (\w+Props)/g, 
          'export interface $1'
        );
      }
      
      // Write back the fixed content
      fs.writeFileSync(componentPath, content);
    }
  });
  
  console.log('✅ Fixed component declaration files');
}

// Run the fixes
try {
  fixComponentFiles();
  fixComponentIndexFile();
  fixMainIndexFile();
  console.log('✅ All type definition fixes completed successfully');
} catch (error) {
  console.error('❌ Error fixing type definitions:', error);
  process.exit(1);
} 