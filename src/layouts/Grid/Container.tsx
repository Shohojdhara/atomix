import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be rendered within the container
   */
  children: ReactNode;
  /**
   * Additional CSS class names
   */
  className?: string;
  /**
   * Container type: 
   * - undefined: responsive container with max-width at each breakpoint
   * - 'fluid': full width container
   * - 'sm', 'md', 'lg', 'xl', 'xxl': responsive container with max-width at specified breakpoint
   */
  type?: 'fluid' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

/**
 * Container component for creating responsive layouts.
 * Uses the CSS container classes defined in _objects.container.scss.
 *
 * @example
 * ```tsx
 * <Container>
 *   Content with responsive max-width
 * </Container>
 * 
 * <Container type="fluid">
 *   Full width content
 * </Container>
 * 
 * <Container type="md">
 *   Content with max-width at md breakpoint
 * </Container>
 * ```
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, className = '', type, ...props }, ref) => {
    let containerClass = 'o-container';
    
    if (type) {
      containerClass = `o-container-${type}`;
    }
    
    return (
      <div 
        ref={ref} 
        className={`${containerClass} ${className}`.trim()} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
