import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { execSync } from 'child_process';
import { existsSync, mkdirSync, rmSync, readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLI_PATH = join(__dirname, '../../atomix-cli.js');
const TEST_DIR = join(__dirname, 'test-output');

describe('Atomix CLI Commands', () => {
  beforeEach(() => {
    // Create test directory
    if (!existsSync(TEST_DIR)) {
      mkdirSync(TEST_DIR, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test directory
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  describe('atomix --help', () => {
    it('should display help information', () => {
      const output = execSync(`node ${CLI_PATH} --help`).toString();
      expect(output).toContain('Atomix Design System CLI');
      expect(output).toContain('Commands:');
      expect(output).toContain('build-theme');
      expect(output).toContain('generate');
      expect(output).toContain('validate');
    });
  });

  describe('atomix --version', () => {
    it('should display version number', () => {
      const output = execSync(`node ${CLI_PATH} --version`).toString();
      expect(output).toMatch(/\d+\.\d+\.\d+/);
    });
  });

  describe('atomix generate component', () => {
    const componentPath = join(TEST_DIR, 'TestComponent');

    it('should create component files with valid name', () => {
      execSync(`node ${CLI_PATH} generate component TestButton --path ${TEST_DIR}`, {
        cwd: process.cwd()
      });

      const buttonPath = join(TEST_DIR, 'TestButton');
      
      // Check if files are created
      expect(existsSync(join(buttonPath, 'TestButton.tsx'))).toBe(true);
      expect(existsSync(join(buttonPath, 'index.ts'))).toBe(true);
      expect(existsSync(join(buttonPath, '_testbutton.scss'))).toBe(true);
      expect(existsSync(join(buttonPath, 'TestButton.stories.tsx'))).toBe(true);
      
      // Check component content
      const componentContent = readFileSync(join(buttonPath, 'TestButton.tsx'), 'utf8');
      expect(componentContent).toContain('export const TestButton');
      expect(componentContent).toContain('TestButtonProps');
      expect(componentContent).toContain('forwardRef');
    });

    it('should reject invalid component names', () => {
      expect(() => {
        execSync(`node ${CLI_PATH} generate component test-button --path ${TEST_DIR}`, {
          cwd: process.cwd()
        });
      }).toThrow();
    });

    it('should create test file when --test flag is used', () => {
      execSync(`node ${CLI_PATH} generate component TestCard --test --path ${TEST_DIR}`, {
        cwd: process.cwd()
      });

      const cardPath = join(TEST_DIR, 'TestCard');
      expect(existsSync(join(cardPath, 'TestCard.test.tsx'))).toBe(true);
      
      const testContent = readFileSync(join(cardPath, 'TestCard.test.tsx'), 'utf8');
      expect(testContent).toContain('describe(\'TestCard\'');
      expect(testContent).toContain('vitest');
    });
  });

  describe('atomix generate token', () => {
    it('should generate color tokens', () => {
      const settingsPath = join(TEST_DIR, 'src/styles/01-settings');
      mkdirSync(settingsPath, { recursive: true });
      
      execSync(`node ${CLI_PATH} generate token colors`, {
        cwd: TEST_DIR
      });

      const tokenFile = join(settingsPath, '_settings.colors.custom.scss');
      expect(existsSync(tokenFile)).toBe(true);
      
      const content = readFileSync(tokenFile, 'utf8');
      expect(content).toContain('Custom Color Tokens');
      expect(content).toContain('$custom-primary-6');
      expect(content).toContain('$custom-success');
    });

    it('should reject invalid token categories', () => {
      expect(() => {
        execSync(`node ${CLI_PATH} generate token invalid-category`, {
          cwd: TEST_DIR
        });
      }).toThrow();
    });
  });

  describe('atomix validate', () => {
    it('should validate tokens when --tokens flag is used', () => {
      // This is a mock test - in real implementation, you'd set up token files
      const output = execSync(`node ${CLI_PATH} validate --tokens`, {
        cwd: process.cwd()
      }).toString();
      
      // Should complete without throwing
      expect(output).toBeDefined();
    });
  });

  describe('atomix doctor', () => {
    it('should run diagnostics successfully', () => {
      const output = execSync(`node ${CLI_PATH} doctor`).toString();
      expect(output).toContain('Atomix Doctor Report');
      expect(output).toContain('Node.js Version');
      expect(output).toContain('Atomix Installation');
    });
  });

  describe('atomix theme create', () => {
    it('should create CSS theme with valid name', () => {
      const themesPath = join(TEST_DIR, 'themes');
      mkdirSync(themesPath, { recursive: true });
      
      execSync(`node ${CLI_PATH} theme create test-theme --output ${themesPath}`, {
        cwd: process.cwd()
      });

      const themePath = join(themesPath, 'test-theme');
      expect(existsSync(join(themePath, 'index.scss'))).toBe(true);
      expect(existsSync(join(themePath, 'README.md'))).toBe(true);
      
      const themeContent = readFileSync(join(themePath, 'index.scss'), 'utf8');
      expect(themeContent).toContain('data-theme="test-theme"');
      expect(themeContent).toContain('--atomix-color-primary');
    });

    it('should create JavaScript theme when --type js is used', () => {
      const themesPath = join(TEST_DIR, 'themes');
      mkdirSync(themesPath, { recursive: true });
      
      execSync(`node ${CLI_PATH} theme create js-theme --type js --output ${themesPath}`, {
        cwd: process.cwd()
      });

      const themePath = join(themesPath, 'js-theme');
      expect(existsSync(join(themePath, 'index.ts'))).toBe(true);
      
      const themeContent = readFileSync(join(themePath, 'index.ts'), 'utf8');
      expect(themeContent).toContain('jsTheme');
      expect(themeContent).toContain('createTheme');
    });

    it('should reject invalid theme names', () => {
      expect(() => {
        execSync(`node ${CLI_PATH} theme create InvalidTheme --output ${TEST_DIR}`, {
          cwd: process.cwd()
        });
      }).toThrow();
    });
  });
});

describe('Security Validation', () => {
  it('should reject build-theme paths outside project', () => {
    expect(() => {
      execSync(`node ${CLI_PATH} build-theme ../../etc/passwd`, {
        cwd: process.cwd()
      });
    }).toThrow();
  });
  
  it('should reject migrate source paths outside project', () => {
    expect(() => {
      execSync(`node ${CLI_PATH} migrate tailwind --source ../../etc`, {
        cwd: process.cwd()
      });
    }).toThrow();
  });
});
describe('CLI Error Handling', () => {
  it('should show suggestions for invalid commands', () => {
    try {
      execSync(`node ${CLI_PATH} invalidcommand`);
    } catch (error) {
      const output = error.stdout?.toString() || error.stderr?.toString();
      expect(output).toContain('unknown command');
    }
  });

  it('should handle missing required arguments', () => {
    expect(() => {
      execSync(`node ${CLI_PATH} generate`);
    }).toThrow();
  });

  it('should respect --debug flag', () => {
    const output = execSync(`node ${CLI_PATH} generate component DebugFlag --path ${TEST_DIR} --debug`).toString();
    expect(output).toContain('[DEBUG] Generating component');
  });
});
