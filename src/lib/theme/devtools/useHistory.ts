/**
 * useHistory Hook
 * 
 * React hook for managing undo/redo history
 */

import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseHistoryOptions {
  /** Maximum number of history entries (default: 50) */
  maxHistorySize?: number;
  /** Initial state */
  initialState?: any;
}

export interface UseHistoryReturn<T> {
  /** Current state */
  state: T;
  /** Update state and add to history */
  setState: (newState: T) => void;
  /** Undo last change */
  undo: () => void;
  /** Redo last undone change */
  redo: () => void;
  /** Check if undo is available */
  canUndo: boolean;
  /** Check if redo is available */
  canRedo: boolean;
  /** Clear history */
  clearHistory: () => void;
  /** Get history statistics */
  getHistoryStats: () => { currentIndex: number; totalEntries: number };
}

/**
 * useHistory hook
 * 
 * Provides undo/redo functionality for state management
 * 
 * @example
 * ```tsx
 * const { state, setState, undo, redo, canUndo, canRedo } = useHistory({
 *   initialState: theme,
 *   maxHistorySize: 50
 * });
 * ```
 */
export function useHistory<T>(options: UseHistoryOptions = {}): UseHistoryReturn<T> {
  const { maxHistorySize = 50, initialState } = options;
  
  const [state, setStateInternal] = useState<T>(initialState as T);
  const historyRef = useRef<T[]>([initialState as T]);
  const currentIndexRef = useRef<number>(0);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const updateHistoryState = useCallback(() => {
    setCanUndo(currentIndexRef.current > 0);
    setCanRedo(currentIndexRef.current < historyRef.current.length - 1);
  }, []);

  const setState = useCallback((newState: T) => {
    // Remove any future history if we're not at the end
    if (currentIndexRef.current < historyRef.current.length - 1) {
      historyRef.current = historyRef.current.slice(0, currentIndexRef.current + 1);
    }

    // Add new state to history
    historyRef.current.push(newState);
    currentIndexRef.current = historyRef.current.length - 1;

    // Limit history size
    if (historyRef.current.length > maxHistorySize) {
      historyRef.current.shift();
      currentIndexRef.current--;
    }

    setStateInternal(newState);
    updateHistoryState();
  }, [maxHistorySize, updateHistoryState]);

  const undo = useCallback(() => {
    if (currentIndexRef.current > 0) {
      currentIndexRef.current--;
      const previousState = historyRef.current[currentIndexRef.current];
      setStateInternal(previousState as T);
      updateHistoryState();
    }
  }, [updateHistoryState]);

  const redo = useCallback(() => {
    if (currentIndexRef.current < historyRef.current.length - 1) {
      currentIndexRef.current++;
      const nextState = historyRef.current[currentIndexRef.current];
      setStateInternal(nextState as T);
      updateHistoryState();
    }
  }, [updateHistoryState]);

  const clearHistory = useCallback(() => {
    const currentState = historyRef.current[currentIndexRef.current];
    historyRef.current = [currentState as T];
    currentIndexRef.current = 0;
    updateHistoryState();
  }, [updateHistoryState]);

  const getHistoryStats = useCallback(() => {
    return {
      currentIndex: currentIndexRef.current,
      totalEntries: historyRef.current.length,
    };
  }, []);

  // Initialize undo/redo state
  useEffect(() => {
    updateHistoryState();
  }, [updateHistoryState]);

  return {
    state,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
    getHistoryStats,
  };
}

