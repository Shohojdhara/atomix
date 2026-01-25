/**
 * Documentation Sync Module
 * Syncs CLI documentation with component guidelines
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';

/**
 * Documentation sources and destinations
 * This mapping is used for future extensibility of the sync system
 * @type {Record<string, {destinations: string[]}>}
 */
// eslint-disable-next-line no-unused-vars
const DOCS_MAPPING = {
  // Component guidelines
  'src/components/*/README.md': {
    destinations: [
      'docs/components/{component}.md',
      'docs/api/{component}.md'
    ]
  },
  // Storybook stories
  'src/components/*/*.stories.tsx': {
    destinations: [
      'docs/examples/{component}.md'
    ]
  },
  // Type definitions
  'src/lib/types/components.ts': {
    destinations: [
      'docs/api/component-props.md'
    ]
  },
  // Constants
  'src/lib/constants/components.ts': {
    destinations: [
      'docs/api/component-constants.md'
    ]
  }
};

/**
 * Extract component documentation from README
 */
async function extractFromReadme(readmePath) {
  const content = await readFile(readmePath, 'utf8');
  
  const docs = {
    name: '',
    description: '',
    usage: '',
    examples: [],
    props: [],
    api: {}
  };
  
  // Extract component name
  const nameMatch = content.match(/^# (.+)$/m);
  if (nameMatch) {
    docs.name = nameMatch[1];
  }
  
  // Extract description
  const descMatch = content.match(/## Description\s*\n([\s\S]+?)\n##/);
  if (descMatch) {
    docs.description = descMatch[1].trim();
  }
  
  // Extract usage
  const usageMatch = content.match(/## Usage\s*\n([\s\S]+?)\n##/);
  if (usageMatch) {
    docs.usage = usageMatch[1].trim();
  }
  
  // Extract examples (code blocks)
  const exampleMatches = content.matchAll(/```(?:tsx|typescript|jsx|javascript)\n([\s\S]+?)```/g);
  for (const match of exampleMatches) {
    docs.examples.push(match[1].trim());
  }
  
  // Extract props (from TypeScript interfaces)
  const propsMatch = content.match(/## Props\s*\n([\s\S]+?)\n##/);
  if (propsMatch) {
    const propLines = propsMatch[1].trim().split('\n');
    propLines.forEach(line => {
      const propMatch = line.match(/\*\s+`(\w+)`:\s+(.+?)\s*-\s*(.+)/);
      if (propMatch) {
        docs.props.push({
          name: propMatch[1],
          type: propMatch[2].trim(),
          description: propMatch[3].trim()
        });
      }
    });
  }
  
  return docs;
}

/**
 * Extract component API from types
 */
async function extractFromTypes(typesPath) {
  const content = await readFile(typesPath, 'utf8');
  
  const components = {};
  
  // Extract interface definitions
  const interfaceMatches = content.matchAll(/export\s+interface\s+(\w+Props)\s*{([^}]+)}/g);
  for (const match of interfaceMatches) {
    const componentName = match[1].replace('Props', '');
    const props = [];
    
    // Parse properties
    const propMatches = match[2].matchAll(/(\w+)(\?)?:\s+([^;]+);/g);
    for (const prop of propMatches) {
      props.push({
        name: prop[1],
        optional: !!prop[2],
        type: prop[3].trim()
      });
    }
    
    components[componentName] = { props };
  }
  
  return components;
}

/**
 * Generate Markdown documentation
 */
function generateMarkdown(docs, template = 'component') {
  const templates = {
    component: `# ${docs.name}

${docs.description ? `## Description\n\n${docs.description}\n\n` : ''}

## Installation

\`\`\`bash
npm install @shohojdhara/atomix
\`\`\`

## Usage

${docs.usage || 'Basic usage example:'}

\`\`\`tsx
import { ${docs.name} } from '@shohojdhara/atomix';

function App() {
  return (
    <${docs.name}>
      Content
    </${docs.name}>
  );
}
\`\`\`

${docs.examples.length > 0 ? `## Examples\n\n${docs.examples.map((ex, i) => `### Example ${i + 1}\n\n\`\`\`tsx\n${ex}\n\`\`\`\n`).join('\n')}\n` : ''}

${docs.props.length > 0 ? `## Props\n\n| Prop | Type | Default | Description |\n|------|------|---------|-------------|\n${docs.props.map(p => `| \`${p.name}\` | ${p.type} | - | ${p.description} |`).join('\n')}\n` : ''}

## API Reference

See [API Documentation](/docs/api/${docs.name.toLowerCase()}.md) for detailed API reference.

## Accessibility

This component follows WCAG 2.1 AA guidelines:
- Keyboard navigation support
- ARIA attributes included
- Screen reader friendly

## License

MIT
`,

    api: `# ${docs.name} API Reference

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
${docs.props.length > 0 ? docs.props.map(p => `| \`${p.name}\` | \`${p.type}\` | - | ${p.description} |`).join('\n') : '| - | - | - | - |'}

## Types

\`\`\`typescript
export interface ${docs.name}Props {
${docs.props.length > 0 ? docs.props.map(p => `  /** ${p.description} */\n  ${p.name}?: ${p.type};`).join('\n') : '  // Component props here'}
}
\`\`\`

## Examples

See [Component Documentation](/docs/components/${docs.name.toLowerCase()}.md) for usage examples.
`,

    'component-props': `# Component Props Reference

This document contains all component props exported from the design system.

## Components

${Object.keys(docs).map(name => `### ${name}\n\nSee [${name} API](/docs/api/${name.toLowerCase()}.md)\n`).join('\n')}
`,

    'component-constants': `# Component Constants Reference

This document contains all component constants and enums.

## Constants

Exported from \`src/lib/constants/components.ts\`.

## Usage

\`\`\`typescript
import { 
  BUTTON_SIZES,
  BUTTON_VARIANTS 
} from '@shohojdhara/atomix';

const size = BUTTON_SIZES.MD;
\`\`\`
`
  };
  
  return templates[template] || templates.component;
}

/**
 * Sync documentation from source files
 * @param {object} options - Configuration options for documentation sync
 * @param {boolean} options.verbose - Enable verbose logging
 * @param {string[]} options.components - Specific components to sync (optional)
 */
export async function syncDocumentation(options = {}) {
  const { verbose = false, components: targetComponents = null } = options;
  const spinner = ora('Syncing documentation...').start();
  
  try {
    const docsPath = join(process.cwd(), 'docs');
    const componentsPath = join(process.cwd(), 'src/components');
    
    // Check if components directory exists
    if (!existsSync(componentsPath)) {
      spinner.fail('Components directory not found');
      return {
        success: false,
        message: 'Please run this command from an Atomix project root'
      };
    }
    
    const syncResults = [];
    
    // Sync each component
    let componentDirs = await getDirectories(componentsPath);
    
    // Filter components if specified
    if (targetComponents && targetComponents.length > 0) {
      componentDirs = componentDirs.filter(name => targetComponents.includes(name));
    }
    
    for (const componentName of componentDirs) {
      const componentPath = join(componentsPath, componentName);
      
      // Check for README
      const readmePath = join(componentPath, 'README.md');
      if (existsSync(readmePath)) {
        const docs = await extractFromReadme(readmePath);
        
        // Generate component documentation
        const componentDocPath = join(docsPath, 'components', `${componentName}.md`);
        const componentContent = generateMarkdown(docs, 'component');
        
        await mkdir(dirname(componentDocPath), { recursive: true });
        await writeFile(componentDocPath, componentContent, 'utf8');
        
        syncResults.push({
          component: componentName,
          status: 'synced',
          file: relative(process.cwd(), componentDocPath)
        });
        
        if (verbose) {
          console.log(chalk.gray(`  → Component doc: ${relative(process.cwd(), componentDocPath)}`));
        }
        
        // Generate API documentation
        const apiDocPath = join(docsPath, 'api', `${componentName}.md`);
        const apiContent = generateMarkdown(docs, 'api');
        
        await writeFile(apiDocPath, apiContent, 'utf8');
        
        syncResults.push({
          component: `${componentName} (API)`,
          status: 'synced',
          file: relative(process.cwd(), apiDocPath)
        });
        
        if (verbose) {
          console.log(chalk.gray(`  → API doc: ${relative(process.cwd(), apiDocPath)}`));
        }
      }
    }
    
    // Sync types documentation
    const typesPath = join(process.cwd(), 'src/lib/types/components.ts');
    if (existsSync(typesPath)) {
      const typeDocs = await extractFromTypes(typesPath);
      
      const typesDocPath = join(docsPath, 'api', 'component-props.md');
      const typesContent = generateMarkdown(typeDocs, 'component-props');
      
      await mkdir(dirname(typesDocPath), { recursive: true });
      await writeFile(typesDocPath, typesContent, 'utf8');
      
      syncResults.push({
        component: 'Type Definitions',
        status: 'synced',
        file: relative(process.cwd(), typesDocPath)
      });
      
      if (verbose) {
        console.log(chalk.gray(`  → Types doc: ${relative(process.cwd(), typesDocPath)}`));
      }
    }
    
    spinner.succeed(chalk.green('Documentation synced successfully'));
    
    // Display results
    console.log(chalk.bold.cyan('\n📄 Sync Summary:\n'));
    syncResults.forEach(result => {
      console.log(chalk.green(`  ✓ ${result.component}`));
      console.log(chalk.gray(`    ${result.file}\n`));
    });
    
    return {
      success: true,
      synced: syncResults.length,
      results: syncResults
    };
    
  } catch (error) {
    spinner.fail('Documentation sync failed');
    throw error;
  }
}

/**
 * Validate documentation completeness
 */
export async function validateDocumentation() {
  const spinner = ora('Validating documentation...').start();
  
  try {
    const issues = [];
    const warnings = [];
    
    // Check for missing component docs
    const componentsPath = join(process.cwd(), 'src/components');
    const docsPath = join(process.cwd(), 'docs/components');
    
    if (existsSync(componentsPath) && existsSync(docsPath)) {
      const componentDirs = await getDirectories(componentsPath);
      
      for (const componentName of componentDirs) {
        const docPath = join(docsPath, `${componentName}.md`);
        
        if (!existsSync(docPath)) {
          issues.push({
            component: componentName,
            issue: 'Missing documentation file',
            suggestion: 'Run: atomix docs sync'
          });
        } else {
          const content = await readFile(docPath, 'utf8');
          
          // Check for required sections
          const requiredSections = ['Usage', 'Props', 'Examples'];
          for (const section of requiredSections) {
            if (!content.includes(`## ${section}`)) {
              warnings.push({
                component: componentName,
                issue: `Missing "${section}" section`,
                suggestion: 'Add the missing section to the documentation'
              });
            }
          }
          
          // Check for code examples
          if (!content.match(/```/)) {
            warnings.push({
              component: componentName,
              issue: 'No code examples found',
              suggestion: 'Add usage examples with code blocks'
            });
          }
        }
      }
    }
    
    spinner.stop();
    
    // Display results
    if (issues.length === 0 && warnings.length === 0) {
      console.log(boxen(
        chalk.bold.green('✅ Documentation validation passed!\n\n') +
        chalk.gray('All component documentation is complete and up to date.'),
        {
          padding: 1,
          margin: 1,
          borderStyle: 'round',
          borderColor: 'green'
        }
      ));
      return { valid: true, issues: [], warnings: [] };
    }
    
    if (issues.length > 0) {
      console.log(chalk.bold.red(`\n❌ Found ${issues.length} issue(s):\n`));
      issues.forEach((issue, index) => {
        console.log(chalk.red(`  ${index + 1}. ${issue.component}`));
        console.log(chalk.gray(`     Issue: ${issue.issue}`));
        console.log(chalk.yellow(`     Suggestion: ${issue.suggestion}\n`));
      });
    }
    
    if (warnings.length > 0) {
      console.log(chalk.bold.yellow(`\n⚠️  Found ${warnings.length} warning(s):\n`));
      warnings.forEach((warning, index) => {
        console.log(chalk.yellow(`  ${index + 1}. ${warning.component}`));
        console.log(chalk.gray(`     Warning: ${warning.issue}`));
        console.log(chalk.cyan(`     Suggestion: ${warning.suggestion}\n`));
      });
    }
    
    return { valid: issues.length === 0, issues, warnings };
    
  } catch (error) {
    spinner.fail('Documentation validation failed');
    throw error;
  }
}

/**
 * Helper function to get directories
 */
async function getDirectories(path) {
  const { readdir } = await import('fs/promises');
  const entries = await readdir(path, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
}

/**
 * Generate CLI documentation from commands
 */
export async function generateCLIDocumentation() {
  const cliPath = join(process.cwd(), 'scripts/atomix-cli.js');
  const docsPath = join(process.cwd(), 'docs');
  
  if (!existsSync(cliPath)) {
    throw new Error('CLI file not found');
  }
  
  const content = await readFile(cliPath, 'utf8');
  
  // Extract commands
  const commands = [];
  const commandMatches = content.matchAll(/program\.command\(['"]([^'"]+)['"]\)/g);
  for (const match of commandMatches) {
    commands.push(match[1]);
  }
  
  // Generate CLI documentation
  let cliDocs = `# CLI Documentation

The Atomix CLI provides commands for managing your design system.

## Installation

\`\`\`bash
npm install -g @shohojdhara/atomix
\`\`\`

## Commands

`;

  commands.forEach(cmd => {
    cliDocs += `### ${cmd}\n\nCommand description and usage.\n\n`;
  });
  
  cliDocs += `## Examples

Initialize a new project:
\`\`\`bash
atomix init
\`\`\`

Generate a component:
\`\`\`bash
atomix generate component MyComponent
\`\`\`

Build a theme:
\`\`\`bash
atomix build-theme themes/custom
\`\`\`

Validate your design system:
\`\`\`bash
atomix validate --tokens --theme
\`\`\`
`;
  
  const cliDocPath = join(docsPath, 'cli.md');
  await mkdir(dirname(cliDocPath), { recursive: true });
  await writeFile(cliDocPath, cliDocs, 'utf8');
  
  return {
    success: true,
    file: cliDocPath
  };
}

export default {
  syncDocumentation,
  validateDocumentation,
  generateCLIDocumentation
};