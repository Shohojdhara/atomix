/**
 * Test Setup for CLI Tests
 */

import { vi } from 'vitest';

// Mock external dependencies
vi.mock('ora', () => ({
  default: vi.fn(() => ({
    start: vi.fn(() => ({
      succeed: vi.fn(),
      fail: vi.fn(),
      stop: vi.fn(),
      text: ''
    }))
  }))
}));

vi.mock('inquirer', () => ({
  prompt: vi.fn()
}));

vi.mock('chalk', () => ({
  default: {
    green: vi.fn((text) => text),
    red: vi.fn((text) => text),
    yellow: vi.fn((text) => text),
    cyan: vi.fn((text) => text),
    gray: vi.fn((text) => text),
    bold: {
      green: vi.fn((text) => text),
      red: vi.fn((text) => text),
      yellow: vi.fn((text) => text),
      cyan: vi.fn((text) => text)
    }
  }
}));

vi.mock('boxen', () => ({
  default: vi.fn((text) => text)
}));

vi.mock('chokidar', () => ({
  default: vi.fn(() => ({
    on: vi.fn(),
    close: vi.fn()
  }))
}));

// Mock file system operations
vi.mock('fs/promises', async () => {
  const actual = await vi.importActual('fs/promises');
  return {
    ...actual,
    writeFile: vi.fn(actual.writeFile),
    readFile: vi.fn(actual.readFile),
    mkdir: vi.fn(actual.mkdir),
    access: vi.fn(actual.access),
    stat: vi.fn(actual.stat),
    rm: vi.fn(actual.rm)
  };
});

// Mock process.cwd for consistent test environment
const originalCwd = process.cwd;

beforeEach(() => {
  // Reset all mocks before each test
  vi.clearAllMocks();
});

afterEach(() => {
  // Restore original process.cwd
  process.cwd = originalCwd;
});

// Global test utilities
global.createMockTempDir = () => '/tmp/atomix-test-' + Math.random().toString(36).substr(2, 9);

global.mockComponentStructure = (componentName, content = '') => ({
  [`${componentName}.tsx`]: content || `
import React, { forwardRef } from 'react';

export const ${componentName} = forwardRef<HTMLDivElement, ${componentName}Props>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

interface ${componentName}Props {
  children?: React.ReactNode;
  className?: string;
}
  `,
  'index.ts': `export { ${componentName} } from './${componentName}';`,
  [`${componentName}.stories.tsx`]: `
import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Test ${componentName}',
  },
};
  `,
  [`${componentName}.test.tsx`]: `
import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders correctly', () => {
    render(<${componentName}>Test</${componentName}>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
  `
});
