import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Breadcrumb } from './Breadcrumb';
import React from 'react';

describe('Breadcrumb Component', () => {
  it('renders correctly with legacy items prop', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Current', active: true },
    ];
    render(<Breadcrumb items={items} />);

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products');
    expect(screen.getByText('Current').closest('span')).toBeInTheDocument();
  });

  it('renders correctly with compound components', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
        <Breadcrumb.Item active>Current</Breadcrumb.Item>
      </Breadcrumb>
    );

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Products').closest('a')).toHaveAttribute('href', '/products');
    expect(screen.getByText('Current').closest('span')).toBeInTheDocument();
  });

  it('handles click events in compound components', () => {
    const handleClick = vi.fn();
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="#" onClick={handleClick} active={false}>
          Click Me
        </Breadcrumb.Item>
        <Breadcrumb.Item>Current</Breadcrumb.Item>
      </Breadcrumb>
    );

    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports custom LinkComponent in compound components', () => {
    const CustomLink = ({ href, children, ...props }: any) => (
      <a href={href} data-testid="custom-link" {...props}>
        {children} (Custom)
      </a>
    );

    render(
      <Breadcrumb LinkComponent={CustomLink}>
        <Breadcrumb.Item href="/custom">Link</Breadcrumb.Item>
        <Breadcrumb.Item>Current</Breadcrumb.Item>
      </Breadcrumb>
    );

    const link = screen.getByTestId('custom-link');
    expect(link).toHaveAttribute('href', '/custom');
    expect(link).toHaveTextContent('Link (Custom)');
  });

  it('supports explicit linkAs prop on Item', () => {
     const CustomLink = ({ href, children, ...props }: any) => (
      <a href={href} data-testid="item-custom-link" {...props}>
        {children}
      </a>
    );

    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/explicit" linkAs={CustomLink} active={false}>Explicit</Breadcrumb.Item>
        <Breadcrumb.Item>Current</Breadcrumb.Item>
      </Breadcrumb>
    );

    expect(screen.getByTestId('item-custom-link')).toHaveAttribute('href', '/explicit');
  });
});
