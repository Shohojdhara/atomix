import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { NavbarProps } from '../../../lib/types/components';
import { useNavbar } from '../../../lib/composables/useNavbar';
import { NAVBAR } from '../../../lib/constants/components';
import { AtomixGlass } from '../../AtomixGlass/AtomixGlass';

/**
 * Navbar component provides a responsive navigation header with brand, navigation items,
 * and collapsible mobile menu functionality.
 *
 * @example
 * ```tsx
 * <Navbar brand="My App" position="fixed" collapsible>
 *   <Nav>
 *     <NavItem href="/">Home</NavItem>
 *     <NavItem href="/about">About</NavItem>
 *   </Nav>
 * </Navbar>
 * ```
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      brand,
      children,
      variant,
      position = 'static',
      containerWidth,
      collapsible = true,
      expanded,
      onToggle,
      className = '',
      disabled = false,
      backdrop = false,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      ariaLabel = 'Main navigation',
      id,
      glass,
    },
    ref
  ) => {
    const { generateNavbarClass, generateContainerStyle, generateCollapseClass } = useNavbar({
      position,
      collapsible,
      expanded,
      onToggle,
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
      position,
      variant,
      collapsible,
      className,
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

    const navbarContent = (
      <div className="c-navbar__container" style={containerStyle}>
        {brand &&
          (typeof brand === 'string' ? (
            <a href="/" className="c-navbar__brand">
              {brand}
            </a>
          ) : (
            <div className="c-navbar__brand">{brand}</div>
          ))}

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

        <div id="navbar-collapse" className={collapseClass} ref={collapseRef}>
          {children}
        </div>
      </div>
    );

    if (glass) {
      const defaultGlassProps = {
        displacementScale: 30,
        blurAmount: 2,
        cornerRadius: 0,
        elasticity: 0,
        mode: 'shader' as const,
        shaderVariant: 'premiumGlass' as const,
      };
      const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };
      return (
        <AtomixGlass
          {...glassProps}
          style={{
            ...(position === 'fixed' && { position: 'fixed' }),
            left: 0,
            right: 0,
            top: 0,
          }}
        >
          <nav
            ref={ref}
            className={navbarClass + ' c-navbar--glass'}
            aria-label={ariaLabel}
            id={id}
          >
            {navbarContent}
          </nav>
        </AtomixGlass>
      );
    }

    return (
      <nav ref={ref} className={navbarClass} aria-label={ariaLabel} id={id}>
        {navbarContent}
      </nav>
    );
  }
);

export type { NavbarProps };

Navbar.displayName = 'Navbar';

export default Navbar;
