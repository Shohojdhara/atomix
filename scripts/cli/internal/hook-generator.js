/**
 * Composable Hook Generator
 * Generates React hooks following Atomix composable pattern
 */

import { join } from 'path';
import { existsSync } from 'fs';
import { filesystem } from './filesystem.js';
import { logger } from '../utils/logger.js';
import { AtomixCLIError } from '../utils/error.js';

/**
 * Generate a composable hook for a component
 */
export function generateComposableHook(componentName, options = {}) {
  const {
    hasVariants = true,
    hasSizes = true,
    hasStates = true,
    hasCallbacks = true
  } = options;
  
  const hookName = `use${componentName}`;
  const propsInterface = `${componentName}HookProps`;
  const returnInterface = `${componentName}HookReturn`;
  
  let imports = `import { useCallback, useMemo } from 'react';`;
  
  if (hasCallbacks) {
    imports += `\nimport type { ${componentName}Props } from '../../types/components';`;
  }
  
  return `${imports}

/**
 * ${hookName} Props Interface
 */
export interface ${propsInterface} {
  ${hasVariants ? "variant?: 'primary' | 'secondary' | 'outline';\n  " : ""}${hasSizes ? "size?: 'sm' | 'md' | 'lg';\n  " : ""}${hasStates ? "disabled?: boolean;\n  glass?: boolean | object;\n  " : ""}${hasCallbacks ? "onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;\n  onHover?: (event: React.MouseEvent<HTMLDivElement>) => void;\n  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;\n  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;\n  onStateChange?: (state: ComponentState) => void;" : ""}
}

/**
 * ${hookName} Return Type
 */
export interface ${returnInterface} {
  generateClassNames: (className?: string) => string;
  ${hasCallbacks ? "handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;\n  handleMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;\n  handleFocus: (event: React.FocusEvent<HTMLDivElement>) => void;\n  handleBlur: (event: React.FocusEvent<HTMLDivElement>) => void;" : ""}
  state: ComponentState;
}

/**
 * Component State Type
 */
type ComponentState = {
  isActive: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isLoading: boolean;
  variant: string;
  size: string;
};

/**
 * ${hookName} - Composable Hook for ${componentName} Component
 * 
 * Provides state management, class name generation, and event handlers
 * following the Atomix composable pattern.
 * 
 * @param props - Hook configuration props
 * @returns Object with class names, handlers, and state
 * 
 * @example
 * \`\`\`tsx
 * const { generateClassNames, handleClick, state } = use${componentName}({
 *   variant: 'primary',
 *   size: 'md',
 *   disabled: false,
 *   onClick: handleClick
 * });
 * \`\`\`
 */
export function ${hookName}(props: ${propsInterface}): ${returnInterface} {
  const {
    ${hasVariants ? "variant = 'primary'," : ""}
    ${hasSizes ? "size = 'md'," : ""}
    ${hasStates ? "disabled = false,\n    glass = false," : ""}
    ${hasCallbacks ? "onClick,\n    onHover,\n    onFocus,\n    onBlur,\n    onStateChange" : ""}
  } = props;

  // Internal state
  const isHovered = false;
  const isFocused = false;
  const isLoading = false;

  /**
   * Generate component class names
   * Uses ThemeNaming utility for consistency
   */
  const generateClassNames = useCallback(
    (className?: string): string => {
      const baseClasses = ['c-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}'];
      
      // Add variant class
      ${hasVariants ? "baseClasses.push(\`c-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}--variant-\${variant}\`);" : ""}
      
      // Add size class
      ${hasSizes ? "if (size !== 'md') {\n        baseClasses.push(\`c-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}--size-\${size}\`);\n      }" : ""}
      
      // Add state classes
      ${hasStates ? "if (disabled) {\n        baseClasses.push(\`c-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}--state-disabled\`);\n      }\n      \n      if (glass) {\n        baseClasses.push(\`c-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}--state-glass\`);\n      }" : ""}
      
      // Add custom className
      if (className) {
        baseClasses.push(className);
      }
      
      return baseClasses.filter(Boolean).join(' ');
    },
    [${hasVariants ? 'variant' : ''}${hasVariants && hasSizes ? ', ' : ''}${hasSizes ? 'size' : ''}${hasStates ? ', disabled, glass' : ''}]
  );

  ${hasCallbacks ? `/**
   * Handle click event
   */
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    },
    [disabled, onClick]
  );

  /**
   * Handle mouse enter (hover)
   */
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled) {
        onHover?.(event);
      }
    },
    [disabled, onHover]
  );

  /**
   * Handle focus
   */
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!disabled) {
        onFocus?.(event);
      }
    },
    [disabled, onFocus]
  );

  /**
   * Handle blur
   */
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!disabled) {
        onBlur?.(event);
      }
    },
    [disabled, onBlur]
  );` : ""}

  /**
   * Component state object
   */
  const state: ComponentState = useMemo(
    () => ({
      isActive: false,
      isHovered,
      isFocused,
      isLoading,
      variant,
      size,
    }),
    [${hasVariants ? 'variant' : ''}${hasVariants && hasSizes ? ', ' : ''}${hasSizes ? 'size' : ''}]
  );

  ${hasCallbacks ? `// Notify parent of state changes
  useMemo(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state, onStateChange]);` : ""}

  return {
    generateClassNames,
    ${hasCallbacks ? "handleClick,\n    handleMouseEnter,\n    handleFocus,\n    handleBlur," : ""}
    state,
  };
}

export default ${hookName};
`;
}

/**
 * Generate TypeScript types for the hook
 */
export function generateHookTypes(componentName) {
  return `/**
 * ${componentName} Hook Types
 * Generated by Atomix CLI
 */

/**
 * Component State Interface
 */
export interface ComponentState {
  isActive: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isLoading: boolean;
  variant: 'primary' | 'secondary' | 'outline' | string;
  size: 'sm' | 'md' | 'lg' | string;
}

/**
 * Event Handler Types
 */
export type ClickHandler = (event: React.MouseEvent<HTMLDivElement>) => void;
export type HoverHandler = (event: React.MouseEvent<HTMLDivElement>) => void;
export type FocusHandler = (event: React.FocusEvent<HTMLDivElement>) => void;
export type BlurHandler = (event: React.FocusEvent<HTMLDivElement>) => void;
export type StateChangeHandler = (state: ComponentState) => void;

/**
 * Variant Configuration
 */
export type VariantType = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';

/**
 * Size Configuration  
 */
export type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Glass Effect Configuration
 */
export interface GlassConfig {
  displacementScale?: number;
  blurAmount?: number;
  saturation?: number;
  elasticity?: number;
}
`;
}

/**
 * Generate index file for composables directory
 */
export function generateComposablesIndex() {
  return `/**
 * Composable Hooks Index
 * Auto-generated by Atomix CLI
 * 
 * All component hooks are exported here for easy importing
 */

// Component Hooks
// These are auto-generated when you create components
// Example:
// export { useButton } from './useButton';
// export { useCard } from './useCard';
// export { useInput } from './useInput';

// Re-export all hooks
export * from './useButton';
export * from './useCard';
export * from './useInput';

// Types
export type { ComponentState, VariantType, SizeType } from './types';
`;
}

/**
 * Create composable hook file
 */
export async function generateHookFile(componentName, projectRoot, options = {}) {
  const {
    outputDir = 'src/lib/composables',
    generateTypes = true,
    force = false
  } = options;
  
  const created = [];
  const hookName = `use${componentName}`;
  
  try {
    // Create composables directory
    const composablesPath = join(projectRoot, outputDir);
    await filesystem.createDirectory(composablesPath);
    
    // Generate hook file
    const hookFile = join(composablesPath, `${hookName}.ts`);
    
    if (force || !existsSync(hookFile)) {
      const hookContent = generateComposableHook(componentName);
      await filesystem.writeFile(hookFile, hookContent, 'utf8');
      created.push(`${outputDir}/${hookName}.ts`);
      logger.debug(`Created hook: ${hookFile}`);
    }
    
    // Generate types file
    if (generateTypes) {
      const typesFile = join(composablesPath, 'types.ts');
      
      if (!existsSync(typesFile)) {
        const typesContent = generateHookTypes(componentName);
        await filesystem.writeFile(typesFile, typesContent, 'utf8');
        created.push(`${outputDir}/types.ts`);
        logger.debug(`Created types: ${typesFile}`);
      }
    }
    
    // Update or create index file
    const indexFile = join(composablesPath, 'index.ts');
    const exportLine = `export { ${hookName} } from './${hookName}';`;
    
    if (existsSync(indexFile)) {
      // Append to existing index
      const existingContent = await filesystem.readFile(indexFile, 'utf8');
      if (existingContent && !existingContent.includes(exportLine)) {
        const updatedContent = `${existingContent}\n${exportLine}`;
        await filesystem.writeFile(indexFile, updatedContent, 'utf8');
      }
    } else {
      const indexContent = `/**
 * Composable hooks (Atomix CLI)
 */
export { ${hookName} } from './${hookName}';
`;
      await filesystem.writeFile(indexFile, indexContent, 'utf8');
      created.push(`${outputDir}/index.ts`);
    }
    
    return {
      success: true,
      created,
      message: `Generated composable hook ${hookName} with ${created.length} files`
    };
    
  } catch (error) {
    throw new AtomixCLIError(
      `Failed to generate composable hook: ${error.message}`,
      'HOOK_GENERATION_FAILED',
      [
        'Check you have write permissions for src/lib/composables',
        'Verify TypeScript is configured in your project',
        'Try running with --force flag to overwrite existing files'
      ]
    );
  }
}

/**
 * Check if composable hook exists
 */
export function checkHookExists(componentName, projectRoot, outputDir = 'src/lib/composables') {
  const hookName = `use${componentName}`;
  const hookFile = join(projectRoot, outputDir, `${hookName}.ts`);
  return existsSync(hookFile);
}
