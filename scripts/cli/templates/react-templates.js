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
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import type { ${name}Props } from '../../lib/types/components';

/**
 * ${name} - Simple Presentational Component
 * 
 * @param {${name}Props} props - Component properties
 * @returns {JSX.Element} The rendered component
 */
export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(
  ({ children, className = '', glass, 'aria-label': ariaLabel, ...props }, ref) => {
    const componentClass = [\`c-${name.toLowerCase()}\`, className].filter(Boolean).join(' ');

    const content = (
      <div ref={ref} className={componentClass} aria-label={ariaLabel} {...props}>
        {children}
      </div>
    );

    return glass ? <AtomixGlass {...(glass === true ? {} : glass)}>{content}</AtomixGlass> : content;
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
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import type { ${name}Props } from '../../lib/types/components';

/**
 * ${name} - Medium Presentational Component
 * 
 * @param {${name}Props} props - Component properties
 * @returns {JSX.Element} The rendered component
 */
export const ${name} = memo(
  forwardRef<HTMLDivElement, ${name}Props>(
    ({ children, className = '', disabled = false, glass, style, 'aria-label': ariaLabel, ...props }, ref) => {
      const instanceId = useId();
      const { generateClassNames } = use${name}({ disabled });
      
      const content = (
        <div
          ref={ref}
          className={generateClassNames(className)}
          style={style}
          aria-label={ariaLabel}
          aria-disabled={disabled}
          {...props}
        >
          {children}
        </div>
      );

      return glass ? <AtomixGlass {...(glass === true ? {} : glass)}>{content}</AtomixGlass> : content;
    }
  )
);

${name}.displayName = '${name}';

export default ${name};
`;

/**
 * Complex template
 */
export const complexTemplate = (name) => `import React, { forwardRef, useId, memo } from 'react';
import { ${name.toUpperCase()} } from '../../lib/constants/components';
import { use${name} } from '../../lib/composables/use${name}';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import type { ${name}Props, ${name}State } from '../../lib/types/components';

/**
 * ${name} - Complex Functional Component
 * 
 * @param {${name}Props} props - Component properties
 * @returns {JSX.Element} The rendered component
 */
export const ${name} = memo(
  forwardRef<HTMLDivElement, ${name}Props>(
    ({ children, className = '', disabled = false, glass, style, onStateChange, 'aria-label': ariaLabel, ...props }, ref) => {
      const instanceId = useId();
      const { generateClassNames } = use${name}({ disabled, onStateChange });
      
      const content = (
        <div
          ref={ref}
          className={generateClassNames(className)}
          style={style}
          aria-label={ariaLabel}
          aria-disabled={disabled}
          {...props}
        >
          {children}
        </div>
      );

      return glass ? <AtomixGlass {...(glass === true ? {} : glass)}>{content}</AtomixGlass> : content;
    }
  )
);

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