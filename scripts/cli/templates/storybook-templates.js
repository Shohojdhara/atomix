/**
 * Storybook Templates
 * Templates for Storybook stories and documentation
 */

/**
 * Basic Storybook story template
 */
export const basicStoryTemplate = (name) => `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
    },
    disabled: {
      control: 'boolean',
    },
    glass: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '${name} Component',
    size: 'md',
    variant: 'primary',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const Glass: Story = {
  args: {
    ...Default.args,
    glass: true,
  },
};
`;

/**
 * Enhanced Storybook story template with detailed documentation
 */
export const enhancedStoryTemplate = (name) => `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: 'Components/${name}',
  component: ${name},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile ${name.toLowerCase()} component built with Atomix Design System.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be rendered inside the component',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the component',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
      description: 'Color variant of the component',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
    },
    glass: {
      control: 'boolean',
      description: 'Whether to apply glass effect',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '${name} Component',
    size: 'md',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default ${name.toLowerCase()} component with primary variant and medium size.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    children: 'Interactive ${name}',
    size: 'md',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of props.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    children: 'Small ${name}',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    children: 'Large ${name}',
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    variant: 'error',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const Glass: Story = {
  args: {
    ...Default.args,
    glass: true,
  },
  parameters: {
    docs: {
      description: {
        story: '${name} with glass morphism effect applied.',
      },
    },
  },
};

export const CustomContent: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>🎨</span>
        <span>Custom ${name} Content</span>
      </div>
    ),
    size: 'lg',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom content including icons and complex markup.',
      },
    },
  },
};
`;

/**
 * Storybook templates object
 */
export const storybookTemplates = {
  story: basicStoryTemplate,
  storyEnhanced: enhancedStoryTemplate,
};