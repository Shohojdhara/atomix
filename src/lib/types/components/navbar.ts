import React, { ReactNode } from 'react';
import { AtomixGlassProps } from './atomixGlass';
import { ThemeColor, BaseComponentProps } from './common';


/**
 * Navbar position options
 */
export type NavbarPosition = 'static' | 'fixed' | 'fixed-bottom';


/**
 * Nav item alignment options
 */
export type NavAlignment = 'start' | 'center' | 'end';


/**
 * Nav variant options
 */
export type NavVariant = 'default' | 'float-top-center' | 'float-bottom-center';


/**
 * Navbar component properties
 */
export interface NavbarProps extends BaseComponentProps {
  /**
   * Brand/logo component or text
   */
  brand?: ReactNode;

  /**
   * Navbar navigation items
   */
  children?: ReactNode;

  /**
   * Optional variant/color scheme
   */
  variant?: ThemeColor;

  /**
   * Navbar position
   */
  position?: NavbarPosition;

  /**
   * Container max width (default is from settings)
   */
  containerWidth?: string;

  /**
   * Whether to collapse navbar on mobile
   */
  collapsible?: boolean;

  /**
   * Whether navbar is expanded (for controlled component)
   */
  expanded?: boolean;

  /**
   * Callback when expansion state changes
   */
  onToggle?: (expanded: boolean) => void;

  /**
   * Whether to show backdrop when expanded on mobile
   */
  backdrop?: boolean;

  /**
   * Whether to close navbar when clicking outside
   */
  closeOnOutsideClick?: boolean;

  /**
   * Whether to close navbar on escape key press
   */
  closeOnEscape?: boolean;

  /**
   * Custom aria-label for the navigation
   */
  'aria-label'?: string;

  /**
   * ID for the navbar (used for accessibility)
   */
  id?: string;

  /**
   * Enable glass morphism effect.
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;
}


/**
 * Nav component properties
 */
export interface NavProps extends BaseComponentProps {
  /**
   * Navigation items
   */
  children: ReactNode;

  /**
   * Alignment of nav items
   */
  alignment?: NavAlignment;

  /**
   * Nav variant (including float variants)
   */
  variant?: NavVariant;

  /**
   * Enable glass morphism effect.
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;
}


/**
 * Nav item properties
 */
export interface NavItemProps extends BaseComponentProps {
  /**
   * Item content
   */
  children: ReactNode;

  /**
   * Whether this item has a dropdown
   */
  dropdown?: boolean;

  /**
   * Whether this item has a mega menu
   */
  megaMenu?: boolean;

  /**
   * Whether this item is active
   */
  active?: boolean;

  /**
   * Optional href for link items
   */
  href?: string;

  /**
   * Optional click handler
   */
  onClick?: () => void;

  /**
   * Whether dropdown/mega menu is expanded
   */
  'aria-expanded'?: boolean;

  /**
   * Optional custom link component
   */
  LinkComponent?: React.ElementType;
}


/**
 * Nav dropdown properties
 */
export interface NavDropdownProps extends BaseComponentProps {
  /**
   * Dropdown title/trigger content
   */
  title: ReactNode;

  /**
   * Dropdown menu items
   */
  children: ReactNode;

  /**
   * Dropdown alignment
   */
  alignment?: 'start' | 'center' | 'end';

  /**
   * Whether it's a mega menu (full width)
   */
  megaMenu?: boolean;
}


/**
 * Menu component properties
 */
export interface MenuProps extends BaseComponentProps {
  /**
   * Menu content
   */
  children: ReactNode;
}


/**
 * Menu item properties
 */
export interface MenuItemProps extends BaseComponentProps {
  /**
   * Item content
   */
  children: ReactNode;

  /**
   * Item href
   */
  href?: string;

  /**
   * Item icon
   */
  icon?: ReactNode;

  /**
   * Whether item is active
   */
  active?: boolean;

  /**
   * Item click handler
   */
  onClick?: () => void;
}


/**
 * MegaMenu component properties
 */
export interface MegaMenuProps extends BaseComponentProps {
  /**
   * MegaMenu content
   */
  children: ReactNode;
}


/**
 * MegaMenu column properties
 */
export interface MegaMenuColumnProps extends BaseComponentProps {
  /**
   * Column title
   */
  title?: ReactNode;

  /**
   * Column icon
   */
  icon?: ReactNode;

  /**
   * Column content
   */
  children: ReactNode;

  /**
   * Column width (auto by default)
   */
  width?: 'auto' | number;
}


/**
 * MegaMenu link properties
 */
export interface MegaMenuLinkProps extends BaseComponentProps {
  /**
   * Link href
   */
  href: string;

  /**
   * Link content
   */
  children: ReactNode;

  /**
   * Link click handler
   */
  onClick?: () => void;
}


/**
 * SideMenu component properties
 */
export interface SideMenuProps extends BaseComponentProps {
  /**
   * Menu title displayed at the top
   */
  title?: ReactNode;

  /**
   * Menu content (typically SideMenuList components)
   */
  children: ReactNode;

  /**
   * Whether the menu is open (for controlled component)
   */
  isOpen?: boolean;

  /**
   * Callback when menu open state changes
   */
  onToggle?: (isOpen: boolean) => void;

  /**
   * Whether the menu is collapsible on mobile
   */
  collapsible?: boolean;

  /**
   * Whether the menu can be collapsed on desktop (vertical collapse)
   * When true, adds a toggle button and supports collapsed/expanded states on desktop
   */
  collapsibleDesktop?: boolean;

  /**
   * Whether the menu starts collapsed on desktop (only applies when collapsibleDesktop is true)
   */
  defaultCollapsedDesktop?: boolean;

  /**
   * Custom toggle icon
   */
  toggleIcon?: ReactNode;

  /**
   * ID for the menu (used for accessibility)
   */
  id?: string;

  /**
   * Glass morphism effect for the side menu
   * Can be a boolean to enable with default settings, or an object with AtomixGlassProps to customize the effect
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;

  /**
   * Optional custom link component (e.g., Next.js Link, React Router Link)
   * Will be passed to all SideMenuItem components
   *
   * @example
   * ```tsx
   * // Next.js
   * import Link from 'next/link';
   * <SideMenu LinkComponent={Link} />
   *
   * // React Router
   * import { Link } from 'react-router-dom';
   * <SideMenu LinkComponent={Link} />
   * ```
   */
  LinkComponent?: React.ElementType;

  /**
   * Menu items
   */
  menuItems?: Array<{
    title?: ReactNode;
    toggleIcon?: ReactNode;
    items?: Array<{
      title?: ReactNode;
      icon?: ReactNode | undefined;
      href?: string | undefined;
      onClick?: (event: React.MouseEvent) => void | undefined;
      active?: boolean | undefined;
      disabled?: boolean | undefined;
      as?:
      | React.ComponentType<{
        href?: string;
        to?: string;
        children: React.ReactNode;
        className?: string;
        onClick?: (event: React.MouseEvent) => void;
        target?: string;
        rel?: string;
      }>
      | undefined;
    }>;
  }>;
}


/**
 * SideMenuList component properties
 */
export interface SideMenuListProps extends BaseComponentProps {
  /**
   * List items (typically SideMenuItem components)
   */
  children: ReactNode;
}


/**
 * SideMenuItem component properties
 */
export interface SideMenuItemProps extends BaseComponentProps {
  /**
   * Item content
   */
  children: ReactNode;

  /**
   * Item href (renders as link)
   */
  href?: string;

  /**
   * Item click handler (renders as button if no href)
   */
  onClick?: (event: React.MouseEvent) => void;

  /**
   * Whether this item is active/current
   */
  active?: boolean;

  /**
   * Optional icon for the item
   */
  icon?: ReactNode;

  /**
   * Link target attribute
   */
  target?: string;

  /**
   * Link rel attribute
   */
  rel?: string;

  /**
   * Optional custom link component (e.g., Next.js Link, React Router Link)
   * If not provided, will use LinkComponent from parent SideMenu context
   *
   * @example
   * ```tsx
   * // Next.js
   * import Link from 'next/link';
   * <SideMenuItem href="/about" LinkComponent={Link}>About</SideMenuItem>
   *
   * // React Router
   * import { Link } from 'react-router-dom';
   * <SideMenuItem href="/about" LinkComponent={Link}>About</SideMenuItem>
   * ```
   */
  LinkComponent?: React.ElementType;
}
