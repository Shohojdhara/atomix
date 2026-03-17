/**
 * Token Provider & Validator Tests
 * Tests for Phase 1: Enhanced Design Token Integration
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { 
  TokenProvider, 
  TOKEN_FORMATS, 
  TOKEN_CATEGORIES,
  tokenProvider 
} from '../internal/tokens/token-provider.js';
import { 
  TokenValidator, 
  VALIDATION_RULES, 
  SEVERITY,
  tokenValidator 
} from '../internal/tokens/token-validator.js';

describe('TokenProvider', () => {
  let provider;

  beforeEach(() => {
    provider = new TokenProvider();
  });

  describe('Initialization', () => {
    it('should create a new TokenProvider instance', () => {
      expect(provider).toBeInstanceOf(TokenProvider);
    });

    it('should have default options', () => {
      expect(provider.tokenPath).toBe('./design-tokens');
      expect(provider.format).toBe(TOKEN_FORMATS.JSON);
      expect(provider.tokens).toEqual({});
    });

    it('should accept custom options', () => {
      const customProvider = new TokenProvider({
        tokenPath: './custom-tokens',
        format: TOKEN_FORMATS.CSS
      });
      
      expect(customProvider.tokenPath).toBe('./custom-tokens');
      expect(customProvider.format).toBe(TOKEN_FORMATS.CSS);
    });
  });

  describe('Token Loading', () => {
    it('should throw error when file not found', async () => {
      await expect(provider.loadTokens('./non-existent.json'))
        .rejects
        .toThrow('Token file not found');
    });

    it('should categorize tokens correctly', () => {
      const categorizeToken = provider.categorizeToken.bind(provider);
      
      expect(categorizeToken('color-primary')).toBe(TOKEN_CATEGORIES.COLOR);
      expect(categorizeToken('space-sm')).toBe(TOKEN_CATEGORIES.SPACING);
      expect(categorizeToken('font-size-lg')).toBe(TOKEN_CATEGORIES.TYPOGRAPHY);
      expect(categorizeToken('shadow-md')).toBe(TOKEN_CATEGORIES.SHADOW);
      expect(categorizeToken('radius-lg')).toBe(TOKEN_CATEGORIES.RADIUS);
      expect(categorizeToken('duration-fast')).toBe(TOKEN_CATEGORIES.ANIMATION);
    });

    it('should infer token types from values', () => {
      const inferTokenType = provider.inferTokenType.bind(provider);
      
      expect(inferTokenType('#ff0000')).toBe('color');
      expect(inferTokenType('rgb(255, 0, 0)')).toBe('color');
      expect(inferTokenType('hsl(0, 100%, 50%)')).toBe('color');
      expect(inferTokenType('16px')).toBe('dimension');
      expect(inferTokenType('1rem')).toBe('dimension');
      expect(inferTokenType('300ms')).toBe('duration');
      expect(inferTokenType('0.5s')).toBe('duration');
      expect(inferTokenType(42)).toBe('number');
    });
  });

  describe('Token Merging', () => {
    it('should merge multiple token sets', () => {
      const existing = {
        color: { primary: { value: '#000' } },
        spacing: { sm: { value: '8px' } }
      };
      
      const newTokens = {
        color: { secondary: { value: '#fff' } },
        typography: { base: { value: '16px' } }
      };
      
      const merged = provider.mergeTokens(existing, newTokens);
      
      expect(merged.color.primary).toBeDefined();
      expect(merged.color.secondary).toBeDefined();
      expect(merged.spacing.sm).toBeDefined();
      expect(merged.typography.base).toBeDefined();
    });
  });

  describe('Token Export', () => {
    beforeEach(() => {
      provider.tokens = {
        color: {
          primary: { value: '#007bff', type: 'color' },
          secondary: { value: '#6c757d', type: 'color' }
        },
        spacing: {
          sm: { value: '8px', type: 'dimension' },
          lg: { value: '16px', type: 'dimension' }
        }
      };
    });

    it('should export to JSON format', () => {
      const json = provider.exportTokens(TOKEN_FORMATS.JSON, { pretty: false });
      const parsed = JSON.parse(json);
      
      expect(parsed.color.primary.value).toBe('#007bff');
      expect(parsed.spacing.lg.value).toBe('16px');
    });

    it('should export to CSS custom properties', () => {
      const css = provider.exportTokens(TOKEN_FORMATS.CSS, { 
        selector: ':root',
        prefix: 'atomix'
      });
      
      expect(css).toContain(':root {');
      expect(css).toContain('--atomix-color-primary: #007bff;');
      expect(css).toContain('--atomix-spacing-lg: 16px;');
    });

    it('should export to W3C DTCG format', () => {
      const dtcg = provider.exportTokens(TOKEN_FORMATS.W3C_DTCG);
      
      expect(dtcg.$schema).toBe('https://design-tokens.org/schema.json');
      expect(dtcg.tokens.color.primary.value).toBe('#007bff');
    });
  });
});

describe('TokenValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new TokenValidator();
  });

  describe('Initialization', () => {
    it('should create a new TokenValidator instance', () => {
      expect(validator).toBeInstanceOf(TokenValidator);
    });

    it('should register all built-in rules', () => {
      expect(validator.rules.size).toBeGreaterThan(0);
      expect(validator.rules.has('COLOR_CONTRAST')).toBe(true);
      expect(validator.rules.has('SEMANTIC_NAMING')).toBe(true);
      expect(validator.rules.has('NO_HARDCODED_COLORS')).toBe(true);
    });

    it('should have all rules enabled by default', () => {
      expect(validator.enabledRules.length).toBeGreaterThan(0);
    });
  });

  describe('Validation Rules', () => {
    it('should validate color contrast', () => {
      const tokens = {
        color: {
          text: { value: '#999999' },
          background: { value: '#ffffff' }
        }
      };
      
      const result = validator.validate(tokens);
      
      // Low contrast should be flagged
      const contrastIssue = result.issues.find(i => i.rule === 'color-contrast');
      expect(contrastIssue).toBeDefined();
      expect(contrastIssue.severity).toBe(SEVERITY.ERROR);
    });

    it('should detect semantic naming issues', () => {
      const tokens = {
        color: {
          blue: { value: '#0000ff' },
          red: { value: '#ff0000' }
        }
      };
      
      const result = validator.validate(tokens);
      
      const namingIssue = result.issues.find(i => i.rule === 'semantic-naming');
      expect(namingIssue).toBeDefined();
      expect(namingIssue.severity).toBe(SEVERITY.WARNING);
    });

    it('should pass semantic naming for brand colors', () => {
      const tokens = {
        color: {
          brandBlue: { value: '#0000ff' },
          primaryRed: { value: '#ff0000' }
        }
      };
      
      const result = validator.validate(tokens);
      
      // Filter out token-completeness warnings which are expected
      const namingIssue = result.issues.find(i => i.rule === 'semantic-naming');
      // Should not flag brand colors or primary/secondary prefixed colors
      expect(namingIssue).toBeUndefined();
    });

    it('should detect hardcoded colors in code', () => {
      const codeContent = `
        const styles = {
          color: '#ff0000',
          backgroundColor: 'rgb(0, 123, 255)',
          borderColor: 'hsl(120, 100%, 50%)'
        };
      `;
      
      const result = validator.validate({}, { codeContent });
      
      const hardcodedIssue = result.issues.find(i => i.rule === 'no-hardcoded-colors');
      expect(hardcodedIssue).toBeDefined();
      expect(hardcodedIssue.matches).toHaveLength(3);
    });

    it('should validate token completeness', () => {
      const tokens = {
        color: { primary: { value: '#000' } }
        // Missing spacing and typography
      };
      
      const result = validator.validate(tokens);
      
      const completenessIssues = result.issues.filter(i => i.rule === 'token-completeness');
      expect(completenessIssues.length).toBeGreaterThan(0);
    });

    it('should detect duplicate tokens', () => {
      const tokens = {
        color: {
          primary: { value: '#007bff' },
          main: { value: '#007bff' }
        },
        spacing: {
          sm: { value: '8px' },
          small: { value: '8px' }
        }
      };
      
      const result = validator.validate(tokens);
      
      const duplicateIssues = result.issues.filter(i => i.rule === 'duplicate-detection');
      expect(duplicateIssues.length).toBeGreaterThan(0);
    });
  });

  describe('Rule Management', () => {
    it('should toggle rules on/off', () => {
      const initialCount = validator.enabledRules.length;
      
      validator.toggleRule('COLOR_CONTRAST', false);
      expect(validator.enabledRules).not.toContain('COLOR_CONTRAST');
      
      validator.toggleRule('COLOR_CONTRAST', true);
      expect(validator.enabledRules).toContain('COLOR_CONTRAST');
    });

    it('should allow registering custom rules', () => {
      const customRule = {
        name: 'custom-rule',
        description: 'Custom validation rule',
        severity: SEVERITY.INFO,
        validate: (tokens) => []
      };
      
      validator.registerRule('CUSTOM_RULE', customRule);
      
      expect(validator.rules.has('CUSTOM_RULE')).toBe(true);
    });

    it('should reject invalid rules', () => {
      expect(() => {
        validator.registerRule('INVALID', { name: 'test' });
      }).toThrow('must have name, validate, and severity');
    });
  });

  describe('Validation Report', () => {
    it('should generate formatted report', () => {
      const tokens = {
        color: {
          lowContrast: { value: '#ccc' },
          background: { value: '#fff' }
        }
      };
      
      const result = validator.validate(tokens);
      const report = validator.getReport(result);
      
      expect(report).toContain('Token Validation Report');
      expect(report).toContain('Status:');
      expect(report).toContain('Summary:');
      expect(report).toContain('Errors:');
    });
  });
});

describe('Integration Tests', () => {
  it('should load and validate tokens together', async () => {
    const provider = new TokenProvider();
    const validator = new TokenValidator();
    
    // Simulate loading tokens
    provider.tokens = {
      color: {
        primary: { value: '#007bff', type: 'color' },
        success: { value: '#22c55e', type: 'color' }
      },
      spacing: {
        4: { value: '1rem', type: 'dimension' },
        8: { value: '2rem', type: 'dimension' }
      }
    };
    
    const tokens = provider.getAllTokens();
    const result = validator.validate(tokens);
    
    expect(result).toBeDefined();
    expect(typeof result.valid).toBe('boolean');
    expect(result.summary).toBeDefined();
  });

  it('should validate component with loaded tokens', () => {
    const provider = new TokenProvider();
    const validator = new TokenValidator();
    
    provider.tokens = {
      color: {
        primary: { value: '#007bff' }
      }
    };
    
    const cleanCode = `
      const Component = () => {
        return <div style={{ color: 'var(--color-primary)' }} />;
      };
    `;
    
    const result = validator.validateComponent(cleanCode, provider.getAllTokens());
    
    // Should not have hardcoded color errors
    const hardcodedIssue = result.issues.find(i => i.rule === 'no-hardcoded-colors');
    expect(hardcodedIssue).toBeUndefined();
  });
});
