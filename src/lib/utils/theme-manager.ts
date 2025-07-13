/*!
 * Shaj Theme Manager
 * Runtime theme switching and CSS variable management utility
 * Provides JavaScript API for theme management in both React and vanilla contexts
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface ThemeConfig {
  name: string;
  displayName: string;
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    neutral: Record<string, string>;
    background: string;
    surface: string;
    'surface-variant': string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  typography: {
    'font-family': string;
    'font-size-xs': string;
    'font-size-sm': string;
    'font-size-base': string;
    'font-size-lg': string;
    'font-size-xl': string;
    'font-size-2xl': string;
    'font-size-3xl': string;
  };
  spacing: Record<string, string>;
  'border-radius': Record<string, string>;
  shadows: Record<string, string>;
  animations: {
    duration: string;
    easing: string;
  };
  components?: Record<string, Record<string, string>>;
}

export interface ThemeManagerOptions {
  defaultTheme?: string;
  storageKey?: string;
  autoDetectSystemTheme?: boolean;
  enableTransitions?: boolean;
  transitionDuration?: number;
}

export interface ThemeChangeEvent {
  previousTheme: string | null;
  currentTheme: string;
  timestamp: number;
}

export type ThemeChangeCallback = (event: ThemeChangeEvent) => void;

// ============================================================================
// Theme Registry
// ============================================================================

class ThemeRegistry {
  private themes: Map<string, ThemeConfig> = new Map();
  private aliases: Map<string, string> = new Map();

  register(theme: ThemeConfig): void {
    this.themes.set(theme.name, theme);
  }

  unregister(themeName: string): boolean {
    return this.themes.delete(themeName);
  }

  get(themeName: string): ThemeConfig | undefined {
    const resolvedName = this.aliases.get(themeName) || themeName;
    return this.themes.get(resolvedName);
  }

  has(themeName: string): boolean {
    const resolvedName = this.aliases.get(themeName) || themeName;
    return this.themes.has(resolvedName);
  }

  list(): string[] {
    return Array.from(this.themes.keys());
  }

  listWithDisplayNames(): Array<{ name: string; displayName: string }> {
    return Array.from(this.themes.values()).map(theme => ({
      name: theme.name,
      displayName: theme.displayName,
    }));
  }

  addAlias(alias: string, themeName: string): void {
    if (this.themes.has(themeName)) {
      this.aliases.set(alias, themeName);
    } else {
      throw new Error(`Theme "${themeName}" does not exist`);
    }
  }

  removeAlias(alias: string): boolean {
    return this.aliases.delete(alias);
  }

  clear(): void {
    this.themes.clear();
    this.aliases.clear();
  }
}

// ============================================================================
// CSS Variable Manager
// ============================================================================

class CSSVariableManager {
  private prefix: string;

  constructor(prefix: string = '--shaj') {
    this.prefix = prefix;
  }

  setVariable(name: string, value: string, element?: HTMLElement): void {
    const target = element || document.documentElement;
    target.style.setProperty(`${this.prefix}-${name}`, value);
  }

  getVariable(name: string, element?: HTMLElement): string {
    const target = element || document.documentElement;
    return getComputedStyle(target).getPropertyValue(`${this.prefix}-${name}`).trim();
  }

  removeVariable(name: string, element?: HTMLElement): void {
    const target = element || document.documentElement;
    target.style.removeProperty(`${this.prefix}-${name}`);
  }

  setThemeVariables(theme: ThemeConfig, element?: HTMLElement): void {
    const target = element || document.documentElement;

    // Clear existing theme variables
    this.clearThemeVariables(target);

    // Set color variables
    this.setColorVariables(theme.colors, target);

    // Set typography variables
    this.setObjectVariables(theme.typography, target);

    // Set spacing variables
    this.setObjectVariables(theme.spacing, target, 'spacing');

    // Set border radius variables
    this.setObjectVariables(theme['border-radius'], target, 'border-radius');

    // Set shadow variables
    this.setObjectVariables(theme.shadows, target, 'shadow');

    // Set animation variables
    this.setObjectVariables(theme.animations, target, 'animation');

    // Set component variables if present
    if (theme.components) {
      this.setComponentVariables(theme.components, target);
    }
  }

  private setColorVariables(colors: ThemeConfig['colors'], element: HTMLElement): void {
    Object.entries(colors).forEach(([colorName, colorValue]) => {
      if (typeof colorValue === 'object') {
        // Color scale
        Object.entries(colorValue).forEach(([shade, color]) => {
          this.setVariable(`${colorName}-${shade}`, color, element);
        });
      } else {
        // Single color
        this.setVariable(colorName, colorValue, element);
      }
    });
  }

  private setObjectVariables(
    obj: Record<string, string>,
    element: HTMLElement,
    prefix?: string
  ): void {
    Object.entries(obj).forEach(([key, value]) => {
      const variableName = prefix ? `${prefix}-${key}` : key;
      this.setVariable(variableName, value, element);
    });
  }

  private setComponentVariables(
    components: Record<string, Record<string, string>>,
    element: HTMLElement
  ): void {
    Object.entries(components).forEach(([componentName, config]) => {
      Object.entries(config).forEach(([property, value]) => {
        this.setVariable(`${componentName}-${property}`, value, element);
      });
    });
  }

    private clearThemeVariables(element: HTMLElement): void {
    const style = element.style;
    const propertiesToRemove: string[] = [];
    
    for (let i = 0; i < style.length; i++) {
      const property = style[i];
      if (property && property.startsWith(this.prefix)) {
        propertiesToRemove.push(property);
      }
    }
    
    propertiesToRemove.forEach(property => {
      if (property) {
        style.removeProperty(property);
      }
    });
  }

  generateCSSVariablesString(theme: ThemeConfig): string {
    const variables: string[] = [];

    // Colors
    Object.entries(theme.colors).forEach(([colorName, colorValue]) => {
      if (typeof colorValue === 'object') {
        Object.entries(colorValue).forEach(([shade, color]) => {
          variables.push(`  ${this.prefix}-${colorName}-${shade}: ${color};`);
        });
      } else {
        variables.push(`  ${this.prefix}-${colorName}: ${colorValue};`);
      }
    });

    // Typography
    Object.entries(theme.typography).forEach(([key, value]) => {
      variables.push(`  ${this.prefix}-${key}: ${value};`);
    });

    // Spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      variables.push(`  ${this.prefix}-spacing-${key}: ${value};`);
    });

    // Border radius
    Object.entries(theme['border-radius']).forEach(([key, value]) => {
      variables.push(`  ${this.prefix}-border-radius-${key}: ${value};`);
    });

    // Shadows
    Object.entries(theme.shadows).forEach(([key, value]) => {
      variables.push(`  ${this.prefix}-shadow-${key}: ${value};`);
    });

    // Animations
    Object.entries(theme.animations).forEach(([key, value]) => {
      variables.push(`  ${this.prefix}-animation-${key}: ${value};`);
    });

    // Components
    if (theme.components) {
      Object.entries(theme.components).forEach(([componentName, config]) => {
        Object.entries(config).forEach(([property, value]) => {
          variables.push(`  ${this.prefix}-${componentName}-${property}: ${value};`);
        });
      });
    }

    return variables.join('\n');
  }
}

// ============================================================================
// Main Theme Manager
// ============================================================================

export class ThemeManager {
  private registry: ThemeRegistry;
  private cssManager: CSSVariableManager;
  private currentTheme: string | null = null;
  private options: Required<ThemeManagerOptions>;
  private callbacks: ThemeChangeCallback[] = [];
  private systemThemeQuery?: MediaQueryList;

  constructor(options: ThemeManagerOptions = {}) {
    this.registry = new ThemeRegistry();
    this.cssManager = new CSSVariableManager();
    this.options = {
      defaultTheme: 'shaj-default',
      storageKey: 'shaj-theme',
      autoDetectSystemTheme: true,
      enableTransitions: true,
      transitionDuration: 200,
      ...options,
    };

    this.initialize();
  }

  // ============================================================================
  // Initialization
  // ============================================================================

  private initialize(): void {
    // Set up system theme detection
    if (this.options.autoDetectSystemTheme) {
      this.setupSystemThemeDetection();
    }

    // Load theme from storage or use default
    this.loadThemeFromStorage();

    // Set up transitions if enabled
    if (this.options.enableTransitions) {
      this.setupTransitions();
    }
  }

  private setupSystemThemeDetection(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemThemeQuery.addEventListener('change', this.handleSystemThemeChange.bind(this));
    }
  }

  private handleSystemThemeChange(event: MediaQueryListEvent): void {
    if (this.currentTheme === 'auto') {
      const systemTheme = event.matches ? 'shaj-default-dark' : 'shaj-default';
      if (this.registry.has(systemTheme)) {
        this.applyThemeInternal(systemTheme);
      }
    }
  }

  private loadThemeFromStorage(): void {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem(this.options.storageKey);
      if (storedTheme && this.registry.has(storedTheme)) {
        this.setTheme(storedTheme);
      } else {
        this.setTheme(this.options.defaultTheme);
      }
    }
  }

  private setupTransitions(): void {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        * {
          transition: background-color ${this.options.transitionDuration}ms ease,
                      border-color ${this.options.transitionDuration}ms ease,
                      color ${this.options.transitionDuration}ms ease,
                      box-shadow ${this.options.transitionDuration}ms ease !important;
        }
      `;
      document.head.appendChild(style);

      // Remove transitions after theme change
      setTimeout(() => {
        document.head.removeChild(style);
      }, this.options.transitionDuration);
    }
  }

  // ============================================================================
  // Theme Management
  // ============================================================================

  registerTheme(theme: ThemeConfig): void {
    this.registry.register(theme);
  }

  unregisterTheme(themeName: string): boolean {
    return this.registry.unregister(themeName);
  }

  setTheme(themeName: string): boolean {
    if (!this.registry.has(themeName)) {
      console.warn(`Theme "${themeName}" is not registered`);
      return false;
    }

    const previousTheme = this.currentTheme;

    // Handle auto theme
    if (themeName === 'auto') {
      const systemIsDark = this.systemThemeQuery?.matches || false;
      const actualTheme = systemIsDark ? 'shaj-default-dark' : 'shaj-default';
      if (this.registry.has(actualTheme)) {
        this.applyThemeInternal(actualTheme);
      }
    } else {
      this.applyThemeInternal(themeName);
    }

    this.currentTheme = themeName;
    this.saveThemeToStorage(themeName);
    this.notifyThemeChange(previousTheme, themeName);

    return true;
  }

  private applyThemeInternal(themeName: string): void {
    const theme = this.registry.get(themeName);
    if (!theme) return;

    // Apply CSS variables
    this.cssManager.setThemeVariables(theme);

    // Set data attribute for CSS selectors
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', themeName);
    }
  }

  private saveThemeToStorage(themeName: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.options.storageKey, themeName);
    }
  }

  private notifyThemeChange(previousTheme: string | null, currentTheme: string): void {
    const event: ThemeChangeEvent = {
      previousTheme,
      currentTheme,
      timestamp: Date.now(),
    };

    this.callbacks.forEach(callback => {
      try {
        callback(event);
      } catch (error) {
        console.error('Error in theme change callback:', error);
      }
    });
  }

  // ============================================================================
  // Public API
  // ============================================================================

  getCurrentTheme(): string | null {
    return this.currentTheme;
  }

  getAvailableThemes(): string[] {
    return this.registry.list();
  }

  getAvailableThemesWithDisplayNames(): Array<{ name: string; displayName: string }> {
    return this.registry.listWithDisplayNames();
  }

  getThemeConfig(themeName: string): ThemeConfig | undefined {
    return this.registry.get(themeName);
  }

  hasTheme(themeName: string): boolean {
    return this.registry.has(themeName);
  }

  addThemeAlias(alias: string, themeName: string): void {
    this.registry.addAlias(alias, themeName);
  }

  removeThemeAlias(alias: string): boolean {
    return this.registry.removeAlias(alias);
  }

  onThemeChange(callback: ThemeChangeCallback): () => void {
    this.callbacks.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  getCSSVariable(name: string): string {
    return this.cssManager.getVariable(name);
  }

  setCSSVariable(name: string, value: string): void {
    this.cssManager.setVariable(name, value);
  }

  generateThemeCSS(themeName: string): string {
    const theme = this.registry.get(themeName);
    if (!theme) {
      throw new Error(`Theme "${themeName}" not found`);
    }

    return `:root {\n${this.cssManager.generateCSSVariablesString(theme)}\n}`;
  }

  // ============================================================================
  // Utility Methods
  // ============================================================================

  toggleTheme(lightTheme: string = 'shaj-default', darkTheme: string = 'shaj-default-dark'): void {
    const current = this.getCurrentTheme();
    const newTheme = current === lightTheme ? darkTheme : lightTheme;
    this.setTheme(newTheme);
  }

  resetToDefault(): void {
    this.setTheme(this.options.defaultTheme);
  }

  clearStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.options.storageKey);
    }
  }

  destroy(): void {
    // Clean up event listeners
    if (this.systemThemeQuery) {
      this.systemThemeQuery.removeEventListener('change', this.handleSystemThemeChange);
    }

    // Clear callbacks
    this.callbacks = [];

    // Clear registry
    this.registry.clear();
  }
}

// ============================================================================
// Default Theme Manager Instance
// ============================================================================

export const themeManager = new ThemeManager();

// ============================================================================
// Utility Functions
// ============================================================================

export function createThemeManager(options?: ThemeManagerOptions): ThemeManager {
  return new ThemeManager(options);
}

export function registerDefaultThemes(manager: ThemeManager = themeManager): void {
  // This would be populated with actual theme configurations
  // For now, we'll define the structure
  const defaultThemes: Partial<ThemeConfig>[] = [
    {
      name: 'shaj-default',
      displayName: 'Shaj Default 🔵',
    },
    {
      name: 'shaj-ocean',
      displayName: 'Shaj Ocean 🌊',
    },
    {
      name: 'shaj-sunset',
      displayName: 'Shaj Sunset 🌅',
    },
    {
      name: 'shaj-forest',
      displayName: 'Shaj Forest 🌲',
    },
    {
      name: 'shaj-midnight',
      displayName: 'Shaj Midnight 🌙',
    },
    {
      name: 'shaj-pastel',
      displayName: 'Shaj Pastel 🌸',
    },
  ];

  // Note: Full theme configurations would be injected here
  // This is just the structure for now
}

export function getThemeValue(variableName: string, fallback?: string): string {
  if (typeof window === 'undefined') return fallback || '';

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--shaj-${variableName}`)
    .trim();

  return value || fallback || '';
}

export function setThemeValue(variableName: string, value: string): void {
  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty(`--shaj-${variableName}`, value);
  }
}

// ============================================================================
// React Hook (if in React environment)
// ============================================================================

declare global {
  interface Window {
    React?: any;
  }
}

export function useTheme(manager: ThemeManager = themeManager) {
  if (typeof window !== 'undefined' && window.React) {
    const { useState, useEffect } = window.React;

    const [currentTheme, setCurrentTheme] = useState(manager.getCurrentTheme());

    useEffect(() => {
      const unsubscribe = manager.onThemeChange(event => {
        setCurrentTheme(event.currentTheme);
      });

      return unsubscribe;
    }, [manager]);

    return {
      currentTheme,
      setTheme: manager.setTheme.bind(manager),
      availableThemes: manager.getAvailableThemesWithDisplayNames(),
      toggleTheme: manager.toggleTheme.bind(manager),
    };
  }

  // Fallback for non-React environments
  return {
    currentTheme: manager.getCurrentTheme(),
    setTheme: manager.setTheme.bind(manager),
    availableThemes: manager.getAvailableThemesWithDisplayNames(),
    toggleTheme: manager.toggleTheme.bind(manager),
  };
}
