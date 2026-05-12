import React, { useRef, useEffect, useState, memo, useCallback, useMemo } from 'react';
import { SelectProps, SelectOption as SelectOptionType } from '../../lib/types/components';
import { useSelect } from '../../lib/composables';
import { SELECT } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';
import { SelectContext, SelectOption } from './SelectOption';

export type SelectComponent = React.FC<SelectProps> & {
  Option: typeof SelectOption;
};

/**
 * Select - A component for dropdown selection
 */
const SelectComponentBase = ({
  options,
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder = 'Select an option',
  className = '',
  style,
  disabled = false,
  required = false,
  id,
  name,
  size = 'md',
  invalid = false,
  valid = false,
  multiple = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  glass,
  children,
}: SelectProps) => {
  const { generateSelectClass } = useSelect({
    size,
    disabled,
    invalid,
    valid,
  });

  const selectClass = generateSelectClass({
    className: `${className} ${glass ? 'c-select--glass' : ''}`.trim(),
    size,
    disabled,
    invalid,
    valid,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const nativeSelectRef = useRef<HTMLSelectElement>(null);

  // State for registered options (Compound mode)
  const [registeredOptions, setRegisteredOptions] = useState<SelectOptionType[]>([]);

  const registerOption = useCallback((option: SelectOptionType) => {
    setRegisteredOptions(prev => {
      if (prev.some(o => o.value === option.value)) return prev;
      return [...prev, option];
    });
  }, []);

  const unregisterOption = useCallback((value: string) => {
    setRegisteredOptions(prev => prev.filter(o => o.value !== value));
  }, []);

  // Determine active options
  const hasOptionsProp = options && options.length > 0;
  const activeOptions = hasOptionsProp ? options : registeredOptions;

  // Derived selected label
  const selectedLabel = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      const selectedOptions = activeOptions.filter(opt => value.includes(opt.value));
      return selectedOptions.map(opt => opt.label).join(', ');
    }

    if (value && typeof value === 'string') {
      const selectedOption = activeOptions.find(opt => opt.value === value);
      return selectedOption ? selectedOption.label : placeholder;
    }

    return placeholder;
  }, [value, activeOptions, placeholder, multiple]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (bodyRef.current) {
          bodyRef.current.style.height = '0px';
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const handleToggle = () => {
    if (!disabled) {
      const nextOpen = !isOpen;
      if (nextOpen && bodyRef.current && panelRef.current) {
        bodyRef.current.style.height = `${panelRef.current.clientHeight}px`;

        // Set focused index to current selection or first item
        if (value && !multiple && typeof value === 'string') {
          const index = activeOptions.findIndex(opt => opt.value === value);
          setFocusedIndex(index >= 0 ? index : 0);
        } else if (multiple && Array.isArray(value) && value.length > 0) {
          const index = activeOptions.findIndex(opt => value.includes(opt.value));
          setFocusedIndex(index >= 0 ? index : 0);
        } else {
          setFocusedIndex(0);
        }
      } else if (bodyRef.current) {
        bodyRef.current.style.height = '0px';
        setFocusedIndex(-1);
      }
      setIsOpen(nextOpen);
    }
  };

  // Handle item selection
  const handleItemClick = useCallback(
    (option: { value: string; label: string }) => {
      let newValue: string | string[];

      if (multiple) {
        const currentValues = Array.isArray(value) ? value : value ? [value] : [];
        if (currentValues.includes(option.value)) {
          newValue = currentValues.filter(v => v !== option.value);
        } else {
          newValue = [...currentValues, option.value];
        }
      } else {
        newValue = option.value;
        setIsOpen(false);
        if (bodyRef.current) {
          bodyRef.current.style.height = '0px';
        }
      }

      if (onChange) {
        // Sync native select before firing onChange
        if (nativeSelectRef.current) {
          if (multiple && Array.isArray(newValue)) {
            Array.from(nativeSelectRef.current.options).forEach(opt => {
              opt.selected = newValue.includes(opt.value);
            });
          } else if (typeof newValue === 'string') {
            nativeSelectRef.current.value = newValue;
          }
        }

        // Create a synthetic-like event
        const event = {
          target: {
            name,
            value: newValue,
          },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;
        onChange(event);
      }
    },
    [onChange, name, multiple, value]
  );

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!isOpen) {
          handleToggle();
        } else if (focusedIndex >= 0 && focusedIndex < activeOptions.length) {
          const option = activeOptions[focusedIndex];
          if (option && !option.disabled) {
            handleItemClick(option);
          }
        }
        break;
      case 'Escape':
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
          if (bodyRef.current) {
            bodyRef.current.style.height = '0px';
          }
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          handleToggle();
        } else {
          setFocusedIndex(prev => (prev < activeOptions.length - 1 ? prev + 1 : prev));
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          handleToggle();
        } else {
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : 0));
        }
        break;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          setFocusedIndex(activeOptions.length - 1);
        }
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
          if (bodyRef.current) {
            bodyRef.current.style.height = '0px';
          }
        }
        break;
      default:
        break;
    }
  };

  const onSelect = useCallback(
    (val: string, label: string) => {
      handleItemClick({ value: val, label });
    },
    [handleItemClick]
  );

  const focusedValue = useMemo(() => {
    if (focusedIndex >= 0 && focusedIndex < activeOptions.length) {
      return activeOptions[focusedIndex]?.value;
    }
    return undefined;
  }, [focusedIndex, activeOptions]);

  const focusedOptionId = useMemo(() => {
    if (isOpen && focusedValue) {
      return `${id || 'select'}-opt-${focusedValue}`;
    }
    return undefined;
  }, [isOpen, focusedValue, id]);

  const contextValue = React.useMemo(
    () => ({
      registerOption,
      unregisterOption,
      selectedValue: value,
      onSelect,
      focusedValue,
      id: id || 'select',
    }),
    [registerOption, unregisterOption, value, onSelect, focusedValue, id]
  );

  const selectContent = (
    <SelectContext.Provider value={contextValue}>
      <div
        className={`${selectClass} ${isOpen ? SELECT.CLASSES.IS_OPEN : ''}`}
        ref={dropdownRef}
        style={style}
        aria-expanded={isOpen}
      >
        {/* Native select for accessibility and form submission */}
        <select
          ref={nativeSelectRef}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          id={id}
          name={name}
          multiple={multiple}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-invalid={invalid}
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: '0',
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {activeOptions.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Select UI */}
        <div
          className={SELECT.CLASSES.SELECTED}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={id ? `${id}-listbox` : undefined}
          aria-activedescendant={focusedOptionId}
        >
          <div className="c-select__selected-text">{selectedLabel}</div>
        </div>

        <i className={`${SELECT.CLASSES.ICON_CARET} ${SELECT.CLASSES.TOGGLE_ICON}`} />

        <div className={SELECT.CLASSES.SELECT_BODY} ref={bodyRef} style={{ height: 0 }}>
          <div className={SELECT.CLASSES.SELECT_PANEL} ref={panelRef}>
            <ul
              className={SELECT.CLASSES.SELECT_ITEMS}
              role="listbox"
              id={id ? `${id}-listbox` : undefined}
              aria-labelledby={id}
            >
              {hasOptionsProp
                ? options.map((option, index) => (
                    <li
                      key={option.value}
                      id={`${id || 'select'}-opt-${option.value}`}
                      className={`${SELECT.CLASSES.SELECT_ITEM} ${focusedIndex === index ? 'is-focused' : ''} ${
                        (multiple && Array.isArray(value) && value.includes(option.value)) ||
                        value === option.value
                          ? 'is-selected'
                          : ''
                      }`}
                      data-value={option.value}
                      onClick={() => !option.disabled && handleItemClick(option)}
                      onMouseEnter={() => setFocusedIndex(index)}
                      role="option"
                      aria-selected={
                        (multiple && Array.isArray(value) && value.includes(option.value)) ||
                        value === option.value
                      }
                      aria-disabled={option.disabled}
                    >
                      <label htmlFor={`SelectItem${index}`} className="c-checkbox">
                        <input
                          type="checkbox"
                          id={`SelectItem${index}`}
                          className="c-checkbox__input c-select__item-input"
                          checked={
                            (multiple && Array.isArray(value) && value.includes(option.value)) ||
                            value === option.value
                          }
                          readOnly
                          disabled={option.disabled}
                        />
                        <div className="c-select__item-label">{option.label}</div>
                      </label>
                    </li>
                  ))
                : children}
            </ul>
          </div>
        </div>
      </div>
    </SelectContext.Provider>
  );

  if (glass) {
    // Default glass settings for select components
    const defaultGlassProps = {
      displacementScale: 60,
      blurAmount: 10,
      mode: 'shader' as const,
    };

    const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

    return <AtomixGlass {...glassProps}>{selectContent}</AtomixGlass>;
  }

  return selectContent;
};

export const Select = memo(SelectComponentBase) as unknown as SelectComponent;

export type { SelectProps };

Select.displayName = 'Select';
Select.Option = SelectOption;

export default Select;
