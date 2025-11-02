import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { fn } from '@storybook/test';
import { Pagination } from './Pagination';
import { PaginationProps } from '../../lib/types/components';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current active page',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },

    siblingCount: {
      control: 'number',
      description: 'Number of page links to show before and after current page',
    },
    showFirstLastButtons: {
      control: 'boolean',
      description: 'Whether to show first/last page buttons',
    },
    showPrevNextButtons: {
      control: 'boolean',
      description: 'Whether to show previous/next page buttons',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant for pagination',
    },
    ariaLabel: {
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
  parameters: {
    docs: {
      description: {
        component:
          'A Pagination component for navigating through pages of content with enhanced accessibility, configurable sizes, and icons for navigation buttons.',
      },
    },
  },
} as Meta<typeof Pagination>;

// Template with controlled state
const ControlledTemplate: StoryFn<PaginationProps> = args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    args.onPageChange?.(page);
  };

  return <Pagination {...args} currentPage={currentPage} onPageChange={handlePageChange} />;
};

export const Default = ControlledTemplate.bind({});
Default.args = {
  currentPage: 1,
  totalPages: 10,
  siblingCount: 1,
  showFirstLastButtons: true,
  showPrevNextButtons: true,
  size: 'md',
  ariaLabel: 'Pagination',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default pagination with first/last and previous/next navigation buttons using icons.',
    },
  },
};

export const WithMorePages = ControlledTemplate.bind({});
WithMorePages.args = {
  currentPage: 25,
  totalPages: 50,
  siblingCount: 2,
  size: 'md',
};
WithMorePages.parameters = {
  docs: {
    description: {
      story: 'Pagination with many pages, showing the ellipsis (dots) for page ranges.',
    },
  },
};

export const SmallSize = ControlledTemplate.bind({});
SmallSize.args = {
  currentPage: 4,
  totalPages: 10,
  siblingCount: 1,
  size: 'sm',
};
SmallSize.parameters = {
  docs: {
    description: {
      story: 'Small-sized pagination component with smaller icons and buttons.',
    },
  },
};

export const LargeSize = ControlledTemplate.bind({});
LargeSize.args = {
  currentPage: 4,
  totalPages: 10,
  siblingCount: 1,
  size: 'lg',
};
LargeSize.parameters = {
  docs: {
    description: {
      story: 'Large-sized pagination component with larger icons and buttons.',
    },
  },
};

export const FewPages = ControlledTemplate.bind({});
FewPages.args = {
  currentPage: 2,
  totalPages: 3,
  siblingCount: 1,
};
FewPages.parameters = {
  docs: {
    description: {
      story: 'Pagination with only a few pages, showing all page numbers without ellipsis.',
    },
  },
};

export const NoFirstLastButtons = ControlledTemplate.bind({});
NoFirstLastButtons.args = {
  currentPage: 5,
  totalPages: 15,
  showFirstLastButtons: false,
  showPrevNextButtons: true,
};
NoFirstLastButtons.parameters = {
  docs: {
    description: {
      story: 'Pagination with only previous/next navigation buttons (no skip to first/last).',
    },
  },
};

export const OnlyPageNumbers = ControlledTemplate.bind({});
OnlyPageNumbers.args = {
  currentPage: 5,
  totalPages: 15,
  showFirstLastButtons: false,
  showPrevNextButtons: false,
};
OnlyPageNumbers.parameters = {
  docs: {
    description: {
      story: 'Pagination with only page numbers, no navigation buttons.',
    },
  },
};

export const CustomStyling = ControlledTemplate.bind({});
CustomStyling.args = {
  currentPage: 5,
  totalPages: 15,
  className: 'custom-pagination-class',
  showFirstLastButtons: false,
};
CustomStyling.parameters = {
  docs: {
    description: {
      story: 'Pagination with custom CSS class for additional styling.',
    },
  },
};

export const Glass = {
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

export const GlassCustom = {
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
          background: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
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
          <h3 style={{ color: 'white', marginBottom: '2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
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
