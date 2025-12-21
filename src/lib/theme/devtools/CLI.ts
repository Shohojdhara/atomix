/**
 * Theme CLI
 * 
 * Command-line interface for theme management
 */

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
      name: 'validate',
      description: 'Validate theme configuration',
      options: {
        '--config': 'Path to config file',
        '--strict': 'Enable strict validation',
      },
      handler: this.handleValidate.bind(this),
    });

    this.register({
      name: 'list',
      description: 'List all available themes',
      handler: this.handleList.bind(this),
    });

    this.register({
      name: 'inspect',
      description: 'Inspect a specific theme',
      options: {
        '--theme': 'Theme name to inspect',
        '--json': 'Output as JSON',
      },
      handler: this.handleInspect.bind(this),
    });

    this.register({
      name: 'compare',
      description: 'Compare two themes',
      options: {
        '--theme1': 'First theme name',
        '--theme2': 'Second theme name',
      },
      handler: this.handleCompare.bind(this),
    });

    this.register({
      name: 'export',
      description: 'Export theme to JSON',
      options: {
        '--theme': 'Theme name to export',
        '--output': 'Output file path',
      },
      handler: this.handleExport.bind(this),
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
   * Handle validate command
   */
  private handleValidate(args: string[], options: Record<string, any>): void {
    try {
      const config = loadThemeConfig();
      const result = validateConfig(config);

      if (result.valid) {
        console.log('✅ Theme configuration is valid');
        if (result.warnings.length > 0) {
          console.log('\n⚠️  Warnings:');
          result.warnings.forEach(warning => console.log(`  - ${warning}`));
        }
      } else {
        console.log('❌ Theme configuration is invalid');
        console.log('\nErrors:');
        result.errors.forEach(error => console.log(`  - ${error}`));

        if (result.warnings.length > 0) {
          console.log('\nWarnings:');
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
   * Handle list command
   */
  private handleList(args: string[], options: Record<string, any>): void {
    try {
      const config = loadThemeConfig();
      const themes = config.themes || {};
      
      console.log('Available Themes:\n');
      
      if (Object.keys(themes).length === 0) {
        console.log('No themes found in configuration.');
        return;
      }

      for (const [id, theme] of Object.entries(themes)) {
        console.log(`  ${id}`);
        console.log(`    Name: ${theme.name}`);
        if (theme.description) {
          console.log(`    Description: ${theme.description}`);
        }
        if (theme.version) {
          console.log(`    Version: ${theme.version}`);
        }
        if (theme.status) {
          console.log(`    Status: ${theme.status}`);
        }
        console.log();
      }
    } catch (error) {
      console.error('Failed to list themes:', error);
      process.exit(1);
    }
  }

  /**
   * Handle inspect command
   */
  private handleInspect(args: string[], options: Record<string, any>): void {
    const themeName = options.theme || args[0];
    
    if (!themeName) {
      console.error('Error: Theme name is required');
      console.error('Usage: atomix-theme inspect --theme <theme-name>');
      process.exit(1);
    }

    try {
      const config = loadThemeConfig();
      const theme = config.themes?.[themeName];

      if (!theme) {
        console.error(`Error: Theme "${themeName}" not found`);
        process.exit(1);
      }

      if (options.json) {
        console.log(JSON.stringify(theme, null, 2));
      } else {
        console.log(`Theme: ${themeName}\n`);
        console.log(JSON.stringify(theme, null, 2));
      }
    } catch (error) {
      console.error('Failed to inspect theme:', error);
      process.exit(1);
    }
  }

  /**
   * Handle compare command
   */
  private handleCompare(args: string[], options: Record<string, any>): void {
    const theme1 = options.theme1 || args[0];
    const theme2 = options.theme2 || args[1];

    if (!theme1 || !theme2) {
      console.error('Error: Two theme names are required');
      console.error('Usage: atomix-theme compare --theme1 <name1> --theme2 <name2>');
      process.exit(1);
    }

    try {
      const config = loadThemeConfig();
      const themeA = config.themes?.[theme1];
      const themeB = config.themes?.[theme2];

      if (!themeA) {
        console.error(`Error: Theme "${theme1}" not found`);
        process.exit(1);
      }

      if (!themeB) {
        console.error(`Error: Theme "${theme2}" not found`);
        process.exit(1);
      }

      console.log(`Comparing: ${theme1} vs ${theme2}\n`);
      console.log('Differences:');
      
      // Simple comparison (could be enhanced)
      const keys = new Set([...Object.keys(themeA), ...Object.keys(themeB)]);
      
      for (const key of keys) {
        const valueA = (themeA as any)[key];
        const valueB = (themeB as any)[key];
        
        if (JSON.stringify(valueA) !== JSON.stringify(valueB)) {
          console.log(`\n  ${key}:`);
          console.log(`    ${theme1}: ${JSON.stringify(valueA)}`);
          console.log(`    ${theme2}: ${JSON.stringify(valueB)}`);
        }
      }
    } catch (error) {
      console.error('Failed to compare themes:', error);
      process.exit(1);
    }
  }

  /**
   * Handle export command
   */
  private handleExport(args: string[], options: Record<string, any>): void {
    const themeName = options.theme || args[0];
    const outputPath = options.output || `${themeName}.json`;

    if (!themeName) {
      console.error('Error: Theme name is required');
      console.error('Usage: atomix-theme export --theme <theme-name> [--output <path>]');
      process.exit(1);
    }

    try {
      const config = loadThemeConfig();
      const theme = config.themes?.[themeName];

      if (!theme) {
        console.error(`Error: Theme "${themeName}" not found`);
        process.exit(1);
      }

      const fs = require('fs');
      fs.writeFileSync(outputPath, JSON.stringify(theme, null, 2));
      console.log(`✅ Theme exported to: ${outputPath}`);
    } catch (error) {
      console.error('Failed to export theme:', error);
      process.exit(1);
    }
  }

  /**
   * Handle help command
   */
  private handleHelp(args: string[], options: Record<string, any>): void {
    console.log('Atomix Theme CLI\n');
    console.log('Usage: atomix-theme <command> [options]\n');
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