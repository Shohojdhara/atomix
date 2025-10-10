import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AtomixGlass from './AtomixGlass';

// Mock the ShaderDisplacementGenerator since it uses browser APIs
jest.mock('./shader-utils', () => ({
  ShaderDisplacementGenerator: class MockShaderDisplacementGenerator {
    updateShader() {
      return 'data:image/png;base64,mockBase64String';
    }
    destroy() {}
  },
  fragmentShaders: {
    liquidGlass: jest.fn(),
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
    
    expect(container.querySelector('.c-glass-container')).toHaveClass('custom-class');
  });

  test('renders with showHoverEffects enabled', () => {
    render(
      <AtomixGlass >
        <div>Test Content</div>
      </AtomixGlass>
    );
    
    // Check that hover effects are enabled
    expect(screen.getByTestId('atomix-glass')).toHaveAttribute('data-hover-effects', 'true');
  });

  test('applies clickable class when onClick is provided', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <AtomixGlass onClick={handleClick}>
        <div>Content</div>
      </AtomixGlass>
    );
    
    expect(container.querySelector('.c-glass-container')).toHaveClass('c-glass-container--clickable');
  });

  test('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
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
    
    expect(container.querySelector('.c-glass-container')).toHaveClass('c-glass-container--over-light');
  });

  test('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { container } = render(
      <AtomixGlass style={customStyle}>
        <div>Content</div>
      </AtomixGlass>
    );
    
    const glassContainer = container.querySelector('.c-glass-container');
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
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    const handleMouseDown = jest.fn();
    const handleMouseUp = jest.fn();
    
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
describe('AtomixGlass Visual Regression', () => {
  test('matches snapshot with default props', () => {
    const { container } = render(
      <AtomixGlass>
        <div>Default Glass</div>
      </AtomixGlass>
    );
    
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with custom props', () => {
    const { container } = render(
      <AtomixGlass
        displacementScale={30}
        blurAmount={15}
        saturation={200}
        aberrationIntensity={3}
        cornerRadius={15}
        overLight={true}
        mode="polar"
      >
        <div>Custom Glass</div>
      </AtomixGlass>
    );
    
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with shader mode', () => {
    const { container } = render(
      <AtomixGlass
        mode="shader"
        displacementScale={25}
        blurAmount={12}
        saturation={180}
        aberrationIntensity={2}
      >
        <div>Shader Glass</div>
      </AtomixGlass>
    );
    
    expect(container).toMatchSnapshot();
  });

  test('matches snapshot with showHoverEffects', () => {
      const { container } = render(
        <AtomixGlass>
          <div>Glass with Hover Effects</div>
        </AtomixGlass>
      );
      
      expect(container).toMatchSnapshot();
    });
});