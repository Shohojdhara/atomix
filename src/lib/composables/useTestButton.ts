import { useCallback, useMemo } from 'react';
import type { TestButtonProps } from '../../types/components';

/**
 * useTestButton Props Interface
 */
export interface TestButtonHookProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  glass?: boolean | object;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onHover?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onStateChange?: (state: ComponentState) => void;
}

/**
 * useTestButton Return Type
 */
export interface TestButtonHookReturn {
  generateClassNames: (className?: string) => string;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleFocus: (event: React.FocusEvent<HTMLDivElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
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
 * useTestButton - Composable Hook for TestButton Component
 * 
 * Provides state management, class name generation, and event handlers
 * following the Atomix composable pattern.
 * 
 * @param props - Hook configuration props
 * @returns Object with class names, handlers, and state
 * 
 * @example
 * ```tsx
 * const { generateClassNames, handleClick, state } = useTestButton({
 *   variant: 'primary',
 *   size: 'md',
 *   disabled: false,
 *   onClick: handleClick
 * });
 * ```
 */
export function useTestButton(props: TestButtonHookProps): TestButtonHookReturn {
  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    glass = false,
    onClick,
    onHover,
    onFocus,
    onBlur,
    onStateChange
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
      const baseClasses = ['c-testbutton'];
      
      // Add variant class
      baseClasses.push(`c-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}--variant-${variant}`);
      
      // Add size class
      if (size !== 'md') {
        baseClasses.push(`c-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}--size-${size}`);
      }
      
      // Add state classes
      if (disabled) {
        baseClasses.push(`c-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}--state-disabled`);
      }
      
      if (glass) {
        baseClasses.push(`c-${componentName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '')}--state-glass`);
      }
      
      // Add custom className
      if (className) {
        baseClasses.push(className);
      }
      
      return baseClasses.filter(Boolean).join(' ');
    },
    [variant, size, disabled, glass]
  );

  /**
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
  );

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
    [variant, size]
  );

  // Notify parent of state changes
  useMemo(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state, onStateChange]);

  return {
    generateClassNames,
    handleClick,
    handleMouseEnter,
    handleFocus,
    handleBlur,
    state,
  };
}

export default useTestButton;
