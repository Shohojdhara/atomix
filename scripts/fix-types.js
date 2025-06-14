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
    
    // Special handling for components with known issues
    const specialComponents = {
      'Accordion': `export { default, Accordion } from './scripts/index';
export type { AccordionProps } from './scripts/index';
`,
      'Breadcrumb': `export { default, Breadcrumb } from './Breadcrumb';
export type { BreadcrumbProps } from './Breadcrumb';
`,
      'River': `export { default, River } from './River';
export type { RiverProps } from './River';
`,
      'Tab': `export { default, Tab } from './Tab';
export type { TabProps } from './Tab';
`,
      'Toggle': `export { default, Toggle } from './Toggle';
export type { ToggleProps } from './Toggle';
`,
      'Tooltip': `export { default, Tooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';
`
    };
    
    // Apply special handling for components that need it
    Object.keys(specialComponents).forEach(componentName => {
      if (fs.existsSync(path.join(COMPONENTS_DIR, componentName, 'index.d.ts'))) {
        const indexPath = path.join(COMPONENTS_DIR, componentName, 'index.d.ts');
        fs.writeFileSync(indexPath, specialComponents[componentName]);
        console.log(`✅ Applied special handling for ${componentName} component`);
      }
    });
    
    // Process all component directories
    componentDirs.forEach(dir => {
      // Fix main component file
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
      
      // Fix component index files
      const indexPath = path.join(COMPONENTS_DIR, dir, 'index.d.ts');
      
      // Skip if this is a special component we already handled
      if (specialComponents[dir] && fs.existsSync(indexPath)) {
        return;
      }
      
      if (fs.existsSync(indexPath)) {
        // Check if the index file has the correct exports
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // If the file is trying to import from './ComponentName' but that file doesn't exist
        // Update it to import from './scripts/index' instead
        if (content.includes(`from './${dir}'`) && !fs.existsSync(path.join(COMPONENTS_DIR, dir, `${dir}.d.ts`))) {
          // Check if scripts/index.d.ts exists as an alternative
          if (fs.existsSync(path.join(COMPONENTS_DIR, dir, 'scripts', 'index.d.ts'))) {
            content = content.replace(
              new RegExp(`from '\.\/\${dir}'`, 'g'),
              `from './scripts/index'`
            );
          } else {
            // If no scripts/index.d.ts, create a simple re-export of the component
            const componentFiles = fs.readdirSync(path.join(COMPONENTS_DIR, dir))
              .filter(file => file.endsWith('.d.ts') && file !== 'index.d.ts');
            
            if (componentFiles.length > 0) {
              // Use the first available .d.ts file
              const firstComponent = componentFiles[0].replace(/\.d\.ts$/, '');
              content = content.replace(
                new RegExp(`from '\.\/\${dir}'`, 'g'),
                `from './${firstComponent}'`
              );
            }
          }
          fs.writeFileSync(indexPath, content);
        }
      } else {
        // If index.d.ts doesn't exist but the component file does, create an index file
        if (fs.existsSync(componentPath)) {
          const newIndexContent = `export * from './${dir}';
export { default } from './${dir}';
`;
          fs.writeFileSync(indexPath, newIndexContent);
        }
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
  if (!ensureDirExists(LAYOUTS_DIR)) return;
  
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
    const content = exportStatements.join('\n') + '\n';
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
    // Create content that exports all lib modules
    const content = `// Auto-generated lib exports

export * as composables from './composables';
export * as utils from './utils';
export * as types from './types';
export * as constants from './constants';
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