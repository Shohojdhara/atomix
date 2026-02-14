/**
 * Enhanced Component Generator
 * Supports template variants, interactive generation, and validation
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import ora from 'ora';
import boxen from 'boxen';

import {
  validatePath,
  validateComponentName,
  sanitizeInput,
  AtomixCLIError
} from './utils.js';
import { componentTemplates } from './templates.js';

/**
 * Component complexity levels
 */
export const COMPLEXITY_LEVELS = {
  SIMPLE: {
    name: 'simple',
    description: 'Basic presentational component with minimal state',
    features: [
      'Props interface',
      'Basic styling',
      'No internal state',
      'No complex interactions'
    ],
    template: 'simple'
  },
  MEDIUM: {
    name: 'medium',
    description: 'Component with some state and interactions',
    features: [
      'Props interface',
      'Internal state management',
      'Event handlers',
      'Composable hook',
      'Full styling system'
    ],
    template: 'medium'
  },
  COMPLEX: {
    name: 'complex',
    description: 'Advanced component with rich functionality',
    features: [
      'All medium features',
      'Context integration',
      'Advanced interactions',
      'Accessibility features',
      'Validation logic',
      'Animation support'
    ],
    template: 'complex'
  }
};

/**
 * Component feature options
 */
export const COMPONENT_FEATURES = {
  TYPESCRIPT: {
    name: 'typescript',
    description: 'Include TypeScript definitions',
    default: true
  },
  STORYBOOK: {
    name: 'storybook',
    description: 'Generate Storybook stories',
    default: true
  },
  TESTS: {
    name: 'tests',
    description: 'Include unit tests',
    default: false
  },
  HOOK: {
    name: 'hook',
    description: 'Create composable hook',
    default: true
  },
  STYLES: {
    name: 'styles',
    description: 'Generate SCSS styles (ITCSS architecture)',
    default: true
  },
  ACCESSIBILITY: {
    name: 'accessibility',
    description: 'Include accessibility features (ARIA, keyboard)',
    default: true
  },
  ANIMATIONS: {
    name: 'animations',
    description: 'Add animation support',
    default: false
  },
  CONTEXT: {
    name: 'context',
    description: 'Support context integration',
    default: false
  }
};

/**
 * Simple component template
 */
function getSimpleTemplate(name) {
  return componentTemplates.react.simple(name);
}

/**
 * Medium component template
 */
function getMediumTemplate(name) {
  return componentTemplates.react.medium(name);
}

/**
 * Complex component template
 */
function getComplexTemplate(name) {
  return componentTemplates.react.complex(name);
}

/**
 * Generate component based on complexity level
 */
export function generateComponentByComplexity(name, complexity, options = {}) {
  const level = COMPLEXITY_LEVELS[complexity.toUpperCase()];
  
  if (!level) {
    throw new AtomixCLIError(
      `Unknown complexity level: ${complexity}`,
      'INVALID_COMPLEXITY',
      [
        'Valid levels: simple, medium, complex',
        'Example: atomix generate component MyButton --complexity medium'
      ]
    );
  }

  switch (level.template) {
    case 'simple':
      return getSimpleTemplate(name);
    case 'medium':
      return getMediumTemplate(name);
    case 'complex':
      return getComplexTemplate(name);
    default:
      return componentTemplates.react.component(name, options);
  }
}

/**
 * Interactive component generation
 */
export async function interactiveComponentGeneration() {
  try {
    console.log(boxen(
      chalk.bold.cyan('🎨 Interactive Component Generator\n\n') +
      chalk.gray('Let\'s create a new component for your design system'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan'
      }
    ));

    // Step 1: Component name
    const { componentName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'componentName',
        message: 'What is your component name?',
        validate: (input) => {
          const validation = validateComponentName(input);
          return validation.isValid || validation.error;
        },
        filter: (input) => sanitizeInput(input)
      }
    ]);

    // Step 2: Complexity level
    const { complexity } = await inquirer.prompt([
      {
        type: 'list',
        name: 'complexity',
        message: 'What is the complexity level?',
        choices: Object.values(COMPLEXITY_LEVELS).map(level => ({
          name: `${chalk.bold(level.name.charAt(0).toUpperCase() + level.name.slice(1))} - ${level.description}`,
          value: level.name,
          short: level.name
        })),
        default: 'medium'
      }
    ]);

    // Step 3: Features
    const { features } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'features',
        message: 'Select features to include:',
        choices: Object.values(COMPONENT_FEATURES).map(feature => ({
          name: `${feature.description}`,
          value: feature.name,
          checked: feature.default
        }))
      }
    ]);

    // Step 4: Output path
    const { outputPath } = await inquirer.prompt([
      {
        type: 'input',
        name: 'outputPath',
        message: 'Output directory:',
        default: './src/components',
        validate: (input) => {
          const validation = validatePath(sanitizeInput(input));
          return validation.isValid || validation.error;
        },
        filter: (input) => sanitizeInput(input)
      }
    ]);

    return {
      name: componentName,
      complexity,
      features,
      outputPath
    };
  } catch (error) {
    if (error.message === 'User cancelled') {
      return null;
    }
    throw error;
  }
}

/**
 * Generate all component files
 */
export async function generateComponentFiles(name, options = {}) {
  const { 
    outputPath = './src/components',
    complexity = 'medium',
    features = [],
    spinner
  } = options;

  const componentPath = join(outputPath, name);
  
  // Create component directory
  await mkdir(componentPath, { recursive: true });

  // Determine if we need to generate a composable hook
  const hasComposable = features.includes('HOOK') || COMPONENT_FEATURES.HOOK.default;
  
  // Determine if we need glass effect
  const hasGlass = features.includes('STYLES') || COMPONENT_FEATURES.STYLES.default;

  // Generate main component file
  const componentContent = generateComponentByComplexity(name, complexity, {
    hasComposable,
    hasGlass
  });
  
  await writeFile(
    join(componentPath, `${name}.tsx`),
    componentContent
  );

  if (spinner) spinner.text = `Generating ${name}.tsx...`;

  // Generate index file
  const indexContent = componentTemplates.react.index(name);
  await writeFile(
    join(componentPath, 'index.ts'),
    indexContent
  );

  if (spinner) spinner.text = `Generating index.ts...`;

  // Generate storybook file if feature is enabled
  if (features.includes('storybook') || COMPONENT_FEATURES.STORYBOOK.default) {
    const storyContent = componentTemplates.react.story(name);
    await writeFile(
      join(componentPath, `${name}.stories.tsx`),
      storyContent
    );
    
    if (spinner) spinner.text = `Generating ${name}.stories.tsx...`;
  }

  // Generate test file if feature is enabled
  if (features.includes('tests') || COMPONENT_FEATURES.TESTS.default) {
    const testContent = componentTemplates.react.test(name);
    await writeFile(
      join(componentPath, `${name}.test.tsx`),
      testContent
    );
    
    if (spinner) spinner.text = `Generating ${name}.test.tsx...`;
  }

  // Generate composable hook if feature is enabled
  if (hasComposable) {
    const composableDir = join(outputPath, '..', 'lib', 'composables');
    await mkdir(composableDir, { recursive: true });
    
    const composableContent = componentTemplates.composable.useHook(name);
    await writeFile(
      join(composableDir, `use${name}.ts`),
      composableContent
    );
    
    if (spinner) spinner.text = `Generating use${name}.ts...`;
  }

  // Generate constants and types if TypeScript feature is enabled
  if (features.includes('typescript') || COMPONENT_FEATURES.TYPESCRIPT.default) {
    // Note: In a real implementation, we'd append to existing files rather than overwrite
    // This is simplified for demonstration purposes
    const constantsContent = componentTemplates.types.constants(name);
    const typesContent = componentTemplates.types.types(name);
    
    // In a real scenario, these would be appended to existing files
    // For now, we'll just show what would be added
    console.log(chalk.blue(`\n💡 Remember to add these to the appropriate files:`));
    console.log(chalk.gray(`Constants to src/lib/constants/components.ts:`));
    console.log(chalk.gray(constantsContent.substring(0, 100) + '...'));
    console.log(chalk.gray(`Types to src/lib/types/components.ts:`));
    console.log(chalk.gray(typesContent.substring(0, 100) + '...'));
  }

  // Generate SCSS files if styles feature is enabled
  if (features.includes('styles') || COMPONENT_FEATURES.STYLES.default) {
    const stylesBasePath = join(outputPath, '..', 'styles');
    
    // Create settings file
    const settingsPath = join(stylesBasePath, '01-settings');
    await mkdir(settingsPath, { recursive: true });
    
    const settingsContent = componentTemplates.scss.settings(name);
    await writeFile(
      join(settingsPath, `_settings.${name.toLowerCase()}.scss`),
      settingsContent
    );
    
    if (spinner) spinner.text = `Generating _settings.${name.toLowerCase()}.scss...`;
    
    // Create components file
    const componentsPath = join(stylesBasePath, '06-components');
    await mkdir(componentsPath, { recursive: true });
    
    const componentStylesContent = componentTemplates.scss.component(name);
    await writeFile(
      join(componentsPath, `_components.${name.toLowerCase()}.scss`),
      componentStylesContent
    );
    
    if (spinner) spinner.text = `Generating _components.${name.toLowerCase()}.scss...`;
  }

  return componentPath;
}

/**
 * Generate a new component
 */
export async function generateComponent(options) {
  const { name, complexity, features, outputPath } = options;
  
  const spinner = ora({
    text: chalk.blue('Generating component...'),
    spinner: 'clock'
  });
  
  try {
    spinner.start();
    
    const componentPath = await generateComponentFiles(name, {
      complexity,
      features,
      outputPath,
      spinner
    });
    
    spinner.succeed(chalk.green(`Component ${name} generated successfully!\n${chalk.gray('Location:')} ${componentPath}`));
    
    return componentPath;
  } catch (error) {
    spinner.fail(chalk.red(`Failed to generate component: ${error.message}`));
    throw error;
  }
}

/**
 * Validate generated component against guidelines
 */
export async function validateGeneratedComponent(name, componentPath) {
  const issues = [];
  const warnings = [];
  
  // Check component file
  const componentFile = join(componentPath, `${name}.tsx`);
  if (existsSync(componentFile)) {
    const content = await readFile(componentFile, 'utf8');
    
    // Check for proper TypeScript types
    if (!content.includes('export interface') && !content.includes('export type')) {
      issues.push({
        file: `${name}.tsx`,
        issue: 'Missing TypeScript type definitions',
        suggestion: 'Add proper type interfaces for component props'
      });
    }
    
    // Check for displayName
    if (!content.includes('displayName')) {
      warnings.push({
        file: `${name}.tsx`,
        issue: 'Missing displayName property',
        suggestion: 'Add Component.displayName = "ComponentName" for better debugging'
      });
    }
    
    // Check for proper documentation
    if (!content.includes('/**') && !content.includes('*')) {
      warnings.push({
        file: `${name}.tsx`,
        issue: 'Missing JSDoc comments',
        suggestion: 'Add JSDoc comments to document the component API'
      });
    }
    
    // Check for accessibility features
    if (!content.includes('aria-') && !content.includes('role=')) {
      warnings.push({
        file: `${name}.tsx`,
        issue: 'Missing accessibility attributes',
        suggestion: 'Add ARIA attributes and roles for better accessibility'
      });
    }
    
    // Check for hardcoded styles
    if (content.match(/#[0-9a-fA-F]{3,6}|rgb\(|rgba\(/)) {
      warnings.push({
        file: `${name}.tsx`,
        issue: 'Using hardcoded values instead of design tokens',
        suggestion: 'Use design tokens (e.g., var(--color-primary)) or utility classes'
      });
    }
  } else {
    issues.push({
      file: `${name}.tsx`,
      issue: 'Component file not found',
      suggestion: 'Ensure the component was generated successfully'
    });
  }
  
  // Check for SCSS file
  if (existsSync(componentPath)) {
    // Check in styles directory
    const globalScss = join(process.cwd(), 'src/styles/06-components', `_components.${name.toLowerCase()}.scss`);
    if (!existsSync(globalScss)) {
      warnings.push({
        file: 'styles',
        issue: 'SCSS styles file not found',
        suggestion: 'Generate SCSS styles following ITCSS architecture'
      });
    }
  }
  
  // Check for Storybook story
  const storyFile = join(componentPath, `${name}.stories.tsx`);
  if (!existsSync(storyFile)) {
    warnings.push({
      file: `${name}.stories.tsx`,
      issue: 'Storybook story not found',
      suggestion: 'Generate Storybook stories for component documentation'
    });
  } else {
    const storyContent = await readFile(storyFile, 'utf8');
    
    if (!storyContent.includes('autodocs')) {
      warnings.push({
        file: `${name}.stories.tsx`,
        issue: 'Missing autodocs tag',
        suggestion: 'Add tags: [\'autodocs\'] for automatic documentation'
      });
    }
    
    if (!storyContent.match(/export const (Default|Primary|Basic)/)) {
      warnings.push({
        file: `${name}.stories.tsx`,
        issue: 'Missing default story',
        suggestion: 'Add a default story to showcase the basic component usage'
      });
    }
  }
  
  return {
    valid: issues.length === 0,
    issues,
    warnings
  };
}

/**
 * Display validation report
 */
export function displayValidationReport(result) {
  if (result.valid && result.warnings.length === 0) {
    console.log(boxen(
      chalk.bold.green('✅ Component validation passed!\n\n') +
      chalk.gray('Your component follows all Atomix design system guidelines.'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green'
      }
    ));
    return true;
  }
  
  if (result.issues.length > 0) {
    console.log(chalk.bold.red(`\n❌ Found ${result.issues.length} issue(s):\n`));
    result.issues.forEach((issue, index) => {
      console.log(chalk.red(`  ${index + 1}. ${issue.file}`));
      console.log(chalk.gray(`     Issue: ${issue.issue}`));
      console.log(chalk.yellow(`     Suggestion: ${issue.suggestion}\n`));
    });
  }
  
  if (result.warnings.length > 0) {
    console.log(chalk.bold.yellow(`\n⚠️  Found ${result.warnings.length} warning(s):\n`));
    result.warnings.forEach((warning, index) => {
      console.log(chalk.yellow(`  ${index + 1}. ${warning.file}`));
      console.log(chalk.gray(`     Warning: ${warning.issue}`));
      console.log(chalk.cyan(`     Suggestion: ${warning.suggestion}\n`));
    });
  }
  
  return false;
}

export default {
  COMPLEXITY_LEVELS,
  COMPONENT_FEATURES,
  generateComponentByComplexity,
  interactiveComponentGeneration,
  validateGeneratedComponent,
  displayValidationReport
};