/**
 * React Component Templates
 * Different complexity levels for React components
 */

/**
 * Simple React component template
 * Basic presentational component with minimal state
 */
export const simpleTemplate = (name) => `import React, { memo, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ACCORDION } from '../../lib/constants/components';
import type { ${name}Props } from '../../lib/types/components';

/**
 * ${name} component - Simple variant
 * Basic presentational component with minimal state
 * 
 * @example
 * \`\`\`tsx
 * <${name}>Hello World</${name}>
 * \`\`\`
 */
export const ${name} = memo(
  forwardRef<HTMLDivElement, ${name}Props>(
    ({ 
      children, 
      className, 
      ...props 
    }, ref) => {
      const componentClass = cn(
        ACCORDION.SELECTORS.ACCORDION.replace('.', ''),
        className
      );

      return (
        <div
          ref={ref}
          className={componentClass}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);

${name}.displayName = '${name}';`;

/**
 * Medium React component template
 * Component with state management and interactions
 */
export const mediumTemplate = (name) => `import React, { memo, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ACCORDION } from '../../lib/constants/components';
import type { ${name}Props } from '../../lib/types/components';
import { use${name} } from '../../lib/composables/use${name}';

/**
 * ${name} component - Medium variant
 * Component with state management and interactions
 * 
 * @example
 * \`\`\`tsx
 * <${name}>Hello World</${name}>
 * \`\`\`
 */
export const ${name} = memo(
  forwardRef<HTMLDivElement, ${name}Props>(
    ({ 
      children, 
      className, 
      ...props 
    }, ref) => {
      const { 
        state, 
        toggle, 
        isOpen, 
        setIsOpen,
        getTriggerProps,
        getPanelProps
      } = use${name}({
        // Initial props can be passed here
      });

      const componentClass = cn(
        ACCORDION.SELECTORS.ACCORDION.replace('.', ''),
        className
      );

      return (
        <div
          ref={ref}
          className={componentClass}
          data-state={state}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);

${name}.displayName = '${name}';`;

/**
 * Complex React component template
 * Advanced component with validation, accessibility, and state management
 */
export const complexTemplate = (name) => `import React, { memo, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ACCORDION } from '../../lib/constants/components';
import type { ${name}Props, ${name}State } from '../../lib/types/components';
import { use${name} } from '../../lib/composables/use${name}';

/**
 * ${name} component - Complex variant
 * Advanced component with validation, accessibility, and state management
 * 
 * @example
 * \`\`\`tsx
 * <${name} validationRules={rules}>
 *   Trigger content
 *  <${name}.Panel>Panel content</${name}.Panel>
 * </${name}>
 * \`\`\`
 */
export const ${name} = memo(
  forwardRef<HTMLDivElement, ${name}Props>(
    ({ 
      children, 
      className,
      validationRules,
      onValidationChange,
      ...props 
    }, ref) => {
      const { 
        state, 
        toggle, 
        isOpen, 
        setIsOpen,
        isControlled,
        isValid,
        validationMessage,
        getTriggerProps,
        getPanelProps,
        getHeaderProps,
        getContentProps
      } = use${name}({
        validationRules,
        onValidationChange
      });

      const componentClass = cn(
        ACCORDION.SELECTORS.ACCORDION.replace('.', ''),
        {
          'is-valid': isValid,
          'is-invalid': !isValid && validationMessage,
          'is-controlled': isControlled
        },
        className
      );

      return (
        <div
          ref={ref}
          className={componentClass}
          data-state={state}
          data-valid={isValid}
          {...getTriggerProps()}
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
      );
    }
  )
);

${name}.displayName = '${name}';`;

/**
 * Default React component template (backward compatibility)
 */
export const defaultTemplate = (name) => `import React, { memo, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ACCORDION } from '../../lib/constants/components';
import type { ${name}Props } from '../../lib/types/components';
import { use${name} } from '../../lib/composables/use${name}';

/**
 * ${name} component
 * 
 * @example
 * \`\`\`tsx
 * <${name}>Hello World</${name}>
 * \`\`\`
 */
export const ${name} = memo(
  forwardRef<HTMLDivElement, ${name}Props>(
    ({ 
      children, 
      className, 
      ...props 
    }, ref) => {
      const { 
        state, 
        toggle, 
        isOpen, 
        setIsOpen,
        getTriggerProps,
        getPanelProps,
        getHeaderProps,
        getContentProps
      } = use${name}({
        // Initial props can be passed here
      });

      const componentClass = cn(
        ACCORDION.SELECTORS.ACCORDION.replace('.', ''),
        className
      );

      return (
        <div
          ref={ref}
          className={componentClass}
          data-state={state}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);

${name}.displayName = '${name}';`;

/**
 * React component templates object
 */
export const reactTemplates = {
  simple: simpleTemplate,
  medium: mediumTemplate,
  complex: complexTemplate,
  component: defaultTemplate,
};