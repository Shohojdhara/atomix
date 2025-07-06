import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import useForkRef, { setRef } from './useForkRef';

describe('setRef', () => {
  it('should call function ref with value', () => {
    const ref = vi.fn();
    const value = {};

    setRef(ref, value);

    expect(ref).toHaveBeenCalledWith(value);
  });

  it('should set current property on object ref', () => {
    const ref = { current: null };
    const value = {};

    setRef(ref, value);

    expect(ref.current).toBe(value);
  });

  it('should do nothing if ref is null', () => {
    const value = {};

    // This should not throw
    setRef(null, value);
  });
});

describe('useForkRef', () => {
  it('should return null if both refs are null', () => {
    const TestComponent = () => {
      const forkedRef = useForkRef(null, null);
      expect(forkedRef).toBeNull();
      return null;
    };

    render(<TestComponent />);
  });

  it('should fork refs correctly', () => {
    const refA = vi.fn();
    const refB = { current: null };
    const value = {};

    const TestComponent = () => {
      const forkedRef = useForkRef(refA, refB);
      React.useEffect(() => {
        if (forkedRef) {
          forkedRef(value);
        }
      }, [forkedRef]);
      return null;
    };

    render(<TestComponent />);

    expect(refA).toHaveBeenCalledWith(value);
    expect(refB.current).toBe(value);
  });
});
