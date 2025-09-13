import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseAtomixGlassOptions {
  size?: 'sm' | 'md' | 'lg';
  mode?: 'standard' | 'polar' | 'prominent' | 'shader';
  overLight?: boolean;
  clickable?: boolean;
  active?: boolean;
  className?: string;
}

export interface UseAtomixGlassReturn {
  generateGlassClass: (options: UseAtomixGlassOptions) => string;
  generateElementClass: (element: string, modifier?: string) => string;
}

/**
 * Hook for generating AtomixGlass CSS classes following BEM methodology
 */
export function useAtomixGlass(): UseAtomixGlassReturn {
  // Generate CSS class for the main glass component
  const generateGlassClass = useCallback((options: UseAtomixGlassOptions) => {
    const classes = ['c-atomix-glass'];

    // Add size modifier
    if (options.size && options.size !== 'md') {
      classes.push(`c-atomix-glass--${options.size}`);
    }

    // Add mode modifier
    if (options.mode && options.mode !== 'standard') {
      classes.push(`c-atomix-glass--${options.mode}`);
    }

    // Add state modifiers
    if (options.clickable) {
      classes.push('c-atomix-glass--clickable');
    }

    if (options.overLight) {
      classes.push('c-atomix-glass--over-light');
    }

    if (options.active) {
      classes.push('c-atomix-glass--active');
    }

    // Add custom className
    if (options.className) {
      classes.push(options.className);
    }

    return classes.filter(Boolean).join(' ');
  }, []);

  // Generate CSS class for elements
  const generateElementClass = useCallback((element: string, modifier?: string) => {
    const baseClass = `c-atomix-glass__${element}`;

    if (modifier) {
      return `${baseClass}--${modifier}`;
    }

    return baseClass;
  }, []);

  return {
    generateGlassClass,
    generateElementClass,
  };
}
