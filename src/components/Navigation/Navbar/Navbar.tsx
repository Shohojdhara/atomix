import React, { useState, useEffect, useRef, forwardRef, useContext, createContext, useMemo } from 'react';
import { NavbarProps } from '../../../lib/types/components';
import { useNavbar } from '../../../lib/composables/useNavbar';
import { NAVBAR } from '../../../lib/constants/components';
import { AtomixGlass } from '../../AtomixGlass/AtomixGlass';

// Context for Compound Components
interface NavbarContextValue {
  expanded: boolean;
  onToggle: (expanded: boolean) => void;
  collapsible: boolean;
  disabled: boolean;
  containerWidth?: string;
}

const NavbarContext = createContext<NavbarContextValue | null>(null);

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('Navbar compound components must be used within a Navbar');
  }
  return context;
};

// Subcomponents

// Navbar.Brand
export interface NavbarBrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: React.ElementType;
  href?: string;
}

export const NavbarBrand = forwardRef<HTMLElement, NavbarBrandProps>(
  ({ children, className = '', as: Component = 'a', href = '/', ...props }, ref) => {
    return (
      <Component
        href={href}
        className={`c-navbar__brand ${className}`.trim()}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
NavbarBrand.displayName = 'NavbarBrand';

// Navbar.Toggle
export interface NavbarToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const NavbarToggle = forwardRef<HTMLButtonElement, NavbarToggleProps>(
  ({ className = '', onClick, ...props }, ref) => {
    const { expanded, onToggle, disabled, collapsible } = useNavbarContext();

    if (!collapsible) return null;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (onClick) onClick(e);
      onToggle(!expanded);
    };

    return (
      <button
        ref={ref}
        className={`c-navbar__toggler ${className}`.trim()}
        onClick={handleClick}
        aria-expanded={expanded}
        aria-label="Toggle navigation"
        aria-controls="navbar-collapse"
        disabled={disabled}
        type="button"
        {...props}
      >
        <span className="c-navbar__toggler-icon"></span>
      </button>
    );
  }
);
NavbarToggle.displayName = 'NavbarToggle';

// Navbar.Collapse
export interface NavbarCollapseProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavbarCollapse = forwardRef<HTMLDivElement, NavbarCollapseProps>(
  ({ children, className = '', ...props }, ref) => {
    const { expanded } = useNavbarContext();
    const collapseClass = `c-navbar__collapse ${expanded ? 'is-expanded' : ''} ${className}`.trim();

    return (
      <div
        id="navbar-collapse"
        className={collapseClass}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavbarCollapse.displayName = 'NavbarCollapse';

// Navbar.Container
export interface NavbarContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
}

export const NavbarContainer = forwardRef<HTMLDivElement, NavbarContainerProps>(
  ({ children, className = '', width, style, ...props }, ref) => {
    const { containerWidth } = useNavbarContext();
    // Use width prop if provided, otherwise fallback to context (from Navbar prop)
    const finalWidth = width || containerWidth;

    const containerStyle = finalWidth ? { maxWidth: finalWidth, ...style } : style;

    return (
      <div
        ref={ref}
        className={`c-navbar__container ${className}`.trim()}
        style={containerStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NavbarContainer.displayName = 'NavbarContainer';


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
 *
 * @example
 * ```tsx
 * <Navbar position="fixed">
 *   <Navbar.Container>
 *     <Navbar.Brand>My App</Navbar.Brand>
 *     <Navbar.Toggle />
 *     <Navbar.Collapse>
 *       <Nav>...</Nav>
 *     </Navbar.Collapse>
 *   </Navbar.Container>
 * </Navbar>
 * ```
 */
const NavbarImpl = forwardRef<HTMLElement, NavbarProps>(
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
      style,
      disabled = false,
      backdrop = false,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      'aria-label': ariaLabel = 'Main navigation',
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

    // Handle toggler click (for legacy mode)
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

    // Context value
    const contextValue = useMemo(() => ({
      expanded: navbarExpanded,
      onToggle: (newState: boolean) => {
         if (typeof onToggle === 'function') {
           onToggle(newState);
         } else {
           setNavbarExpanded(newState);
         }
      },
      collapsible: !!collapsible,
      disabled: !!disabled,
      containerWidth,
    }), [navbarExpanded, onToggle, collapsible, disabled, containerWidth]);

    // Detect Compound Component usage
    const hasCompoundComponents = React.Children.toArray(children).some((child) =>
      React.isValidElement(child) &&
      ['NavbarBrand', 'NavbarToggle', 'NavbarCollapse', 'NavbarContainer'].includes((child.type as any).displayName)
    );

    let content;

    if (hasCompoundComponents) {
       content = (
          <NavbarContext.Provider value={contextValue}>
             {children}
          </NavbarContext.Provider>
       );
    } else {
      // Legacy mode
      const containerStyle = generateContainerStyle(containerWidth);
      const collapseClass = generateCollapseClass(navbarExpanded);

      content = (
        <NavbarContext.Provider value={contextValue}>
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
        </NavbarContext.Provider>
      );
    }

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
            zIndex: 1000,
          }}
        >
          <nav
            ref={ref}
            className={navbarClass + ' c-navbar--glass'}
            aria-label={ariaLabel}
            id={id}
            style={style}
          >
            {content}
          </nav>
        </AtomixGlass>
      );
    }

    return (
      <nav ref={ref} className={navbarClass} aria-label={ariaLabel} id={id} style={style}>
        {content}
      </nav>
    );
  }
);

// Attach Subcomponents
type NavbarComponent = React.ForwardRefExoticComponent<NavbarProps & React.RefAttributes<HTMLElement>> & {
  Brand: typeof NavbarBrand;
  Toggle: typeof NavbarToggle;
  Collapse: typeof NavbarCollapse;
  Container: typeof NavbarContainer;
};

const NavbarWithSubcomponents = NavbarImpl as unknown as NavbarComponent;
NavbarWithSubcomponents.Brand = NavbarBrand;
NavbarWithSubcomponents.Toggle = NavbarToggle;
NavbarWithSubcomponents.Collapse = NavbarCollapse;
NavbarWithSubcomponents.Container = NavbarContainer;

export const Navbar = NavbarWithSubcomponents;

export type { NavbarProps };

Navbar.displayName = 'Navbar';

export default Navbar;
