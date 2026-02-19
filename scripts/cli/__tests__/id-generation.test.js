import { describe, it, expect } from 'vitest';
import { generateId } from '../utils.js';

describe('generateId', () => {
  it('should generate unique IDs', () => {
    const ids = new Set();
    for (let i = 0; i < 1000; i++) {
      ids.add(generateId());
    }
    expect(ids.size).toBe(1000);
  });

  it('should format ID correctly', () => {
    const id = generateId('test');
    const parts = id.split('-');
    expect(parts.length).toBe(3);
    expect(parts[0]).toBe('test');
    // Timestamp part (base36)
    expect(parts[1]).toMatch(/^[0-9a-z]+$/);
    // Random part (base36, 5 chars)
    expect(parts[2]).toMatch(/^[0-9a-z]{5}$/);
  });

  it('should use default prefix', () => {
      const id = generateId();
      expect(id.startsWith('atomix-')).toBe(true);
  });
});
