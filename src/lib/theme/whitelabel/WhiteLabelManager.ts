/**
 * White Label Manager
 * 
 * Provides white labeling capabilities for themes
 */

import type { Theme, ThemeOptions } from '../types';
import { createTheme } from '../createTheme';
import { extendTheme } from '../composeTheme';

/**
 * Brand configuration
 */
export interface BrandConfig {
  /** Brand name */
  name: string;
  /** Brand logo URL */
  logo?: string;
  /** Primary brand color */
  primaryColor?: string;
  /** Secondary brand color */
  secondaryColor?: string;
  /** Brand fonts */
  fonts?: {
    primary?: string;
    secondary?: string;
  };
  /** Brand favicon */
  favicon?: string;
  /** Custom CSS */
  customCSS?: string;
  /** Custom meta tags */
  metaTags?: Record<string, string>;
}

/**
 * White label configuration
 */
export interface WhiteLabelConfig {
  /** Brand configuration */
  brand: BrandConfig;
  /** Theme overrides */
  themeOverrides?: Partial<ThemeOptions>;
  /** Component overrides */
  componentOverrides?: Record<string, any>;
  /** CSS variable overrides */
  cssVariableOverrides?: Record<string, string>;
  /** Enable DOM mutations (default: false for headless/server safety) */
  enableDOMOperations?: boolean;
}

/**
 * White Label Manager
 * 
 * Manages white labeling for themes
 */
export class WhiteLabelManager {
  private config: WhiteLabelConfig | null = null;
  private baseTheme: Theme | null = null;

  constructor(baseTheme?: Theme) {
    if (baseTheme) {
      this.baseTheme = baseTheme;
    }
  }

  /**
   * Set base theme
   */
  setBaseTheme(theme: Theme): void {
    this.baseTheme = theme;
  }

  /**
   * Configure white label
   */
  configure(config: WhiteLabelConfig): void {
    this.config = config;
    this.applyWhiteLabel();
  }

  /**
   * Get white labeled theme
   */
  getWhiteLabeledTheme(): Theme | null {
    if (!this.baseTheme || !this.config) {
      return this.baseTheme;
    }

    // Create theme with white label overrides
    const themeOptions: ThemeOptions = {
      ...this.baseTheme,
      name: this.config.brand.name,
      ...this.config.themeOverrides,
      palette: {
        ...this.baseTheme.palette,
        ...(this.config.brand.primaryColor && {
          primary: {
            ...this.baseTheme.palette.primary,
            main: this.config.brand.primaryColor,
          },
        }),
        ...(this.config.brand.secondaryColor && {
          secondary: {
            ...this.baseTheme.palette.secondary,
            main: this.config.brand.secondaryColor,
          },
        }),
        ...this.config.themeOverrides?.palette,
      },
      typography: {
        ...this.baseTheme.typography,
        ...(this.config.brand.fonts?.primary && {
          fontFamily: this.config.brand.fonts.primary,
        }),
        ...this.config.themeOverrides?.typography,
      },
      custom: {
        ...this.baseTheme.custom,
        whiteLabel: {
          brand: this.config.brand,
          componentOverrides: this.config.componentOverrides,
          cssVariableOverrides: this.config.cssVariableOverrides,
        },
      },
    };

    return createTheme(themeOptions);
  }

  /**
   * Apply white label to DOM
   */
  private applyWhiteLabel(): void {
    if (!this.config?.enableDOMOperations || typeof document === 'undefined') {
      return;
    }

    const { brand } = this.config;

    // Apply logo
    if (brand.logo) {
      this.applyLogo(brand.logo);
    }

    // Apply favicon
    if (brand.favicon) {
      this.applyFavicon(brand.favicon);
    }

    // Apply meta tags
    if (brand.metaTags) {
      this.applyMetaTags(brand.metaTags);
    }

    // Apply custom CSS
    if (brand.customCSS) {
      this.applyCustomCSS(brand.customCSS);
    }

    // Apply CSS variable overrides
    if (this.config.cssVariableOverrides) {
      this.applyCSSVariables(this.config.cssVariableOverrides);
    }
  }

  /**
   * Apply logo
   */
  applyLogo(logoUrl: string, selector?: string, element?: HTMLElement): void {
    if (!this.config?.enableDOMOperations || typeof document === 'undefined') {
      return;
    }

    // Find or create logo element
    let logoElement = element || (selector ? document.querySelector(selector) : null) as HTMLImageElement | null;
    
    if (!logoElement) {
      logoElement = document.querySelector('[data-whitelabel-logo]') as HTMLImageElement;
    }
    
    if (!logoElement) {
      logoElement = document.createElement('img');
      logoElement.setAttribute('data-whitelabel-logo', 'true');
      logoElement.style.maxHeight = '40px';
      logoElement.style.maxWidth = '200px';
      
      // Try to find a container (e.g., header, navbar)
      const container = selector 
        ? document.querySelector(selector)
        : document.querySelector('header, [role="banner"], .navbar, .header');
      
      if (container) {
        container.insertBefore(logoElement, container.firstChild);
      } else {
        document.body.insertBefore(logoElement, document.body.firstChild);
      }
    }

    (logoElement as HTMLImageElement).src = logoUrl;
    (logoElement as HTMLImageElement).alt = this.config?.brand.name || 'Logo';
  }

  /**
   * Apply favicon
   */
  applyFavicon(faviconUrl: string, selector?: string): void {
    if (!this.config?.enableDOMOperations || typeof document === 'undefined') {
      return;
    }

    // Remove existing favicons
    const existingFavicons = document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
    existingFavicons.forEach(favicon => favicon.remove());

    // Create new favicon link
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = faviconUrl;
    
    const target = selector ? document.querySelector(selector) : document.head;
    if (target) {
      target.appendChild(link);
    }
  }

  /**
   * Apply meta tags
   */
  applyMetaTags(metaTags: Record<string, string>, selector?: string): void {
    if (!this.config?.enableDOMOperations || typeof document === 'undefined') {
      return;
    }

    const target = selector ? document.querySelector(selector) : document.head;
    if (!target) {
      return;
    }

    for (const [name, content] of Object.entries(metaTags)) {
      // Check if meta tag exists
      let metaElement = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      
      if (!metaElement) {
        metaElement = document.createElement('meta');
        metaElement.name = name;
        target.appendChild(metaElement);
      }

      metaElement.content = content;
    }
  }

  /**
   * Apply custom CSS
   */
  applyCustomCSS(css: string, styleId?: string): void {
    if (!this.config?.enableDOMOperations || typeof document === 'undefined') {
      return;
    }

    const id = styleId || 'whitelabel-custom-css';
    
    // Remove existing white label CSS
    const existingStyle = document.getElementById(id);
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new style element
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  }

  /**
   * Apply CSS variables
   */
  applyCSSVariables(variables: Record<string, string>, root?: HTMLElement | string): void {
    if (!this.config?.enableDOMOperations || typeof document === 'undefined') {
      return;
    }

    let targetElement: HTMLElement;
    
    if (typeof root === 'string') {
      const element = document.querySelector(root);
      if (!element || !(element instanceof HTMLElement)) {
        return;
      }
      targetElement = element;
    } else if (root instanceof HTMLElement) {
      targetElement = root;
    } else {
      targetElement = document.documentElement;
    }

    for (const [key, value] of Object.entries(variables)) {
      targetElement.style.setProperty(key.startsWith('--') ? key : `--${key}`, value);
    }
  }

  /**
   * Remove white label
   */
  removeWhiteLabel(): void {
    // Remove logo
    const logo = document.querySelector('[data-whitelabel-logo]');
    logo?.remove();

    // Remove custom CSS
    const customCSS = document.getElementById('whitelabel-custom-css');
    customCSS?.remove();

    // Remove CSS variables (would need to track original values)
    if (this.config?.cssVariableOverrides) {
      const root = document.documentElement;
      for (const key of Object.keys(this.config.cssVariableOverrides)) {
        root.style.removeProperty(key.startsWith('--') ? key : `--${key}`);
      }
    }

    this.config = null;
  }

  /**
   * Get current configuration
   */
  getConfig(): WhiteLabelConfig | null {
    return this.config;
  }

  /**
   * Export configuration
   */
  exportConfig(): string {
    if (!this.config) {
      throw new Error('No white label configuration to export');
    }

    return JSON.stringify(this.config, null, 2);
  }

  /**
   * Import configuration
   */
  importConfig(json: string): void {
    try {
      const config = JSON.parse(json) as WhiteLabelConfig;
      this.configure(config);
    } catch (error) {
      throw new Error(`Failed to import white label configuration: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

/**
 * Create white label manager
 */
export function createWhiteLabelManager(baseTheme?: Theme): WhiteLabelManager {
  return new WhiteLabelManager(baseTheme);
}
