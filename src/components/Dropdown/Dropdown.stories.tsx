import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from './index';
import { Icon } from '../Icon';
import { ThemeColor } from '../../lib/types/components';

/**
 * Helper component to display the dropdown menu in a static way for Storybook
 */
const MenuPreview = ({ menu, minWidth }: { menu: React.ReactNode, minWidth?: string }) => (
  <div className="u-mt-4 u-border-top u-pt-4">
    <h6 className="u-text-secondary u-mb-2">Menu Preview:</h6>
    <div className="c-dropdown__menu-wrapper is-open u-position-static u-d-block">
      <div className={`c-dropdown__menu-inner ${minWidth !== '10rem' ? `u-mw-${minWidth?.toString().replace('px', '').replace('rem', '')}` : ''}`}>
        <ul className="c-dropdown__menu">
          {menu}
        </ul>
      </div>
    </div>
  </div>
);

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dropdown component with a toggleable menu. The dropdown menu appears on click or hover, depending on the trigger prop.'
      }
    }
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'bottom-start', 'bottom-end',
        'top-start', 'top-end',
        'left-start', 'left-end',
        'right-start', 'right-end'
      ],
      description: 'The placement of the dropdown menu relative to the trigger element'
    },
    trigger: {
      control: 'radio',
      options: ['click', 'hover'],
      description: 'How the dropdown is triggered - by click or hover'
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'info', 'warning', 'error', 'light', 'dark'],
      description: 'The color variant of the dropdown'
    },
    minWidth: {
      control: 'text',
      description: 'Minimum width of the dropdown menu'
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the dropdown menu'
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the dropdown is initially open'
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Whether to close the dropdown when clicking outside'
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close the dropdown when pressing the Escape key'
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

/**
 * Basic dropdown example with default settings
 */
export const Default: Story = {
  args: {
    trigger: 'click',
    placement: 'bottom-start',
    children: <button className="c-btn c-btn--primary">Dropdown <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" /></button>,
    menu: (
      <>
        <DropdownItem>Menu item 1</DropdownItem>
        <DropdownItem>Menu item 2</DropdownItem>
        <DropdownItem>Menu item 3</DropdownItem>
      </>
    ),
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown that opens on click
 */
export const ClickTrigger: Story = {
  args: {
    ...Default.args,
    trigger: 'click',
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown that opens on hover
 */
export const HoverTrigger: Story = {
  args: {
    ...Default.args,
    trigger: 'hover',
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown menu items with icons
 */
export const WithIcons: Story = {
  args: {
    ...Default.args,
    menu: (
      <>
        <DropdownItem icon={<Icon name="House" size="sm" />}>Home</DropdownItem>
        <DropdownItem icon={<Icon name="User" size="sm" />}>Profile</DropdownItem>
        <DropdownItem icon={<Icon name="Gear" size="sm" />}>Settings</DropdownItem>
        <DropdownItem icon={<Icon name="SignOut" size="sm" />}>Logout</DropdownItem>
      </>
    ),
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown menu items as links
 */
export const WithLinks: Story = {
  args: {
    ...Default.args,
    menu: (
      <>
        <DropdownItem href="#home">Home</DropdownItem>
        <DropdownItem href="#about">About</DropdownItem>
        <DropdownItem href="#services">Services</DropdownItem>
        <DropdownItem href="#contact">Contact</DropdownItem>
      </>
    ),
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with section headers and dividers
 */
export const WithHeader: Story = {
  args: {
    ...Default.args,
    menu: (
      <>
        <DropdownHeader>Account Options</DropdownHeader>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownDivider />
        <DropdownHeader>Help & Support</DropdownHeader>
        <DropdownItem>Documentation</DropdownItem>
        <DropdownItem>Contact Support</DropdownItem>
      </>
    ),
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with an active menu item
 */
export const ActiveItem: Story = {
  args: {
    ...Default.args,
    menu: (
      <>
        <DropdownItem active>Active Item</DropdownItem>
        <DropdownItem>Regular Item</DropdownItem>
        <DropdownItem>Regular Item</DropdownItem>
      </>
    ),
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with a disabled menu item
 */
export const DisabledItem: Story = {
  args: {
    ...Default.args,
    menu: (
      <>
        <DropdownItem>Regular Item</DropdownItem>
        <DropdownItem disabled>Disabled Item</DropdownItem>
        <DropdownItem>Regular Item</DropdownItem>
      </>
    ),
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with bottom-start placement (default)
 */
export const PlacementBottomStart: Story = {
  args: {
    ...Default.args,
    placement: 'bottom-start',
    children: <button className="c-btn c-btn--primary">Bottom Start <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" /></button>,
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with bottom-end placement
 */
export const PlacementBottomEnd: Story = {
  args: {
    ...Default.args,
    placement: 'bottom-end',
    children: <button className="c-btn c-btn--primary">Bottom End <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" /></button>,
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with top-start placement
 */
export const PlacementTopStart: Story = {
  args: {
    ...Default.args,
    placement: 'top-start',
    children: <button className="c-btn c-btn--primary">Top Start <Icon name="CaretUp" className="c-dropdown__toggle-icon" size="sm" /></button>,
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with top-end placement
 */
export const PlacementTopEnd: Story = {
  args: {
    ...Default.args,
    placement: 'top-end',
    children: <button className="c-btn c-btn--primary">Top End <Icon name="CaretUp" className="c-dropdown__toggle-icon" size="sm" /></button>,
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with left-start placement
 */
export const PlacementLeftStart: Story = {
  args: {
    ...Default.args,
    placement: 'left-start',
    children: <button className="c-btn c-btn--primary">Left Start <Icon name="CaretLeft" className="c-dropdown__toggle-icon" size="sm" /></button>,
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with left-end placement
 */
export const PlacementLeftEnd: Story = {
  args: {
    ...Default.args,
    placement: 'left-end',
    children: <button className="c-btn c-btn--primary">Left End <Icon name="CaretLeft" className="c-dropdown__toggle-icon" size="sm" /></button>,
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with right-start placement
 */
export const PlacementRightStart: Story = {
  args: {
    ...Default.args,
    placement: 'right-start',
    children: <button className="c-btn c-btn--primary">Right Start <Icon name="CaretRight" className="c-dropdown__toggle-icon" size="sm" /></button>,
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with right-end placement
 */
export const PlacementRightEnd: Story = {
  args: {
    ...Default.args,
    placement: 'right-end',
    children: <button className="c-btn c-btn--primary">Right End <Icon name="CaretRight" className="c-dropdown__toggle-icon" size="sm" /></button>,
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Placement information
 */
export const PlacementInfo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The Dropdown component supports various placement options to position the menu relative to the trigger element.'
      }
    }
  },
  render: () => (
    <div className="u-p-4 u-bg-light u-border-radius">
      <h4 className="u-mb-2">Placement Notation</h4>
      <p className="u-mb-2">The placement value consists of two parts:</p>
      <ul className="u-mb-3">
        <li><strong>Direction</strong> (top, bottom, left, right): Where the dropdown appears relative to the trigger.</li>
        <li><strong>Alignment</strong> (start, end): How the dropdown aligns with the trigger element.</li>
      </ul>

      <div className="u-p-3 u-bg-dark u-text-light u-border-radius u-mb-0">
        <pre className="u-mb-0">
          <code>
            {`// Example usage in code
<Dropdown
  placement="bottom-start"  // Direction-Alignment
  trigger="click"
  menu={...}
>
  <button>Dropdown Trigger</button>
</Dropdown>`}
          </code>
        </pre>
      </div>
    </div>
  ),
};

/**
 * Dropdown with primary color variant
 */
export const VariantPrimary: Story = {
  args: {
    ...Default.args,
    variant: 'primary',
    children: <button className="c-btn c-btn--primary">Primary <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" /></button>,
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with secondary color variant
 */
export const VariantSecondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
    children: <button className="c-btn c-btn--secondary">Secondary <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" /></button>,
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with success color variant
 */
export const VariantSuccess: Story = {
  args: {
    ...Default.args,
    variant: 'success',
    children: <button className="c-btn c-btn--success">Success <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" /></button>,
  },
  render: (args) => (
    <div className="u-p-4">
      <Dropdown {...args} />
      <MenuPreview menu={args.menu} minWidth={args.minWidth} />
    </div>
  ),
};

/**
 * Dropdown with all color variants
 */
export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The Dropdown component supports various color variants to match your design system.'
      }
    }
  },
  render: () => (
    <div className="u-p-4">
      <div className="u-d-flex u-flex-wrap u-gap-3">
        {[
          'primary', 'secondary', 'tertiary', 'success', 
          'info', 'warning', 'error', 'light', 'dark'
        ].map((color) => (
          <Dropdown
            key={color}
            variant={color as ThemeColor}
            trigger="click"
            children={
              <button className={`c-btn c-btn--${color}`}>
                {color} <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" />
              </button>
            }
            menu={
              <>
                <DropdownItem>Menu item 1</DropdownItem>
                <DropdownItem>Menu item 2</DropdownItem>
              </>
            }
          />
        ))}
      </div>

      <div className="u-mt-4 u-border-top u-pt-4">
        <h6 className="u-text-secondary u-mb-2">Menu Preview:</h6>
        <div className="c-dropdown__menu-wrapper is-open u-position-static u-d-block">
          <div className="c-dropdown__menu-inner">
            <ul className="c-dropdown__menu">
              <DropdownItem>Menu item 1</DropdownItem>
              <DropdownItem>Menu item 2</DropdownItem>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};
