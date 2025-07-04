#!/usr/bin/env node

/**
 * This script fixes export issues in the built files
 * - Fixes the Tooltip_Tooltip as Tooltip issue
 * - Ensures all components are properly exported
 */

const fs = require('fs');
const path = require('path');

const fixEsmExports = () => {
  const esmPath = path.join(__dirname, '../dist/js/atomix.react.esm.js');
  
  if (!fs.existsSync(esmPath)) {
    console.error('ESM file not found:', esmPath);
    return;
  }
  
  let content = fs.readFileSync(esmPath, 'utf8');
  
  // Fix Tooltip_Tooltip as Tooltip issue
  content = content.replace(
    /Tooltip_Tooltip as Tooltip/g, 
    'Tooltip'
  );
  
  // Fix any missing exports by ensuring all components are properly exported
  const componentNames = [
    'Accordion', 'Avatar', 'AvatarGroup', 'Badge', 'Breadcrumb', 
    'Button', 'Callout', 'Card', 'Checkbox', 'ColorModeToggle',
    'Container', 'Countdown', 'DataTable', 'DatePicker', 'Dropdown',
    'EdgePanel', 'Form', 'Grid', 'GridCol', 'Hero', 'Icon', 'Input',
    'List', 'MasonryGrid', 'MasonryGridItem', 'Messages', 'Modal',
    'Navbar', 'Pagination', 'PhotoViewer', 'Popover', 'ProductReview',
    'Progress', 'Radio', 'Rating', 'River', 'Row', 'SectionIntro',
    'Select', 'Spinner', 'Steps', 'Tab', 'Testimonial', 'Textarea',
    'Todo', 'Toggle', 'Tooltip', 'Upload'
  ];
  
  // Check if any component is missing from the exports
  const exportLine = content.match(/export\s*{[^}]+}/g);
  if (exportLine) {
    const exportContent = exportLine[0];
    
    // Create a fixed export line with all components
    let fixedExportContent = 'export { ';
    fixedExportContent += componentNames.join(', ');
    fixedExportContent += ', composables, constants, src as default, types, utils };';
    
    // Replace the export line
    content = content.replace(exportLine[0], fixedExportContent);
  }
  
  fs.writeFileSync(esmPath, content);
  console.log('Fixed ESM exports in:', esmPath);
};

const fixCjsExports = () => {
  const cjsPath = path.join(__dirname, '../dist/js/atomix.react.cjs.js');
  
  if (!fs.existsSync(cjsPath)) {
    console.error('CJS file not found:', cjsPath);
    return;
  }
  
  let content = fs.readFileSync(cjsPath, 'utf8');
  
  // Fix Tooltip_Tooltip as Tooltip issue
  content = content.replace(
    /Tooltip_Tooltip: Tooltip/g, 
    'Tooltip: Tooltip'
  );
  
  fs.writeFileSync(cjsPath, content);
  console.log('Fixed CJS exports in:', cjsPath);
};

const fixUmdExports = () => {
  const umdPath = path.join(__dirname, '../dist/js/atomix.react.umd.js');
  
  if (!fs.existsSync(umdPath)) {
    console.error('UMD file not found:', umdPath);
    return;
  }
  
  let content = fs.readFileSync(umdPath, 'utf8');
  
  // Fix Tooltip_Tooltip as Tooltip issue
  content = content.replace(
    /Tooltip_Tooltip: Tooltip/g, 
    'Tooltip: Tooltip'
  );
  
  fs.writeFileSync(umdPath, content);
  console.log('Fixed UMD exports in:', umdPath);
};

// Run all fixes
try {
  fixEsmExports();
  fixCjsExports();
  fixUmdExports();
  console.log('All export issues fixed successfully!');
} catch (error) {
  console.error('Error fixing exports:', error);
  process.exit(1);
}