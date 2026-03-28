import { describe, it, expect } from 'vitest';
import { templateEngine } from '../internal/template-engine.js';

describe('templateEngine.selectTemplate', () => {
  it('resolves react × medium × component', () => {
    const fn = templateEngine.selectTemplate('react', 'medium', 'component');
    expect(typeof fn).toBe('function');
  });

  it('resolves next × simple × component', () => {
    const fn = templateEngine.selectTemplate('next', 'simple', 'component');
    expect(typeof fn).toBe('function');
  });

  it('throws for next × medium', () => {
    expect(() => templateEngine.selectTemplate('next', 'medium', 'component')).toThrow();
  });

  it('resolves vanilla component without complexity validation', () => {
    const fn = templateEngine.selectTemplate('vanilla', 'anything', 'component');
    expect(typeof fn).toBe('function');
  });
});
