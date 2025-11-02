/**
 * Shared Storybook Theme Configuration
 * 
 * This file provides a single source of truth for theme lists used across
 * Storybook preview and addon components to avoid duplication and drift.
 */

export interface ThemeConfig {
  name: string;
  class: string;
  color: string;
}

// Main theme list - single source of truth
export const themes: ThemeConfig[] = [
  { name: 'Atomix', class: 'atomix', color: '#000000' },
  { name: 'Shaj Default', class: 'shaj-default', color: '#3b82f6' },
  { name: 'BoomDevs', class: 'boomdevs', color: '#8b5cf6' },
  { name: 'Esrar', class: 'esrar', color: '#10b981' },
  { name: 'Mashroom', class: 'mashroom', color: '#f59e0b' },
  { name: 'Applemix', class: 'applemix', color: '#f5f5f5' },
  { name: 'None', class: 'none', color: '#ef4444' },
];

// Named themes only (excluding utility themes like 'none')
export const namedThemes: ThemeConfig[] = themes.filter(
  theme => !['atomix', 'none'].includes(theme.class)
);

// Helper to get theme by class name
export const getThemeByClass = (className: string): ThemeConfig | undefined => {
  return themes.find(theme => theme.class === className);
};

// Helper to get all theme class names
export const getThemeClasses = (): string[] => {
  return themes.map(theme => theme.class);
};
