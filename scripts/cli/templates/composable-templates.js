/**
 * Composable Templates
 * Templates for custom hooks and composables
 */

/**
 * Custom hook template for React components
 */
export const hookTemplate = (name) => `import { useState, useCallback, useRef, useEffect } from 'react';
import type { ${name}Props } from '../../lib/types/components';

/**
 * Custom hook for ${name.toLowerCase()} component
 * Provides controlled/uncontrolled state management and accessibility
 */
export function use${name}(initialProps?: Partial<${name}Props>) {
  const {
    isOpen: controlledIsOpen,
    defaultIsOpen = false,
    onToggle,
    ...props
  } = initialProps || {};

  // State management for controlled/uncontrolled pattern
  const [internalIsOpen, setInternalIsOpen] = useState(defaultIsOpen);
  const isControlled = typeof controlledIsOpen === 'boolean';
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Refs for DOM elements
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Toggle function with controlled support
  const toggle = useCallback(() => {
    if (isControlled) {
      onToggle?.(!isOpen);
    } else {
      setInternalIsOpen(!isOpen);
      onToggle?.(!isOpen);
    }
  }, [isOpen, isControlled, onToggle]);

  // Open function
  const open = useCallback(() => {
    if (isControlled) {
      onToggle?.(true);
    } else {
      setInternalIsOpen(true);
      onToggle?.(true);
    }
  }, [isControlled, onToggle]);

  // Close function
  const close = useCallback(() => {
    if (isControlled) {
      onToggle?.(false);
    } else {
      setInternalIsOpen(false);
      onToggle?.(false);
    }
  }, [isControlled, onToggle]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        toggle();
        break;
      case 'Escape':
        if (isOpen) {
          close();
          triggerRef.current?.focus();
        }
        break;
    }
  }, [isOpen, toggle, close]);

  // Accessibility helpers
  const getTriggerProps = useCallback(() => ({
    ref: triggerRef,
    'aria-expanded': isOpen,
    'aria-controls': panelRef.current?.id,
    onKeyDown: handleKeyDown,
    onClick: toggle,
  }), [isOpen, handleKeyDown, toggle]);

  const getPanelProps = useCallback(() => ({
    ref: panelRef,
    'aria-hidden': !isOpen,
    role: 'region',
  }), [isOpen]);

  const getHeaderProps = useCallback(() => ({
    role: 'heading',
    'aria-level': 3,
  }), []);

  const getContentProps = useCallback(() => ({
    // Content-specific props
  }), []);

  // State object for external access
  const state = {
    isOpen,
    isControlled,
  };

  // Set controlled state from external updates
  const setIsOpen = useCallback((newIsOpen: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(newIsOpen);
    }
  }, [isControlled]);

  return {
    // State
    state,
    isOpen,
    isControlled,
    
    // Actions
    toggle,
    open,
    close,
    setIsOpen,
    
    // Props helpers
    getTriggerProps,
    getPanelProps,
    getHeaderProps,
    getContentProps,
    
    // Refs
    triggerRef,
    panelRef,
  };
}

export default use${name};
`;

/**
 * Composable templates object
 */
export const composableTemplates = {
  hook: hookTemplate,
};