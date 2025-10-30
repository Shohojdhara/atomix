import React, { forwardRef, ReactNode } from 'react';
import { MenuProps, MenuItemProps } from '../../../lib/types/components';
import { Icon } from '../../Icon/Icon';

export const Menu: React.FC<MenuProps> = forwardRef<HTMLDivElement, MenuProps>(
  ({ children, className = '', style, disabled = false }, ref) => {
    return (
      <div ref={ref} className={`c-menu ${className}`} style={style}>
        <ul className="c-menu__list" role="menu">
          {React.Children.map(children, child => {
            if (React.isValidElement(child)) {
              // Pass disabled prop down to all children if Menu is disabled
              const childProps = child.props as any;
              return React.cloneElement(child as React.ReactElement<any>, {
                ...childProps,
                disabled: disabled ? true : childProps?.disabled,
              });
            }
            return child;
          })}
        </ul>
      </div>
    );
  }
);

export type { MenuProps, MenuItemProps, MenuDividerProps };

export default Menu;

interface MenuDividerProps {
  /**
   * Additional CSS class names
   */
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = forwardRef<HTMLLIElement, MenuItemProps>(
  (
    { children, href = '#', icon, active = false, disabled = false, onClick, className = '' },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      if (onClick) {
        onClick();
      }
    };

    const itemClass = `c-menu__item ${active ? 'is-active' : ''} ${disabled ? 'is-disabled' : ''} ${className}`;

    return (
      <li ref={ref} className={itemClass} role="menuitem">
        <a
          href={href}
          className="c-menu__link"
          onClick={handleClick}
          aria-disabled={disabled}
          aria-current={active ? 'page' : undefined}
        >
          {icon &&
            (typeof icon === 'string' ? (
              icon.startsWith('c-icon-') ? (
                <Icon
                  name={mapIconName(icon.replace('c-icon-', ''))}
                  size="sm"
                  className="c-menu__icon"
                />
              ) : (
                <i className={`c-menu__icon ${icon}`}>{typeof icon !== 'string' && icon}</i>
              )
            ) : (
              <span className="c-menu__icon">{icon}</span>
            ))}
          {children}
        </a>
      </li>
    );
  }
);

// Map icon-lux names to Phosphor icon names
export const mapIconName = (luxIconName: string): any => {
  const iconMap: Record<string, any> = {
    circle: 'Circle',
    'caret-down': 'CaretDown',
    'caret-up': 'CaretUp',
    'caret-right': 'CaretRight',
    user: 'User',
    settings: 'Gear',
    'sign-out': 'SignOut',
    file: 'File',
    bookmark: 'Bookmark',
    'question-circle': 'Question',
    bell: 'Bell',
    search: 'MagnifyingGlass',
    // Add more mappings as needed
  };

  return iconMap[luxIconName] || 'Circle'; // Default to Circle if no mapping found
};

export const MenuDivider: React.FC<MenuDividerProps> = forwardRef<HTMLLIElement, MenuDividerProps>(
  ({ className = '' }, ref) => {
    return <li ref={ref} className={`c-menu__divider ${className}`} role="separator"></li>;
  }
);
