import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useHistory } from '../useHistory';

describe('useHistory', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useHistory({ initialState: 'initial' }));

    expect(result.current.state).toBe('initial');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(result.current.getHistoryStats()).toEqual({ currentIndex: 0, totalEntries: 1 });
  });

  it('updates state and history on setState', () => {
    const { result } = renderHook(() => useHistory({ initialState: 'initial' }));

    act(() => {
      result.current.setState('step 1');
    });

    expect(result.current.state).toBe('step 1');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
    expect(result.current.getHistoryStats()).toEqual({ currentIndex: 1, totalEntries: 2 });
  });

  it('handles undo correctly', () => {
    const { result } = renderHook(() => useHistory({ initialState: 'initial' }));

    act(() => {
      result.current.setState('step 1');
    });

    act(() => {
      result.current.undo();
    });

    expect(result.current.state).toBe('initial');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(true);
    expect(result.current.getHistoryStats()).toEqual({ currentIndex: 0, totalEntries: 2 });
  });

  it('handles redo correctly', () => {
    const { result } = renderHook(() => useHistory({ initialState: 'initial' }));

    act(() => {
      result.current.setState('step 1');
    });

    act(() => {
      result.current.undo();
    });

    act(() => {
      result.current.redo();
    });

    expect(result.current.state).toBe('step 1');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
    expect(result.current.getHistoryStats()).toEqual({ currentIndex: 1, totalEntries: 2 });
  });

  it('truncates future history when setState is called after undo', () => {
    const { result } = renderHook(() => useHistory({ initialState: 'initial' }));

    act(() => {
      result.current.setState('step 1');
    });
    act(() => {
      result.current.setState('step 2');
    });
    act(() => {
      result.current.undo();
    });

    expect(result.current.state).toBe('step 1');

    act(() => {
      result.current.setState('step 1.5');
    });

    expect(result.current.state).toBe('step 1.5');
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
    expect(result.current.getHistoryStats()).toEqual({ currentIndex: 2, totalEntries: 3 });
  });

  it('respects maxHistorySize limit', () => {
    const { result } = renderHook(() => useHistory({ initialState: '0', maxHistorySize: 3 }));

    act(() => { result.current.setState('1'); });
    act(() => { result.current.setState('2'); });
    act(() => { result.current.setState('3'); });
    act(() => { result.current.setState('4'); });

    // If maxHistorySize is 3, then total entries should be 3.
    expect(result.current.state).toBe('4');
    expect(result.current.getHistoryStats().totalEntries).toBe(3);
    expect(result.current.getHistoryStats().currentIndex).toBe(2);

    // Test that the oldest state has been removed by attempting to undo completely
    act(() => { result.current.undo(); }); // state: 3
    act(() => { result.current.undo(); }); // state: 2
    expect(result.current.state).toBe('2');
    expect(result.current.canUndo).toBe(false);
  });

  it('handles clearHistory', () => {
    const { result } = renderHook(() => useHistory({ initialState: 'initial' }));

    act(() => { result.current.setState('step 1'); });
    act(() => { result.current.setState('step 2'); });

    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.state).toBe('step 2');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(result.current.getHistoryStats()).toEqual({ currentIndex: 0, totalEntries: 1 });
  });

  it('does nothing when undoing at beginning of history', () => {
    const { result } = renderHook(() => useHistory({ initialState: 'initial' }));

    act(() => {
      result.current.undo();
    });

    expect(result.current.state).toBe('initial');
  });

  it('does nothing when redoing at end of history', () => {
    const { result } = renderHook(() => useHistory({ initialState: 'initial' }));

    act(() => {
      result.current.setState('step 1');
    });

    act(() => {
      result.current.redo();
    });

    expect(result.current.state).toBe('step 1');
  });
});
