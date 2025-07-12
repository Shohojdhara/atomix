import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from './index';
import { Icon } from '../Icon';
import { ThemeColor } from '../../lib/types/components';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dropdown component with a toggleable menu. The dropdown menu appears on click or hover, depending on the trigger prop.',
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'bottom-start',
        'bottom-end',
        'top-start',
        'top-end',
        'left-start',
        'left-end',
        'right-start',
        'right-end',
      ],
      description: 'The placement of the dropdown menu relative to the trigger element',
    },
    trigger: {
      control: 'radio',
      options: ['click', 'hover'],
      description: 'How the dropdown is triggered - by click or hover',
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'info',
        'warning',
        'error',
        'light',
        'dark',
      ],
      description: 'The color variant of the dropdown',
    },
    minWidth: {
      control: 'text',
      description: 'Minimum width of the dropdown menu',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the dropdown menu',
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Whether to close the dropdown when clicking outside',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether to close the dropdown when pressing the Escape key',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

/**
 * Interactive dropdown component that can be used in Storybook
 */
const InteractiveDropdown = (args: React.ComponentProps<typeof Dropdown>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="u-p-4"
      style={{ minHeight: '300px', display: 'flex', alignItems: 'flex-start' }}
    >
      <Dropdown {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
};

/**
 * Basic dropdown example with default settings
 */
export const Default: Story = {
  args: {
    trigger: 'click',
    placement: 'bottom-start',
    children: (
      <button className="c-btn c-btn--primary">
        Dropdown <Icon name="CaretDown" className="c-dropdown__toggle-icon" size="sm" />
      </button>
    ),
    menu: (
      <>
        <DropdownItem>Menu item 1</DropdownItem>
        <DropdownItem>Menu item 2</DropdownItem>
        <DropdownItem>Menu item 3</DropdownItem>
      </>
    ),
  },
  render: args => <InteractiveDropdown {...args} />,
};

/**
 * Dropdown that opens on click
 */
export const ClickTrigger: Story = {
  args: {
    ...Default.args,
    trigger: 'click',
  },
  render: args => <InteractiveDropdown {...args} />,
};

/**
 * Dropdown that opens on hover
 */
export const HoverTrigger: Story = {
  args: {
    ...Default.args,
    trigger: 'hover',
  },
  render: args => <InteractiveDropdown {...args} />,
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
  render: args => <InteractiveDropdown {...args} />,
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
  render: args => <InteractiveDropdown {...args} />,
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
  render: args => <InteractiveDropdown {...args} />,
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
  render: args => <InteractiveDropdown {...args} />,
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
  render: args => <InteractiveDropdown {...args} />,
};

/**
 * Shows all possible dropdown placement options
 */
export const AllPlacements: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The Dropdown component supports various placement options to position the menu relative to the trigger element.',
      },
    },
  },
  render: () => {
    // All possible placement options with properly typed icon names
    const placements = [
      { value: 'bottom-start', label: 'Bottom Start', icon: 'CaretDown' as const },
      { value: 'bottom-end', label: 'Bottom End', icon: 'CaretDown' as const },
      { value: 'top-start', label: 'Top Start', icon: 'CaretUp' as const },
      { value: 'top-end', label: 'Top End', icon: 'CaretUp' as const },
      { value: 'left-start', label: 'Left Start', icon: 'CaretLeft' as const },
      { value: 'left-end', label: 'Left End', icon: 'CaretLeft' as const },
      { value: 'right-start', label: 'Right Start', icon: 'CaretRight' as const },
      { value: 'right-end', label: 'Right End', icon: 'CaretRight' as const },
    ];

    // Create a grid layout with plenty of space for dropdowns to display correctly
    return (
      <div className="u-p-5" style={{ height: '650px' }}>
        <div
          className="u-d-grid"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '1.5rem',
            height: '100%',
          }}
        >
          {placements.map(placement => (
            <div
              key={placement.value}
              className="u-d-flex u-align-items-center u-justify-content-center"
            >
              <Dropdown
                trigger="click"
                placement={placement.value as any}
                defaultOpen={true}
                closeOnClickOutside={false}
                closeOnEscape={false}
                children={
                  <button className="c-btn c-btn--primary">
                    {placement.label}{' '}
                    <Icon name={placement.icon} className="c-dropdown__toggle-icon" size="sm" />
                  </button>
                }
                menu={
                  <>
                    <DropdownItem>Menu item 1</DropdownItem>
                    <DropdownItem>Menu item 2</DropdownItem>
                    <DropdownItem>Menu item 3</DropdownItem>
                  </>
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Dropdown with all color variants
 */
export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The Dropdown component supports various color variants to match your design system.',
      },
    },
  },
  render: () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const handleOpenChange = (variant: string, isOpen: boolean) => {
      if (isOpen) {
        setOpenDropdown(variant);
      } else if (openDropdown === variant) {
        setOpenDropdown(null);
      }
    };

    return (
      <div className="u-p-4" style={{ minHeight: '300px' }}>
        <div className="u-d-flex u-flex-wrap u-gap-3">
          {[
            'primary',
            'secondary',
            'tertiary',
            'success',
            'info',
            'warning',
            'error',
            'light',
            'dark',
          ].map(color => (
            <Dropdown
              key={color}
              variant={color as ThemeColor}
              trigger="click"
              isOpen={openDropdown === color}
              onOpenChange={isOpen => handleOpenChange(color, isOpen)}
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
      </div>
    );
  },
};
