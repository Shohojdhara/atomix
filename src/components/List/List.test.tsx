import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { List } from './List';

describe('List Component', () => {
  it('renders legacy items wrapped in li', () => {
    render(
      <List>
        <span>Item 1</span>
        <span>Item 2</span>
      </List>
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Item 1');
    expect(listItems[0]).toHaveClass('c-list__item');
  });

  it('renders List.Item components directly', () => {
    render(
      <List>
        <List.Item>Item 1</List.Item>
        <List.Item className="custom-class">Item 2</List.Item>
      </List>
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Item 1');
    expect(listItems[0]).toHaveClass('c-list__item');
    expect(listItems[1]).toHaveTextContent('Item 2');
    expect(listItems[1]).toHaveClass('c-list__item');
    expect(listItems[1]).toHaveClass('custom-class');
  });

  it('renders mixed content correctly', () => {
    render(
      <List>
        <List.Item>Compound Item</List.Item>
        <span>Legacy Item</span>
      </List>
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent('Compound Item');
    expect(listItems[1]).toHaveTextContent('Legacy Item');
  });

  it('renders ordered list when variant is number', () => {
    render(
      <List variant="number">
        <List.Item>Item 1</List.Item>
      </List>
    );

    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
  });
});
