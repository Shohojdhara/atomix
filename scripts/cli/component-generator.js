/**
 * Enhanced Component Generator
 * Supports template variants, interactive generation, and validation
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import { readFile, writeFile, mkdir, access } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import ora from 'ora';
import boxen from 'boxen';

import {
  validatePath,
  validateComponentName,
  sanitizeInput,
  fileExists,
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
  return `import React from 'react';
import type { ${name}Props } from './${name}.types';

/**
 * ${name} - Simple Presentational Component
 * 
 * A basic component for rendering content with minimal overhead.
 */
export const ${name} = ({ children, className, ...props }: ${name}Props) => {
  return (
    <div className={\`c-${name.toLowerCase()} \${className || ''}\`} {...props}>
      {children}
    </div>
  );
};

${name}.displayName = '${name}';
`;
}

/**
 * Medium component template
 */
function getMediumTemplate(name) {
  return `import React, { useState, useCallback } from 'react';
import { cn } from '../../lib/utils';
import type { ${name}Props, ${name}State } from './${name}.types';
import { use${name} } from '../../lib/composables/use${name}';

/**
 * ${name} - Component with State and Interactions
 * 
 * A component with internal state management and event handling.
 */
export const ${name} = React.forwardRef<HTMLDivElement, ${name}Props>(
  ({ 
    children, 
    className, 
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    ...props 
  }, ref) => {
    const { 
      isOpen, 
      toggle, 
      setIsOpen 
    } = use${name}({
      defaultOpen,
      onOpenChange
    });

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (disabled) return;
      
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggle();
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    }, [disabled, toggle, setIsOpen]);

    return (
      <div
        ref={ref}
        className={cn(
          'c-' + '${name.toLowerCase()}',
          isOpen && 'is-open',
          disabled && 'is-disabled',
          className
        )}
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="button"
        aria-pressed={isOpen}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);

${name}.displayName = '${name}';
`;
}

/**
 * Complex component template
 */
function getComplexTemplate(name) {
  return `import React, { useState, useCallback, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import type { ${name}Props, ${name}ContextValue } from './${name}.types';
import { use${name} } from '../../lib/composables/use${name}';
import { ${name}Context } from './${name}.context';

/**
 * ${name} - Advanced Component with Context and Animations
 * 
 * A feature-rich component with context integration, animations,
 * accessibility, and validation.
 */

// Root Component
export const ${name} = React.forwardRef<HTMLDivElement, ${name}Props>(
  ({ 
    children, 
    className, 
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    required = false,
    validate,
    animation = true,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [isValid, setIsValid] = useState(true);
    const [validationMessage, setValidationMessage] = useState('');
    const elementRef = useRef<HTMLDivElement>(null);

    const toggle = useCallback(() => {
      if (disabled) return;
      
      const newState = !isOpen;
      
      // Validation before opening
      if (newState && validate) {
        const result = validate();
        setIsValid(result.valid);
        setValidationMessage(result.message || '');
        
        if (!result.valid) {
          return;
        }
      }
      
      setIsOpen(newState);
      onOpenChange?.(newState);
    }, [isOpen, disabled, validate, onOpenChange]);

    const contextValue: ${name}ContextValue = React.useMemo(() => ({
      isOpen,
      toggle,
      setIsOpen,
      disabled,
      required,
      isValid,
      validationMessage
    }), [isOpen, toggle, disabled, required, isValid, validationMessage]);

    // Focus management
    useEffect(() => {
      if (isOpen && elementRef.current) {
        elementRef.current.focus();
      }
    }, [isOpen]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (disabled) return;
      
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          toggle();
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          if (isOpen) e.preventDefault();
          break;
      }
    }, [disabled, isOpen, toggle]);

    return (
      <${name}Context.Provider value={contextValue}>
        <div
          ref={(node) => {
            elementRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={cn(
            'c-${name.toLowerCase()}',
            isOpen && 'is-open',
            disabled && 'is-disabled',
            !isValid && 'is-invalid',
            animation && 'has-animation',
            className
          )}
          data-state={isOpen ? 'open' : 'closed'}
          data-disabled={disabled}
          data-valid={isValid}
          onKeyDown={handleKeyDown}
          role="region"
          aria-expanded={isOpen}
          aria-disabled={disabled}
          aria-invalid={!isValid}
          aria-describedby={!isValid ? \`${name.toLowerCase()}-error\` : undefined}
          {...props}
        >
          {children}
          
          {!isValid && validationMessage && (
            <div 
              id={\`${name.toLowerCase()}-error\`}
              className="c-${name.toLowerCase()}__error"
              role="alert"
              aria-live="polite"
            >
              {validationMessage}
            </div>
          )}
        </div>
      </${name}Context.Provider>
    );
  }
);

${name}.displayName = '${name}';
`;
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
  } else {
    issues.push({
      file: `${name}.tsx`,
      issue: 'Component file not found',
      suggestion: 'Ensure the component was generated successfully'
    });
  }
  
  // Check for SCSS file
  const scssFile = join(componentPath, `${name}.scss`);
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
      console.log(chalk.gray(`     Warning: ${warning.warning}`));
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