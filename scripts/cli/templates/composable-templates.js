/**
 * Composable Hook Templates
 * Templates for React custom hooks generation
 */

/**
 * Default composable hook template that matches existing patterns
 */
export const composableTemplate = (name) => {
  const componentPrefix = name.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  
  return `import { ${name}Props } from '../types/components';
import { ${name.toUpperCase()} } from '../constants/components';

/**
 * ${name} state and functionality
 * @param initialProps - Initial ${name.toLowerCase()} properties
 * @returns ${name} state and methods
 */
export function use${name}(initialProps?: Partial<${name}Props>) {
  // Default ${name.toLowerCase()} properties
  const defaultProps: Partial<${name}Props> = {
    variant: 'primary',
    size: 'md',
    disabled: false,
    ...initialProps,
  };

  /**
   * Generate ${name.toLowerCase()} class based on properties
   * @param props - ${name} properties
   * @returns Class string
   */
  const generateClassNames = (props: Partial<${name}Props> = {}): string => {
    const {
      variant = defaultProps.variant,
      size = defaultProps.size,
      disabled = defaultProps.disabled,
      glass = defaultProps.glass,
      className = '',
    } = props;

    const sizeClass = size === 'md' ? '' : \`c-${componentPrefix}--\${size}\`;
    const disabledClass = disabled ? 'c-${componentPrefix}--disabled' : '';
    const glassClass = glass ? 'c-${componentPrefix}--glass' : '';

    return [
      ${name.toUpperCase()}.BASE_CLASS,
      \`c-${componentPrefix}--\${variant}\`,
      sizeClass,
      disabledClass,
      glassClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');
  };

  /**
   * Handle ${name.toLowerCase()} click with disabled check
   * @param handler - Click handler function
   * @returns Function that respects disabled state
   */
  const handleClick = (handler?: (event: React.MouseEvent<HTMLDivElement>) => void) => {
    return (event: React.MouseEvent<HTMLDivElement>) => {
      if (!defaultProps.disabled && handler) {
        handler(event);
      }
    };
  };

  return {
    defaultProps,
    generateClassNames,
    handleClick,
  };
}
`;
};

/**
 * Simple composable template
 */
export const simpleComposableTemplate = (name) => `import { useState } from 'react';
import type { ${name}Props } from '../types/components';

export function use${name}(props: ${name}Props) {
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    setIsReady(true);
  }, []);

  const generateClassNames = (baseClassName = '') => {
    return \`c-${name.toLowerCase()} \${baseClassName}\`.trim();
  };

  return {
    isReady,
    generateClassNames,
  };
}
`;

/**
 * Complex composable template
 */
export const complexComposableTemplate = (name) => `import { useState, useEffect, useRef } from 'react';
import { ${name.toUpperCase()} } from '../constants/components';
import type { ${name}Props, ${name}State, ElementRefs } from '../types/components';

interface Use${name}Result {
  state: ${name}State;
  refs: ElementRefs;
  methods: {
    // Define methods for complex interactions
    updateState: (newState: Partial<${name}State>) => void;
    reset: () => void;
  };
  generateClassNames: (baseClassName?: string) => string;
}

export function use${name}(
  initialProps?: Partial<${name}Props>
): Use${name}Result {
  const defaultProps: Partial<${name}Props> = {
    disabled: false,
    ...initialProps,
  };

  const [state, setState] = useState<${name}State>({
    // Complex state definition
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateState = (newState: Partial<${name}State>) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const reset = () => {
    // Reset to initial state
  };

  const generateClassNames = (baseClassName = ''): string => {
    const baseClasses = [
      ${name.toUpperCase()}.SELECTORS.${name.toUpperCase()}.replace('.', ''),
      state.isOpen ? ${name.toUpperCase()}.CLASSES.IS_OPEN : '',
      defaultProps.disabled ? ${name.toUpperCase()}.CLASSES.IS_DISABLED : '',
      baseClassName
    ].filter(Boolean).join(' ');

    return baseClasses;
  };

  return {
    state,
    refs: { panelRef, contentRef, buttonRef },
    methods: { updateState, reset },
    generateClassNames,
  };
}
`;

export const composableTemplates = {
  useHook: composableTemplate,
  simpleHook: simpleComposableTemplate,
  complexHook: complexComposableTemplate,
};