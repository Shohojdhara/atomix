/**
 * This script fixes issues with TypeScript declaration files after they're generated
 * It ensures proper exports and fixes common issues with the generated types
 */

const fs = require('fs');
const path = require('path');

// Paths
const TYPES_DIR = path.resolve(__dirname, '../dist/types');
const COMPONENTS_DIR = path.resolve(TYPES_DIR, 'components');
const LIB_DIR = path.resolve(TYPES_DIR, 'lib');
const LAYOUTS_DIR = path.resolve(TYPES_DIR, 'layouts');

// Ensure directories exist
if (!fs.existsSync(TYPES_DIR)) {
  console.error('Types directory does not exist. Run tsc first.');
  process.exit(1);
}

// Helper function to ensure directory exists
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    console.warn(`Directory ${dir} does not exist, skipping related fixes`);
    return false;
  }
  return true;
}

// Fix component index file to ensure proper exports
function fixComponentIndexFile() {
  if (!ensureDirExists(COMPONENTS_DIR)) return;
  
  const indexPath = path.join(COMPONENTS_DIR, 'index.d.ts');
  
  // Create a new index file with proper exports
  let newContent = '// Auto-generated component type exports\n\n';
  
  try {
    // Get all component directories
    const componentDirs = fs.readdirSync(COMPONENTS_DIR)
      .filter(file => fs.statSync(path.join(COMPONENTS_DIR, file)).isDirectory());
    
    // Process each component directory
    componentDirs.forEach(componentDir => {
      // Check for main component file
      const componentFile = `${componentDir}.d.ts`;
      const componentPath = path.join(COMPONENTS_DIR, componentDir, componentFile);
      
      if (fs.existsSync(componentPath)) {
        // Export from main component file
        newContent += `export * from './${componentDir}/${componentDir}';\n`;
      } else {
        // If main component file doesn't exist, check for index.d.ts
        const indexFile = path.join(COMPONENTS_DIR, componentDir, 'index.d.ts');
        if (fs.existsSync(indexFile)) {
          newContent += `export * from './${componentDir}';\n`;
        }
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
  } catch (error) {
    console.error(`❌ Error fixing component index.d.ts file: ${error.message}`);
  }
}

// Fix main index file
function fixMainIndexFile() {
  const indexPath = path.join(TYPES_DIR, 'index.d.ts');
  
  try {
    // Create a proper main index file
    const newContent = `// Type definitions for @shohojdhara/atomix

// Export all components
export * from './components/index';

// Export lib utilities
export * from './lib/index';

// Export layouts
export * from './layouts/index';

// Define the default export with proper typing
import * as components from './components';
import { composables, utils, constants, types } from './lib';

declare const atomix: typeof components & {
  composables: typeof composables;
  utils: typeof utils;
  constants: typeof constants;
  types: typeof types;
};

// Default export
export default atomix;
`;
    
    // Write the fixed content
    fs.writeFileSync(indexPath, newContent);
    console.log('✅ Fixed main index.d.ts file');
  } catch (error) {
    console.error(`❌ Error fixing main index.d.ts file: ${error.message}`);
  }
}

// Fix individual component files if needed
function fixComponentFiles() {
  if (!ensureDirExists(COMPONENTS_DIR)) return;
  
  try {
    // Walk through all component directories
    const componentDirs = fs.readdirSync(COMPONENTS_DIR)
      .filter(file => fs.statSync(path.join(COMPONENTS_DIR, file)).isDirectory());
    
    // Process all component directories
    componentDirs.forEach(dir => {
      const componentPath = path.join(COMPONENTS_DIR, dir, `${dir}.d.ts`);
      const indexPath = path.join(COMPONENTS_DIR, dir, 'index.d.ts');
      
      // Fix main component file if it exists
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
      
      // Fix component index files - this is the main issue causing the error
      if (fs.existsSync(indexPath)) {
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // Check if the index file is trying to import from a file that doesn't exist
        const importPattern = /from '\.\/([^']+)'/g;
        let match;
        let hasChanges = false;
        
        while ((match = importPattern.exec(content)) !== null) {
          const importPath = match[1];
          const fullPath = path.join(COMPONENTS_DIR, dir, `${importPath}.d.ts`);
          
          // If the imported file doesn't exist, try to find an alternative
          if (!fs.existsSync(fullPath)) {
            console.log(`⚠️ Missing import target: ${fullPath}`);
            
            // Check if the main component file exists
            const mainComponentPath = path.join(COMPONENTS_DIR, dir, `${dir}.d.ts`);
            if (fs.existsSync(mainComponentPath)) {
              content = content.replace(
                new RegExp(`from '\./${importPath}'`, 'g'),
                `from './${dir}'`
              );
              hasChanges = true;
              console.log(`✅ Fixed import in ${dir}/index.d.ts: './${importPath}' -> './${dir}'`);
            }
          }
        }
        
        if (hasChanges) {
          fs.writeFileSync(indexPath, content);
        }
      } else if (fs.existsSync(componentPath)) {
        // If index.d.ts doesn't exist but the component file does, create an index file
        const newIndexContent = `export * from './${dir}';
export { default } from './${dir}';
`;
        fs.writeFileSync(indexPath, newIndexContent);
        console.log(`✅ Created missing index.d.ts for ${dir}`);
      }
    });
    
    console.log('✅ Fixed component declaration files');
  } catch (error) {
    console.error(`❌ Error fixing component declaration files: ${error.message}`);
  }
}

// Fix lib/composables directory
function fixLibComposables() {
  const libComposablesDir = path.join(TYPES_DIR, 'lib', 'composables');
  const libComposablesIndexPath = path.join(libComposablesDir, 'index.d.ts');
  
  if (!fs.existsSync(libComposablesDir)) {
    console.log('⚠️ lib/composables directory not found, skipping');
    return;
  }
  
  try {
    // Get all .d.ts files in the lib/composables directory (excluding index.d.ts)
    const composableFiles = fs.readdirSync(libComposablesDir)
      .filter(file => file.endsWith('.d.ts') && file !== 'index.d.ts');
    
    // Generate export statements for each composable
    const exportStatements = composableFiles.map(file => {
      const moduleName = file.replace(/\.d\.ts$/, '');
      return `export * from './${moduleName}';`;
    }).join('\n');
    
    // Write the new content to the index.d.ts file
    fs.writeFileSync(libComposablesIndexPath, exportStatements + '\n');
    
    console.log('✅ Fixed lib/composables index.d.ts');
  } catch (error) {
    console.error(`❌ Error fixing lib/composables index.d.ts: ${error.message}`);
  }
}

// Fix lib/utils index.d.ts file
function fixLibUtils() {
  const libUtilsDir = path.join(TYPES_DIR, 'lib', 'utils');
  const libUtilsIndexPath = path.join(libUtilsDir, 'index.d.ts');
  
  if (!fs.existsSync(libUtilsDir)) {
    console.log('⚠️ lib/utils directory not found, skipping');
    return;
  }
  
  try {
    // Get all .d.ts files in the lib/utils directory (excluding index.d.ts)
    const utilFiles = fs.readdirSync(libUtilsDir)
      .filter(file => file.endsWith('.d.ts') && file !== 'index.d.ts');
    
    // Generate export statements for each utility
    const exportStatements = utilFiles.map(file => {
      const moduleName = file.replace(/\.d\.ts$/, '');
      return `export * from './${moduleName}';`;
    }).join('\n');
    
    // Write the new content to the index.d.ts file
    fs.writeFileSync(libUtilsIndexPath, exportStatements + '\n');
    
    console.log('✅ Fixed lib/utils index.d.ts');
  } catch (error) {
    console.error(`❌ Error fixing lib/utils index.d.ts: ${error.message}`);
  }
}

// Fix lib/constants index.d.ts file
function fixLibConstants() {
  const libConstantsDir = path.join(TYPES_DIR, 'lib', 'constants');
  const libConstantsIndexPath = path.join(libConstantsDir, 'index.d.ts');
  
  if (!fs.existsSync(libConstantsDir)) {
    console.log('⚠️ lib/constants directory not found, skipping');
    return;
  }
  
  try {
    // Get all .d.ts files in the lib/constants directory (excluding index.d.ts)
    const constantFiles = fs.readdirSync(libConstantsDir)
      .filter(file => file.endsWith('.d.ts') && file !== 'index.d.ts');
    
    // Generate export statements for each constants file
    const exportStatements = constantFiles.map(file => {
      const moduleName = file.replace(/\.d\.ts$/, '');
      return `export * from './${moduleName}';`;
    }).join('\n');
    
    // Write the new content to the index.d.ts file
    fs.writeFileSync(libConstantsIndexPath, exportStatements + '\n');
    
    console.log('✅ Fixed lib/constants index.d.ts');
  } catch (error) {
    console.error(`❌ Error fixing lib/constants index.d.ts: ${error.message}`);
  }
}

// Fix lib/types index.d.ts file
function fixLibTypes() {
  const libTypesDir = path.join(TYPES_DIR, 'lib', 'types');
  const libTypesIndexPath = path.join(libTypesDir, 'index.d.ts');
  
  if (!fs.existsSync(libTypesDir)) {
    console.log('⚠️ lib/types directory not found, skipping');
    return;
  }
  
  try {
    // Get all .d.ts files in the lib/types directory (excluding index.d.ts)
    const typeFiles = fs.readdirSync(libTypesDir)
      .filter(file => file.endsWith('.d.ts') && file !== 'index.d.ts');
    
    // Generate export statements for each type file
    const exportStatements = typeFiles.map(file => {
      const moduleName = file.replace(/\.d\.ts$/, '');
      return `export * from './${moduleName}';`;
    }).join('\n');
    
    // Write the new content to the index.d.ts file
    fs.writeFileSync(libTypesIndexPath, exportStatements + '\n');
    
    console.log('✅ Fixed lib/types index.d.ts');
  } catch (error) {
    console.error(`❌ Error fixing lib/types index.d.ts: ${error.message}`);
  }
}

// Fix layouts index.d.ts file
function fixLayouts() {
  if (!fs.existsSync(LAYOUTS_DIR)) {
    // Create layouts directory and empty index file if it doesn't exist
    fs.mkdirSync(LAYOUTS_DIR, { recursive: true });
    const layoutsIndexPath = path.join(LAYOUTS_DIR, 'index.d.ts');
    fs.writeFileSync(layoutsIndexPath, '// No layouts currently available\n');
    console.log('✅ Created empty layouts index.d.ts');
    return;
  }
  
  try {
    // Get all layout directories
    const layoutDirs = fs.readdirSync(LAYOUTS_DIR)
      .filter(file => fs.statSync(path.join(LAYOUTS_DIR, file)).isDirectory());
    
    // Generate export statements for each layout
    let exportStatements = [];
    
    layoutDirs.forEach(dir => {
      // Check if the layout has a main .d.ts file
      const layoutFile = path.join(LAYOUTS_DIR, dir, `${dir}.d.ts`);
      const indexFile = path.join(LAYOUTS_DIR, dir, 'index.d.ts');
      
      if (fs.existsSync(layoutFile)) {
        exportStatements.push(`export * from './${dir}/${dir}';`);
      } else if (fs.existsSync(indexFile)) {
        exportStatements.push(`export * from './${dir}';`);
      }
    });
    
    // Create the layouts index.d.ts file
    const layoutsIndexPath = path.join(LAYOUTS_DIR, 'index.d.ts');
    const content = exportStatements.length > 0 
      ? exportStatements.join('\n') + '\n'
      : '// No layouts currently available\n';
    fs.writeFileSync(layoutsIndexPath, content);
    
    console.log('✅ Fixed layouts index.d.ts');
  } catch (error) {
    console.error(`❌ Error fixing layouts index.d.ts: ${error.message}`);
  }
}

// Fix lib/index.d.ts file to properly export all lib modules
function fixLibIndex() {
  const libDir = path.join(TYPES_DIR, 'lib');
  const libIndexPath = path.join(libDir, 'index.d.ts');
  
  if (!fs.existsSync(libDir)) {
    console.log('⚠️ lib directory not found, skipping');
    return;
  }
  
  try {
    // Create content that exports all lib modules with proper typing
    const content = `// Auto-generated lib exports

// Import and re-export as namespaces with proper typing
import * as composablesImport from './composables';
import * as utilsImport from './utils';
import * as typesImport from './types';
import * as constantsImport from './constants';

// Export as namespaces with explicit typing
export const composables: typeof composablesImport;
export const utils: typeof utilsImport;
export const types: typeof typesImport;
export const constants: typeof constantsImport;
`;
    
    fs.writeFileSync(libIndexPath, content);
    
    console.log('✅ Fixed lib/index.d.ts');
  } catch (error) {
    console.error(`❌ Error fixing lib/index.d.ts: ${error.message}`);
  }
}

// Run the fixes
try {
  console.log('🔧 Starting type declaration fixes...');
  
  // Fix component-related files
  fixComponentFiles();
  fixComponentIndexFile();
  
  // Fix lib-related files
  fixLibComposables();
  fixLibUtils();
  fixLibConstants();
  fixLibTypes();
  fixLibIndex();
  
  // Fix layouts
  fixLayouts();
  
  // Fix main index file (must be last as it depends on other fixes)
  fixMainIndexFile();
  
  console.log('✅ All type declaration fixes completed successfully!');
} catch (error) {
  console.error(`❌ Error fixing type definitions:`, error);
  process.exit(1);
}