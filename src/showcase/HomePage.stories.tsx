import type { Meta, StoryObj } from '@storybook/react';
import HomePage from './HomePage';

const meta: Meta<typeof HomePage> = {
  title: 'Showcase/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};