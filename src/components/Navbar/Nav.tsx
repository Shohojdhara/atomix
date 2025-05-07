import React from 'react';
import { NavProps } from '../../lib/types/components';
import { useNav } from '../../lib/composables/useNavbar';

export const Nav: React.FC<NavProps> = ({
  children,
  alignment = 'start',
  className = '',
  disabled = false
}) => {
  const { generateNavClass } = useNav({ alignment });
  
  const navClass = generateNavClass({ alignment, className });
  
  return (
    <ul className={navClass} role="menubar" aria-orientation="horizontal">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // Pass disabled prop down to all children if Nav is disabled
          return React.cloneElement(child, {
            ...child.props,
            disabled: disabled ? true : child.props.disabled
          });
        }
        return child;
      })}
    </ul>
  );
}; 