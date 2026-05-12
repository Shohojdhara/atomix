import React, { createContext, useContext, useEffect, memo, ReactNode } from 'react';
import { SelectOption as SelectOptionType } from '../../lib/types/components';
import { SELECT } from '../../lib/constants/components';

// Context for managing options registration and selection
export interface SelectContextType {
  registerOption: (option: SelectOptionType) => void;
  unregisterOption: (value: string) => void;
  selectedValue?: string | string[];
  onSelect: (value: string, label: string) => void;
  focusedValue?: string;
  id?: string;
}

export const SelectContext = createContext<SelectContextType | null>(null);

export interface SelectOptionProps {
  value: string;
  label?: string;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const SelectOption: React.FC<SelectOptionProps> = memo(
  ({ value, label, children, disabled = false, className = '', style }) => {
    const context = useContext(SelectContext);

    const displayLabel = label || (typeof children === 'string' ? children : value);

    useEffect(() => {
      if (context) {
        context.registerOption({ value, label: displayLabel, disabled });
        return () => {
          context.unregisterOption(value);
        };
      }
      return undefined;
    }, [context, value, displayLabel, disabled]);

    if (!context) {
      console.warn('SelectOption must be used within a Select component');
      return null;
    }

    const { selectedValue, onSelect, focusedValue, id } = context;

    const isSelected = Array.isArray(selectedValue)
      ? selectedValue.includes(value)
      : selectedValue === value;

    const isFocused = focusedValue === value;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        onSelect(value, displayLabel);
      }
    };

    return (
      <li
        id={id ? `${id}-opt-${value}` : undefined}
        className={`${SELECT.CLASSES.SELECT_ITEM} ${isFocused ? 'is-focused' : ''} ${
          isSelected ? 'is-selected' : ''
        } ${className}`.trim()}
        data-value={value}
        onClick={handleClick}
        style={style}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
      >
        <label className="c-checkbox" style={{ pointerEvents: 'none' }}>
           <input
             type="checkbox"
             className="c-checkbox__input c-select__item-input"
             checked={isSelected}
             readOnly
             disabled={disabled}
             tabIndex={-1}
           />
           <div className="c-select__item-label">{children || displayLabel}</div>
        </label>
      </li>
    );
  }
);

SelectOption.displayName = 'SelectOption';

export default SelectOption;
