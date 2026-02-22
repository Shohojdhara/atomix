import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { SectionIntro } from './SectionIntro';
import { SIZES } from '../../lib/constants/components';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/SectionIntro',
  component: SectionIntro,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The SectionIntro component provides a prominent introduction section for pages or content areas. It supports titles, labels, text content, images, background images, and call-to-action buttons. SectionIntros are ideal for page headers, section introductions, or any area requiring prominent content presentation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title text (supports ReactNode)',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the title (supports ReactNode)',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    text: {
      control: 'text',
      description: 'Description text content (supports ReactNode)',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    alignment: {
      control: { type: 'radio', options: ['left', 'center', 'right'] },
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
      table: {
        type: { summary: '"left" | "center" | "right"' },
        defaultValue: { summary: 'left' },
      },
    },
    size: {
      control: { type: 'radio', options: SIZES },
      options: SIZES,
      description: 'Size variant',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    skeleton: {
      control: 'boolean',
      description: 'Show skeleton loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showOverlay: {
      control: 'boolean',
      description: 'Whether to show an overlay on the background',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    actions: {
      control: { type: 'text' },
      description: 'Call to action elements (supports ReactNode)',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
    },
    backgroundImageSrc: {
      control: 'text',
      description: 'URL for the background image',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    imageSrc: {
      control: 'text',
      description: 'URL for the foreground image',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    imageAlt: {
      control: 'text',
      description: 'Alt text for the image',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Section image' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    style: {
      control: 'object',
      description: 'Custom style object for the section intro',
      table: {
        type: { summary: 'CSSProperties' },
        defaultValue: { summary: '{}' },
      },
    },
  },
  args: {
    title: 'Our Mission',
    label: 'About Us',
    text: 'We are dedicated to creating beautiful, functional, and accessible components that help developers build amazing websites and applications.',
    alignment: 'left',
    size: 'md',
    // Adding a mock function for any potential event handling
    onClick: fn(),
  },
} satisfies Meta<typeof SectionIntro>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage example
export const BasicUsage: Story = {
  args: {
    title: 'Our Mission',
    label: 'About Us',
    text: 'We are dedicated to creating beautiful, functional, and accessible components that help developers build amazing websites and applications.',
    alignment: 'left',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the SectionIntro component with title, label, and text.',
      },
    },
  },
};

// With actions example
export const WithActions: Story = {
  args: {
    title: 'Ready to get started?',
    label: 'Take Action',
    text: 'Join thousands of satisfied users who have transformed their workflow with our components.',
    alignment: 'center',
    size: 'md',
    actions: (
      <div className="u-flex u-gap-4">
        <Button label="Get Started" />
        <Button label="Learn More" variant="secondary" />
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'SectionIntro with call-to-action buttons.',
      },
    },
  },
};

// Center-aligned example
export const CenterAligned: Story = {
  args: {
    title: 'Discover Our Vision',
    label: 'Our Vision',
    text: 'We are dedicated to creating beautiful, functional, and accessible components that help developers build amazing websites and applications.',
    alignment: 'center',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Center-aligned SectionIntro content.',
      },
    },
  },
};

// Right-aligned example
export const RightAligned: Story = {
  args: {
    title: 'Our Approach',
    label: 'Methodology',
    text: 'We are dedicated to creating beautiful, functional, and accessible components that help developers build amazing websites and applications.',
    alignment: 'right',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Right-aligned SectionIntro content.',
      },
    },
  },
};

// With background image example
export const WithBackgroundImage: Story = {
  args: {
    title: 'Discover Our Vision',
    label: 'About Us',
    text: 'We are dedicated to creating beautiful, functional, and accessible components that help developers build amazing websites and applications.',
    alignment: 'center',
    size: 'md',
    backgroundImageSrc:
      'https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    showOverlay: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'SectionIntro with a background image and overlay.',
      },
    },
  },
};

// With foreground image example
export const WithForegroundImage: Story = {
  args: {
    title: 'Team Collaboration',
    label: 'Our Team',
    text: 'We are dedicated to creating beautiful, functional, and accessible components that help developers build amazing websites and applications.',
    alignment: 'left',
    size: 'md',
    imageSrc:
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    imageAlt: 'Team collaboration',
  },
  parameters: {
    docs: {
      description: {
        story: 'SectionIntro with a foreground image.',
      },
    },
  },
};

// Small size example
export const SmallSize: Story = {
  args: {
    title: 'Compact View',
    label: 'Small Size',
    text: 'This is a smaller version of the SectionIntro component.',
    alignment: 'left',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small-sized SectionIntro for compact layouts.',
      },
    },
  },
};

// Large size example
export const LargeSize: Story = {
  args: {
    title: 'Impressive Header',
    label: 'Large Size',
    text: 'This is a larger version of the SectionIntro component suitable for hero sections and prominent displays.',
    alignment: 'center',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large-sized SectionIntro for prominent displays.',
      },
    },
  },
};

// Skeleton loading state example
export const SkeletonLoading: Story = {
  args: {
    title: 'Loading Content',
    label: 'Please Wait',
    text: 'Content is being loaded...',
    alignment: 'left',
    size: 'md',
    skeleton: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state of the SectionIntro component.',
      },
    },
  },
};

// Full featured example
export const FullFeaturedExample: Story = {
  args: {
    title: 'Building the Future Together',
    label: 'Our Vision',
    text: 'We believe in creating technology that empowers people to achieve more. Our components are designed with accessibility, performance, and developer experience in mind.',
    alignment: 'center',
    size: 'lg',
    backgroundImageSrc:
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    showOverlay: true,
    imageSrc:
      'https://images.unsplash.com/photo-1468436139062-f6fdfcd1e6cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    imageAlt: 'Mountain landscape',
    actions: (
      <div className="u-flex u-justify-center u-gap-4">
        <Button label="Get Started" size="lg" />
        <Button label="Learn More" size="lg" variant="secondary" />
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Full featured SectionIntro with all options enabled.',
      },
    },
  },
};
