/**
 * Theme System Error Handling
 * 
 * Centralized error handling for the Atomix theme system.
 * Provides custom error classes and logging utilities.
 */

/**
 * Theme error codes
 */
export enum ThemeErrorCode {
  /** Theme not found in registry */
  THEME_NOT_FOUND = 'THEME_NOT_FOUND',
  /** Theme failed to load */
  THEME_LOAD_FAILED = 'THEME_LOAD_FAILED',
  /** Theme validation failed */
  THEME_VALIDATION_FAILED = 'THEME_VALIDATION_FAILED',
  /** Configuration loading failed */
  CONFIG_LOAD_FAILED = 'CONFIG_LOAD_FAILED',
  /** Configuration validation failed */
  CONFIG_VALIDATION_FAILED = 'CONFIG_VALIDATION_FAILED',
  /** Circular dependency detected */
  CIRCULAR_DEPENDENCY = 'CIRCULAR_DEPENDENCY',
  /** Missing dependency */
  MISSING_DEPENDENCY = 'MISSING_DEPENDENCY',
  /** Storage operation failed */
  STORAGE_ERROR = 'STORAGE_ERROR',
  /** Invalid theme name */
  INVALID_THEME_NAME = 'INVALID_THEME_NAME',
  /** CSS injection failed */
  CSS_INJECTION_FAILED = 'CSS_INJECTION_FAILED',
  /** Invalid color format */
  INVALID_COLOR_FORMAT = 'INVALID_COLOR_FORMAT',
  /** Missing required token */
  MISSING_REQUIRED_TOKEN = 'MISSING_REQUIRED_TOKEN',
  /** Accessibility contrast violation */
  CONTRAST_VIOLATION = 'CONTRAST_VIOLATION',
  /** Invalid token type */
  INVALID_TOKEN_TYPE = 'INVALID_TOKEN_TYPE',
  /** Unknown error */
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Custom error class for theme-related errors
 */
export class ThemeError extends Error {
  /** Error code */
  public readonly code: ThemeErrorCode;
  /** Additional context */
  public readonly context?: Record<string, unknown>;
  /** Timestamp */
  public readonly timestamp: number;

  constructor(
    message: string,
    code: ThemeErrorCode = ThemeErrorCode.UNKNOWN_ERROR,
    context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ThemeError';
    this.code = code;
    this.context = context;
    this.timestamp = Date.now();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ThemeError);
    }
  }

  /**
   * Convert error to JSON for logging
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

/**
 * Log level
 */
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

/**
 * Logger configuration
 */
export interface LoggerConfig {
  /** Minimum log level */
  level?: LogLevel;
  /** Enable console output */
  enableConsole?: boolean;
  /** Custom error handler */
  onError?: (error: ThemeError | Error, context?: Record<string, unknown>) => void;
  /** Custom warn handler */
  onWarn?: (message: string, context?: Record<string, unknown>) => void;
  /** Custom info handler */
  onInfo?: (message: string, context?: Record<string, unknown>) => void;
  /** Custom debug handler */
  onDebug?: (message: string, context?: Record<string, unknown>) => void;
}

/**
 * Theme Logger
 * 
 * Centralized logging for the theme system.
 * Replaces console statements with structured logging.
 */
export class ThemeLogger {
  private config: Required<Omit<LoggerConfig, 'onError' | 'onWarn' | 'onInfo' | 'onDebug'>> & {
    onError?: LoggerConfig['onError'];
    onWarn?: LoggerConfig['onWarn'];
    onInfo?: LoggerConfig['onInfo'];
    onDebug?: LoggerConfig['onDebug'];
  };

  constructor(config: LoggerConfig = {}) {
    this.config = {
      level: config.level ?? (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production' ? LogLevel.WARN : LogLevel.INFO),
      enableConsole: config.enableConsole ?? true,
      onError: config.onError,
      onWarn: config.onWarn,
      onInfo: config.onInfo,
      onDebug: config.onDebug,
    };
  }

  /**
   * Log an error
   */
  error(
    message: string,
    error?: Error | ThemeError,
    context?: Record<string, unknown>
  ): void {
    if (this.config.level < LogLevel.ERROR) {
      return;
    }

    const errorObj = error instanceof Error ? error : new Error(message);
    const themeError = error instanceof ThemeError 
      ? error 
      : new ThemeError(message, ThemeErrorCode.UNKNOWN_ERROR, context);

    if (this.config.enableConsole) {
      console.error(`[ThemeError] ${message}`, {
        error: errorObj,
        context: { ...context, ...themeError.context },
        code: themeError.code,
      });
    }

    this.config.onError?.(themeError, context);
  }

  /**
   * Log a warning
   */
  warn(message: string, context?: Record<string, unknown>): void {
    if (this.config.level < LogLevel.WARN) {
      return;
    }

    if (this.config.enableConsole) {
      console.warn(`[ThemeWarning] ${message}`, context || {});
    }

    this.config.onWarn?.(message, context);
  }

  /**
   * Log an info message
   */
  info(message: string, context?: Record<string, unknown>): void {
    if (this.config.level < LogLevel.INFO) {
      return;
    }

    if (this.config.enableConsole) {
      console.info(`[ThemeInfo] ${message}`, context || {});
    }

    this.config.onInfo?.(message, context);
  }

  /**
   * Log a debug message
   */
  debug(message: string, context?: Record<string, unknown>): void {
    if (this.config.level < LogLevel.DEBUG) {
      return;
    }

    if (this.config.enableConsole) {
      console.debug(`[ThemeDebug] ${message}`, context || {});
    }

    this.config.onDebug?.(message, context);
  }
}

/**
 * Default logger instance
 */
let defaultLogger: ThemeLogger | null = null;

/**
 * Get or create default logger
 */
export function getLogger(): ThemeLogger {
  if (!defaultLogger) {
    defaultLogger = new ThemeLogger();
  }
  return defaultLogger;
}

/**
 * Set default logger
 */
export function setLogger(logger: ThemeLogger): void {
  defaultLogger = logger;
}

/**
 * Create a logger with custom config
 */
export function createLogger(config: LoggerConfig): ThemeLogger {
  return new ThemeLogger(config);
}
