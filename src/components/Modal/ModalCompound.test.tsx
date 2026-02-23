import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';
import React from 'react';

describe('Modal Component', () => {
  it('renders correctly with legacy props', () => {
    render(
      <Modal isOpen={true} title="Legacy Title" footer="Legacy Footer">
        Legacy Content
      </Modal>
    );

    expect(screen.getByText('Legacy Title')).toBeInTheDocument();
    expect(screen.getByText('Legacy Content')).toBeInTheDocument();
    expect(screen.getByText('Legacy Footer')).toBeInTheDocument();

    // Check structure classes
    expect(document.querySelector('.c-modal__header')).toBeInTheDocument();
    expect(document.querySelector('.c-modal__body')).toBeInTheDocument();
    expect(document.querySelector('.c-modal__footer')).toBeInTheDocument();
  });

  it('renders correctly with compound components', () => {
    render(
      <Modal isOpen={true}>
        <Modal.Header title="Compound Header" />
        <Modal.Body>Compound Body</Modal.Body>
        <Modal.Footer>Compound Footer</Modal.Footer>
      </Modal>
    );

    expect(screen.getByText('Compound Header')).toBeInTheDocument();
    expect(screen.getByText('Compound Body')).toBeInTheDocument();
    expect(screen.getByText('Compound Footer')).toBeInTheDocument();

    // Verify no double wrapping
    // If double wrapping occurred, we might see nested .c-modal__body or similar issues,
    // or the header inside the body if logic failed.

    const header = document.querySelector('.c-modal__header');
    const body = document.querySelector('.c-modal__body');
    const footer = document.querySelector('.c-modal__footer');

    // Header should be a direct child of .c-modal__content (or close to it)
    expect(header?.parentElement).toHaveClass('c-modal__content');
    expect(body?.parentElement).toHaveClass('c-modal__content');
    expect(footer?.parentElement).toHaveClass('c-modal__content');
  });

  it('injects onClose into Modal.Header when used in compound mode', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <Modal.Header closeButton data-testid="header" />
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );

    const closeBtn = screen.getByLabelText('Close modal');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('allows custom onClose in Modal.Header', () => {
    const modalOnClose = vi.fn();
    const headerOnClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={modalOnClose}>
        <Modal.Header closeButton onClose={headerOnClose} />
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );

    const closeBtn = screen.getByLabelText('Close modal');
    fireEvent.click(closeBtn);

    expect(headerOnClose).toHaveBeenCalled();
    expect(modalOnClose).not.toHaveBeenCalled();
  });

  it('prioritizes compound components over legacy props', () => {
    render(
      <Modal isOpen={true} title="Legacy Title">
        <Modal.Header title="Compound Header" />
        <Modal.Body>Compound Body</Modal.Body>
      </Modal>
    );

    expect(screen.getByText('Compound Header')).toBeInTheDocument();
    expect(screen.queryByText('Legacy Title')).not.toBeInTheDocument();
  });
});
