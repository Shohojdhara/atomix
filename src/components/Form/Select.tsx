import React, { useRef, useEffect, useState, memo } from 'react';
import { SelectProps } from '../../lib/types/components';
import { useSelect } from '../../lib/composables';
import { SELECT } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

/**
 * Select - A component for dropdown selection
 */
export const Select: React.FC<SelectProps> = memo(
  ({
    options = [],
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
  }) => {
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
    const [selectedLabel, setSelectedLabel] = useState(placeholder);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const nativeSelectRef = useRef<HTMLSelectElement>(null);

    // Update selected label when value changes
    useEffect(() => {
      if (value) {
        const selectedOption = options.find(opt => opt.value === value);
        if (selectedOption) {
          setSelectedLabel(selectedOption.label);
        }
      } else {
        setSelectedLabel(placeholder);
      }
    }, [value, options, placeholder]);

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
        if (!isOpen && bodyRef.current && panelRef.current) {
          bodyRef.current.style.height = `${panelRef.current.clientHeight}px`;
        } else if (bodyRef.current) {
          bodyRef.current.style.height = '0px';
        }
        setIsOpen(!isOpen);
      }
    };

    // Handle item selection
    const handleItemClick = (option: { value: string; label: string }) => {
      setSelectedLabel(option.label);
      setIsOpen(false);
      if (bodyRef.current) {
        bodyRef.current.style.height = '0px';
      }

      if (nativeSelectRef.current) {
        nativeSelectRef.current.value = option.value;
      }

      if (onChange) {
        // Create a synthetic event
        const event = {
          target: {
            name,
            value: option.value,
          },
        } as React.ChangeEvent<HTMLSelectElement>;
        onChange(event);
      }
    };

    const selectContent = (
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
          style={{ display: 'none' }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Select UI */}
        <div className={SELECT.CLASSES.SELECTED} onClick={handleToggle} aria-disabled={disabled}>
          {selectedLabel}
        </div>

        <i className={`${SELECT.CLASSES.ICON_CARET} ${SELECT.CLASSES.TOGGLE_ICON}`} />

        <div className={SELECT.CLASSES.SELECT_BODY} ref={bodyRef} style={{ height: 0 }}>
          <div className={SELECT.CLASSES.SELECT_PANEL} ref={panelRef}>
            <ul className={SELECT.CLASSES.SELECT_ITEMS}>
              {options.map((option, index) => (
                <li
                  key={option.value}
                  className={SELECT.CLASSES.SELECT_ITEM}
                  data-value={option.value}
                  onClick={() => !option.disabled && handleItemClick(option)}
                >
                  <label htmlFor={`SelectItem${index}`} className="c-checkbox">
                    <input
                      type="checkbox"
                      id={`SelectItem${index}`}
                      className="c-checkbox__input c-select__item-input"
                      checked={value === option.value}
                      readOnly
                      disabled={option.disabled}
                    />
                    <div className="c-select__item-label">{option.label}</div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );

    if (glass) {
      // Default glass settings for select components
      const defaultGlassProps = {
        displacementScale: 60,
        blurAmount: 1,
        saturation: 180,
        aberrationIntensity: 0.2,
        cornerRadius: 12,
        mode: 'shader' as const,
      };

      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

      return <AtomixGlass {...glassProps}>{selectContent}</AtomixGlass>;
    }

    return selectContent;
  }
);

export type { SelectProps };

Select.displayName = 'Select';

export default Select;
