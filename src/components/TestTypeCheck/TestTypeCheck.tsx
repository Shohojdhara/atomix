import React, { forwardRef, useId, memo } from 'react';
import { TESTTYPECHECK } from '../../lib/constants/components';
import { useTestTypeCheck } from '../../lib/composables/useTestTypeCheck';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import type { TestTypeCheckProps } from '../../lib/types/components';

/**
 * TestTypeCheck - Medium Presentational Component
 * 
 * @param {TestTypeCheckProps} props - Component properties
 * @returns {JSX.Element} The rendered component
 */
export const TestTypeCheck = memo(
  forwardRef<HTMLDivElement, TestTypeCheckProps>(
    ({ children, className = '', disabled = false, glass, style, 'aria-label': ariaLabel, ...props }, ref) => {
      const instanceId = useId();
      const { generateClassNames } = useTestTypeCheck({ disabled });
      
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

TestTypeCheck.displayName = 'TestTypeCheck';

export default TestTypeCheck;
