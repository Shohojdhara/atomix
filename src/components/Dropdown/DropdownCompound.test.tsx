import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dropdown } from './Dropdown';
import React from 'react';

describe('Dropdown Component', () => {
  it('renders correctly with legacy props', () => {
    // In legacy mode, `menu` prop content is rendered inside the dropdown wrapper.
    // The dropdown wrapper uses CSS visibility/opacity/display to hide the menu when not open.
    // `toBeVisible` checks if the element is visible to the user.
    // However, if the menu is just visually hidden via CSS classes (e.g. opacity: 0),
    // jest-dom might consider it visible if display is not none and visibility is not hidden.
    // Let's check if the wrapper has `is-open` class.

    const { container } = render(
      <Dropdown menu={<Dropdown.Item>Item 1</Dropdown.Item>}>
        <button>Trigger</button>
      </Dropdown>
    );

    expect(screen.getByText('Trigger')).toBeInTheDocument();

    // Check if the menu wrapper exists but does not have 'is-open' class
    const menuWrapper = container.querySelector('.c-dropdown__menu-wrapper');
    expect(menuWrapper).not.toHaveClass('is-open');
  });

  it('renders correctly with compound components', () => {
    render(
      <Dropdown>
        <Dropdown.Trigger>
          <button>Compound Trigger</button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    expect(screen.getByText('Compound Trigger')).toBeInTheDocument();
  });

  it('toggles menu in compound mode', () => {
    const { container } = render(
      <Dropdown>
        <Dropdown.Trigger>
          <button>Trigger</button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Item 1</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    fireEvent.click(screen.getByText('Trigger'));

    // Check if open class is applied or aria-expanded
    const trigger = screen.getByText('Trigger').closest('.c-dropdown__toggle');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const menuWrapper = container.querySelector('.c-dropdown__menu-wrapper');
    expect(menuWrapper).toHaveClass('is-open');
  });
});
