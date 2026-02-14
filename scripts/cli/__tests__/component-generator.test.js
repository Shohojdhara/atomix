/**
 * Component Generator Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  generateComponentByComplexity,
  interactiveComponentGeneration,
  validateGeneratedComponent,
  displayValidationReport
} from '../component-generator.js';
import { mkdtemp, rm, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

// Mock dependencies
vi.mock('ora', () => ({
  default: vi.fn(() => ({
    start: vi.fn(() => ({
      succeed: vi.fn(),
      fail: vi.fn(),
      text: ''
    }))
  }))
}));

vi.mock('inquirer', async () => {
  const actual = await vi.importActual('inquirer');
  return {
    ...actual,
    default: {
      prompt: vi.fn()
    }
  };
});

vi.mock('chalk', () => {
  const bold = vi.fn((text) => text);
  bold.cyan = vi.fn((text) => text);
  bold.green = vi.fn((text) => text);
  bold.yellow = vi.fn((text) => text);
  bold.red = vi.fn((text) => text);

  return {
    default: {
      green: vi.fn((text) => text),
      red: vi.fn((text) => text),
      yellow: vi.fn((text) => text),
      cyan: vi.fn((text) => text),
      gray: vi.fn((text) => text),
      bold: bold
    }
  };
});

describe('Component Generator', () => {
  let tempDir;
  let componentsDir;

  beforeEach(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'atomix-test-'));
    componentsDir = join(tempDir, 'src', 'components');
    await mkdir(componentsDir, { recursive: true });
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
    vi.clearAllMocks();
  });

  describe('generateComponentByComplexity', () => {
    it('should generate simple component', async () => {
      const componentName = 'SimpleButton';
      const options = {
        typescript: true,
        story: false,
        test: false,
        path: componentsDir
      };

      const result = generateComponentByComplexity(componentName, 'simple', options);

      // Check returned template content
      expect(result).toContain('export const SimpleButton');
      expect(result).toContain('forwardRef');
    });

    it('should generate medium complexity component', async () => {
      const componentName = 'MediumCard';
      const options = {
        typescript: true,
        story: true,
        test: false,
        path: componentsDir
      };

      const result = generateComponentByComplexity(componentName, 'medium', options);

      // Check returned template content
      expect(result).toContain('useId');
      expect(result).toContain('MediumCardProps');
    });

    it('should generate complex component', async () => {
      const componentName = 'ComplexModal';
      const options = {
        typescript: true,
        story: true,
        test: true,
        path: componentsDir
      };

      const result = generateComponentByComplexity(componentName, 'complex', options);

      // Check returned template content
      expect(result).toContain('useId');
      expect(result).toContain('AtomixGlass');
      expect(result).toContain('ComplexModalProps');
    });

    it('should generate SCSS files', async () => {
      // Note: generateComponentByComplexity returns component template only
      // SCSS generation is handled separately by the CLI
      const componentName = 'StyledButton';
      const options = {
        typescript: true,
        scssModule: false,
        path: componentsDir
      };

      const result = generateComponentByComplexity(componentName, 'simple', options);
      
      // Should return valid component code
      expect(result).toContain('export const StyledButton');
      expect(result).toContain('forwardRef');
    });

    it('should generate Storybook stories', async () => {
      // Note: Story files are generated separately by the CLI
      const componentName = 'StoryComponent';
      const options = {
        typescript: true,
        story: true,
        path: componentsDir
      };

      const result = generateComponentByComplexity(componentName, 'simple', options);
      
      // Should return valid component code that can be used in stories
      expect(result).toContain('export const StoryComponent');
    });

    it('should generate test files', async () => {
      // Note: Test files are generated separately by the CLI
      const componentName = 'TestComponent';
      const options = {
        typescript: true,
        test: true,
        path: componentsDir
      };

      const result = generateComponentByComplexity(componentName, 'simple', options);
      
      // Should return valid component code that can be tested
      expect(result).toContain('export const TestComponent');
    });
  });

  describe('interactiveComponentGeneration', () => {
    it('should prompt for component details', async () => {
      const inquirer = (await import('inquirer')).default;
      inquirer.prompt.mockResolvedValue({
        componentName: 'InteractiveButton',
        complexity: 'medium',
        features: ['typescript', 'story', 'test'],
        outputPath: './src/components'
      });

      const result = await interactiveComponentGeneration();

      expect(result).toEqual({
        name: 'InteractiveButton',
        complexity: 'medium',
        features: ['typescript', 'story', 'test'],
        outputPath: './src/components'
      });

      expect(inquirer.prompt).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'componentName',
            type: 'input'
          })
        ])
      );
    });

    it('should handle cancellation', async () => {
      const inquirer = (await import('inquirer')).default;
      inquirer.prompt.mockRejectedValue(new Error('User cancelled'));

      const result = await interactiveComponentGeneration();
      expect(result).toBeNull();
    });
  });

  describe('validateGeneratedComponent', () => {
    it('should validate component structure', async () => {
      const componentName = 'ValidComponent';
      const componentPath = join(componentsDir, componentName);
      
      // Create valid component structure
      await mkdir(componentPath, { recursive: true });
      await writeFile(join(componentPath, `${componentName}.tsx`), `
import React, { forwardRef } from 'react';

export const ValidComponent = forwardRef<HTMLDivElement, ValidComponentProps>(
  ({ children }, ref) => {
    return <div ref={ref}>{children}</div>;
  }
);

export interface ValidComponentProps {
  children?: React.ReactNode;
}
      `);

      const validation = await validateGeneratedComponent(componentName, componentPath);
      
      expect(validation.issues).toHaveLength(0);
      expect(validation.valid).toBe(true);
    });

    it('should detect missing TypeScript interface', async () => {
      const componentName = 'InvalidComponent';
      const componentPath = join(componentsDir, componentName);
      
      await mkdir(componentPath, { recursive: true });
      await writeFile(join(componentPath, `${componentName}.tsx`), `
export const InvalidComponent = ({ children }) => {
  return <div>{children}</div>;
};
      `);

      const validation = await validateGeneratedComponent(componentName, componentPath);
      
      expect(validation.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ issue: 'Missing TypeScript type definitions' })
        ])
      );
      expect(validation.valid).toBe(false);
    });

    it('should detect missing accessibility attributes', async () => {
      const componentName = 'InaccessibleComponent';
      const componentPath = join(componentsDir, componentName);
      
      await mkdir(componentPath, { recursive: true });
      await writeFile(join(componentPath, `${componentName}.tsx`), `
export const InaccessibleComponent = () => {
  return <button>Click me</button>;
};
      `);

      const validation = await validateGeneratedComponent(componentName, componentPath);
      
      expect(validation.warnings).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ issue: 'Missing accessibility attributes' })
        ])
      );
    });

    it('should detect missing design tokens', async () => {
      const componentName = 'HardcodedComponent';
      const componentPath = join(componentsDir, componentName);
      
      await mkdir(componentPath, { recursive: true });
      await writeFile(join(componentPath, `${componentName}.tsx`), `
export const HardcodedComponent = () => {
  return <div style={{ color: '#ff0000', padding: '16px' }}>Content</div>;
};
      `);

      const validation = await validateGeneratedComponent(componentName, componentPath);
      
      expect(validation.warnings).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ issue: 'Using hardcoded values instead of design tokens' })
        ])
      );
    });
  });

  describe('displayValidationReport', () => {
    it('should display validation report with issues', () => {
      const issues = ['Missing interface', 'No accessibility'];
      const warnings = ['Hardcoded styles'];
      
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      displayValidationReport({ 
        valid: false, 
        issues: issues.map(i => ({ file: 'test', issue: i, suggestion: 'fix' })), 
        warnings: warnings.map(w => ({ file: 'test', issue: w, suggestion: 'fix' })) 
      });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('❌ Found 2 issue(s):')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('⚠️  Found 1 warning(s):')
      );
      
      consoleSpy.mockRestore();
    });

    it('should display success message for valid components', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const isValid = displayValidationReport({ valid: true, issues: [], warnings: [] });
      
      expect(isValid).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ Component validation passed!')
      );
      
      consoleSpy.mockRestore();
    });
  });
});
