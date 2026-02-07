/**
 * @fileoverview Error handling utilities for Atomix build tools
 */

/**
 * Custom error class for Atomix build tool errors
 * @extends Error
 */
export class AtomixBuildError extends Error {
  /**
   * @param {string} message - Error message
   * @param {string} code - Error code
   * @param {Object} [details] - Additional error details
   * @param {string[]} [suggestions] - Suggested solutions
   */
  constructor(message, code, details = {}, suggestions = []) {
    super(message);
    this.name = 'AtomixBuildError';
    this.code = code;
    this.details = details;
    this.suggestions = suggestions;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Get formatted error message
   * @returns {string} Formatted error message
   */
  toString() {
    let msg = `[AtomixBuildError:${this.code}] ${this.message}`;
    
    if (this.details && Object.keys(this.details).length > 0) {
      msg += `\nDetails: ${JSON.stringify(this.details, null, 2)}`;
    }
    
    if (this.suggestions && this.suggestions.length > 0) {
      msg += `\nSuggestions:\n${this.suggestions.map((s, i) => `  ${i + 1}. ${s}`).join('\n')}`;
    }
    
    return msg;
  }
}

/**
 * Validation utilities
 */
export class Validator {
  /**
   * Validate theme name
   * @param {string} theme - Theme name to validate
   * @param {string[]} [availableThemes] - List of available themes
   * @throws {AtomixBuildError} If validation fails
   */
  static validateTheme(theme, availableThemes = []) {
    if (typeof theme !== 'string') {
      throw new AtomixBuildError(
        'Theme must be a string',
        'INVALID_THEME_TYPE',
        { theme, type: typeof theme },
        ['Provide a string value for theme option']
      );
    }

    if (theme.trim() === '') {
      throw new AtomixBuildError(
        'Theme cannot be empty',
        'EMPTY_THEME',
        { theme },
        ['Provide a valid theme name']
      );
    }

    if (availableThemes.length > 0 && !availableThemes.includes(theme)) {
      throw new AtomixBuildError(
        `Theme '${theme}' not found`,
        'THEME_NOT_FOUND',
        { theme, availableThemes },
        [
          `Available themes: ${availableThemes.join(', ')}`,
          'Check if the theme name is spelled correctly',
          'Verify the theme exists in your Atomix installation'
        ]
      );
    }
  }

  /**
   * Validate components array
   * @param {any} components - Components to validate
   * @param {string[]} [availableComponents] - List of available components
   * @throws {AtomixBuildError} If validation fails
   */
  static validateComponents(components, availableComponents = []) {
    if (!Array.isArray(components)) {
      throw new AtomixBuildError(
        'Components must be an array',
        'INVALID_COMPONENTS_TYPE',
        { components, type: typeof components },
        ['Provide an array of component names']
      );
    }

    const invalidItems = components.filter(item => typeof item !== 'string');
    if (invalidItems.length > 0) {
      throw new AtomixBuildError(
        'All component names must be strings',
        'INVALID_COMPONENT_NAMES',
        { invalidItems },
        ['Ensure all component names are string values']
      );
    }

    if (availableComponents.length > 0) {
      const missingComponents = components.filter(comp => !availableComponents.includes(comp));
      if (missingComponents.length > 0) {
        throw new AtomixBuildError(
          `Some requested components not found: ${missingComponents.join(', ')}`,
          'COMPONENTS_NOT_FOUND',
          { missingComponents, availableComponents },
          [
            `Available components: ${availableComponents.slice(0, 10).join(', ')}${availableComponents.length > 10 ? '...' : ''}`,
            'Check component names for typos',
            'Verify components exist in your Atomix version'
          ]
        );
      }
    }
  }

  /**
   * Validate boolean options
   * @param {any} value - Value to validate
   * @param {string} optionName - Name of the option
   * @throws {AtomixBuildError} If validation fails
   */
  static validateBoolean(value, optionName) {
    if (typeof value !== 'boolean') {
      throw new AtomixBuildError(
        `${optionName} must be a boolean`,
        'INVALID_BOOLEAN_OPTION',
        { optionName, value, type: typeof value },
        [`Provide true or false for ${optionName} option`]
      );
    }
  }

  /**
   * Validate string options
   * @param {any} value - Value to validate
   * @param {string} optionName - Name of the option
   * @param {boolean} [allowEmpty=false] - Whether empty strings are allowed
   * @throws {AtomixBuildError} If validation fails
   */
  static validateString(value, optionName, allowEmpty = false) {
    if (typeof value !== 'string') {
      throw new AtomixBuildError(
        `${optionName} must be a string`,
        'INVALID_STRING_OPTION',
        { optionName, value, type: typeof value },
        [`Provide a string value for ${optionName} option`]
      );
    }

    if (!allowEmpty && value.trim() === '') {
      throw new AtomixBuildError(
        `${optionName} cannot be empty`,
        'EMPTY_STRING_OPTION',
        { optionName, value },
        [`Provide a non-empty string for ${optionName} option`]
      );
    }
  }

  /**
   * Validate plugin options object
   * @param {Object} options - Options to validate
   * @param {string[]} [availableThemes] - Available themes
   * @param {string[]} [availableComponents] - Available components
   * @throws {AtomixBuildError} If validation fails
   */
  static validateOptions(options, availableThemes = [], availableComponents = []) {
    if (typeof options !== 'object' || options === null) {
      throw new AtomixBuildError(
        'Options must be an object',
        'INVALID_OPTIONS_OBJECT',
        { options, type: typeof options },
        ['Provide a valid options object']
      );
    }

    // Validate individual options
    if ('theme' in options) {
      this.validateTheme(options.theme, availableThemes);
    }

    if ('components' in options) {
      this.validateComponents(options.components, availableComponents);
    }

    if ('optimizeCss' in options) {
      this.validateBoolean(options.optimizeCss, 'optimizeCss');
    }

    if ('includeAtoms' in options) {
      this.validateBoolean(options.includeAtoms, 'includeAtoms');
    }

    if ('verbose' in options) {
      this.validateBoolean(options.verbose, 'verbose');
    }

    if ('optimize' in options) {
      this.validateBoolean(options.optimize, 'optimize');
    }

    // Check for unknown options
    const knownOptions = ['theme', 'components', 'optimizeCss', 'includeAtoms', 'verbose', 'optimize'];
    const unknownOptions = Object.keys(options).filter(key => !knownOptions.includes(key));
    
    if (unknownOptions.length > 0) {
      console.warn(`[AtomixBuildWarning] Unknown options provided: ${unknownOptions.join(', ')}`);
    }
  }
}

/**
 * Error handling utilities
 */
export class ErrorHandler {
  /**
   * Wrap a function with error handling
   * @param {Function} fn - Function to wrap
   * @param {string} context - Context/error prefix
   * @returns {Function} Wrapped function
   */
  static withErrorHandling(fn, context) {
    return (...args) => {
      try {
        return fn(...args);
      } catch (error) {
        if (error instanceof AtomixBuildError) {
          throw error;
        }
        
        throw new AtomixBuildError(
          `${context}: ${error.message}`,
          'UNEXPECTED_ERROR',
          { originalError: error.message, stack: error.stack },
          ['Check the error details above', 'Review your configuration', 'Consult the documentation']
        );
      }
    };
  }

  /**
   * Create a safe validator function
   * @param {Function} validator - Validator function
   * @param {string} context - Context for error messages
   * @returns {Function} Safe validator function
   */
  static createSafeValidator(validator, context) {
    return (...args) => {
      try {
        return validator(...args);
      } catch (error) {
        if (error instanceof AtomixBuildError) {
          throw error;
        }
        
        throw new AtomixBuildError(
          `${context}: Validation failed`,
          'VALIDATION_ERROR',
          { args, originalError: error.message },
          ['Check the validation rules', 'Review your input data']
        );
      }
    };
  }

  /**
   * Log error with proper formatting
   * @param {Error|AtomixBuildError} error - Error to log
   * @param {boolean} [verbose=false] - Whether to show verbose output
   */
  static logError(error, verbose = false) {
    if (error instanceof AtomixBuildError) {
      console.error(error.toString());
    } else {
      console.error(`[Error] ${error.message}`);
      if (verbose && error.stack) {
        console.error('Stack trace:', error.stack);
      }
    }
  }

  /**
   * Get error code from error
   * @param {Error} error - Error object
   * @returns {string|null} Error code or null
   */
  static getErrorCode(error) {
    if (error instanceof AtomixBuildError) {
      return error.code;
    }
    return null;
  }
}

