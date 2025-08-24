import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';
import { Icon } from '../Icon';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Avatar image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image',
    },
    initials: {
      control: 'text',
      description: 'Initials to display when no image is available',
    },
    icon: {
      control: { disable: true },
      description: 'Icon to display when no image or initials are available',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant for the avatar',
    },
    circle: {
      control: 'boolean',
      description: 'Whether to make the avatar circular',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the avatar is disabled',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Avatar
export const Basic: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User Avatar',
    size: 'md',
    circle: false,
  },
};

// Avatar Variants Showcase
export const VariantsShowcase: Story = {
  render: () => {
    const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    const variantImages = {
      square: 'https://i.pravatar.cc/150?img=2',
      circle: 'https://i.pravatar.cc/150?img=3',
      initials: null,
      icon: null,
      fallback: 'invalid-url.jpg',
    };

    return (
      <div className="u-d-grid u-gap-6" style={{ gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr' }}>
        {/* Header Row */}
        <div className="u-fw-bold">Type</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-fw-bold u-text-center">
            {size.toUpperCase()}
          </div>
        ))}

        {/* Square Avatars */}
        <div>Square</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar src={variantImages.square} size={size} />
          </div>
        ))}

        {/* Circle Avatars */}
        <div>Circle</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar src={variantImages.circle} size={size} circle={true} />
          </div>
        ))}

        {/* Initials Avatars */}
        <div>Initials</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar initials="JD" size={size} />
          </div>
        ))}

        {/* Icon Avatars */}
        <div>Icon</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar
              icon={<Icon name="User" size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'md'} />}
              size={size}
            />
          </div>
        ))}

        {/* Fallback Avatars */}
        <div>Fallback</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar src={variantImages.fallback} size={size} />
          </div>
        ))}

        {/* Interactive Avatars */}
        <div>Interactive</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar
              src={`https://i.pravatar.cc/150?img=${size === 'xs' ? 4 : size === 'sm' ? 5 : size === 'md' ? 6 : size === 'lg' ? 7 : 8}`}
              size={size}
              circle={true}
              onClick={() => alert(`${size.toUpperCase()} Avatar clicked!`)}
            />
          </div>
        ))}

        {/* Disabled Avatars */}
        <div>Disabled</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-d-flex u-justify-content-center">
            <Avatar
              src={`https://i.pravatar.cc/150?img=${size === 'xs' ? 9 : size === 'sm' ? 10 : size === 'md' ? 11 : size === 'lg' ? 12 : 13}`}
              size={size}
              circle={true}
              disabled={true}
              onClick={() => alert('This will not be triggered')}
            />
          </div>
        ))}
      </div>
    );
  },
};

// Avatar Group Showcase
export const AvatarGroupShowcase: Story = {
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    return (
      <div className="u-d-flex u-flex-column u-gap-8">
        {/* First row: Standard and Stacked side by side */}
        <div className="u-d-flex u-gap-12">
          {/* Standard Avatar Groups */}
          <div className="u-flex-grow-1">
            <h3 className="u-mb-4 u-fw-normal">Standard Avatar Groups</h3>
            <div className="u-d-flex u-flex-column u-gap-4">
              {sizes.map(size => (
                <div key={size} className="u-d-flex u-align-items-center u-gap-4">
                  <div className="u-w-12">{size.toUpperCase()}</div>
                  <AvatarGroup>
                    <Avatar src={`https://i.pravatar.cc/150?img=${14}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${15}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${16}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${17}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${18}`} size={size} circle />
                  </AvatarGroup>
                </div>
              ))}
            </div>
          </div>

          {/* Stacked Avatar Groups */}
          <div className="u-flex-grow-1">
            <h3 className="u-mb-4 u-fw-normal">Stacked Avatar Groups</h3>
            <div className="u-d-flex u-flex-column u-gap-4">
              {sizes.map(size => (
                <div key={size} className="u-d-flex u-align-items-center u-gap-4">
                  <div className="u-w-12">{size.toUpperCase()}</div>
                  <AvatarGroup stacked>
                    <Avatar src={`https://i.pravatar.cc/150?img=${24}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${25}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${26}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${27}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${28}`} size={size} circle />
                  </AvatarGroup>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second row: Max and Stacked+Max side by side */}
        <div className="u-d-flex u-gap-12">
          {/* Avatar Groups with Max Limit */}
          <div className="u-flex-grow-1">
            <h3 className="u-mb-4 u-fw-normal">Avatar Groups with Max Limit</h3>
            <div className="u-d-flex u-flex-column u-gap-4">
              {sizes.map(size => (
                <div key={size} className="u-d-flex u-align-items-center u-gap-4">
                  <div className="u-w-12">{size.toUpperCase()}</div>
                  <AvatarGroup max={3}>
                    <Avatar src={`https://i.pravatar.cc/150?img=${19}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${20}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${21}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${22}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${23}`} size={size} circle />
                  </AvatarGroup>
                </div>
              ))}
            </div>
          </div>

          {/* Stacked Avatar Groups with Max Limit */}
          <div className="u-flex-grow-1">
            <h3 className="u-mb-4 u-fw-normal">Stacked Groups with Max Limit</h3>
            <div className="u-d-flex u-flex-column u-gap-4">
              {sizes.map(size => (
                <div key={size} className="u-d-flex u-align-items-center u-gap-4">
                  <div className="u-w-12">{size.toUpperCase()}</div>
                  <AvatarGroup stacked max={3} moreText={`+more`}>
                    <Avatar src={`https://i.pravatar.cc/150?img=${29}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${30}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${31}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${32}`} size={size} circle />
                    <Avatar src={`https://i.pravatar.cc/150?img=${33}`} size={size} circle />
                  </AvatarGroup>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mixed Content Avatar Groups */}
        <div>
          <h3 className="u-mb-4 u-fw-normal">Mixed Content Avatar Groups</h3>
          <AvatarGroup>
            <Avatar src={`https://i.pravatar.cc/150?img=${34}`} size="md" circle />
            <Avatar initials="JD" size="md" circle />
            <Avatar src={`https://i.pravatar.cc/150?img=${35}`} size="md" circle />
            <Avatar icon={<Icon name="User" size="md" />} size="md" circle />
            <Avatar src={`https://i.pravatar.cc/150?img=${36}`} size="md" circle />
          </AvatarGroup>
        </div>
      </div>
    );
  },
};
