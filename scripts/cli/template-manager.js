#!/usr/bin/env node

/**
 * Template Manager CLI
 * Helper utility for managing Atomix CLI templates
 */

import templates from './templates/index.js';

const commands = {
  list: () => {
    console.log('\n📦 Available Templates:\n');
    
    console.log('React Component Templates:');
    Object.keys(templates.componentTemplates.react).forEach(name => {
      console.log(`  • ${name}`);
    });
    
    console.log('\nComposable Templates:');
    Object.keys(templates.componentTemplates.composable).forEach(name => {
      console.log(`  • ${name}`);
    });
    
    console.log('\nToken Generators:');
    Object.keys(templates).filter(k => k.startsWith('generate')).forEach(name => {
      console.log(`  • ${name}`);
    });
    
    console.log('\nProject Templates:');
    Object.keys(templates.projectTemplates).forEach(name => {
      console.log(`  • ${name}`);
    });
    
    console.log('\nConfig Templates:');
    Object.keys(templates.configTemplates).forEach(name => {
      console.log(`  • ${name}`);
    });
    console.log();
  },
  
  validate: () => {
    console.log('\n🔍 Validating Templates...\n');
    
    let errors = 0;
    
    // Test React templates
    try {
      const testReact = templates.componentTemplates.react.simple('TestComponent');
      if (!testReact.includes('export const TestComponent')) {
        console.log('❌ React simple template failed');
        errors++;
      } else {
        console.log('✅ React simple template passed');
      }
    } catch (err) {
      console.log('❌ React simple template error:', err.message);
      errors++;
    }
    
    // Test token generators
    try {
      const colorTokens = templates.generateColorTokens();
      if (!colorTokens.includes('$custom-primary-6')) {
        console.log('❌ Color tokens template failed');
        errors++;
      } else {
        console.log('✅ Color tokens template passed');
      }
    } catch (err) {
      console.log('❌ Color tokens template error:', err.message);
      errors++;
    }
    
    console.log(`\n${errors === 0 ? '✅' : '❌'} Template validation complete (${errors} errors)\n`);
    
    return errors === 0;
  },
  
  help: () => {
    console.log(`
🛠️  Template Manager - Atomix CLI

Usage:
  node template-manager.js <command>

Commands:
  list     List all available templates
  validate Validate all templates for syntax errors
  help     Show this help message

Examples:
  node template-manager.js list
  node template-manager.js validate
`);
  }
};

const command = process.argv[2];

if (commands[command]) {
  commands[command]();
} else {
  console.log('Unknown command. Use "help" for available commands.');
  commands.help();
}