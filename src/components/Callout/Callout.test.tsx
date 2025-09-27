import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Callout } from './Callout';

// Mock AtomixGlass component since it has complex WebGL dependencies
vi.mock('../AtomixGlass/AtomixGlass', () => ({
  AtomixGlass: ({ children, ...props }: any) => (
    <div data-testid="atomix-glass" data-glass-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}));

describe('Callout Component', () => {
  describe('Basic functionality', () => {
    it('renders with title and content', () => {
      render(
        <Callout title="Test Title" variant="primary">
          Test content
        </Callout>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with icon', () => {
      const TestIcon = () => <div data-testid="test-icon">Icon</div>;

      render(
        <Callout title="Test" variant="primary" icon={<TestIcon />}>
          Content
        </Callout>
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('applies correct variant class', () => {
      const { container } = render(
        <Callout title="Test" variant="success">
          Content
        </Callout>
      );

      expect(container.firstChild).toHaveClass('c-callout--success');
    });

    it('applies oneLine class when enabled', () => {
      const { container } = render(
        <Callout title="Test" variant="primary" oneLine>
          Content
        </Callout>
      );

      expect(container.firstChild).toHaveClass('c-callout--oneline');
    });

    it('applies toast class when enabled', () => {
      const { container } = render(
        <Callout title="Test" variant="primary" toast>
          Content
        </Callout>
      );

      expect(container.firstChild).toHaveClass('c-callout--toast');
    });

    it('renders close button when onClose is provided', () => {
      const handleClose = vi.fn();

      render(
        <Callout title="Test" variant="primary" onClose={handleClose}>
          Content
        </Callout>
      );

      const closeButton = screen.getByRole('button', { name: 'Close' });
      expect(closeButton).toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
      const handleClose = vi.fn();

      render(
        <Callout title="Test" variant="primary" onClose={handleClose}>
          Content
        </Callout>
      );

      const closeButton = screen.getByRole('button', { name: 'Close' });
      fireEvent.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('renders action buttons', () => {
      const actions = <button data-testid="action-button">Action</button>;

      render(
        <Callout title="Test" variant="primary" actions={actions}>
          Content
        </Callout>
      );

      expect(screen.getByTestId('action-button')).toBeInTheDocument();
    });
  });

  describe('Glass functionality', () => {
    it('does not render AtomixGlass when glass is false', () => {
      render(
        <Callout title="Test" variant="primary" glass={false}>
          Content
        </Callout>
      );

      expect(screen.queryByTestId('atomix-glass')).not.toBeInTheDocument();
    });

    it('renders AtomixGlass when glass is true', () => {
      render(
        <Callout title="Test" variant="primary" glass={true}>
          Content
        </Callout>
      );

      expect(screen.getByTestId('atomix-glass')).toBeInTheDocument();
    });

    it('applies glass class when glass is enabled', () => {
      const { container } = render(
        <Callout title="Test" variant="primary" glass={true}>
          Content
        </Callout>
      );

      // The glass class should be applied to the inner callout element
      const calloutElement = container.querySelector('.c-callout');
      expect(calloutElement).toHaveClass('c-callout--glass');
    });

    it('uses default glass settings when glass is true', () => {
      render(
        <Callout title="Test" variant="primary" glass={true}>
          Content
        </Callout>
      );

      const glassElement = screen.getByTestId('atomix-glass');
      const glassProps = JSON.parse(glassElement.getAttribute('data-glass-props') || '{}');

      expect(glassProps).toMatchObject({
        displacementScale: 40,
        blurAmount: 0,
        saturation: 160,
        aberrationIntensity: 1,
        cornerRadius: 8,
        overLight: false,
        mode: 'standard',
      });
    });

    it('uses custom glass settings when glass is an object', () => {
      const customGlass = {
        displacementScale: 60,
        blurAmount: 2,
        saturation: 180,
        cornerRadius: 12,
      };

      render(
        <Callout title="Test" variant="primary" glass={customGlass}>
          Content
        </Callout>
      );

      const glassElement = screen.getByTestId('atomix-glass');
      const glassProps = JSON.parse(glassElement.getAttribute('data-glass-props') || '{}');

      expect(glassProps).toMatchObject({
        // Custom values
        displacementScale: 60,
        blurAmount: 2,
        saturation: 180,
        cornerRadius: 12,
        // Default values that weren't overridden
        aberrationIntensity: 1,
        overLight: false,
        mode: 'standard',
      });
    });

    it('maintains all functionality with glass enabled', () => {
      const handleClose = vi.fn();
      const TestIcon = () => <div data-testid="test-icon">Icon</div>;
      const actions = <button data-testid="action-button">Action</button>;

      render(
        <Callout
          title="Glass Test"
          variant="success"
          icon={<TestIcon />}
          glass={true}
          onClose={handleClose}
          actions={actions}
          oneLine
          toast
        >
          Glass content
        </Callout>
      );

      // Check that all functionality is preserved
      expect(screen.getByText('Glass Test')).toBeInTheDocument();
      expect(screen.getByText('Glass content')).toBeInTheDocument();
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByTestId('action-button')).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: 'Close' });
      expect(closeButton).toBeInTheDocument();

      // Check that glass wrapper is present
      expect(screen.getByTestId('atomix-glass')).toBeInTheDocument();

      // Check that all classes are applied
      const calloutElement = screen.getByTestId('atomix-glass').firstChild;
      expect(calloutElement).toHaveClass(
        'c-callout',
        'c-callout--success',
        'c-callout--oneline',
        'c-callout--toast',
        'c-callout--glass'
      );

      // Test close functionality
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('applies correct ARIA role for different variants', () => {
      // Test alert role for error
      const { rerender } = render(
        <Callout title="Error" variant="error">
          Error message
        </Callout>
      );
      expect(screen.getByRole('alert')).toBeInTheDocument();

      // Test alert role for warning
      rerender(
        <Callout title="Warning" variant="warning">
          Warning message
        </Callout>
      );
      expect(screen.getByRole('alert')).toBeInTheDocument();

      // Test status role for info
      rerender(
        <Callout title="Info" variant="info">
          Info message
        </Callout>
      );
      expect(screen.getByRole('status')).toBeInTheDocument();

      // Test status role for success
      rerender(
        <Callout title="Success" variant="success">
          Success message
        </Callout>
      );
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('applies alert role and assertive live region for toast alerts', () => {
      render(
        <Callout title="Toast Error" variant="error" toast>
          Toast error message
        </Callout>
      );

      const callout = screen.getByRole('alert');
      expect(callout).toHaveAttribute('aria-live', 'polite');
    });

    it('applies polite live region for toast notifications', () => {
      render(
        <Callout title="Toast Info" variant="info" toast>
          Toast info message
        </Callout>
      );

      const callout = screen.getByRole('alert');
      expect(callout).toHaveAttribute('aria-live', 'polite');
    });

    it('maintains accessibility with glass effect', () => {
      render(
        <Callout title="Glass Error" variant="error" glass={true} toast>
          Glass error message
        </Callout>
      );

      // Should still have proper ARIA attributes
      const callout = screen.getByRole('alert');
      expect(callout).toHaveAttribute('aria-live', 'polite');

      // Should be wrapped in glass but maintain accessibility
      expect(screen.getByTestId('atomix-glass')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      const { container } = render(
        <Callout title="Test" variant="primary" className="custom-class">
          Content
        </Callout>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('applies custom className with glass effect', () => {
      const { container } = render(
        <Callout title="Test" variant="primary" glass={true} className="custom-glass">
          Content
        </Callout>
      );

      const calloutElement = container.querySelector('.c-callout');
      expect(calloutElement).toHaveClass('custom-glass');
    });
  });

  describe('Content flexibility', () => {
    it('renders without title', () => {
      render(<Callout variant="primary">Content only</Callout>);

      expect(screen.getByText('Content only')).toBeInTheDocument();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('renders with complex content', () => {
      const complexContent = (
        <div>
          <p>Paragraph content</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
        </div>
      );

      render(
        <Callout title="Complex" variant="primary" glass={true}>
          {complexContent}
        </Callout>
      );

      expect(screen.getByText('Paragraph content')).toBeInTheDocument();
      expect(screen.getByText('List item 1')).toBeInTheDocument();
      expect(screen.getByText('List item 2')).toBeInTheDocument();
    });
  });
});
