import { describe, it, expect } from 'vitest';
import {
  resolveDefaultComplexity,
  normalizeComplexityForFramework,
  resolveEffectiveComplexity
} from '../internal/complexity-utils.js';

describe('complexity-utils', () => {
  it('resolveDefaultComplexity: next is simple, react is medium', () => {
    expect(resolveDefaultComplexity('next')).toBe('simple');
    expect(resolveDefaultComplexity('react')).toBe('medium');
    expect(resolveDefaultComplexity('vanilla')).toBe('medium');
  });

  it('normalizeComplexityForFramework maps next+medium to simple', () => {
    expect(normalizeComplexityForFramework('next', 'medium')).toBe('simple');
    expect(normalizeComplexityForFramework('next', 'client')).toBe('client');
  });

  it('resolveEffectiveComplexity uses explicit CLI value when set', () => {
    expect(resolveEffectiveComplexity('react', 'simple')).toBe('simple');
    expect(resolveEffectiveComplexity('next', undefined)).toBe('simple');
  });
});
