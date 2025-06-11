import React, { useState, useEffect, useRef } from 'react';
import { NavbarProps } from '../../lib/types/components';
import { useNavbar } from '../../lib/composables/useNavbar';
import { NAVBAR } from '../../lib/constants/components';

const Navbar: React.FC<NavbarProps> = ({
  brand,
  children,
  variant,
  position = 'static',
  containerWidth,
  collapsible = true,
  expanded,
  onToggle,
  className = '',
  disabled = false
}) => {
  const { generateNavbarClass, generateContainerStyle, generateCollapseClass } = useNavbar({ 
    position, collapsible, expanded, onToggle
  });
  
  // Use controlled or uncontrolled expanded state
  const [navbarExpanded, setNavbarExpanded] = useState(expanded || false);
  
  // Ref for the collapse element to handle responsive behavior
  const collapseRef = useRef<HTMLDivElement>(null);
  
  // Update local state when external state changes
  useEffect(() => {
    if (typeof expanded !== 'undefined') {
      setNavbarExpanded(expanded);
    }
  }, [expanded]);
  
  // Handle resize to reset mobile menu state when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // MD breakpoint
      if (!isMobile && collapsible) {
        // Reset expanded state on desktop
        if (typeof onToggle === 'function') {
          // Only update if different to avoid unnecessary renders
          if (expanded) onToggle(false);
        } else {
          setNavbarExpanded(false);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [collapsible, expanded, onToggle]);
  
  // Generate the navbar class
  const navbarClass = generateNavbarClass({ 
    position, variant, collapsible, className
  });
  
  // Generate the container style
  const containerStyle = generateContainerStyle(containerWidth);
  
  // Generate collapse class
  const collapseClass = generateCollapseClass(navbarExpanded);
  
  // Handle toggler click
  const handleToggleClick = () => {
    if (disabled) return;
    
    const newState = !navbarExpanded;
    
    if (typeof onToggle === 'function') {
      // Controlled component
      onToggle(newState);
    } else {
      // Uncontrolled component
      setNavbarExpanded(newState);
    }
  };
  
  return (
    <nav className={navbarClass} aria-label="Main navigation">
      <div className="c-navbar__container" style={containerStyle}>
        {brand && (
          typeof brand === 'string' ? (
            <a href="/" className="c-navbar__brand">{brand}</a>
          ) : (
            <div className="c-navbar__brand">{brand}</div>
          )
        )}
        
        {collapsible && (
          <button 
            className="c-navbar__toggler" 
            onClick={handleToggleClick}
            aria-expanded={navbarExpanded}
            aria-label="Toggle navigation"
            aria-controls="navbar-collapse"
            disabled={disabled}
            type="button"
          >
            <span className="c-navbar__toggler-icon"></span>
          </button>
        )}
        
        <div 
          id="navbar-collapse"
          className={collapseClass}
          ref={collapseRef}
        >
          {children}
        </div>
      </div>
    </nav>
  );
}; 


export type { NavbarProps };

// Set display name for debugging
Navbar.displayName = 'Navbar';

// Default export (primary)
export default Navbar;

// Named export for compatibility
export { Navbar };