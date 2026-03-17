/**
 * Component Validator Tests
 * Tests for Phase 2: Design System Architecture Enforcement
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { 
  ComponentValidator, 
  COMPONENT_RULES, 
  COMPONENT_SEVERITY,
  componentValidator 
} from '../internal/component-validator.js';

describe('ComponentValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new ComponentValidator();
  });

  describe('Initialization', () => {
    it('should create a new ComponentValidator instance', () => {
      expect(validator).toBeInstanceOf(ComponentValidator);
    });

    it('should register all built-in rules', () => {
      expect(validator.rules.size).toBeGreaterThan(0);
      expect(validator.rules.has('FORWARD_REF_REQUIRED')).toBe(true);
      expect(validator.rules.has('DISPLAY_NAME_REQUIRED')).toBe(true);
      expect(validator.rules.has('TYPESCRIPT_TYPES_REQUIRED')).toBe(true);
    });

    it('should have all rules enabled by default', () => {
      expect(validator.enabledRules.length).toBeGreaterThan(0);
    });
  });

  describe('ForwardRef Validation', () => {
    it('should detect missing forwardRef', () => {
      const content = `
        export const Button = (props) => {
          return <div {...props} />;
        };
      `;
      
      const result = validator.validate(content, 'Button');
      
      const forwardRefIssue = result.issues.find(i => i.rule === 'forward-ref-required');
      expect(forwardRefIssue).toBeDefined();
      expect(forwardRefIssue.severity).toBe(COMPONENT_SEVERITY.ERROR);
    });

    it('should pass when forwardRef is used', () => {
      const content = `
        import React, { forwardRef } from 'react';
        
        export const Button = forwardRef<HTMLDivElement, ButtonProps>(
          (props, ref) => {
            return <div ref={ref} {...props} />;
          }
        );
      `;
      
      const result = validator.validate(content, 'Button');
      
      const forwardRefIssue = result.issues.find(i => i.rule === 'forward-ref-required');
      expect(forwardRefIssue).toBeUndefined();
    });
  });

  describe('DisplayName Validation', () => {
    it('should detect missing displayName', () => {
      const content = `
        export const Button = forwardRef((props, ref) => {
          return <div ref={ref} {...props} />;
        });
      `;
      
      const result = validator.validate(content, 'Button');
      
      const displayNameIssue = result.issues.find(i => i.rule === 'display-name-required');
      expect(displayNameIssue).toBeDefined();
    });

    it('should pass when displayName is correctly assigned', () => {
      const content = `
        export const Button = forwardRef((props, ref) => {
          return <div ref={ref} {...props} />;
        });
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const displayNameIssue = result.issues.find(i => i.rule === 'display-name-required');
      expect(displayNameIssue).toBeUndefined();
    });
  });

  describe('JSDoc Validation', () => {
    it('should detect missing JSDoc', () => {
      const content = `
        export const Button = forwardRef((props, ref) => {
          return <div ref={ref} {...props} />;
        });
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const jsdocIssue = result.issues.find(i => i.rule === 'jsdoc-required');
      expect(jsdocIssue).toBeDefined();
      expect(jsdocIssue.severity).toBe(COMPONENT_SEVERITY.WARNING);
    });

    it('should pass when JSDoc is present', () => {
      const content = `
        /**
         * Button Component
         * @param {ButtonProps} props - Component properties
         * @returns {JSX.Element} The rendered button
         */
        export const Button = forwardRef((props, ref) => {
          return <div ref={ref} {...props} />;
        });
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const jsdocIssue = result.issues.find(i => i.rule === 'jsdoc-required');
      expect(jsdocIssue).toBeUndefined();
    });
  });

  describe('TypeScript Types Validation', () => {
    it('should detect missing Props type', () => {
      const content = `
        export const Button = forwardRef((props, ref) => {
          return <div ref={ref} {...props} />;
        });
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const typesIssue = result.issues.find(i => i.rule === 'typescript-types-required');
      expect(typesIssue).toBeDefined();
    });

    it('should pass with local Props interface', () => {
      const content = `
        interface ButtonProps {
          variant?: string;
          size?: string;
        }
        
        export const Button = forwardRef<HTMLDivElement, ButtonProps>(
          (props, ref) => {
            return <div ref={ref} {...props} />;
          }
        );
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const typesIssue = result.issues.find(i => i.rule === 'typescript-types-required');
      expect(typesIssue).toBeUndefined();
    });

    it('should pass with imported Props type', () => {
      const content = `
        import type { ButtonProps } from '../../types/components';
        
        export const Button = forwardRef<HTMLDivElement, ButtonProps>(
          (props, ref) => {
            return <div ref={ref} {...props} />;
          }
        );
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const typesIssue = result.issues.find(i => i.rule === 'typescript-types-required');
      expect(typesIssue).toBeUndefined();
    });
  });

  describe('Accessibility Validation', () => {
    it('should detect missing accessibility attributes', () => {
      const content = `
        export const Button = forwardRef((props, ref) => {
          return <div ref={ref} {...props} />;
        });
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const a11yIssue = result.issues.find(i => i.rule === 'accessibility-attributes');
      expect(a11yIssue).toBeDefined();
    });

    it('should pass with aria-label', () => {
      const content = `
        export const Button = forwardRef((props, ref) => {
          return <div ref={ref} aria-label="Click me" {...props} />;
        });
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const a11yIssue = result.issues.find(i => i.rule === 'accessibility-attributes');
      expect(a11yIssue).toBeUndefined();
    });
  });

  describe('Hardcoded Colors Validation', () => {
    it('should detect hardcoded hex colors', () => {
      const content = `
        export const Button = forwardRef((props, ref) => {
          return <div ref={ref} style={{ color: '#ff0000' }} {...props} />;
        });
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const colorIssue = result.issues.find(i => i.rule === 'no-hardcoded-colors');
      expect(colorIssue).toBeDefined();
      expect(colorIssue.matches).toContain('#ff0000');
    });

    it('should detect hardcoded RGB colors', () => {
      const content = `
        export const Button = forwardRef((props, ref) => {
          return <div ref={ref} style={{ backgroundColor: 'rgb(255, 0, 0)' }} {...props} />;
        });
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const colorIssue = result.issues.find(i => i.rule === 'no-hardcoded-colors');
      expect(colorIssue).toBeDefined();
    });

    it('should pass without hardcoded colors', () => {
      const content = `
        export const Button = forwardRef((props, ref) => {
          return <div ref={ref} style={{ color: 'var(--color-primary)' }} {...props} />;
        });
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const colorIssue = result.issues.find(i => i.rule === 'no-hardcoded-colors');
      expect(colorIssue).toBeUndefined();
    });
  });

  describe('Memo Usage Validation', () => {
    it('should suggest using memo', () => {
      const content = `
        export const Button = forwardRef((props, ref) => {
          return <div ref={ref} {...props} />;
        });
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const memoIssue = result.issues.find(i => i.rule === 'memo-usage');
      expect(memoIssue).toBeDefined();
      expect(memoIssue.severity).toBe(COMPONENT_SEVERITY.INFO);
    });

    it('should pass when memo is used', () => {
      const content = `
        import React, { memo, forwardRef } from 'react';
        
        export const Button = memo(
          forwardRef((props, ref) => {
            return <div ref={ref} {...props} />;
          })
        );
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      const memoIssue = result.issues.find(i => i.rule === 'memo-usage');
      expect(memoIssue).toBeUndefined();
    });
  });

  describe('Rule Management', () => {
    it('should toggle rules on/off', () => {
      const initialCount = validator.enabledRules.length;
      
      validator.toggleRule('FORWARD_REF_REQUIRED', false);
      expect(validator.enabledRules).not.toContain('FORWARD_REF_REQUIRED');
      
      validator.toggleRule('FORWARD_REF_REQUIRED', true);
      expect(validator.enabledRules).toContain('FORWARD_REF_REQUIRED');
    });

    it('should allow registering custom rules', () => {
      const customRule = {
        name: 'custom-rule',
        description: 'Custom validation rule',
        severity: COMPONENT_SEVERITY.INFO,
        validate: (content) => []
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
      const content = `
        export const Button = (props) => {
          return <div style={{ color: '#ff0000' }} {...props} />;
        };
      `;
      
      const result = validator.validate(content, 'Button');
      const report = validator.getReport(result, 'Button');
      
      expect(report).toContain('Component Validation Report: Button');
      expect(report).toContain('Status:');
      expect(report).toContain('Summary:');
      expect(report).toContain('Errors:');
    });

    it('should sort issues by severity', () => {
      const content = `
        export const Button = (props) => {
          return <div style={{ color: '#ff0000' }} {...props} />;
        };
      `;
      
      const result = validator.validate(content, 'Button');
      const report = validator.getReport(result, 'Button');
      
      // Errors should appear before warnings and info
      const errorIndex = report.indexOf('❌');
      const warningIndex = report.indexOf('⚠️');
      const infoIndex = report.indexOf('ℹ️');
      
      if (errorIndex !== -1 && warningIndex !== -1) {
        expect(errorIndex).toBeLessThan(warningIndex);
      }
    });
  });

  describe('Integration Tests', () => {
    it('should validate complete component correctly', () => {
      const content = `
        import React, { memo, forwardRef } from 'react';
        import type { ButtonProps } from '../../types/components';
        
        /**
         * Button Component
         * @param {ButtonProps} props - Component properties
         * @returns {JSX.Element} Rendered button
         */
        export const Button = memo(
          forwardRef<HTMLDivElement, ButtonProps>(
            ({ children, variant = 'primary', 'aria-label': ariaLabel, ...props }, ref) => {
              return (
                <div 
                  ref={ref} 
                  className={\`c-button c-button--variant-\${variant}\`}
                  aria-label={ariaLabel}
                  {...props}
                >
                  {children}
                </div>
              );
            }
          )
        );
        
        Button.displayName = 'Button';
      `;
      
      const result = validator.validate(content, 'Button');
      
      // Should have no errors (warnings and info are OK)
      expect(result.summary.errors).toBe(0);
    });

    it('should fail validation with multiple errors', () => {
      const content = `
        export const Button = (props) => {
          return <div style={{ color: '#ff0000' }} {...props} />;
        };
      `;
      
      const result = validator.validate(content, 'Button');
      
      expect(result.valid).toBe(false);
      expect(result.summary.errors).toBeGreaterThan(0);
    });
  });
});
