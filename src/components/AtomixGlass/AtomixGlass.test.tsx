import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import AtomixGlass from './AtomixGlass';

// Mock the ShaderDisplacementGenerator since it uses browser APIs
vi.mock('./shader-utils', () => ({
  ShaderDisplacementGenerator: class MockShaderDisplacementGenerator {
    updateShader() {
      return 'data:image/png;base64,mockBase64String';
    }
    destroy() {}
  },
  fragmentShaders: {
    liquidGlass: vi.fn(),
  },
}));

describe('AtomixGlass Component', () => {
  test('renders children correctly', () => {
    render(
      <AtomixGlass>
        <div data-testid="test-content">Test Content</div>
      </AtomixGlass>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(
      <AtomixGlass className="custom-class">
        <div>Content</div>
      </AtomixGlass>
    );

    expect(container.querySelector('.c-atomix-glass__container')).toHaveClass('custom-class');
  });

  test('renders with showHoverEffects enabled', () => {
    render(
      <AtomixGlass>
        <div>Test Content</div>
      </AtomixGlass>
    );

    // Check that hover effects are enabled
    expect(screen.getByTestId('atomix-glass')).toHaveAttribute('data-hover-effects', 'true');
  });

  test('applies clickable class when onClick is provided', () => {
    const handleClick = vi.fn();
    const { container } = render(
      <AtomixGlass onClick={handleClick}>
        <div>Content</div>
      </AtomixGlass>
    );

    expect(container.querySelector('.c-atomix-glass__container')).toHaveClass(
      'c-atomix-glass__container--clickable'
    );
  });

  test('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(
      <AtomixGlass onClick={handleClick}>
        <div>Content</div>
      </AtomixGlass>
    );

    await userEvent.click(screen.getByText('Content'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies overLight class when overLight prop is true', () => {
    const { container } = render(
      <AtomixGlass overLight={true}>
        <div>Content</div>
      </AtomixGlass>
    );

    expect(container.querySelector('.c-atomix-glass__container')).toHaveClass(
      'c-atomix-glass__container--over-light'
    );
  });

  test('does not apply overLight class when overLight prop is false', () => {
    const { container } = render(
      <AtomixGlass overLight={false}>
        <div>Content</div>
      </AtomixGlass>
    );

    expect(container.querySelector('.c-atomix-glass__container')).not.toHaveClass(
      'c-atomix-glass__container--over-light'
    );
  });

  test('handles overLight="auto" mode', () => {
    // Mock window.getComputedStyle to simulate a light background
    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = vi.fn(() => ({
      backgroundColor: 'rgb(255, 255, 255)',
      backgroundImage: 'none',
    })) as any;

    const { container } = render(
      <AtomixGlass overLight="auto">
        <div>Content</div>
      </AtomixGlass>
    );

    // Note: Auto-detection happens asynchronously, so we can't immediately test
    // but we can verify the component renders without errors
    expect(container.querySelector('.c-atomix-glass__container')).toBeInTheDocument();

    // Restore original
    window.getComputedStyle = originalGetComputedStyle;
  });

  test('handles overLight object config', () => {
    const { container } = render(
      <AtomixGlass
        overLight={{
          threshold: 0.8,
          opacity: 0.5,
          contrast: 1.5,
          brightness: 1.1,
          saturationBoost: 1.8,
        }}
      >
        <div>Content</div>
      </AtomixGlass>
    );

    // Verify component renders with object config
    expect(container.querySelector('.c-atomix-glass__container')).toBeInTheDocument();
  });

  test('handles invalid overLight object config values gracefully', () => {
    const { container } = render(
      <AtomixGlass
        overLight={{
          threshold: NaN,
          opacity: -1,
          contrast: Infinity,
          brightness: -100,
          saturationBoost: 'invalid' as any,
        }}
      >
        <div>Content</div>
      </AtomixGlass>
    );

    // Should render without errors, using default/validated values
    expect(container.querySelector('.c-atomix-glass__container')).toBeInTheDocument();
  });

  test('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = render(
      <AtomixGlass style={customStyle}>
        <div>Content</div>
      </AtomixGlass>
    );

    const glassContainer = container.querySelector('.c-atomix-glass__container');
    expect(glassContainer).toHaveStyle('background-color: red');
  });

  test('uses standard mode by default', () => {
    const { container } = render(
      <AtomixGlass>
        <div>Content</div>
      </AtomixGlass>
    );

    // Check if the filter element exists
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('handles mouse events correctly', async () => {
    const handleMouseEnter = vi.fn();
    const handleMouseLeave = vi.fn();
    const handleMouseDown = vi.fn();
    const handleMouseUp = vi.fn();

    render(
      <AtomixGlass
        onClick={() => {
          handleMouseEnter();
          handleMouseLeave();
          handleMouseDown();
          handleMouseUp();
        }}
      >
        <div>Content</div>
      </AtomixGlass>
    );

    const glassContent = screen.getByText('Content').parentElement;
    if (!glassContent) throw new Error('Glass content not found');

    await userEvent.hover(glassContent);
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);

    await userEvent.unhover(glassContent);
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);

    await userEvent.pointer([{ keys: '[MouseLeft>]', target: glassContent }]);
    expect(handleMouseDown).toHaveBeenCalledTimes(1);

    await userEvent.pointer([{ keys: '[/MouseLeft]', target: glassContent }]);
    expect(handleMouseUp).toHaveBeenCalledTimes(1);
  });
});

// Visual regression tests
// Keep only a single smoke snapshot to detect catastrophic DOM changes.
describe('AtomixGlass Visual Regression', () => {
  test('matches snapshot with default props', () => {
    const { container } = render(
      <AtomixGlass>
        <div>Default Glass</div>
      </AtomixGlass>
    );

    expect(container).toMatchSnapshot();
  });
});
