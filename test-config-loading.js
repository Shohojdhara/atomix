// Test script to verify config loading functionality
import { loadConfig } from './src/lib/config/public-api.js'; // Adding .js extension for ESM compatibility

console.log('Testing config loading functionality...');

try {
  // Try to load the config from the current directory
  const config = loadConfig();
  console.log('✓ Successfully loaded config');
  console.log('  Prefix:', config.prefix);
  console.log('  Has theme extend:', !!config.theme?.extend);
  console.log('  Has colors:', !!config.theme?.extend?.colors);
} catch (error) {
  console.error('✗ Failed to load config:', error.message);
}

// Test with a non-existent config file (should use defaults)
try {
  const defaultConfig = loadConfig({ configPath: 'nonexistent.config.ts', required: false });
  console.log('\n✓ Successfully loaded default config when file does not exist');
  console.log('  Prefix:', defaultConfig.prefix);
} catch (error) {
  console.error('✗ Failed with nonexistent file:', error.message);
}

// Test JSON config loading if it exists
try {
  const jsonConfig = loadConfig({ configPath: 'atomix.config.json', required: false });
  console.log('\n✓ Successfully tried to load JSON config');
  console.log('  Prefix:', jsonConfig.prefix);
} catch (error) {
  console.log('\n- JSON config not found (this is OK)');
}

console.log('\nConfig loading test completed.');