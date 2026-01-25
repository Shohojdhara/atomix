/**
 * Testing Templates
 * Templates for component testing
 */

/**
 * Vitest test template for React components
 */
export const testTemplate = (name) => `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  it('renders children correctly', () => {
    render(<${name}>Test Content</${name}>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
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
  
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<${name} ref={ref}>Content</${name}>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
`;

/**
 * Testing templates object
 */
export const testingTemplates = {
  test: testTemplate,
};