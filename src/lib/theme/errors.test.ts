/**
 * Theme Error Handling Tests
 * 
 * Tests for ThemeError class and ThemeLogger
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ThemeError,
  ThemeErrorCode,
  ThemeLogger,
  LogLevel,
  getLogger,
  setLogger,
  createLogger,
} from './errors';

describe('ThemeError', () => {
  it('should create an error with message', () => {
    const error = new ThemeError('Test error');
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('ThemeError');
    expect(error.code).toBe(ThemeErrorCode.UNKNOWN_ERROR);
  });

  it('should create an error with code', () => {
    const error = new ThemeError(
      'Theme not found',
      ThemeErrorCode.THEME_NOT_FOUND
    );
    expect(error.code).toBe(ThemeErrorCode.THEME_NOT_FOUND);
  });

  it('should create an error with context', () => {
    const context = { themeId: 'test-theme', reason: 'not found' };
    const error = new ThemeError('Error', ThemeErrorCode.THEME_NOT_FOUND, context);
    expect(error.context).toEqual(context);
  });

  it('should have a timestamp', () => {
    const before = Date.now();
    const error = new ThemeError('Test');
    const after = Date.now();
    expect(error.timestamp).toBeGreaterThanOrEqual(before);
    expect(error.timestamp).toBeLessThanOrEqual(after);
  });

  it('should convert to JSON', () => {
    const context = { themeId: 'test' };
    const error = new ThemeError('Test', ThemeErrorCode.THEME_NOT_FOUND, context);
    const json = error.toJSON();
    expect(json).toHaveProperty('name', 'ThemeError');
    expect(json).toHaveProperty('message', 'Test');
    expect(json).toHaveProperty('code', ThemeErrorCode.THEME_NOT_FOUND);
    expect(json).toHaveProperty('context', context);
    expect(json).toHaveProperty('timestamp');
    expect(json).toHaveProperty('stack');
  });

  it('should be an instance of Error', () => {
    const error = new ThemeError('Test');
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ThemeError);
  });
});

describe('ThemeLogger', () => {
  let logger: ThemeLogger;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let consoleInfoSpy: ReturnType<typeof vi.spyOn>;
  let consoleDebugSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('error', () => {
    it('should log errors at ERROR level', () => {
      logger = new ThemeLogger({ level: LogLevel.ERROR });
      const error = new Error('Test error');
      logger.error('Test message', error);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should not log errors below ERROR level', () => {
      logger = new ThemeLogger({ level: LogLevel.WARN });
      const error = new Error('Test error');
      logger.error('Test message', error);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should include context in error logs', () => {
      logger = new ThemeLogger({ level: LogLevel.ERROR });
      const error = new Error('Test');
      const context = { themeId: 'test' };
      logger.error('Test', error, context);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('[ThemeError]'),
        expect.objectContaining({
          error,
          context: expect.objectContaining(context),
        })
      );
    });

    it('should call custom error handler', () => {
      const onError = vi.fn();
      logger = new ThemeLogger({ level: LogLevel.ERROR, onError });
      const error = new Error('Test');
      logger.error('Test', error);
      expect(onError).toHaveBeenCalledWith(
        expect.any(ThemeError),
        undefined
      );
    });
  });

  describe('warn', () => {
    it('should log warnings at WARN level', () => {
      logger = new ThemeLogger({ level: LogLevel.WARN });
      logger.warn('Warning message');
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });

    it('should not log warnings below WARN level', () => {
      logger = new ThemeLogger({ level: LogLevel.ERROR });
      logger.warn('Warning message');
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('should call custom warn handler', () => {
      const onWarn = vi.fn();
      logger = new ThemeLogger({ level: LogLevel.WARN, onWarn });
      logger.warn('Warning', { context: 'data' });
      expect(onWarn).toHaveBeenCalledWith('Warning', { context: 'data' });
    });
  });

  describe('info', () => {
    it('should log info at INFO level', () => {
      logger = new ThemeLogger({ level: LogLevel.INFO });
      logger.info('Info message');
      expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    });

    it('should not log info below INFO level', () => {
      logger = new ThemeLogger({ level: LogLevel.WARN });
      logger.info('Info message');
      expect(consoleInfoSpy).not.toHaveBeenCalled();
    });
  });

  describe('debug', () => {
    it('should log debug at DEBUG level', () => {
      logger = new ThemeLogger({ level: LogLevel.DEBUG });
      logger.debug('Debug message');
      expect(consoleDebugSpy).toHaveBeenCalledTimes(1);
    });

    it('should not log debug below DEBUG level', () => {
      logger = new ThemeLogger({ level: LogLevel.INFO });
      logger.debug('Debug message');
      expect(consoleDebugSpy).not.toHaveBeenCalled();
    });
  });

  describe('console control', () => {
    it('should not log to console when disabled', () => {
      logger = new ThemeLogger({ level: LogLevel.DEBUG, enableConsole: false });
      logger.error('Error');
      logger.warn('Warning');
      logger.info('Info');
      logger.debug('Debug');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).not.toHaveBeenCalled();
      expect(consoleInfoSpy).not.toHaveBeenCalled();
      expect(consoleDebugSpy).not.toHaveBeenCalled();
    });
  });
});

describe('Logger utilities', () => {
  it('should get default logger', () => {
    const logger = getLogger();
    expect(logger).toBeInstanceOf(ThemeLogger);
  });

  it('should set custom logger', () => {
    const customLogger = new ThemeLogger({ level: LogLevel.DEBUG });
    setLogger(customLogger);
    const retrieved = getLogger();
    expect(retrieved).toBe(customLogger);
  });

  it('should create logger with config', () => {
    const logger = createLogger({ level: LogLevel.WARN });
    expect(logger).toBeInstanceOf(ThemeLogger);
  });
});
