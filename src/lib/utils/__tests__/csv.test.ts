import { describe, it, expect } from 'vitest';
import { sanitizeCSVCell } from '../csv';

describe('sanitizeCSVCell', () => {
  it('should handle normal strings', () => {
    expect(sanitizeCSVCell('Hello World')).toBe('Hello World');
    expect(sanitizeCSVCell('123')).toBe('123');
  });

  it('should handle numbers', () => {
    expect(sanitizeCSVCell(123)).toBe('123');
    expect(sanitizeCSVCell(0)).toBe('0');
    // Negative numbers are prefixed with ' to prevent potential formula injection
    expect(sanitizeCSVCell(-1)).toBe("'-1");
  });

  it('should handle null and undefined', () => {
    expect(sanitizeCSVCell(null)).toBe('');
    expect(sanitizeCSVCell(undefined)).toBe('');
  });

  it('should replace newlines and tabs with spaces', () => {
    expect(sanitizeCSVCell('Hello\nWorld')).toBe('Hello World');
    expect(sanitizeCSVCell('Hello\rWorld')).toBe('Hello World');
    expect(sanitizeCSVCell('Hello\tWorld')).toBe('Hello World');
    expect(sanitizeCSVCell('Hello\r\nWorld')).toBe('Hello  World');
  });

  it('should escape double quotes', () => {
    expect(sanitizeCSVCell('Hello "World"')).toBe('Hello ""World""');
    expect(sanitizeCSVCell('"')).toBe('""');
  });

  it('should prevent formula injection', () => {
    expect(sanitizeCSVCell('=SUM(A1:B1)')).toBe("'=SUM(A1:B1)");
    expect(sanitizeCSVCell('+SUM(A1:B1)')).toBe("'+SUM(A1:B1)");
    expect(sanitizeCSVCell('-SUM(A1:B1)')).toBe("'-SUM(A1:B1)");
    expect(sanitizeCSVCell('@SUM(A1:B1)')).toBe("'@SUM(A1:B1)");
  });

  it('should handle mixed cases', () => {
    // Dangerous character + quotes + newlines
    expect(sanitizeCSVCell("=cmd|' /C calc'!A0\n")).toBe("'=cmd|' /C calc'!A0 ");
  });
});
