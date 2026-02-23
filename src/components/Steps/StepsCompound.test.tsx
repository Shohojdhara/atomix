import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Steps } from './Steps';
import React from 'react';

describe('Steps Component', () => {
  it('renders correctly with legacy items prop', () => {
    const items = [
      { number: 1, text: 'Step 1' },
      { number: 2, text: 'Step 2' },
      { number: 3, text: 'Step 3' },
    ];
    render(<Steps items={items} activeIndex={1} />);

    // Step 1: active (<= 1) and completed (< 1)
    const step1 = screen.getByText('Step 1').closest('.c-steps__item');
    expect(step1).toHaveClass('is-active');
    expect(step1).toHaveClass('is-completed');

    // Step 2: active (<= 1) and NOT completed (>= 1)
    const step2 = screen.getByText('Step 2').closest('.c-steps__item');
    expect(step2).toHaveClass('is-active');
    expect(step2).not.toHaveClass('is-completed');

    // Step 3: NOT active (> 1)
    const step3 = screen.getByText('Step 3').closest('.c-steps__item');
    expect(step3).not.toHaveClass('is-active');
  });

  it('renders correctly with compound components', () => {
    render(
      <Steps activeIndex={1}>
        <Steps.Item title="Step 1">Content 1</Steps.Item>
        <Steps.Item title="Step 2">Content 2</Steps.Item>
        <Steps.Item title="Step 3">Content 3</Steps.Item>
      </Steps>
    );

    // Verify titles
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();

    // Verify content
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    // Step 1: active and completed (inferred from activeIndex 1)
    const step1 = screen.getByText('Step 1').closest('.c-steps__item');
    expect(step1).toHaveClass('is-active');
    expect(step1).toHaveClass('is-completed');

    // Step 2: active and NOT completed
    const step2 = screen.getByText('Step 2').closest('.c-steps__item');
    expect(step2).toHaveClass('is-active');
    expect(step2).not.toHaveClass('is-completed');

    // Step 3: NOT active
    const step3 = screen.getByText('Step 3').closest('.c-steps__item');
    expect(step3).not.toHaveClass('is-active');

    // Verify automatic numbering
    expect(step1?.querySelector('.c-steps__number')).toHaveTextContent('1');
    expect(step2?.querySelector('.c-steps__number')).toHaveTextContent('2');
    expect(step3?.querySelector('.c-steps__number')).toHaveTextContent('3');
  });

  it('supports explicit props on Steps.Item', () => {
    render(
      <Steps>
        <Steps.Item title="Custom Step" number="A" active completed>
          Custom Content
        </Steps.Item>
      </Steps>
    );

    const step = screen.getByText('Custom Step').closest('.c-steps__item');
    expect(step).toHaveClass('is-active');
    expect(step).toHaveClass('is-completed');
    expect(step?.querySelector('.c-steps__number')).toHaveTextContent('A');
  });
});
