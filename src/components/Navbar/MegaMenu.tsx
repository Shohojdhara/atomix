import React, { forwardRef, ReactNode } from 'react';
import { MegaMenuProps, MegaMenuColumnProps, MegaMenuLinkProps } from '../../lib/types/components';
import { Icon } from '../Icon/Icon';
import { mapIconName } from './Menu'; // Import the mapping function

export const MegaMenu: React.FC<MegaMenuProps> = forwardRef<HTMLDivElement, MegaMenuProps>(
  ({ children, className = '', disabled = false }, ref) => {
    return (
      <div ref={ref} className={`c-menu c-menu--mega ${className}`}>
        <div className="c-menu__container">
          <div className="c-menu__grid o-grid">
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                // Pass disabled prop down to all children if MegaMenu is disabled
                return React.cloneElement(child, {
                  ...child.props,
                  disabled: disabled ? true : child.props.disabled,
                });
              }
              return child;
            })}
          </div>
        </div>
      </div>
    );
  }
);

export const MegaMenuColumn: React.FC<MegaMenuColumnProps> = forwardRef<
  HTMLDivElement,
  MegaMenuColumnProps
>(({ title, icon, children, width = 'auto', className = '', disabled = false }, ref) => {
  const columnClass = `o-grid__col o-grid__col--${width} ${className}`;

  return (
    <div ref={ref} className={columnClass}>
      {(title || icon) && (
        <div className="c-menu__header">
          {icon &&
            (typeof icon === 'string' ? (
              icon.startsWith('c-icon-') ? (
                <Icon
                  name={mapIconName(icon.replace('c-icon-', ''))}
                  size="sm"
                  className="c-menu__header-icon"
                />
              ) : (
                <i className={`c-menu__header-icon ${icon}`}>{typeof icon !== 'string' && icon}</i>
              )
            ) : (
              <span className="c-menu__header-icon">{icon}</span>
            ))}
          {title && <div className="c-menu__header-title">{title}</div>}
        </div>
      )}

      <ul className="c-menu__subitems-list" role="menu">
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            // Pass disabled prop down to all children if column is disabled
            return (
              <li className="c-menu__subitem" role="menuitem">
                {React.cloneElement(child, {
                  ...child.props,
                  disabled: disabled ? true : child.props.disabled,
                })}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
});

export const MegaMenuLink: React.FC<MegaMenuLinkProps> = forwardRef<
  HTMLAnchorElement,
  MegaMenuLinkProps
>(({ href, children, className = '', disabled = false, onClick }, ref) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <a
      ref={ref}
      href={href}
      className={`c-menu__subitem-link ${disabled ? 'is-disabled' : ''} ${className}`}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      {children}
    </a>
  );
});
