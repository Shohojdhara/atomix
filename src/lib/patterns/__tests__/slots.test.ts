/**
 * @vitest-environment jsdom
 */

import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderSlot, isSlot, mergeSlots } from '../slots';

describe('slots', () => {
  describe('renderSlot', () => {
    it('should render children directly', () => {
      const result = renderSlot('Hello World', {});
      expect(result).toBe('Hello World');
    });

    it('should render with render function', () => {
      const slot = {
        render: (props: { text: string }) => `Rendered: ${props.text}`,
      };
      const result = renderSlot(slot, { text: 'Hello' });
      expect(result).toBe('Rendered: Hello');
    });

    it('should render with component', () => {
      const CustomComponent = ({ text }: { text: string }) =>
        React.createElement('span', null, `Component: ${text}`);

      const slot = {
        component: CustomComponent,
      };
      const result = renderSlot(slot, { text: 'Hello' });
      expect(result).toBeDefined();
    });

    it('should use fallback when slot is undefined', () => {
      const result = renderSlot(undefined, {}, 'Fallback');
      expect(result).toBe('Fallback');
    });

    it('should prioritize render over component', () => {
      const CustomComponent = () => React.createElement('span', null, 'Component');
      const slot = {
        render: () => 'Rendered',
        component: CustomComponent,
      };
      const result = renderSlot(slot, {});
      expect(result).toBe('Rendered');
    });

    it('should handle slot with children', () => {
      const slot = {
        children: 'Slot Children',
      };
      const result = renderSlot(slot, {});
      expect(result).toBe('Slot Children');
    });
  });

  describe('isSlot', () => {
    it('should identify slot objects', () => {
      expect(isSlot({ render: () => null })).toBe(true);
      expect(isSlot({ component: () => null })).toBe(true);
      expect(isSlot({ children: 'text' })).toBe(true);
    });

    it('should reject non-slot values', () => {
      expect(isSlot('string')).toBe(false);
      expect(isSlot(123)).toBe(false);
      expect(isSlot(null)).toBe(false);
      expect(isSlot(undefined)).toBe(false);
      expect(isSlot({})).toBe(false);
    });
  });

  describe('mergeSlots', () => {
    it('should merge two slot objects', () => {
      const base = {
        render: () => 'Base',
      };
      const override = {
        component: () => React.createElement('span', null, 'Override'),
      };
      const result = mergeSlots(base, override);
      expect(result).toEqual(override);
    });

    it('should return override when base is undefined', () => {
      const override = {
        render: () => 'Override',
      };
      const result = mergeSlots(undefined, override);
      expect(result).toEqual(override);
    });

    it('should return base when override is undefined', () => {
      const base = {
        render: () => 'Base',
      };
      const result = mergeSlots(base, undefined);
      expect(result).toEqual(base);
    });

    it('should return undefined when both are undefined', () => {
      const result = mergeSlots(undefined, undefined);
      expect(result).toBeUndefined();
    });
  });
});
