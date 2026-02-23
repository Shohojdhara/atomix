import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EdgePanel } from './EdgePanel';
import React from 'react';

describe('EdgePanel Component', () => {
  it('renders correctly with legacy props', () => {
    render(
      <EdgePanel isOpen={true} title="Legacy Title">
        Legacy Content
      </EdgePanel>
    );

    expect(screen.getByText('Legacy Title')).toBeInTheDocument();
    expect(screen.getByText('Legacy Content')).toBeInTheDocument();
  });

  it('renders correctly with compound components', () => {
    render(
      <EdgePanel isOpen={true}>
        <EdgePanel.Header>
          <h4>Compound Title</h4>
        </EdgePanel.Header>
        <EdgePanel.Body>
          Compound Content
        </EdgePanel.Body>
        <EdgePanel.Footer>
          Footer
        </EdgePanel.Footer>
      </EdgePanel>
    );

    expect(screen.getByText('Compound Title')).toBeInTheDocument();
    expect(screen.getByText('Compound Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('uses close button in compound mode', () => {
    const onClose = vi.fn();
    render(
      <EdgePanel isOpen={true} onOpenChange={onClose}>
        <EdgePanel.Header>
          <EdgePanel.CloseButton onClick={() => onClose(false)} />
        </EdgePanel.Header>
        <EdgePanel.Body>Content</EdgePanel.Body>
      </EdgePanel>
    );

    const closeBtn = screen.getByLabelText('Close panel');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledWith(false);
  });
});
