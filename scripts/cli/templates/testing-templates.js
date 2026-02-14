/**
 * Enhanced Testing Templates
 * Comprehensive test templates with accessibility and advanced patterns
 */

/**
 * Enhanced Vitest test template for React components
 */
export const testTemplate = (name) => `import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ${name} } from './${name}';

// Extend Vitest matchers
expect.extend(toHaveNoViolations);

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

describe('${name}', () => {
  // Accessibility Tests
  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<${name}>Accessible Content</${name}>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper aria attributes', () => {
      render(<${name} aria-label="Test component">Content</${name}>);
      const element = screen.getByLabelText('Test component');
      expect(element).toBeInTheDocument();
    });

    it('should support keyboard navigation', () => {
      render(<${name}>Focusable Content</${name}>);
      const element = screen.getByText('Focusable Content');
      element.focus();
      expect(element).toHaveFocus();
    });
  });

  // Rendering Tests
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<${name}>Test Content</${name}>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies className prop', () => {
      const { container } = render(<${name} className="custom-class">Content</${name}>);
      const element = container.firstChild;
      expect(element).toHaveClass('custom-class');
    });

    it('renders with custom attributes', () => {
      render(<${name} data-testid="test-${name.toLowerCase()}">Content</${name}>);
      expect(screen.getByTestId('test-${name.toLowerCase()}')).toBeInTheDocument();
    });
  });

  // Props Tests
  describe('Props', () => {
    it('applies size variant classes', () => {
      const { container } = render(<${name} size="lg">Content</${name}>);
      const element = container.firstChild;
      expect(element).toHaveClass('c-${name.toLowerCase()}--lg');
    });

    it('handles disabled state', () => {
      const { container } = render(<${name} disabled>Content</${name}>);
      const element = container.firstChild;
      expect(element).toHaveAttribute('aria-disabled', 'true');
      expect(element).toHaveClass('is-disabled');
    });

    it('passes through data attributes', () => {
      const { container } = render(<${name} data-custom="value">Content</${name}>);
      const element = container.firstChild;
      expect(element).toHaveAttribute('data-custom', 'value');
    });
  });

  // Event Handling Tests
  describe('Event Handling', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      render(<${name} onClick={handleClick}>Clickable</${name}>);
      
      fireEvent.click(screen.getByText('Clickable'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<${name} onClick={handleClick} disabled>Disabled</${name}>);
      
      fireEvent.click(screen.getByText('Disabled'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles mouse events', () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      
      render(
        <${name} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Hoverable
        </${name}>
      );
      
      const element = screen.getByText('Hoverable');
      fireEvent.mouseEnter(element);
      fireEvent.mouseLeave(element);
      
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  // Ref Forwarding Tests
  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<${name} ref={ref}>Content</${name}>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('allows imperative methods access', () => {
      const ref = React.createRef<{ focus: () => void }>();
      render(<${name} ref={ref}>Focusable</${name}>);
      
      // Assuming component exposes focus method
      if (ref.current && ref.current.focus) {
        const spy = vi.spyOn(ref.current, 'focus');
        ref.current.focus();
        expect(spy).toHaveBeenCalled();
      }
    });
  });

  // Performance Tests
  describe('Performance', () => {
    it('renders efficiently without unnecessary re-renders', () => {
      const renderSpy = vi.fn();
      const TestWrapper = () => {
        renderSpy();
        return <${name}>Performance Test</${name}>;
      };
      
      render(<TestWrapper />);
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      const { container } = render(<${name}></${name}>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles null children', () => {
      const { container } = render(<${name}>{null}</${name}>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles undefined props', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<${name} size={undefined}>Content</${name}>);
      }).not.toThrow();
      
      consoleSpy.mockRestore();
    });
  });

  // Async Behavior Tests
  describe('Async Behavior', () => {
    it('handles async state changes', async () => {
      const AsyncComponent = () => {
        const [loaded, setLoaded] = React.useState(false);
        
        React.useEffect(() => {
          setTimeout(() => setLoaded(true), 100);
        }, []);
        
        return <${name}>{loaded ? 'Loaded' : 'Loading...'}</${name}>;
      };
      
      render(<AsyncComponent />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 150));
      });
      
      expect(screen.getByText('Loaded')).toBeInTheDocument();
    });
  });
});
`;

/**
 * Testing templates object
 */
export const testingTemplates = {
  test: testTemplate,
};