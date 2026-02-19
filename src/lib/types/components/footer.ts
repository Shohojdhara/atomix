import React, { ReactNode } from 'react';
import { Size, ThemeColor, BaseComponentProps } from './common';


// ============================================================================
// FOOTER COMPONENT TYPES
// ============================================================================

/**
 * Footer layout options
 */
export type FooterLayout =
  | 'columns'
  | 'centered'
  | 'minimal'
  | 'stacked'
  | 'flexible'
  | 'sidebar'
  | 'wide';


/**
 * Social media platform types
 */
export type SocialPlatform =
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'github'
  | 'discord'
  | 'tiktok'
  | 'pinterest'
  | 'snapchat'
  | 'whatsapp'
  | 'telegram'
  | 'reddit'
  | 'twitch'
  | 'spotify'
  | 'dribbble'
  | 'behance'
  | 'medium'
  | 'dev'
  | 'codepen'
  | 'custom';


/**
 * Social link configuration
 */
export interface SocialLink {
  /**
   * Social media platform
   */
  platform: SocialPlatform;

  /**
   * URL to the social media profile
   */
  url: string;

  /**
   * Custom icon (for custom platform or override)
   */
  icon?: ReactNode;

  /**
   * Custom label for accessibility
   */
  label?: string;
}


/**
 * Footer component properties
 */
export interface FooterProps extends BaseComponentProps {
  /**
   * Brand name or logo
   */
  brand?: ReactNode;

  /**
   * Brand logo (image URL or React element)
   */
  brandLogo?: string | ReactNode;

  /**
   * Brand description text
   */
  brandDescription?: ReactNode;

  /**
   * Copyright text
   */
  copyright?: ReactNode;

  /**
   * Footer layout variant
   */
  layout?: FooterLayout;

  /**
   * Color variant
   */
  variant?: ThemeColor;

  /**
   * Size variant
   */
  size?: Size;

  /**
   * Whether to show newsletter signup
   */
  showNewsletter?: boolean;

  /**
   * Newsletter section title
   */
  newsletterTitle?: string;

  /**
   * Newsletter section description
   */
  newsletterDescription?: string;

  /**
   * Newsletter input placeholder
   */
  newsletterPlaceholder?: string;

  /**
   * Newsletter submit button text
   */
  newsletterButtonText?: string;

  /**
   * Newsletter submit handler
   */
  onNewsletterSubmit?: (email: string) => void | Promise<void>;

  /**
   * Social media links
   */
  socialLinks?: SocialLink[];

  /**
   * Whether to show back to top button
   */
  showBackToTop?: boolean;

  /**
   * Back to top button text
   */
  backToTopText?: string;

  /**
   * Back to top click handler
   */
  onBackToTop?: () => void;

  /**
   * Whether to show divider above bottom section
   */
  showDivider?: boolean;

  /**
   * Whether footer should be sticky
   */
  sticky?: boolean;

  /**
   * Footer sections content
   */
  children?: ReactNode;

  /**
   * Whether footer should be glass
   */
  glass?: boolean;
}


/**
 * Footer section component properties
 */
export interface FooterSectionProps extends BaseComponentProps {
  /**
   * Section title
   */
  title?: ReactNode;

  /**
   * Section icon
   */
  icon?: ReactNode;

  /**
   * Whether section is collapsible on mobile
   */
  collapsible?: boolean;

  /**
   * Whether section is collapsed by default
   */
  defaultCollapsed?: boolean;

  /**
   * Whether newsletter is shown in the footer
   */
  showNewsletter?: boolean;

  /**
   * Section content
   */
  children: ReactNode;
}


/**
 * Footer link component properties
 */
export interface FooterLinkProps extends BaseComponentProps {
  /**
   * Link URL
   */
  href?: string;

  /**
   * Link icon
   */
  icon?: ReactNode;

  /**
   * Whether link opens in new tab
   */
  external?: boolean;

  /**
   * Whether link is active
   */
  active?: boolean;

  /**
   * Link click handler
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;

  /**
   * Link content
   */
  children: ReactNode;

  /**
   * Custom link component (e.g., React Router Link)
   */
  LinkComponent?: React.ElementType;
}


/**
 * Footer social link component properties
 */
export interface FooterSocialLinkProps extends BaseComponentProps {
  /**
   * Social media platform
   */
  platform: SocialPlatform;

  /**
   * Social media profile URL
   */
  url: string;

  /**
   * Custom icon
   */
  icon?: ReactNode;

  /**
   * Custom label for accessibility
   */
  label?: string;

  /**
   * Size variant
   */
  size?: Size;

  /**
   * Visual variant
   */
  variant?: 'default' | 'filled' | 'outlined';
}
