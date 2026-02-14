// Creating react-templates.js since it doesn't exist yet but is referenced in the modular templates

/**
 * React Component Templates
 * Templates for React component generation
 */

/**
 * Default component template that matches existing components
 */
export const componentTemplate = (name) => {
  const componentPrefix = name.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  
  return `import React, { forwardRef, useCallback, memo } from 'react';
import { use${name} } from '../../lib/composables/use${name}';
import { ${name.toUpperCase()}, THEME_NAMING } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { ThemeNaming } from '../../lib/utils/themeNaming';
import type { ${name}Props } from '../../lib/types/components';

export const ${name} = React.memo(
  forwardRef<HTMLDivElement, ${name}Props>(
    (
      {
        children,
        className = '',
        disabled = false,
        variant = 'primary',
        size = 'md',
        glass,
        onClick,
        onHover,
        onFocus,
        onBlur,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        tabIndex,
        style,
        ...props
      },
      ref
    ) => {
      const { generateClassNames, handleClick } = use${name}({
        variant,
        size,
        disabled,
        glass,
      });

      const componentClass = [
        ${name.toUpperCase()}.BASE_CLASS,
        ThemeNaming.variantClass('${componentPrefix}', variant),
        size !== 'md' ? ThemeNaming.sizeClass('${componentPrefix}', size) : '',
        disabled ? ThemeNaming.stateClass('${componentPrefix}', 'disabled') : '',
        glass ? ThemeNaming.stateClass('${componentPrefix}', 'glass') : '',
        className,
      ]
        .filter(Boolean)
        .join(' ');

      // Handle click event
      const handleClickEvent = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        },
        [disabled, onClick]
      );

      // Handle hover
      const handleMouseEnter = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
          if (!disabled) {
            onHover?.(event);
          }
        },
        [disabled, onHover]
      );

      // Handle focus
      const handleFocusEvent = useCallback(
        (event: React.FocusEvent<HTMLDivElement>) => {
          if (!disabled) {
            onFocus?.(event);
          }
        },
        [disabled, onFocus]
      );

      // Handle blur
      const handleBlurEvent = useCallback(
        (event: React.FocusEvent<HTMLDivElement>) => {
          if (!disabled) {
            onBlur?.(event);
          }
        },
        [disabled, onBlur]
      );

      // Component props
      const componentProps = {
        ref,
        className: componentClass,
        onClick: handleClickEvent,
        onMouseEnter: onHover ? handleMouseEnter : undefined,
        onFocus: onFocus ? handleFocusEvent : undefined,
        onBlur: onBlur ? handleBlurEvent : undefined,
        'aria-disabled': disabled,
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,
        tabIndex: tabIndex !== undefined ? tabIndex : (disabled ? -1 : 0),
        style,
        ...props,
      };

      // Default glass props
      const defaultGlassProps = {
        displacementScale: 20,
        blurAmount: 0,
        saturation: 200,
        elasticity: 0,
      };
      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      // Component content
      const componentContent = (
        <div {...componentProps}>
          {children}
        </div>
      );

      return glass ? <AtomixGlass {...glassProps}>{componentContent}</AtomixGlass> : componentContent;
    }
  )
);

${name}.displayName = '${name}';

export default ${name};`;
};

/**
 * Simple component template
 */
export const simpleTemplate = (name) => `import React, { forwardRef } from 'react';
import type { ${name}Props } from './${name}.types';

/**
 * ${name} - Simple Presentational Component
 * 
 * A basic component for rendering content with minimal overhead.
 */
export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={\`c-${name.toLowerCase()} \${className || ''}\`} {...props}>
        {children}
      </div>
    );
  }
);

${name}.displayName = '${name}';
`;

/**
 * Medium complexity template
 */
export const mediumTemplate = (name) => `import React, { forwardRef, useId, memo } from 'react';
import { ${name.toUpperCase()} } from '../../lib/constants/components';
import { use${name} } from '../../lib/composables/use${name}';
import type { ${name}Props, ${name}State } from '../../lib/types/components';

export interface ${name}Props {
  /**
   * Content to be rendered
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Other component-specific props would go here
   */
}

export interface ${name}State {
  // Define state interface for the component
}

export const ${name}: React.FC<${name}Props> = memo(({
  children,
  className = '',
  disabled = false,
  style,
  ...props
}) => {
  const instanceId = useId();
  const { generateClassNames } = use${name}({ disabled });
  
  return (
    <div
      className={generateClassNames(className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
});

${name}.displayName = '${name}';

export default ${name};
`;

/**
 * Complex template
 */
export const complexTemplate = (name) => `import React, { forwardRef, useId, memo } from 'react';
import { ${name.toUpperCase()} } from '../../lib/constants/components';
import { use${name} } from '../../lib/composables/use${name}';
import type { ${name}Props, ${name}State } from '../../lib/types/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import type { AtomixGlassProps } from '../AtomixGlass/AtomixGlass';

export interface ${name}Props {
  /**
   * Content to be rendered
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Glass effect options
   */
  glass?: boolean | AtomixGlassProps;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
  
  /**
   * Callback when component state changes
   */
  onStateChange?: (state: ${name}State) => void;
}

export interface ${name}State {
  // Define state interface for the component
}

export const ${name}: React.FC<${name}Props> = memo(({
  children,
  className = '',
  disabled = false,
  glass,
  style,
  onStateChange,
  ...props
}) => {
  const instanceId = useId();
  const { generateClassNames } = use${name}({ disabled, onStateChange });
  
  const componentContent = (
    <div
      className={generateClassNames(className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );

  if (glass) {
    const defaultGlassProps = {
      // Default glass settings specific to this component
    };

    const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

    return <AtomixGlass {...glassProps}>{componentContent}</AtomixGlass>;
  }

  return componentContent;
});

${name}.displayName = '${name}';

export default ${name};
`;

/**
 * Index template
 */
export const indexTemplate = (name) => `export { default as ${name} } from './${name}';
export type { ${name}Props } from './${name}';`;

export const reactTemplates = {
  component: componentTemplate,
  simple: simpleTemplate,
  medium: mediumTemplate,
  complex: complexTemplate,
  index: indexTemplate,
};