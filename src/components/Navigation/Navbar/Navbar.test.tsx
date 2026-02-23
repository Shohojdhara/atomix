import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, NavbarContainer } from './Navbar';
import { Nav } from '../Nav/Nav';
import { NavItem } from '../Nav/NavItem';

// Mock AtomixGlass as required by memory
vi.mock('../../AtomixGlass/AtomixGlass', () => ({
  AtomixGlass: ({ children, ...props }: any) => <div data-testid="atomix-glass" {...props}>{children}</div>,
}));

describe('Navbar Component', () => {
  describe('Legacy Behavior', () => {
    it('renders correctly with brand prop', () => {
      render(
        <Navbar brand="Legacy Brand">
          <Nav>
            <NavItem>Home</NavItem>
          </Nav>
        </Navbar>
      );

      expect(screen.getByText('Legacy Brand')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toHaveClass('c-navbar');
      // Verify structure: toggler should be present
      expect(screen.getByRole('button', { name: /toggle navigation/i })).toBeInTheDocument();
      // Verify content inside collapse
      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('toggles collapse state when toggler is clicked', async () => {
      render(
        <Navbar brand="Brand" collapsible>
          <div>Menu Content</div>
        </Navbar>
      );

      const toggler = screen.getByRole('button', { name: /toggle navigation/i });
      // Initially not expanded
      expect(toggler).toHaveAttribute('aria-expanded', 'false');
      const collapse = document.getElementById('navbar-collapse');
      expect(collapse).not.toHaveClass('is-expanded');

      // Click to expand
      fireEvent.click(toggler);

      // Should be expanded
      expect(toggler).toHaveAttribute('aria-expanded', 'true');
      expect(collapse).toHaveClass('is-expanded');
    });

    it('respects controlled expanded prop', () => {
      const onToggle = vi.fn();
      const { rerender } = render(
        <Navbar brand="Brand" collapsible expanded={false} onToggle={onToggle}>
          <div>Menu Content</div>
        </Navbar>
      );

      const toggler = screen.getByRole('button', { name: /toggle navigation/i });
      expect(toggler).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(toggler);
      expect(onToggle).toHaveBeenCalledWith(true);

      // Re-render with expanded=true
      rerender(
        <Navbar brand="Brand" collapsible expanded={true} onToggle={onToggle}>
          <div>Menu Content</div>
        </Navbar>
      );

      expect(toggler).toHaveAttribute('aria-expanded', 'true');
      const collapse = document.getElementById('navbar-collapse');
      expect(collapse).toHaveClass('is-expanded');
    });
  });

  describe('Compound Component Pattern', () => {
    it('renders structure correctly using subcomponents', () => {
      render(
        <Navbar>
          <Navbar.Container>
            <Navbar.Brand>Compound Brand</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav>
                <NavItem>Home</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar.Container>
        </Navbar>
      );

      expect(screen.getByText('Compound Brand')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /toggle navigation/i })).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();

      // Verify container class
      const container = screen.getByText('Compound Brand').closest('.c-navbar__container');
      expect(container).toBeInTheDocument();
    });

    it('toggles collapse state via Context', () => {
      render(
        <Navbar>
          <Navbar.Container>
            <Navbar.Toggle />
            <Navbar.Collapse data-testid="collapse">
              <div>Content</div>
            </Navbar.Collapse>
          </Navbar.Container>
        </Navbar>
      );

      const toggler = screen.getByRole('button', { name: /toggle navigation/i });
      const collapse = screen.getByTestId('collapse');

      // Initial state
      expect(toggler).toHaveAttribute('aria-expanded', 'false');
      expect(collapse).not.toHaveClass('is-expanded');

      // Click to expand
      fireEvent.click(toggler);

      // Should be expanded
      expect(toggler).toHaveAttribute('aria-expanded', 'true');
      expect(collapse).toHaveClass('is-expanded');
    });

    it('respects controlled state via Context', () => {
      const onToggle = vi.fn();

      // We need a wrapper to test controlled behavior if we pass props to Navbar
      const TestComponent = () => {
        const [expanded, setExpanded] = useState(false);
        const handleToggle = (newState: boolean) => {
            setExpanded(newState);
            onToggle(newState);
        };

        return (
          <Navbar expanded={expanded} onToggle={handleToggle} collapsible>
            <Navbar.Container>
              <Navbar.Toggle />
              <Navbar.Collapse data-testid="collapse" />
            </Navbar.Container>
          </Navbar>
        );
      };

      render(<TestComponent />);

      const toggler = screen.getByRole('button', { name: /toggle navigation/i });
      const collapse = screen.getByTestId('collapse');

      // Initial
      expect(toggler).toHaveAttribute('aria-expanded', 'false');

      // Click
      fireEvent.click(toggler);

      expect(onToggle).toHaveBeenCalledWith(true);

      // Wait for re-render
      expect(toggler).toHaveAttribute('aria-expanded', 'true');
      expect(collapse).toHaveClass('is-expanded');
    });

    it('does not render toggler if collapsible is false (via context)', () => {
      render(
        <Navbar collapsible={false}>
          <Navbar.Container>
            <Navbar.Toggle data-testid="toggler" />
          </Navbar.Container>
        </Navbar>
      );

      expect(screen.queryByTestId('toggler')).not.toBeInTheDocument();
    });

    it('supports custom brand component (as prop)', () => {
        render(
            <Navbar>
                <Navbar.Container>
                    <Navbar.Brand as="div" data-testid="custom-brand">Custom Brand</Navbar.Brand>
                </Navbar.Container>
            </Navbar>
        );

        const brand = screen.getByTestId('custom-brand');
        expect(brand.tagName).toBe('DIV');
        expect(brand).toHaveClass('c-navbar__brand');
    });
  });
});
