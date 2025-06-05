import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';
import { ListGroup } from './ListGroup';

const meta = {
  title: 'Components/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'dash', 'number', 'text'],
      description: 'List style variant',
    },
    children: {
      control: { type: 'text' },
      description: 'List items content',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic List
export const Basic: Story = {
  args: {
    children: [
      'First list item',
      'Second list item',
      'Third list item',
    ],
    variant: 'default',
  },
};

// List Variants Showcase
export const VariantsShowcase: Story = {
  render: () => {
    return (
      <div className="u-d-flex u-flex-column u-gap-8">
        {/* Default List */}
        <div>
          <h3 className="u-mb-4 u-fw-normal">Default List</h3>
          <List>
            <span>First list item</span>
            <span>Second list item</span>
            <span>Third list item</span>
          </List>
        </div>
        
        {/* Dash List */}
        <div>
          <h3 className="u-mb-4 u-fw-normal">Dash List</h3>
          <List variant="dash">
            <span>First list item</span>
            <span>Second list item</span>
            <span>Third list item</span>
          </List>
        </div>
        
        {/* Number List */}
        <div>
          <h3 className="u-mb-4 u-fw-normal">Number List</h3>
          <List variant="number">
            <span>First list item</span>
            <span>Second list item</span>
            <span>Third list item</span>
          </List>
        </div>
        
        {/* Text List */}
        <div>
          <h3 className="u-mb-4 u-fw-normal">Text List</h3>
          <List variant="text">
            <span>First list item</span>
            <span>Second list item</span>
            <span>Third list item</span>
          </List>
        </div>
      </div>
    );
  },
};

// ListGroup Showcase
export const ListGroupShowcase: Story = {
  render: () => {
    return (
      <div className="u-d-flex u-flex-column u-gap-8">
        {/* Standard ListGroup */}
        <div>
          <h3 className="u-mb-4 u-fw-normal">Standard ListGroup</h3>
          <ListGroup>
            <List>
              <span>First list - item 1</span>
              <span>First list - item 2</span>
              <span>First list - item 3</span>
            </List>
            <List>
              <span>Second list - item 1</span>
              <span>Second list - item 2</span>
              <span>Second list - item 3</span>
            </List>
          </ListGroup>
        </div>
        
        {/* Compact ListGroup */}
        <div>
          <h3 className="u-mb-4 u-fw-normal">Compact ListGroup</h3>
          <ListGroup compact>
            <List>
              <span>First list - item 1</span>
              <span>First list - item 2</span>
              <span>First list - item 3</span>
            </List>
            <List>
              <span>Second list - item 1</span>
              <span>Second list - item 2</span>
              <span>Second list - item 3</span>
            </List>
          </ListGroup>
        </div>
        
        {/* Divided ListGroup */}
        <div>
          <h3 className="u-mb-4 u-fw-normal">Divided ListGroup</h3>
          <ListGroup divided>
            <List>
              <span>First list - item 1</span>
              <span>First list - item 2</span>
              <span>First list - item 3</span>
            </List>
            <List>
              <span>Second list - item 1</span>
              <span>Second list - item 2</span>
              <span>Second list - item 3</span>
            </List>
          </ListGroup>
        </div>
        
        {/* Mixed Variants ListGroup */}
        <div>
          <h3 className="u-mb-4 u-fw-normal">Mixed Variants ListGroup</h3>
          <ListGroup>
            <List variant="dash">
              <span>Dash list - item 1</span>
              <span>Dash list - item 2</span>
              <span>Dash list - item 3</span>
            </List>
            <List variant="number">
              <span>Number list - item 1</span>
              <span>Number list - item 2</span>
              <span>Number list - item 3</span>
            </List>
            <List variant="text">
              <span>Text list - item 1</span>
              <span>Text list - item 2</span>
              <span>Text list - item 3</span>
            </List>
          </ListGroup>
        </div>
      </div>
    );
  },
};