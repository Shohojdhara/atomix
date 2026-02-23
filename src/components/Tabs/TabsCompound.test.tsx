import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tabs } from './Tabs';
import React from 'react';

describe('Tabs Component', () => {
  it('renders correctly with legacy props', () => {
    const items = [
      { label: 'Tab 1', content: 'Content 1' },
      { label: 'Tab 2', content: 'Content 2' },
    ];
    render(<Tabs items={items} />);

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeVisible();

    // Content 2 is rendered but hidden
    const content2 = screen.getByText('Content 2').closest('.c-tabs__panel');
    expect(content2).toHaveStyle({ height: '0px', opacity: '0' });
  });

  it('renders correctly with compound components', () => {
    render(
      <Tabs>
        <Tabs.List>
          <Tabs.Trigger index={0}>Tab 1</Tabs.Trigger>
          <Tabs.Trigger index={1}>Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel index={0}>Content 1</Tabs.Panel>
          <Tabs.Panel index={1}>Content 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );

    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('switches tabs in compound mode', () => {
    render(
      <Tabs>
        <Tabs.List>
          <Tabs.Trigger index={0}>Tab 1</Tabs.Trigger>
          <Tabs.Trigger index={1}>Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel index={0}>Content 1</Tabs.Panel>
          <Tabs.Panel index={1}>Content 2</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );

    fireEvent.click(screen.getByText('Tab 2'));

    const content1 = screen.getByText('Content 1').closest('.c-tabs__panel');
    const content2 = screen.getByText('Content 2').closest('.c-tabs__panel');

    expect(content1).toHaveStyle({ height: '0px', opacity: '0' });
    expect(content2).toHaveStyle({ height: 'auto', opacity: '1' });
  });
});
