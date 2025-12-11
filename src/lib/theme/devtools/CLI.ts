/**
 * Theme CLI
 * 
 * Command-line interface for theme management
 */

import { generateConfigTemplate } from '../generators/ConfigGenerator';
import { generateCSS } from '../generators/CSSGenerator';
import { generateTypes } from '../generators/TypeGenerator';
import { loadThemeConfig } from '../config/loader';
import { validateConfig } from '../config/validator';

/**
 * CLI command interface
 */
export interface CLICommand {
  name: string;
  description: string;
  options?: Record<string, string>;
  handler: (args: string[], options: Record<string, any>) => Promise<void> | void;
}

/**
 * Theme CLI
 * 
 * Command-line interface for theme operations
 */
export class ThemeCLI {
  private commands: Map<string, CLICommand> = new Map();

  constructor() {
    this.registerDefaultCommands();
  }

  /**
   * Register default commands
   */
  private registerDefaultCommands(): void {
    this.register({
      name: 'init',
      description: 'Initialize theme configuration',
      options: {
        '--format': 'Output format (typescript, javascript, json)',
        '--examples': 'Include example themes',
      },
      handler: this.handleInit.bind(this),
    });

    this.register({
      name: 'validate',
      description: 'Validate theme configuration',
      handler: this.handleValidate.bind(this),
    });

    this.register({
      name: 'build',
      description: 'Build theme CSS files',
      options: {
        '--output': 'Output directory',
        '--minify': 'Minify output',
      },
      handler: this.handleBuild.bind(this),
    });

    this.register({
      name: 'types',
      description: 'Generate TypeScript types',
      options: {
        '--output': 'Output file',
        '--module': 'Module name',
      },
      handler: this.handleTypes.bind(this),
    });

    this.register({
      name: 'help',
      description: 'Show help information',
      handler: this.handleHelp.bind(this),
    });
  }

  /**
   * Register a command
   */
  register(command: CLICommand): void {
    this.commands.set(command.name, command);
  }

  /**
   * Run CLI with arguments
   */
  async run(args: string[]): Promise<void> {
    const [commandName, ...commandArgs] = args;

    if (!commandName) {
      this.handleHelp([], {});
      return;
    }

    const command = this.commands.get(commandName);
    if (!command) {
      console.error(`Unknown command: ${commandName}`);
      console.error('Run "atomix-theme help" for available commands');
      process.exit(1);
    }

    try {
      const { args: parsedArgs, options } = this.parseArgs(commandArgs);
      await command.handler(parsedArgs, options);
    } catch (error) {
      console.error(`Error running command "${commandName}":`, error);
      process.exit(1);
    }
  }

  /**
   * Parse command arguments
   */
  private parseArgs(args: string[]): { args: string[]; options: Record<string, any> } {
    const parsedArgs: string[] = [];
    const options: Record<string, any> = {};

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg?.startsWith('--')) {
        const key = arg.slice(2);
        const nextArg = args[i + 1];
        if (nextArg && !nextArg.startsWith('--')) {
          options[key] = nextArg;
          i++; // Skip next argument
        } else {
          options[key] = true;
        }
      } else if (arg) {
        parsedArgs.push(arg);
      }
    }

    return { args: parsedArgs, options };
  }

  /**
   * Handle init command
   */
  private handleInit(args: string[], options: Record<string, any>): void {
    const format = options.format || 'typescript';
    const includeExamples = options.examples !== false;

    const config = generateConfigTemplate({
      format: format as any,
      includeExamples,
      includeComments: true,
    });

    const filename = format === 'json' ? 'theme.config.json' : 
                    format === 'javascript' ? 'theme.config.js' : 
                    'theme.config.ts';

    console.log(`Generating ${filename}...`);
    console.log(config);
    console.log(`\\nTheme configuration template generated!`);
    console.log(`Save this content to ${filename} in your project root.`);
  }

  /**
   * Handle validate command
   */
  private handleValidate(args: string[], options: Record<string, any>): void {
    try {
      const config = loadThemeConfig();
      const result = validateConfig(config);

      if (result.valid) {
        console.log('✅ Theme configuration is valid');
        if (result.warnings.length > 0) {
          console.log('\\n⚠️  Warnings:');
          result.warnings.forEach(warning => console.log(`  - ${warning}`));
        }
      } else {
        console.log('❌ Theme configuration is invalid');
        console.log('\\nErrors:');
        result.errors.forEach(error => console.log(`  - ${error}`));
        
        if (result.warnings.length > 0) {
          console.log('\\nWarnings:');
          result.warnings.forEach(warning => console.log(`  - ${warning}`));
        }
        process.exit(1);
      }
    } catch (error) {
      console.error('Failed to load theme configuration:', error);
      process.exit(1);
    }
  }

  /**
   * Handle build command
   */
  private handleBuild(args: string[], options: Record<string, any>): void {
    console.log('Building themes...');
    console.log('Note: This is a placeholder. Implement actual build logic based on your needs.');
    
    try {
      const config = loadThemeConfig();
      console.log(`Found ${Object.keys(config.themes).length} themes to build`);
      
      // This would typically:
      // 1. Load each theme
      // 2. Generate CSS for CSS themes
      // 3. Execute createTheme for JS themes and generate CSS
      // 4. Write files to output directory
      
      console.log('✅ Build completed');
    } catch (error) {
      console.error('Build failed:', error);
      process.exit(1);
    }
  }

  /**
   * Handle types command
   */
  private handleTypes(args: string[], options: Record<string, any>): void {
    console.log('Generating TypeScript types...');
    console.log('Note: This is a placeholder. Implement actual type generation logic.');
    
    try {
      const config = loadThemeConfig();
      const moduleName = options.module || 'CustomTheme';
      
      // This would typically:
      // 1. Load themes
      // 2. Generate TypeScript definitions
      // 3. Write to output file
      
      console.log(`Generated types for module: ${moduleName}`);
      console.log('✅ Type generation completed');
    } catch (error) {
      console.error('Type generation failed:', error);
      process.exit(1);
    }
  }

  /**
   * Handle help command
   */
  private handleHelp(args: string[], options: Record<string, any>): void {
    console.log('Atomix Theme CLI\\n');
    console.log('Usage: atomix-theme <command> [options]\\n');
    console.log('Commands:');

    for (const [name, command] of this.commands.entries()) {
      console.log(`  ${name.padEnd(12)} ${command.description}`);
      
      if (command.options) {
        for (const [option, description] of Object.entries(command.options)) {
          console.log(`    ${option.padEnd(16)} ${description}`);
        }
      }
      console.log();
    }
  }
}

/**
 * Create CLI instance
 */
export function createCLI(): ThemeCLI {
  return new ThemeCLI();
}

/**
 * Run CLI with process arguments
 */
export function runCLI(): void {
  const cli = createCLI();
  const args = process.argv.slice(2);
  cli.run(args);
}