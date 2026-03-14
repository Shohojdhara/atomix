import { describe, it, expect } from 'vitest';
import { generateClassName } from '../naming';

describe('generateClassName', () => {
  it('should generate a basic block class', () => {
    expect(generateClassName('button')).toBe('button');
  });

  it('should generate a block with element class', () => {
    expect(generateClassName('button', 'icon')).toBe('button__icon');
  });

  it('should generate a block with boolean modifiers', () => {
    expect(generateClassName('button', undefined, { active: true, disabled: false })).toBe('button--active');
  });

  it('should generate a block with string modifiers', () => {
    expect(generateClassName('button', undefined, { size: 'large' })).toBe('button--size-large');
  });

  it('should handle modifiers where the value equals the key', () => {
    expect(generateClassName('button', undefined, { active: 'active' })).toBe('button--active');
  });

  it('should combine block, element, and multiple modifier types correctly', () => {
    expect(generateClassName('button', 'icon', { active: true, size: 'large', disabled: false })).toBe('button__icon--active--size-large');
  });

  it('should ignore undefined or false modifiers', () => {
    expect(generateClassName('button', 'icon', { active: false, size: '', valid: undefined as unknown as string })).toBe('button__icon');
  });
});
