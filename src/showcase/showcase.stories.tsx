import type { Meta, StoryObj } from '@storybook/react';
import { AdminDashboard } from './AdminDashboard';
import HomePage from './HomePage';

const meta: Meta<typeof AdminDashboard> = {
  title: 'Showcase/Showcase',
  component: AdminDashboard,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AdminDashboard>;

export const Dashboard: Story = {};

export const ExampleHomePage: Story = {
  render: () => <HomePage />,
};
