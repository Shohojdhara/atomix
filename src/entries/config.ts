/**
 * Config Entry Point
 *
 * Provides external access to Atomix configuration utilities.
 * This entry point is used by the `./config` package export.
 *
 * @example
 * ```typescript
 * // In external project:
 * import { defineConfig } from '@shohojdhara/atomix/config';
 *
 * export default defineConfig({
 *   prefix: 'myapp',
 *   theme: {
 *     extend: {
 *       colors: {
 *         primary: { main: '#7AFFD7' },
 *       },
 *     },
 *   },
 * });
 * ```
 */

export { defineConfig } from '../lib/config/index';
export type {
  AtomixConfig,
  ThemeTokens,
  ColorScale,
  PaletteColorOptions,
  ThemeDefinition,
  CSSThemeDefinition,
  JSThemeDefinition,
  BuildConfig,
  RuntimeConfig,
  IntegrationConfig,
  PluginConfig,
  TokenProviderConfig,
  TokenEngineConfig,
  GeneratorConfig,
} from '../lib/config/index';
