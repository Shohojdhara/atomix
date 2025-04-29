import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// Since we want to preview static markup without JS functionality,
// I'll create custom render functions that output the HTML structure

// Default Accordion (Closed)
export const Default: Story = {
  args: {
    title: 'Accordion Title',
    children: <div></div>,
  },
  render: () => (
    <div>
      <h2>Default Accordion (Closed)</h2>
      <div className="c-accordion">
        <button className="c-accordion__header">
          <span className="c-accordion__title">Accordion Title</span>
          <i className="c-accordion__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </i>
        </button>
        <div className="c-accordion__panel" style={{ "--panel-height": "0px" } as React.CSSProperties}>
          <div className="c-accordion__body">
            <p>This is the content of the accordion that appears when expanded.</p>
          </div>
        </div>
      </div>
    </div>
  )
};

// Open Accordion
export const Open: Story = {
  args: {
    title: 'Open Accordion',
    children: <div></div>,
  },
  render: () => (
    <div>
      <h2>Open Accordion</h2>
      <div className="c-accordion is-open">
        <button className="c-accordion__header">
          <span className="c-accordion__title">Open Accordion</span>
          <i className="c-accordion__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </i>
        </button>
        <div className="c-accordion__panel" style={{ "--panel-height": "auto" } as React.CSSProperties}>
          <div className="c-accordion__body">
            <p>This accordion is open, showing its content.</p>
          </div>
        </div>
      </div>
    </div>
  )
};

// Disabled Accordion
export const Disabled: Story = {
  args: {
    title: 'Disabled Accordion',
    children: <div></div>,
  },
  render: () => (
    <div>
      <h2>Disabled Accordion</h2>
      <div className="c-accordion is-disabled">
        <button className="c-accordion__header" disabled>
          <span className="c-accordion__title">Disabled Accordion</span>
          <i className="c-accordion__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </i>
        </button>
        <div className="c-accordion__panel" style={{ "--panel-height": "0px" } as React.CSSProperties}>
          <div className="c-accordion__body">
            <p>This accordion is disabled.</p>
          </div>
        </div>
      </div>
    </div>
  )
};

// Icon on Left
export const IconLeft: Story = {
  args: {
    title: 'Icon on Left',
    children: <div></div>,
  },
  render: () => (
    <div>
      <h2>Icon on Left</h2>
      <div className="c-accordion">
        <button className="c-accordion__header c-accordion__header--icon-left">
          <i className="c-accordion__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </i>
          <span className="c-accordion__title">Icon on Left</span>
        </button>
        <div className="c-accordion__panel" style={{ "--panel-height": "0px" } as React.CSSProperties}>
          <div className="c-accordion__body">
            <p>This accordion has the icon on the left side.</p>
          </div>
        </div>
      </div>
    </div>
  )
};

// Custom Icon
export const CustomIcon: Story = {
  args: {
    title: 'Custom Icon',
    children: <div></div>,
  },
  render: () => (
    <div>
      <h2>Accordion with Custom Icon</h2>
      <div className="c-accordion">
        <button className="c-accordion__header">
          <span className="c-accordion__title">Custom Icon</span>
          <i className="c-accordion__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </i>
        </button>
        <div className="c-accordion__panel" style={{ "--panel-height": "0px" } as React.CSSProperties}>
          <div className="c-accordion__body">
            <p>This accordion uses a custom plus icon.</p>
          </div>
        </div>
      </div>
    </div>
  )
};

// Accordion Group
export const AccordionGroup: Story = {
  args: {
    title: 'Accordion Group',
    children: <div></div>,
  },
  render: () => (
    <div>
      <h2>Accordion Group</h2>
      <div style={{ width: "500px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div className="c-accordion is-open">
          <button className="c-accordion__header">
            <span className="c-accordion__title">First Accordion</span>
            <i className="c-accordion__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </i>
          </button>
          <div className="c-accordion__panel" style={{ "--panel-height": "auto" } as React.CSSProperties}>
            <div className="c-accordion__body">
              <p>Content of the first accordion.</p>
            </div>
          </div>
        </div>

        <div className="c-accordion">
          <button className="c-accordion__header">
            <span className="c-accordion__title">Second Accordion</span>
            <i className="c-accordion__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </i>
          </button>
          <div className="c-accordion__panel" style={{ "--panel-height": "0px" } as React.CSSProperties}>
            <div className="c-accordion__body">
              <p>Content of the second accordion.</p>
            </div>
          </div>
        </div>

        <div className="c-accordion">
          <button className="c-accordion__header">
            <span className="c-accordion__title">Third Accordion</span>
            <i className="c-accordion__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </i>
          </button>
          <div className="c-accordion__panel" style={{ "--panel-height": "0px" } as React.CSSProperties}>
            <div className="c-accordion__body">
              <p>Content of the third accordion with more content.</p>
              <p>Additional paragraph to demonstrate scrolling.</p>
              <ul>
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}; 