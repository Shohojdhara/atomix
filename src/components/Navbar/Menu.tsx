import React, { ReactNode } from 'react';
import { MenuProps, MenuItemProps } from '../../lib/types/components';
import { Icon } from '../Icon';

const Menu: React.FC<MenuProps> = ({
  children,
  className = '',
  disabled = false
}) => {
  return (
    <div className={`c-menu ${className}`}>
      <ul className="c-menu__list" role="menu">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            // Pass disabled prop down to all children if Menu is disabled
            return React.cloneElement(child, {
              ...child.props,
              disabled: disabled ? true : child.props.disabled
            });
          }
          return child;
        })}
      </ul>
    </div>
  );
};

export type { MenuProps, MenuItemProps, MenuDividerProps };

// Set display name for debugging
Menu.displayName = 'Menu';

// Default export (primary)
export default Menu;

// Named export for compatibility
export { Menu };

interface MenuDividerProps {
  /**
   * Additional CSS class names
   */
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  href = '#',
  icon,
  active = false,
  disabled = false,
  onClick,
  className = ''
}) => {
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
    <li className={itemClass} role="menuitem">
      <a 
        href={href} 
        className="c-menu__link"
        onClick={handleClick}
        aria-disabled={disabled}
        aria-current={active ? 'page' : undefined}
      >
        {icon && (
          typeof icon === 'string' ? (
            icon.startsWith('c-icon-') ? (
              <Icon 
                name={mapIconName(icon.replace('c-icon-', ''))} 
                size="sm"
                className="c-menu__icon"
              />
            ) : (
              <i className={`c-menu__icon ${icon}`}>
                {typeof icon !== 'string' && icon}
              </i>
            )
          ) : (
            <span className="c-menu__icon">
              {icon}
            </span>
          )
        )}
        {children}
      </a>
    </li>
  );
};

// Map icon-lux names to Phosphor icon names
export const mapIconName = (luxIconName: string): any => {
  const iconMap: Record<string, any> = {
    'circle': 'Circle',
    'caret-down': 'CaretDown',
    'caret-up': 'CaretUp',
    'caret-right': 'CaretRight',
    'user': 'User',
    'settings': 'Gear',
    'sign-out': 'SignOut',
    'file': 'File',
    'bookmark': 'Bookmark',
    'question-circle': 'Question',
    'bell': 'Bell',
    'search': 'MagnifyingGlass',
    // Add more mappings as needed
  };
  
  return iconMap[luxIconName] || 'Circle'; // Default to Circle if no mapping found
};

export const MenuDivider: React.FC<MenuDividerProps> = ({
  className = ''
}) => {
  return (
    <li className={`c-menu__divider ${className}`} role="separator"></li>
  );
}; 