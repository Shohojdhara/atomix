import React from 'react';

/**
 * Utility to merge multiple React refs into one
 */
export function setRef<T>(
  ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null,
  value: T | null
): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    // This is safe because we're checking that ref exists first
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ref as any).current = value;
  }
}

/**
 * Combines two React refs into a single ref function
 * This is used when you need to use and forward a ref at the same time
 */
export default function useForkRef<T>(
  refA: React.Ref<T> | null,
  refB: React.Ref<T> | null
): React.RefCallback<T> | null {
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    
    return (refValue: T | null) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
