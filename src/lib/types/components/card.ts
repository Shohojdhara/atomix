import type { CardParts } from '../partProps';
import { Size, ThemeColor, BaseComponentProps } from './common';
import React, { ReactNode } from 'react';
import type { CardCSSVariable } from '../../constants/cssVariables';
import { AtomixGlassProps } from './atomixGlass';
import type { SlotProps } from '../../patterns/slots';


/**
 * Card component props
 */
export interface CardProps extends BaseComponentProps {
  /**
   * Card header content
   */
  header?: ReactNode;

  /**
   * Card image source URL
   */
  image?: string;

  /**
   * Alternative text for the image
   */
  imageAlt?: string;

  /**
   * Card title
   */
  title?: ReactNode;

  /**
   * Card text content
   */
  text?: ReactNode;

  /**
   * Card actions (buttons, links, etc.)
   */
  actions?: ReactNode;

  /**
   * Card icon
   */
  icon?: ReactNode;

  /**
   * Card footer content
   */
  footer?: ReactNode;

  /**
   * Size variant of the card
   */
  size?: Size;

  /**
   * Color variant of the card
   */
  variant?: ThemeColor;

  /**
   * Appearance style of the card
   */
  appearance?: 'filled' | 'outlined' | 'ghost' | 'elevated';

  /**
   * Elevation level (shadow depth)
   */
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Enable hover effects (adds hover elevation and transition)
   */
  hoverable?: boolean;

  /**
   * Elevation level on hover (only applies when hoverable is true)
   */
  hoverElevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Row layout (horizontal card)
   */
  row?: boolean;

  /**
   * Flat style (no padding on image container)
   */
  flat?: boolean;

  /**
   * Active state
   */
  active?: boolean;

  /**
   * Disabled state - prevents interactions and shows visual feedback
   */
  disabled?: boolean;

  /**
   * Loading state - shows loading indicator
   */
  loading?: boolean;

  /**
   * Selected state - indicates card is selected
   */
  selected?: boolean;

  /**
   * Interactive state - makes card clickable with proper ARIA attributes
   */
  interactive?: boolean;

  /**
   * Applies a glass morphism effect to the card.
   * Can be a boolean to enable with default settings, or an object with `AtomixGlassProps` to customize the effect.
   */
  glass?: boolean | Omit<AtomixGlassProps, 'children'>;

  /**
   * Link URL - when provided, card renders as an anchor element
   */
  href?: string;

  /**
   * Link target attribute
   */
  target?: '_blank' | '_self' | '_parent' | '_top';

  /**
   * Card content (body)
   */
  children?: ReactNode;

  /**
   * Card styles
   */
  style?: React.CSSProperties;

  /**
   * Card className
   */
  className?: string;

  /**
   * Optional click handler
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;

  /**
   * Optional hover handler
   */
  onHover?: (event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;

  /**
   * Optional focus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLDivElement | HTMLAnchorElement>) => void;

  /**
   * ARIA role for the card
   */
  role?: 'article' | 'button' | 'link' | 'region';

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;

  /**
   * ARIA described by reference
   */
  'aria-describedby'?: string;

  /**
   * Tab index for keyboard navigation
   */
  tabIndex?: number;

  /**
   * CSS variable overrides
   * Runtime CSS custom property overrides
   * @example
   * cssVars={{
   *   '--atomix-card-bg': 'rgba(255, 255, 255, 0.1)',
   *   '--atomix-card-border-radius': '24px'
   * }}
   */
  cssVars?: Partial<Record<CardCSSVariable, string | number>>;

  /**
   * Part-based styling
   * Allows styling individual card parts
   */
  parts?: CardParts;

  /**
   * Slot-based customization
   * Complete control over rendering
   */
  slots?: {
    root?: (props: SlotProps) => ReactNode;
    header?: (props: SlotProps) => ReactNode;
    body?: (props: SlotProps) => ReactNode;
    footer?: (props: SlotProps) => ReactNode;
  };
}


/**
 * Elevation Card component props
 */
export interface ElevationCardProps extends CardProps {
  /**
   * CSS class for elevation effect
   */
  elevationClass?: string;
}


/**
 * Card hook options
 */
export interface UseCardOptions {
  /**
   * Enable elevation effect on hover
   */
  elevationEffect?: boolean;

  /**
   * CSS class for elevation effect
   */
  elevationClass?: string;

  /**
   * Enable flip effect
   */
  flipEffect?: boolean;

  /**
   * Trigger for flip effect: 'click' or 'hover'
   */
  flipTrigger?: 'click' | 'hover';

  /**
   * Make card focusable and add focus effect
   */
  focusEffect?: boolean;

  /**
   * Make card clickable
   */
  clickable?: boolean;

  /**
   * Click handler for clickable card
   */
  onClick?: (event: React.MouseEvent) => void;
}


/**
 * Card hook return value
 */
export interface UseCardReturn {
  /**
   * Reference to the card element
   */
  cardRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Reference to the front side of a flip card
   */
  frontRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Reference to the back side of a flip card
   */
  backRef: React.RefObject<HTMLDivElement | null>;

  /**
   * Whether the card is flipped
   */
  isFlipped: boolean;

  /**
   * Whether the card is elevated
   */
  isElevated: boolean;

  /**
   * Whether the card is focused
   */
  isFocused: boolean;

  /**
   * Whether the card is hovered
   */
  isHovered: boolean;

  /**
   * Click event handler
   */
  handleClick: (event: React.MouseEvent) => void;

  /**
   * Keyboard event handler
   */
  handleKeyDown: (event: React.KeyboardEvent) => void;

  /**
   * Mouse enter event handler
   */
  handleMouseEnter: () => void;

  /**
   * Mouse leave event handler
   */
  handleMouseLeave: () => void;

  /**
   * Focus event handler
   */
  handleFocus: () => void;

  /**
   * Blur event handler
   */
  handleBlur: () => void;

  /**
   * Get all card props combined
   */
  getCardProps: () => {
    className: string;
    ref: React.RefObject<HTMLDivElement | null>;
    tabIndex?: number;
    role?: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onClick: (event: React.MouseEvent) => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
  };
}
