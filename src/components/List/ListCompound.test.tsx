import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { List } from './List';
import React from 'react';

describe('List Component', () => {
  it('renders correctly with legacy children (implicit wrap)', () => {
    render(
      <List>
        <span>Item 1</span>
        <span>Item 2</span>
      </List>
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Item 1');
    expect(items[1]).toHaveTextContent('Item 2');
    // Verify implicit wrapping
    // The items should be <li> containing the span
    expect(items[0].tagName).toBe('LI');
    expect(items[0].querySelector('span')).toBeInTheDocument();
  });

  it('renders correctly with List.Item (explicit wrap)', () => {
    render(
      <List>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
      </List>
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Item 1');
    expect(items[1]).toHaveTextContent('Item 2');
    // Verify NO double wrapping
    // If double wrapped, we'd have listitem inside listitem or similar
    // The items themselves ARE the list items
    expect(items[0].parentElement?.tagName).toBe('UL');
  });

  it('supports mixed content (legacy and compound)', () => {
    render(
      <List>
        <span>Legacy Item</span>
        <List.Item>Compound Item</List.Item>
      </List>
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('Legacy Item');
    expect(items[1]).toHaveTextContent('Compound Item');
  });

  it('supports custom props on List.Item', () => {
    render(
      <List>
        <List.Item className="custom-class" data-testid="custom-item">Custom</List.Item>
      </List>
    );

    const item = screen.getByTestId('custom-item');
    expect(item).toHaveClass('custom-class');
    expect(item).toHaveClass('c-list__item'); // Base class should remain
  });
});
