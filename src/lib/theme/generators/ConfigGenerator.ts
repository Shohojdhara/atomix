/**
 * Configuration Generator
 * 
 * Generates theme configuration templates and scaffolding
 */

import type { ThemeConfig, ThemeDefinition } from '../config/types';

/**
 * Config generation options
 */
export interface ConfigGeneratorOptions {
  /** Include example themes */
  includeExamples?: boolean;
  /** Include comments and documentation */
  includeComments?: boolean;
  /** Output format */
  format?: 'typescript' | 'javascript' | 'json';
  /** Include build configuration */
  includeBuild?: boolean;
  /** Include runtime configuration */
  includeRuntime?: boolean;
}

/**
 * Configuration Generator
 * 
 * Generates theme configuration files and templates
 */
export class ConfigGenerator {
  private options: Required<ConfigGeneratorOptions>;

  constructor(options: ConfigGeneratorOptions = {}) {
    this.options = {
      includeExamples: options.includeExamples ?? true,
      includeComments: options.includeComments ?? true,
      format: options.format || 'typescript',
      includeBuild: options.includeBuild ?? true,
      includeRuntime: options.includeRuntime ?? true,
    };
  }

  /**
   * Generate configuration template
   */
  generate(): string {
    let output = '';

    if (this.options.includeComments) {
      output += this.generateHeader();
    }

    if (this.options.format === 'typescript') {
      output += this.generateTypeScriptImports();
    }

    output += this.generateConfigObject();

    if (this.options.format === 'typescript') {
      output += this.generateTypeScriptExport();
    }

    return output;
  }

  /**
   * Generate file header
   */
  private generateHeader(): string {
    const comment = this.options.format === 'json' ? '' : '//';
    return `${this.options.format === 'json' ? '' : '/**\n * Atomix Theme Configuration\n * \n * Configure themes, build settings, and runtime behavior\n */\n\n'}`;
  }

  /**
   * Generate TypeScript imports
   */
  private generateTypeScriptImports(): string {
    return `import type { ThemeConfig } from '@shohojdhara/atomix/theme/config';
import { createTheme } from '@shohojdhara/atomix/theme';

`;
  }

  /**
   * Generate configuration object
   */
  private generateConfigObject(): string {
    const isTS = this.options.format === 'typescript';
    const isJSON = this.options.format === 'json';
    
    let output = '';
    
    if (isTS) {
      output += 'const config: ThemeConfig = {\n';
    } else if (!isJSON) {
      output += 'const config = {\n';
    } else {
      output += '{\n';
    }

    // Themes
    output += '  themes: {\n';
    
    if (this.options.includeExamples) {
      output += this.generateExampleThemes();
    } else {
      if (this.options.includeComments && !isJSON) {
        output += '    // Add your themes here\n';
      }
    }
    
    output += '  },\n\n';

    // Build configuration
    if (this.options.includeBuild) {
      output += this.generateBuildConfig();
    }

    // Runtime configuration
    if (this.options.includeRuntime) {
      output += this.generateRuntimeConfig();
    }

    // Integration configuration
    output += this.generateIntegrationConfig();

    output += '};\n\n';

    return output;
  }

  /**
   * Generate example themes
   */
  private generateExampleThemes(): string {
    const isJSON = this.options.format === 'json';
    let output = '';

    if (this.options.includeComments && !isJSON) {
      output += '    // CSS Theme Example\n';
    }

    output += `    'my-theme': {
      type: 'css',
      name: 'My Theme',
      description: 'A custom theme for my application',
      author: 'Your Name',
      version: '1.0.0',
      tags: ['custom', 'light'],
      supportsDarkMode: true,
      status: 'stable',
      color: '#7AFFD7',
    },\n\n`;

    if (this.options.includeComments && !isJSON) {
      output += '    // JS Theme Example\n';
    }

    if (this.options.format === 'typescript') {
      output += `    'my-js-theme': {
      type: 'js',
      name: 'My JS Theme',
      description: 'A programmatically created theme',
      author: 'Your Name',
      version: '1.0.0',
      tags: ['custom', 'js'],
      status: 'experimental',
      createTheme: () => createTheme({
        name: 'My JS Theme',
        palette: {
          primary: { main: '#7AFFD7' },
          secondary: { main: '#FF5733' },
        },
        typography: {
          fontFamily: 'Inter, sans-serif',
        },
      }),
    },\n\n`;
    }

    return output;
  }

  /**
   * Generate build configuration
   */
  private generateBuildConfig(): string {
    const isJSON = this.options.format === 'json';
    let output = '';

    if (this.options.includeComments && !isJSON) {
      output += '  // Build configuration\n';
    }

    output += `  build: {
    output: {
      directory: 'themes',
      formats: {
        expanded: '.css',
        compressed: '.min.css',
      },
    },
    sass: {
      style: 'expanded',
      sourceMap: true,
      loadPaths: ['src'],
    },
  },

`;

    return output;
  }

  /**
   * Generate runtime configuration
   */
  private generateRuntimeConfig(): string {
    const isJSON = this.options.format === 'json';
    let output = '';

    if (this.options.includeComments && !isJSON) {
      output += '  // Runtime configuration\n';
    }

    output += `  runtime: {
    basePath: '/themes',
    cdnPath: null,
    preload: ['my-theme'],
    lazy: true,
    defaultTheme: 'my-theme',
    storageKey: 'atomix-theme',
    dataAttribute: 'data-theme',
    enablePersistence: true,
    useMinified: process.env.NODE_ENV === 'production',
  },

`;

    return output;
  }

  /**
   * Generate integration configuration
   */
  private generateIntegrationConfig(): string {
    const isJSON = this.options.format === 'json';
    let output = '';

    if (this.options.includeComments && !isJSON) {
      output += '  // Integration configuration\n';
    }

    output += `  integration: {
    cssVariables: {
      colorMode: '--color-mode',
    },
    classNames: {
      theme: 'data-theme',
      colorMode: 'data-color-mode',
    },
  },

`;

    return output;
  }

  /**
   * Generate TypeScript export
   */
  private generateTypeScriptExport(): string {
    return `export default config;
`;
  }
}

/**
 * Generate configuration template
 * 
 * @param options - Generation options
 * @returns Configuration template string
 */
export function generateConfigTemplate(options: ConfigGeneratorOptions = {}): string {
  const generator = new ConfigGenerator(options);
  return generator.generate();
}