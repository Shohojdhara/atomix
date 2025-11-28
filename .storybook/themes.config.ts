import { themesConfig } from '../src/themes/themes.config';

export interface ThemeConfig {
  name: string;
  class: string;
  color: string;
}

// Generate themes from the shared configuration
const configThemes: ThemeConfig[] = Object.entries(themesConfig.metadata).map(([key, value]: [string, any]) => ({
  name: value.name,
  class: key,
  color: value.color || '#808080', // Fallback color
}));

// Main theme list - single source of truth
export const themes: ThemeConfig[] = [
  { name: 'Atomix', class: 'atomix', color: '#000000' },
  ...configThemes,
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
