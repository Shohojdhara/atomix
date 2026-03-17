import React, { forwardRef, useId, memo } from 'react';
import { TYPEDBUTTON } from '../../lib/constants/components';
import { useTypedButton } from '../../lib/composables/useTypedButton';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import type { TypedButtonProps } from '../../lib/types/components';

/**
 * TypedButton - Medium Presentational Component
 * 
 * @param {TypedButtonProps} props - Component properties
 * @returns {JSX.Element} The rendered component
 */
export const TypedButton = memo(
  forwardRef<HTMLDivElement, TypedButtonProps>(
    ({ children, className = '', disabled = false, glass, style, 'aria-label': ariaLabel, ...props }, ref) => {
      const instanceId = useId();
      const { generateClassNames } = useTypedButton({ disabled });
      
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

TypedButton.displayName = 'TypedButton';

export default TypedButton;
