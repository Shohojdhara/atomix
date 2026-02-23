import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Accordion } from './Accordion';
import React from 'react';

describe('Accordion Component', () => {
  it('renders correctly with legacy props', () => {
    render(
      <Accordion title="Legacy Title" defaultOpen>
        Legacy Content
      </Accordion>
    );

    expect(screen.getByText('Legacy Title')).toBeInTheDocument();
    expect(screen.getByText('Legacy Content')).toBeInTheDocument();
  });

  it('renders correctly with compound components', () => {
    render(
      <Accordion defaultOpen>
        <Accordion.Header>
          <span>Compound Header</span>
        </Accordion.Header>
        <Accordion.Body>
          <p>Compound Body</p>
        </Accordion.Body>
      </Accordion>
    );

    expect(screen.getByText('Compound Header')).toBeInTheDocument();
    expect(screen.getByText('Compound Body')).toBeInTheDocument();
  });

  it('toggles visibility in compound mode', () => {
    render(
      <Accordion>
        <Accordion.Header>Header</Accordion.Header>
        <Accordion.Body>Body</Accordion.Body>
      </Accordion>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('injects props into compound components', () => {
    // We want to verify that aria-controls and aria-labelledby are correctly linked
    // even in compound mode (since the parent injects IDs)
    render(
      <Accordion>
        <Accordion.Header>Header</Accordion.Header>
        <Accordion.Body>Body</Accordion.Body>
      </Accordion>
    );

    const button = screen.getByRole('button');
    const region = screen.getByRole('region');

    const controlsId = button.getAttribute('aria-controls');
    const labelledById = region.getAttribute('aria-labelledby');
    const buttonId = button.getAttribute('id');
    const regionId = region.getAttribute('id');

    expect(controlsId).toBe(regionId);
    expect(labelledById).toBe(buttonId);
  });
});
