import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AdminDashboard } from './AdminDashboard';
import HomePage from './HomePage';

const meta: Meta<typeof AdminDashboard> = {
  title: 'Showcase/Showcase',
  component: AdminDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj<typeof AdminDashboard>;

export const Dashboard: Story = {};

export const ExampleHomePage: Story = {
  render: () => <HomePage />,
};
