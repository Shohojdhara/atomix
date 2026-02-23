import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Callout } from './Callout';
import React from 'react';

describe('Callout Component', () => {
  it('renders correctly with legacy props', () => {
    render(
      <Callout title="Legacy Title" icon={<span>Icon</span>}>
        Legacy Content
      </Callout>
    );

    expect(screen.getByText('Legacy Title')).toBeInTheDocument();
    expect(screen.getByText('Legacy Content')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('renders correctly with compound components', () => {
    render(
      <Callout>
        <Callout.Content>
          <Callout.Icon>
            <span>Compound Icon</span>
          </Callout.Icon>
          <Callout.Message>
            <Callout.Title>Compound Title</Callout.Title>
            <Callout.Text>Compound Text</Callout.Text>
          </Callout.Message>
        </Callout.Content>
        <Callout.Actions>
          <button>Action</button>
        </Callout.Actions>
        <Callout.CloseButton onClick={() => {}} />
      </Callout>
    );

    expect(screen.getByText('Compound Icon')).toBeInTheDocument();
    expect(screen.getByText('Compound Title')).toBeInTheDocument();
    expect(screen.getByText('Compound Text')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('prioritizes compound components over legacy props', () => {
    render(
      <Callout title="Legacy Title">
        <Callout.Content>
          <Callout.Message>
            <Callout.Text>Compound Text</Callout.Text>
          </Callout.Message>
        </Callout.Content>
      </Callout>
    );

    expect(screen.getByText('Compound Text')).toBeInTheDocument();
    expect(screen.queryByText('Legacy Title')).not.toBeInTheDocument();
  });

  it('renders close button when used as compound', () => {
    const onClose = vi.fn();
    render(
      <Callout>
         <Callout.CloseButton onClick={onClose} />
      </Callout>
    );

    const button = screen.getByLabelText('Close');
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalled();
  });
});
