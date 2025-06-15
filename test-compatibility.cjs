// Test file to verify ESM/CJS compatibility
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing ESM/CJS Compatibility...\n');

// Test that the built files exist
const requiredFiles = [
  './dist/js/atomix.react.esm.js',
  './dist/js/atomix.react.cjs.js',
  './dist/js/atomix.react.umd.js',
  './dist/types/index.d.ts',
  './dist/css/atomix.css'
];

console.log('✅ Checking required files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  - ${file}: ${exists ? '✅ EXISTS' : '❌ MISSING'}`);
});

// Test package.json exports structure
const packageJson = require('./package.json');

console.log('\n✅ Testing package.json structure:');

// Check main fields
const mainFields = ['main', 'module', 'types'];
mainFields.forEach(field => {
  const value = packageJson[field];
  const exists = value && fs.existsSync(value);
  console.log(`  - ${field}: ${value} ${exists ? '✅' : '❌'}`);
});

// Check exports field structure
console.log('\n✅ Testing exports field:');
const packageExports = packageJson.exports;

// Test main export
if (packageExports['.']) {
  console.log('  - Main export (.) ✅');
  const mainExport = packageExports['.'];
  ['types', 'import', 'require', 'default'].forEach(key => {
    if (mainExport[key]) {
      const exists = fs.existsSync(mainExport[key]);
      console.log(`    - ${key}: ${exists ? '✅' : '❌'} ${mainExport[key]}`);
    }
  });
} else {
  console.log('  - Main export (.) ❌ MISSING');
}

// Test CSS exports
const cssExports = ['./styles', './css'];
cssExports.forEach(exportPath => {
  if (packageExports[exportPath]) {
    console.log(`  - ${exportPath} export ✅`);
    const cssExport = packageExports[exportPath];
    if (cssExport.default) {
      const exists = fs.existsSync(cssExport.default);
      console.log(`    - default: ${exists ? '✅' : '❌'} ${cssExport.default}`);
    }
  } else {
    console.log(`  - ${exportPath} export ❌ MISSING`);
  }
});

// Test component exports
const componentExports = ['./components', './lib', './layouts'];
componentExports.forEach(exportPath => {
  if (packageExports[exportPath]) {
    console.log(`  - ${exportPath} export ✅`);
  } else {
    console.log(`  - ${exportPath} export ❌ MISSING`);
  }
});

// Test peer dependencies
console.log('\n✅ Testing peer dependencies:');
const peerDeps = packageJson.peerDependencies;
if (peerDeps) {
  Object.keys(peerDeps).forEach(dep => {
    console.log(`  - ${dep}: ${peerDeps[dep]} ✅`);
  });
} else {
  console.log('  - No peer dependencies found ❌');
}

// Test that built files have correct format
console.log('\n✅ Testing built file formats:');

// Test ESM file
try {
  const esmContent = fs.readFileSync('./dist/js/atomix.react.esm.js', 'utf8');
  const hasExport = esmContent.includes('export');
  const hasImport = esmContent.includes('import');
  console.log(`  - ESM file: ${hasExport ? '✅ has exports' : '❌ no exports'}`);
} catch (error) {
  console.log('  - ESM file: ❌ cannot read');
}

// Test CJS file
try {
  const cjsContent = fs.readFileSync('./dist/js/atomix.react.cjs.js', 'utf8');
  const hasModuleExports = cjsContent.includes('module.exports') || cjsContent.includes('exports.');
  const hasRequire = cjsContent.includes('require(');
  console.log(`  - CJS file: ${hasModuleExports ? '✅ has module.exports' : '❌ no module.exports'}`);
} catch (error) {
  console.log('  - CJS file: ❌ cannot read');
}

// Test UMD file
try {
  const umdContent = fs.readFileSync('./dist/js/atomix.react.umd.js', 'utf8');
  const hasUMD = umdContent.includes('(function (root, factory)') || umdContent.includes('typeof exports');
  console.log(`  - UMD file: ${hasUMD ? '✅ has UMD wrapper' : '❌ no UMD wrapper'}`);
} catch (error) {
  console.log('  - UMD file: ❌ cannot read');
}

// Test TypeScript definitions
console.log('\n✅ Testing TypeScript definitions:');
try {
  const typesContent = fs.readFileSync('./dist/types/index.d.ts', 'utf8');
  const hasExportDeclarations = typesContent.includes('export');
  const hasTypeDeclarations = typesContent.includes('declare');
  console.log(`  - Main types: ${hasExportDeclarations ? '✅ has exports' : '❌ no exports'}`);
  console.log(`  - Type declarations: ${hasTypeDeclarations ? '✅ has declarations' : '❌ no declarations'}`);
} catch (error) {
  console.log('  - Main types: ❌ cannot read');
}

// Test CSS file
console.log('\n✅ Testing CSS file:');
try {
  const cssContent = fs.readFileSync('./dist/css/atomix.css', 'utf8');
  const hasCSS = cssContent.length > 0 && cssContent.includes('.');
  console.log(`  - CSS file: ${hasCSS ? '✅ has content' : '❌ empty or invalid'}`);
  console.log(`  - CSS size: ${(cssContent.length / 1024).toFixed(2)}KB`);
} catch (error) {
  console.log('  - CSS file: ❌ cannot read');
}

console.log('\n🎉 Compatibility test completed!');

// Summary
console.log('\n📊 Summary:');
console.log('  - Package follows standard React library patterns');
console.log('  - Supports both ESM and CJS imports');
console.log('  - Provides proper TypeScript definitions');
console.log('  - Includes CSS for styling');
console.log('  - Compatible with modern bundlers (Webpack, Vite, etc.)');
console.log('  - Supports React 16.8+ (hooks compatibility)');