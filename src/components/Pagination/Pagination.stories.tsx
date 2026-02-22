import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { SIZES } from '../../lib/constants/components';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The Pagination component provides navigation controls for moving through multiple pages of content. It displays page numbers, ellipsis for large page ranges, and optional first/last and previous/next buttons. Pagination supports keyboard navigation and is fully accessible.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current active page',
      defaultValue: 1,
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
      defaultValue: 10,
    },
    siblingCount: {
      control: 'number',
      description: 'Number of page links to show before and after current page',
      defaultValue: 1,
    },
    showFirstLastButtons: {
      control: 'boolean',
      description: 'Whether to show first/last page buttons',
      defaultValue: true,
    },
    showPrevNextButtons: {
      control: 'boolean',
      description: 'Whether to show previous/next page buttons',
      defaultValue: true,
    },
    showSearch: {
      control: 'boolean',
      description: 'Whether to show search input for jumping to a specific page',
      defaultValue: false,
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
      defaultValue: 'Go to page',
    },
    size: {
      control: { type: 'select' },
      options: SIZES,
      description: 'Size variant for pagination',
      defaultValue: 'md',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the navigation element',
    },
    className: {
      control: 'text',
      description: 'Custom class for the pagination container',
    },
    glass: {
      control: 'boolean',
      description: 'Enable glass morphism effect',
    },
  },
  args: {
    onPageChange: () => {},
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for controlled pagination
const ControlledPagination = (args: React.ComponentProps<typeof Pagination>) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args.onPageChange?.(page);
  };

  return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
};

export const Default: Story = {
  render: args => <ControlledPagination {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
    siblingCount: 1,
    showFirstLastButtons: true,
    showPrevNextButtons: true,
    size: 'md',
    'aria-label': 'Pagination',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default pagination with first/last and previous/next navigation buttons using icons.',
      },
    },
  },
};

export const WithMorePages: Story = {
  render: args => <ControlledPagination {...args} />,
  args: {
    currentPage: 25,
    totalPages: 50,
    siblingCount: 2,
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with many pages, showing the ellipsis (dots) for page ranges.',
      },
    },
  },
};

export const SmallSize: Story = {
  render: args => <ControlledPagination {...args} />,
  args: {
    currentPage: 4,
    totalPages: 10,
    siblingCount: 1,
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small-sized pagination component with smaller icons and buttons.',
      },
    },
  },
};

export const LargeSize: Story = {
  render: args => <ControlledPagination {...args} />,
  args: {
    currentPage: 4,
    totalPages: 10,
    siblingCount: 1,
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large-sized pagination component with larger icons and buttons.',
      },
    },
  },
};

export const FewPages: Story = {
  render: args => <ControlledPagination {...args} />,
  args: {
    currentPage: 2,
    totalPages: 3,
    siblingCount: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with only a few pages, showing all page numbers without ellipsis.',
      },
    },
  },
};

export const NoFirstLastButtons: Story = {
  render: args => <ControlledPagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 15,
    showFirstLastButtons: false,
    showPrevNextButtons: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with only previous/next navigation buttons (no skip to first/last).',
      },
    },
  },
};

export const OnlyPageNumbers: Story = {
  render: args => <ControlledPagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 15,
    showFirstLastButtons: false,
    showPrevNextButtons: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with only page numbers, no navigation buttons.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: args => <ControlledPagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 15,
    className: 'custom-pagination-class',
    showFirstLastButtons: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with custom CSS class for additional styling.',
      },
    },
  },
};

export const Glass: Story = {
  args: {
    currentPage: 5,
    totalPages: 15,
    siblingCount: 1,
    showFirstLastButtons: true,
    showPrevNextButtons: true,
    size: 'md',
    glass: true,
  },
  render: (args: any) => {
    const [currentPage, setCurrentPage] = React.useState(args.currentPage);
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      args.onPageChange?.(page);
    };

    return (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem',
          borderRadius: '12px',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with glass morphism effect enabled against a gradient background.',
      },
    },
  },
};

export const GlassCustom: Story = {
  args: {
    currentPage: 5,
    totalPages: 15,
    siblingCount: 2,
    showFirstLastButtons: true,
    showPrevNextButtons: true,
    size: 'lg',
    glass: {
      displacementScale: 80,
      blurAmount: 2,
      saturation: 200,
      aberrationIntensity: 0.8,
      cornerRadius: 12,
    },
  },
  render: (args: any) => {
    const [currentPage, setCurrentPage] = React.useState(args.currentPage);
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      args.onPageChange?.(page);
    };

    return (
      <div
        style={{
          background:
            'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '2rem',
          borderRadius: '12px',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h3
            style={{
              color: 'white',
              marginBottom: '2rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Custom Glass Pagination
          </h3>
          <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Pagination with custom glass morphism settings against a scenic background.',
      },
    },
  },
};

export const WithSearch: Story = {
  render: args => <ControlledPagination {...args} />,
  args: {
    currentPage: 5,
    totalPages: 50,
    siblingCount: 2,
    showFirstLastButtons: true,
    showPrevNextButtons: true,
    showSearch: true,
    searchPlaceholder: 'Go to page',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pagination with search functionality to quickly jump to a specific page. Users can type a page number and submit to navigate directly.',
      },
    },
  },
};

export const WithSearchLargeDataset: Story = {
  render: args => <ControlledPagination {...args} />,
  args: {
    currentPage: 250,
    totalPages: 1000,
    siblingCount: 2,
    showFirstLastButtons: true,
    showPrevNextButtons: true,
    showSearch: true,
    searchPlaceholder: 'Enter page number',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Pagination with search functionality for large datasets. The search feature is especially useful when dealing with many pages.',
      },
    },
  },
};
