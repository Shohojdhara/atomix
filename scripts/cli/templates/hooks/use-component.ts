/**
 * Composable Hook Templates (TypeScript)
 * Templates for generating React hooks following Atomix composable pattern
 * 
 * @module templates/hooks
 */

import type { HTMLAttributes } from 'react';

/**
 * Component size variants
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Component visual variants
 */
export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'error' | 'warning';

/**
 * Options for customizing hook generation
 */
export interface HookGenerationOptions {
  hasVariants?: boolean;
  hasSizes?: boolean;
  hasStates?: boolean;
  hasCallbacks?: boolean;
  hasControlledMode?: boolean;
}

/**
 * Generates a standard composable hook for a component
 * 
 * @param name - Component name (e.g., "Button", "Card")
 * @param options - Hook generation options
 * @returns TypeScript hook code string
 * 
 * @example
 * ```typescript
 * const hook = generateComposableHook('Button', { hasVariants: true });
 * ```
 */
export const generateComposableHook = (
  name: string,
  options: HookGenerationOptions = {}
): string => {
  const {
    hasVariants = true,
    hasSizes = true,
    hasStates = true,
    hasCallbacks = true,
    hasControlledMode = false,
  } = options;

  const hookName = `use${name}`;
  const propsInterface = `${name}HookProps`;
  const returnInterface = `${name}HookReturn`;
  const componentPrefix = name
    .toLowerCase()
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '');

  // Build imports section
  let imports = `import { useCallback, useMemo, useState } from 'react';`;

  if (hasCallbacks) {
    imports += `\nimport type { ${name}Props } from '../../types/components';`;
  }

  // Build props interface
  const propsFields = [];
  
  if (hasVariants) {
    propsFields.push(`  /**\n   * Component visual variant\n   * @default 'primary'\n   */\n  variant?: ComponentVariant;`);
  }
  
  if (hasSizes) {
    propsFields.push(`  /**\n   * Component size\n   * @default 'md'\n   */\n  size?: ComponentSize;`);
  }
  
  if (hasStates) {
    propsFields.push(`  /**\n   * Disabled state\n   * @default false\n   */\n  disabled?: boolean;\n\n  /**\n   * Enable glass morphism effect\n   * @default false\n   */\n  glass?: boolean | object;`);
  }
  
  if (hasCallbacks) {
    propsFields.push(`  /**\n   * Click event handler\n   */\n  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;\n\n  /**\n   * Hover/mouse enter event handler\n   */\n  onHover?: (event: React.MouseEvent<HTMLDivElement>) => void;\n\n  /**\n   * Focus event handler\n   */\n  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;\n\n  /**\n   * Blur event handler\n   */\n  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;\n\n  /**\n   * State change callback for controlled mode\n   */\n  onStateChange?: (state: ComponentState) => void;`);
  }

  const propsInterfaceContent = propsFields.length > 0 
    ? `export interface ${propsInterface} {\n${propsFields.join('\n\n')}\n}\n\n`
    : '';

  // Build return interface
  const returnFields = [
    `  /**\n   * Generate BEM-compliant class names based on current state\n   * @param className - Optional additional custom classes\n   * @returns Space-separated class name string\n   */\n  generateClassNames: (className?: string) => string;`,
  ];

  if (hasCallbacks) {
    returnFields.push(
      `  /**\n   * Click handler with disabled state check\n   */\n  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;\n\n  /**\n   * Mouse enter handler\n   */\n  handleMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;\n\n  /**\n   * Focus handler\n   */\n  handleFocus: (event: React.FocusEvent<HTMLDivElement>) => void;\n\n  /**\n   * Blur handler\n   */\n  handleBlur: (event: React.FocusEvent<HTMLDivElement>) => void;`
    );
  }

  returnFields.push(`  /**\n   * Current component state\n   */\n  state: ComponentState;`);

  // Build hook implementation
  const destructuredProps = [];
  const defaultValues = [];
  const useCallbackDeps = [];

  if (hasVariants) {
    destructuredProps.push(`variant = 'primary'`);
    useCallbackDeps.push('variant');
  }
  
  if (hasSizes) {
    destructuredProps.push(`size = 'md'`);
    useCallbackDeps.push('size');
  }
  
  if (hasStates) {
    destructuredProps.push(`disabled = false`, `glass = false`);
    useCallbackDeps.push('disabled', 'glass');
  }
  
  if (hasCallbacks) {
    destructuredProps.push(
      'onClick',
      'onHover',
      'onFocus',
      'onBlur',
      'onStateChange'
    );
  }

  return `${imports}

/**
 * Component State Interface
 * Tracks internal component state for dynamic behavior
 */
export interface ComponentState {
  isActive: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isLoading: boolean;
  variant: ComponentVariant | string;
  size: ComponentSize | string;
}

${propsInterfaceContent.length > 0 ? propsInterfaceContent : ''}/**
 * Hook Return Type
 * Provides class name generation, event handlers, and state
 */
export interface ${returnInterface} {
${returnFields.join('\n')}
}

/**
 * ${hookName} - Composable Hook for ${name} Component
 * 
 * Provides state management, BEM class name generation, and event handlers
 * following the Atomix composable pattern. Supports both controlled and
 * uncontrolled modes.
 * 
 * @param props - Hook configuration props
 * @returns Object with class names, handlers, and state
 * 
 * @example
 * \`\`\`tsx
 * const { generateClassNames, handleClick, state } = ${hookName}({
 *   variant: 'primary',
 *   size: 'md',
 *   disabled: false,
 *   onClick: handleClick
 * });
 * \`\`\`
 */
export function ${hookName}(props: ${propsInterface}): ${returnInterface} {
  const {
    ${destructuredProps.join(',\n    ')}
  } = props;

  // Internal state tracking
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Generate component class names using BEM methodology
   * Integrates with ThemeNaming utility for consistency
   */
  const generateClassNames = useCallback(
    (className?: string): string => {
      const baseClasses = ['c-${componentPrefix}'];
      
      // Add variant class
      ${hasVariants ? `baseClasses.push(\`c-${componentPrefix}--\${variant}\`);` : ''}
      
      // Add size class (only if not default)
      ${hasSizes ? `if (size !== 'md') {\n        baseClasses.push(\`c-${componentPrefix}--\${size}\`);\n      }` : ''}
      
      // Add state classes
      ${hasStates ? `if (disabled) {\n        baseClasses.push('c-${componentPrefix}--disabled');\n      }\n      \n      if (glass) {\n        baseClasses.push('c-${componentPrefix}--glass');\n      }` : ''}
      
      // Add custom className
      if (className) {
        baseClasses.push(className);
      }
      
      return baseClasses.filter(Boolean).join(' ');
    },
    [${useCallbackDeps.join(', ')}]
  );

  ${hasCallbacks ? `/**
   * Handle click event with disabled state check
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
   * Handle mouse enter (hover start)
   */
  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled) {
        setIsHovered(true);
        onHover?.(event);
      }
    },
    [disabled, onHover]
  );

  /**
   * Handle focus event
   */
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!disabled) {
        setIsFocused(true);
        onFocus?.(event);
      }
    },
    [disabled, onFocus]
  );

  /**
   * Handle blur event
   */
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!disabled) {
        setIsFocused(false);
        onBlur?.(event);
      }
    },
    [disabled, onBlur]
  );` : ''}

  /**
   * Component state object
   * Memoized to prevent unnecessary re-renders
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

  ${hasCallbacks && hasControlledMode ? `// Notify parent of state changes (controlled mode support)
  useMemo(() => {
    if (onStateChange && !disabled) {
      onStateChange(state);
    }
  }, [state, onStateChange, disabled]);` : ''}

  return {
    generateClassNames,
    ${hasCallbacks ? `handleClick,
    handleMouseEnter,
    handleFocus,
    handleBlur,` : ''}
    state,
  };
}

export default ${hookName};
`;
};

/**
 * Generates a simple composable hook for basic components
 * 
 * @param name - Component name
 * @returns Simple hook code string
 */
export const generateSimpleHook = (name: string): string => {
  const componentPrefix = name
    .toLowerCase()
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '');

  return `import { useState, useEffect, useCallback } from 'react';
import type { ${name}Props } from '../types/components';

/**
 * Simple ${name} Hook
 * Basic hook for presentational components
 */
export function use${name}(props?: Partial<${name}Props>) {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    // Mark component as ready after mount
    setIsReady(true);
  }, []);

  /**
   * Generate class names
   */
  const generateClassNames = useCallback(
    (baseClassName = ''): string => {
      return \`c-${componentPrefix} \${baseClassName}\`.trim();
    },
    []
  );

  return {
    isReady,
    generateClassNames,
  };
}

export default use${name};
`;
};

/**
 * Generates a complex composable hook with advanced state management
 * 
 * @param name - Component name
 * @returns Complex hook code string with refs and methods
 */
export const generateComplexHook = (name: string): string => {
  const componentPrefix = name
    .toLowerCase()
    .replace(/([A-Z])/g, '-$1')
    .replace(/^-/, '');

  return `import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ${name.toUpperCase()} } from '../constants/components';
import type { ${name}Props, ${name}State, ElementRefs } from '../types/components';

/**
 * Complex ${name} Hook Return Type
 */
interface Use${name}Result {
  state: ${name}State;
  refs: ElementRefs;
  methods: {
    updateState: (newState: Partial<${name}State>) => void;
    reset: () => void;
    toggle: () => void;
  };
  generateClassNames: (baseClassName?: string) => string;
}

/**
 * use${name} - Complex Composable Hook
 * 
 * Advanced hook for components with complex state and multiple DOM references
 */
export function use${name}(
  initialProps?: Partial<${name}Props>
): Use${name}Result {
  const defaultProps: Partial<${name}Props> = {
    disabled: false,
    ...initialProps,
  };

  // Complex state management
  const [state, setState] = useState<${name}State>({
    isOpen: false,
    isActive: false,
    isAnimating: false,
    error: null,
  });

  // DOM references
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /**
   * Update partial state
   */
  const updateState = useCallback((newState: Partial<${name}State>) => {
    setState(prev => ({ ...prev, ...newState }));
  }, []);

  /**
   * Reset to initial state
   */
  const reset = useCallback(() => {
    setState({
      isOpen: false,
      isActive: false,
      isAnimating: false,
      error: null,
    });
  }, []);

  /**
   * Toggle open/close state
   */
  const toggle = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  /**
   * Generate BEM class names
   */
  const generateClassNames = useCallback(
    (baseClassName = ''): string => {
      const baseClasses = [
        ${name.toUpperCase()}.SELECTORS.${name.toUpperCase().replace(/([A-Z])/g, '_').toUpperCase()}.replace('.', ''),
        state.isOpen ? ${name.toUpperCase()}.CLASSES.IS_OPEN : '',
        defaultProps.disabled ? ${name.toUpperCase()}.CLASSES.IS_DISABLED : '',
        baseClassName,
      ].filter(Boolean).join(' ');

      return baseClasses;
    },
    [state.isOpen, defaultProps.disabled]
  );

  return {
    state,
    refs: { panelRef, contentRef, buttonRef, triggerRef },
    methods: { updateState, reset, toggle },
    generateClassNames,
  };
}

export default use${name};
`;
};

/**
 * All composable hook templates
 */
export const composableHookTemplates = {
  useHook: generateComposableHook,
  simpleHook: generateSimpleHook,
  complexHook: generateComplexHook,
};

/**
 * Type for composable hook templates object
 */
export type ComposableHookTemplates = typeof composableHookTemplates;
