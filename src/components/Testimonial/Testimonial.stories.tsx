import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Testimonial } from './Testimonial';

const meta = {
  title: 'Components/Testimonial',
  component: Testimonial,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Testimonial component displays customer reviews, quotes, or endorsements with author information and avatars. It supports multiple sizes, skeleton loading states, and can display rich content. Testimonials are ideal for showcasing social proof, customer feedback, or featured quotes on landing pages and marketing sites.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select', options: ['', 'sm', 'lg'] },
      description: 'Size variant of the testimonial',
    },
    skeleton: {
      control: 'boolean',
      description: 'Whether to show skeleton loading state',
    },
  },
} satisfies Meta<typeof Testimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default testimonial
export const Default: Story = {
  render: args => (
    <div style={{ padding: '30px' }}>
      <Testimonial {...args} />
    </div>
  ),
  args: {
    quote:
      'The intuitive interface, seamless syncing across devices, and helpful features have made me more productive than ever before.',
    author: {
      name: 'Emily Rodriguez',
      role: 'Software Engineer, Acme',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      avatarAlt: 'Emily Rodriguez',
    },
    size: '',
  },
};

// Large testimonial
export const Large: Story = {
  render: args => (
    <div style={{ padding: '30px' }}>
      <Testimonial {...args} />
    </div>
  ),
  args: {
    quote:
      'The intuitive interface, seamless syncing across devices, and helpful features have made me more productive than ever before.',
    author: {
      name: 'Emily Rodriguez',
      role: 'Software Engineer, Acme',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      avatarAlt: 'Emily Rodriguez',
    },
    size: 'lg',
  },
};

// Small testimonial
export const Small: Story = {
  render: args => (
    <div style={{ padding: '30px' }}>
      <Testimonial {...args} />
    </div>
  ),
  args: {
    quote:
      'The intuitive interface, seamless syncing across devices, and helpful features have made me more productive than ever before.',
    author: {
      name: 'Emily Rodriguez',
      role: 'Software Engineer, Acme',
      avatarSrc:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      avatarAlt: 'Emily Rodriguez',
    },
    size: 'sm',
  },
};

// Skeleton loading state
export const Skeleton: Story = {
  render: args => (
    <div style={{ padding: '30px' }}>
      <Testimonial {...args} />
    </div>
  ),
  args: {
    skeleton: true,
    size: '',
  },
};

// Large skeleton
export const LargeSkeleton: Story = {
  render: args => (
    <div style={{ padding: '30px' }}>
      <Testimonial {...args} />
    </div>
  ),
  args: {
    skeleton: true,
    size: 'lg',
  },
};

// With rich content in quote
export const RichContent: Story = {
  render: args => (
    <div style={{ padding: '30px' }}>
      <Testimonial {...args} />
    </div>
  ),
  args: {
    quote: (
      <>
        <p>"I feel more in charge of my schedule and less overwhelmed. Highly recommended for</p>
        <p>professionals and anyone aiming to enhance their productivity."</p>
      </>
    ),
    author: {
      name: 'John Smith',
      role: 'Product Manager, XYZ Corp',
      avatarSrc:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3',
      avatarAlt: 'John Smith',
    },
  },
};

// Grid of testimonials
const TestimonialGrid: React.FC = () => {
  return (
    <div className="o-container">
      <div className="o-grid">
        <div className="o-grid__col o-grid__col--4">
          <Testimonial
            size="sm"
            quote="The intuitive interface, seamless syncing across devices, and helpful features have made me more productive than ever before."
            author={{
              name: 'Emily Rodriguez',
              role: 'Software Engineer, Acme',
              avatarSrc:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              avatarAlt: 'Emily Rodriguez',
            }}
          />
        </div>
        <div className="o-grid__col o-grid__col--4">
          <Testimonial
            size="sm"
            quote="I feel more in charge of my schedule and less overwhelmed. Highly recommended for professionals and anyone aiming to enhance their productivity."
            author={{
              name: 'John Smith',
              role: 'Product Manager, XYZ Corp',
              avatarSrc:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3',
              avatarAlt: 'John Smith',
            }}
          />
        </div>
        <div className="o-grid__col o-grid__col--4">
          <Testimonial
            size="sm"
            quote="I've tried numerous productivity apps in the past, but this one truly stands out. It strikes the perfect balance between simplicity and functionality."
            author={{
              name: 'Sarah Johnson',
              role: 'Marketing Director, ABC Inc',
              avatarSrc:
                'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3',
              avatarAlt: 'Sarah Johnson',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const TestimonialGridLayout: Story = {
  render: () => <TestimonialGrid />,
};

// Testimonial with image
const TestimonialWithImage: React.FC = () => {
  return (
    <div className="o-container">
      <div className="o-grid u-align-items-center">
        <div className="o-grid__col o-grid__col--6">
          <Testimonial
            quote="The intuitive interface, seamless syncing across devices, and helpful features have made me more productive than ever before."
            author={{
              name: 'Emily Rodriguez',
              role: 'Software Engineer, Acme',
              avatarSrc:
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              avatarAlt: 'Emily Rodriguez',
            }}
          />
        </div>
        <div className="o-grid__col o-grid__col--6">
          <img src="https://unsplash.it/g/727/250" alt="Image" className="c-river__image" />
        </div>
      </div>
    </div>
  );
};

export const WithImage: Story = {
  render: () => <TestimonialWithImage />,
};
