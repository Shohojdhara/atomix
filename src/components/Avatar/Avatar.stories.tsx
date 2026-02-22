import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon';
import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Avatar component displays user profile images, initials, or icons. It provides a consistent way to represent users throughout the application. Avatars support various sizes, can be circular or square, and gracefully handle missing images by showing initials or icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Avatar image source URL',
      table: {
        category: 'Main',
      },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image',
      table: {
        category: 'Main',
      },
    },
    initials: {
      control: 'text',
      description: 'Initials to display when no image is available',
      table: {
        category: 'Main',
      },
    },
    icon: {
      control: { disable: true },
      description: 'Icon to display when no image or initials are available',
      table: {
        category: 'Main',
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant for the avatar',
      table: {
        category: 'Style',
        defaultValue: { summary: 'md' },
      },
    },
    circle: {
      control: 'boolean',
      description: 'Whether to make the avatar circular',
      table: {
        category: 'Style',
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the avatar is disabled',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Misc',
      },
    },
    style: {
      control: 'object',
      description: 'Inline styles',
      table: {
        category: 'Misc',
      },
    },
    glass: {
      control: 'boolean',
      description: 'Apply glassmorphism effect',
      table: {
        category: 'Style',
        defaultValue: { summary: 'false' },
      },
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
  parameters: {
    docs: {
      description: {
        story: 'Basic avatar with an image source',
      },
    },
  },
};

// Avatar with Initials
export const WithInitials: Story = {
  args: {
    initials: 'JD',
    size: 'md',
    circle: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar displaying user initials when no image is available',
      },
    },
  },
};

// Avatar with Icon
export const WithIcon: Story = {
  args: {
    icon: <Icon name="User" size="md" />,
    size: 'md',
    circle: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar displaying an icon when no image or initials are available',
      },
    },
  },
};

// Avatar Sizes
export const Sizes: Story = {
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    return (
      <div className="u-flex u-gap-4 u-flex-wrap u-items-center">
        {sizes.map(size => (
          <div key={size} className="u-flex u-flex-col u-items-center u-gap-2">
            <Avatar
              src={`https://i.pravatar.cc/150?img=${size === 'xs' ? 1 : size === 'sm' ? 2 : size === 'md' ? 3 : size === 'lg' ? 4 : 5}`}
              size={size}
              circle
            />
            <span className="u-text-xs u-capitalize">{size}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different avatar sizes from extra-small to extra-large',
      },
    },
  },
};

// Avatar Shapes
export const Shapes: Story = {
  render: () => {
    return (
      <div className="u-flex u-gap-6 u-items-center">
        <div className="u-flex u-flex-col u-items-center u-gap-2">
          <Avatar src="https://i.pravatar.cc/150?img=6" size="md" circle={false} />
          <span className="u-text-xs">Square</span>
        </div>
        <div className="u-flex u-flex-col u-items-center u-gap-2">
          <Avatar src="https://i.pravatar.cc/150?img=7" size="md" circle={true} />
          <span className="u-text-xs">Circle</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar shapes: square and circle',
      },
    },
  },
};

// Avatar States
export const States: Story = {
  render: () => {
    return (
      <div className="u-flex u-gap-6 u-items-center">
        <div className="u-flex u-flex-col u-items-center u-gap-2">
          <Avatar src="https://i.pravatar.cc/150?img=8" size="md" circle />
          <span className="u-text-xs">Default</span>
        </div>
        <div className="u-flex u-flex-col u-items-center u-gap-2">
          <Avatar src="https://i.pravatar.cc/150?img=9" size="md" circle disabled />
          <span className="u-text-xs">Disabled</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar states: default and disabled',
      },
    },
  },
};

// Avatar with Glass Effect
export const WithGlassEffect: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=10',
    size: 'md',
    circle: true,
    glass: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Avatar with glassmorphism effect',
      },
    },
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
      <div className="u-grid u-gap-6" style={{ gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr' }}>
        {/* Header Row */}
        <div className="u-font-bold">Type</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-font-bold u-text-center">
            {size.toUpperCase()}
          </div>
        ))}

        {/* Square Avatars */}
        <div>Square</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-flex u-justify-center">
            <Avatar src={variantImages.square} size={size} />
          </div>
        ))}

        {/* Circle Avatars */}
        <div>Circle</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-flex u-justify-center">
            <Avatar src={variantImages.circle} size={size} circle={true} />
          </div>
        ))}

        {/* Initials Avatars */}
        <div>Initials</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-flex u-justify-center">
            <Avatar initials="JD" size={size} />
          </div>
        ))}

        {/* Icon Avatars */}
        <div>Icon</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-flex u-justify-center">
            <Avatar
              icon={<Icon name="User" size={size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : 'md'} />}
              size={size}
            />
          </div>
        ))}

        {/* Fallback Avatars */}
        <div>Fallback</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-flex u-justify-center">
            <Avatar src={variantImages.fallback} size={size} />
          </div>
        ))}

        {/* Interactive Avatars */}
        <div>Interactive</div>
        {sizeOptions.map(size => (
          <div key={size} className="u-flex u-justify-center">
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
          <div key={size} className="u-flex u-justify-center">
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
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of avatar variants across all sizes',
      },
    },
  },
};

// Avatar Group Showcase
export const AvatarGroupShowcase: Story = {
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    return (
      <div className="u-flex u-flex-column u-gap-8">
        {/* First row: Standard and Stacked side by side */}
        <div className="u-flex u-gap-12">
          {/* Standard Avatar Groups */}
          <div className="u-flex-grow-1">
            <h3 className="u-mb-4 u-font-normal">Standard Avatar Groups</h3>
            <div className="u-flex u-flex-column u-gap-4">
              {sizes.map(size => (
                <div key={size} className="u-flex u-items-center u-gap-4">
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
            <h3 className="u-mb-4 u-font-normal">Stacked Avatar Groups</h3>
            <div className="u-flex u-flex-column u-gap-4">
              {sizes.map(size => (
                <div key={size} className="u-flex u-items-center u-gap-4">
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
        <div className="u-flex u-gap-12">
          {/* Avatar Groups with Max Limit */}
          <div className="u-flex-grow-1">
            <h3 className="u-mb-4 u-font-normal">Avatar Groups with Max Limit</h3>
            <div className="u-flex u-flex-column u-gap-4">
              {sizes.map(size => (
                <div key={size} className="u-flex u-items-center u-gap-4">
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
            <h3 className="u-mb-4 u-font-normal">Stacked Groups with Max Limit</h3>
            <div className="u-flex u-flex-column u-gap-4">
              {sizes.map(size => (
                <div key={size} className="u-flex u-items-center u-gap-4">
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
          <h3 className="u-mb-4 u-font-normal">Mixed Content Avatar Groups</h3>
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
  parameters: {
    docs: {
      description: {
        story: 'Various configurations of AvatarGroup component',
      },
    },
  },
};
