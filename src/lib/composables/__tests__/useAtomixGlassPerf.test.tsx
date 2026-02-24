import React, { useRef } from 'react';
import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAtomixGlass } from '../useAtomixGlass';

describe('useAtomixGlass Performance', () => {
  let renderCount = 0;
  let glassRefOut: React.RefObject<HTMLDivElement> | null = null;

  const TestComponent = () => {
    renderCount++;
    const glassRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    glassRefOut = glassRef;

    useAtomixGlass({
      glassRef,
      contentRef,
      elasticity: 0.1, // Ensure elasticity so transform changes
    });

    return (
      <div ref={glassRef} style={{ width: 200, height: 100 }}>
        <div ref={contentRef}>Content</div>
      </div>
    );
  };

  beforeEach(() => {
    renderCount = 0;
    glassRefOut = null;
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 200,
      height: 100,
      top: 0,
      left: 0,
      bottom: 100,
      right: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    }));
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('does not re-render on mouse move but updates styles', async () => {
    render(<TestComponent />);

    // Run initial effects
    await act(async () => {
      vi.runAllTimers();
    });

    const countAfterSetup = renderCount;
    const initialTransform = glassRefOut?.current?.style.transform;
    console.log(`Initial transform: ${initialTransform}`);

    // Simulate mouse move
    const moveEvent = new MouseEvent('mousemove', {
      clientX: 50,
      clientY: 50,
      bubbles: true,
    });

    await act(async () => {
      document.dispatchEvent(moveEvent);
      vi.runAllTimers();
    });

    console.log(`Render count: ${renderCount}`);

    // Expect NO re-render
    expect(renderCount).toBe(countAfterSetup);

    // Expect style update
    const finalTransform = glassRefOut?.current?.style.transform;
    console.log(`Final transform: ${finalTransform}`);

    expect(finalTransform).not.toBe(initialTransform);
    expect(finalTransform).toContain('translate');
  });
});
