import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { List } from './List';
import { ListGroup } from './ListGroup';

const meta = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# List

## Overview

List provides a flexible way to display ordered or unordered lists of items. It supports multiple style variants including default, dashed, numbered, and text styles. Lists can be used for navigation, content organization, or any scenario requiring structured item display.

## Features

- Multiple style variants (default, dash, number, text)
- Grouped lists with ListGroup component
- Compact and divided options
- Accessible design
- Responsive behavior
- Customizable styling

## Accessibility

- Screen reader: List structure and items announced properly
- ARIA support: Proper roles and properties for list components
- Keyboard support: Accessible via keyboard navigation
- Focus management: Maintains focus within list items

## Usage Examples

### Basic Usage

\`\`\`tsx
<List>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</List>
\`\`\`

### With Variant

\`\`\`tsx
<List variant="number">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</List>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| variant | 'default' \\| 'dash' \\| 'number' \\| 'text' | 'default' | List style variant |
| children | ReactNode | - | List items content |
| className | string | - | Additional CSS class names |
      `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'dash', 'number', 'text'],
      description: 'List style variant',
      table: {
        type: { summary: '"default" | "dash" | "number" | "text"' },
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      control: { type: 'object' },
      description: 'List items content',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: '-' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic list items for reuse
const ITEMS = ['item 1', 'item 2', 'item 3'];

const sectionStyle = { marginBottom: '16px' };
const titleStyle = { fontWeight: 'normal', marginBottom: '8px' };

const ListItem = ({ children }: { children: React.ReactNode }) => <span>{children}</span>;
const ListItems = ({ variant }: { variant: string }) => (
  <>
    {ITEMS.map((item, index) => (
      <ListItem key={index}>{variant === 'number' ? `${index + 1}. ${item}` : item}</ListItem>
    ))}
  </>
);

const createListSection = (title: string, variant: string, key?: string) => (
  <div key={key} style={sectionStyle}>
    <h3 style={titleStyle}>{title}</h3>
    <List variant={variant as any}>
      <ListItems variant={variant} />
    </List>
  </div>
);

export const BasicUsage: Story = {
  args: {
    children: (
      <>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic list with default styling.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => {
    return (
      <div className="u-flex u-flex-column u-gap-8">
        {['Default', 'Dash', 'Number', 'Text'].map((title, index) => {
          const variant = index === 0 ? 'default' : title.toLowerCase();
          return createListSection(`${title} List`, variant, variant);
        })}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'List with all available style variants.',
      },
    },
  },
};

export const WithListGroup: Story = {
  render: () => {
    const listGroupConfig = [
      { title: 'Standard', compact: false, divided: false },
      { title: 'Compact', compact: true, divided: false },
      { title: 'Divided', compact: false, divided: true },
    ];

    return (
      <div className="u-flex u-flex-column u-gap-8">
        <div>
          <h3 style={titleStyle}>Mixed Variants ListGroup</h3>
          <ListGroup>
            <List variant="dash">
              <ListItems variant="dash" />
            </List>
            <List variant="number">
              <ListItems variant="number" />
            </List>
          </ListGroup>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Lists grouped together using the ListGroup component.',
      },
    },
  },
};

// Basic List example
export const Basic: Story = {
  args: {
    children: ITEMS,
  },
};

// List Variants Showcase
export const VariantsShowcase: Story = {
  render: () => {
    return (
      <div className="u-flex u-flex-column u-gap-8">
        {['Default', 'Dash', 'Number', 'Text'].map((title, index) => {
          const variant = index === 0 ? 'default' : title.toLowerCase();
          return createListSection(`${title} List`, variant, variant);
        })}
      </div>
    );
  },
};

// ListGroup Showcase
export const ListGroupShowcase: Story = {
  render: () => {
    const listGroupConfig = [
      { title: 'Standard', compact: false, divided: false },
      { title: 'Compact', compact: true, divided: false },
      { title: 'Divided', compact: false, divided: true },
    ];

    return (
      <div className="u-flex u-flex-column u-gap-8">
        <div>
          <h3 style={titleStyle}>Mixed Variants ListGroup</h3>
          <ListGroup>
            <List variant="dash">
              <ListItems variant="dash" />
            </List>
            <List variant="number">
              <ListItems variant="number" />
            </List>
            <List variant="text">
              <ListItems variant="text" />
            </List>
          </ListGroup>
        </div>

        {listGroupConfig.map(({ title, compact, divided }) => (
          <div key={title}>
            <h3 style={titleStyle}>{title} ListGroup</h3>
            <ListGroup>
              {ITEMS.map((section, idx) => (
                <List key={idx}>
                  {[1, 2].map(item => (
                    <ListItem key={item}>
                      {`${section.charAt(0).toUpperCase() + section.slice(1)} - item ${item}`}
                    </ListItem>
                  ))}
                </List>
              ))}
            </ListGroup>
          </div>
        ))}
      </div>
    );
  },
};
