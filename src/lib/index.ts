// Import and re-export as namespaces with proper typing
import * as composablesImport from './composables';
import * as utilsImport from './utils';
import * as typesImport from './types';
import * as constantsImport from './constants';
import * as themeImport from './theme';

// Export as namespaces with explicit typing
export const composables: typeof composablesImport = composablesImport;
export const utils: typeof utilsImport = utilsImport;
export const types: typeof typesImport = typesImport;
export const constants: typeof constantsImport = constantsImport;
export const theme: typeof themeImport = themeImport;

// NEW: Export individual modules for direct imports
// Selectively export to avoid conflicts between modules

// Export non-conflicting items
export * from './constants';
export * from './constants/cssVariables';
export * from './types';
export * from './types/partProps';
export * from './utils';
export * from './utils/componentUtils';
export * from './patterns';
export * from './hooks';

// Selectively export from composables (avoiding conflicting items)
export * from './composables/useAccordion';
export * from './composables/useBadge';
export * from './composables/useHero';
export * from './composables/useRiver';
export * from './composables/useSpinner';
export * from './composables/useNavbar';
export * from './composables/useSideMenu';
export * from './composables/useEdgePanel';
export * from './composables/useTodo';
export * from './composables/useForm';
export * from './composables/useFormGroup';
export * from './composables/useAtomixGlass';
export * from './composables/useInput';
export * from './composables/useRadio';
export * from './composables/useSelect';
export * from './composables/useTextarea';
export * from './composables/useResponsiveGlass';
export * from './composables/useResponsiveGlass.presets';
export * from './composables/useChartData';
export * from './composables/useChartScale';
export * from './composables/useChartInteraction';
export * from './composables/useLineChart';
export * from './composables/useBarChart';
export * from './composables/usePieChart';
export * from './composables/useBlock';

// Skip usePerformanceMonitor from composables to avoid conflict with theme version

// Selectively export from theme (including the conflicting items)
export * from './theme';

// Selectively export from config (excluding ValidationResult to avoid conflict)
export { validateConfiguration, printConfigReport, loadConfig, validateConfig, loadAtomixConfig, resolveConfigPath } from './config';
export { defineConfig, type AtomixConfig, type ThemeTokens, type ThemeDefinition, 
         type CSSThemeDefinition, type JSThemeDefinition, type ColorScale, 
         type PaletteColorOptions, type InteractiveEffectsConfig, 
         type OptimizationConfig, type VisualPolishConfig, type BuildConfig, 
         type RuntimeConfig, type IntegrationConfig, type PluginConfig, 
         type TokenProviderConfig, type TokenEngineConfig, type GeneratorConfig, 
         type DesignTokenCategory, type DesignTokenValue } from './config';

// Explicitly re-export ValidationResult from config to avoid conflict with theme
export type { ValidationResult } from './config/validator';
// But we keep the theme's PerformanceMetrics and usePerformanceMonitor to resolve conflicts