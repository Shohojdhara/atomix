import { describe, it, expect, vi } from 'vitest';
import { AtomixBuildError, Validator, ErrorHandler } from '../error-handler.js';

describe('Atomix Build Error Handler', () => {
  describe('AtomixBuildError', () => {
    it('should create error with proper properties', () => {
      const error = new AtomixBuildError(
        'Test error message',
        'TEST_ERROR',
        { detail: 'test' },
        ['Suggestion 1', 'Suggestion 2']
      );

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('AtomixBuildError');
      expect(error.message).toBe('Test error message');
      expect(error.code).toBe('TEST_ERROR');
      expect(error.details).toEqual({ detail: 'test' });
      expect(error.suggestions).toEqual(['Suggestion 1', 'Suggestion 2']);
      expect(error.timestamp).toBeDefined();
    });

    it('should format error message correctly', () => {
      const error = new AtomixBuildError(
        'Simple error',
        'SIMPLE_ERROR'
      );

      const formatted = error.toString();
      expect(formatted).toContain('[AtomixBuildError:SIMPLE_ERROR]');
      expect(formatted).toContain('Simple error');
    });
  });

  describe('Validator', () => {
    describe('validateTheme', () => {
      it('should validate valid theme', () => {
        expect(() => {
          Validator.validateTheme('default', ['default', 'dark']);
        }).not.toThrow();
      });

      it('should throw error for invalid theme type', () => {
        expect(() => {
          Validator.validateTheme(123);
        }).toThrow(AtomixBuildError);
      });

      it('should throw error for empty theme', () => {
        expect(() => {
          Validator.validateTheme('');
        }).toThrow(AtomixBuildError);
      });

      it('should throw error for non-existent theme', () => {
        expect(() => {
          Validator.validateTheme('nonexistent', ['default', 'dark']);
        }).toThrow(AtomixBuildError);
      });
    });

    describe('validateComponents', () => {
      it('should validate valid components array', () => {
        expect(() => {
          Validator.validateComponents(['Button', 'Card'], ['Button', 'Card', 'Input']);
        }).not.toThrow();
      });

      it('should throw error for non-array components', () => {
        expect(() => {
          Validator.validateComponents('Button');
        }).toThrow(AtomixBuildError);
      });

      it('should throw error for non-string component names', () => {
        expect(() => {
          Validator.validateComponents(['Button', 123]);
        }).toThrow(AtomixBuildError);
      });

      it('should throw error for missing components', () => {
        expect(() => {
          Validator.validateComponents(['Button', 'Missing'], ['Button']);
        }).toThrow(AtomixBuildError);
      });
    });

    describe('validateBoolean', () => {
      it('should validate valid boolean', () => {
        expect(() => {
          Validator.validateBoolean(true, 'testOption');
        }).not.toThrow();
      });

      it('should throw error for non-boolean value', () => {
        expect(() => {
          Validator.validateBoolean('true', 'testOption');
        }).toThrow(AtomixBuildError);
      });
    });

    describe('validateString', () => {
      it('should validate valid string', () => {
        expect(() => {
          Validator.validateString('test', 'testOption');
        }).not.toThrow();
      });

      it('should throw error for non-string value', () => {
        expect(() => {
          Validator.validateString(123, 'testOption');
        }).toThrow(AtomixBuildError);
      });

      it('should throw error for empty string when not allowed', () => {
        expect(() => {
          Validator.validateString('', 'testOption');
        }).toThrow(AtomixBuildError);
      });

      it('should allow empty string when permitted', () => {
        expect(() => {
          Validator.validateString('', 'testOption', true);
        }).not.toThrow();
      });
    });

    describe('validateOptions', () => {
      it('should validate complete options object', () => {
        const options = {
          theme: 'default',
          components: ['Button'],
          optimizeCss: true,
          includeAtoms: false,
          verbose: false
        };

        expect(() => {
          Validator.validateOptions(options);
        }).not.toThrow();
      });

      it('should throw error for invalid options object', () => {
        expect(() => {
          Validator.validateOptions('invalid');
        }).toThrow(AtomixBuildError);
      });

      it('should warn about unknown options', () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        
        const options = {
          theme: 'default',
          unknownOption: 'value'
        };

        Validator.validateOptions(options);
        expect(consoleSpy).toHaveBeenCalledWith('[AtomixBuildWarning] Unknown options provided: unknownOption');
        
        consoleSpy.mockRestore();
      });
    });
  });

  describe('ErrorHandler', () => {
    describe('withErrorHandling', () => {
      it('should wrap function and handle errors', () => {
        const failingFn = () => {
          throw new Error('Original error');
        };

        const wrappedFn = ErrorHandler.withErrorHandling(failingFn, 'Test Context');

        expect(() => {
          wrappedFn();
        }).toThrow(AtomixBuildError);
      });

      it('should preserve AtomixBuildError instances', () => {
        const atomixError = new AtomixBuildError('Test', 'TEST_CODE');
        const failingFn = () => {
          throw atomixError;
        };

        const wrappedFn = ErrorHandler.withErrorHandling(failingFn, 'Test Context');

        try {
          wrappedFn();
          expect.fail('Should have thrown');
        } catch (error) {
          expect(error).toBe(atomixError);
        }
      });
    });

    describe('logError', () => {
      it('should log AtomixBuildError properly', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const error = new AtomixBuildError('Test error', 'TEST_CODE');

        ErrorHandler.logError(error);
        expect(consoleSpy).toHaveBeenCalled();
        
        consoleSpy.mockRestore();
      });

      it('should log regular Error properly', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const error = new Error('Regular error');

        ErrorHandler.logError(error);
        expect(consoleSpy).toHaveBeenCalledWith('[Error] Regular error');
        
        consoleSpy.mockRestore();
      });
    });

    describe('getErrorCode', () => {
      it('should get error code from AtomixBuildError', () => {
        const error = new AtomixBuildError('Test', 'TEST_CODE');
        expect(ErrorHandler.getErrorCode(error)).toBe('TEST_CODE');
      });

      it('should return null for regular Error', () => {
        const error = new Error('Test');
        expect(ErrorHandler.getErrorCode(error)).toBeNull();
      });
    });
  });
});