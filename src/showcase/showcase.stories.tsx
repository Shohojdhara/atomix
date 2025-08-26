import type { Meta, StoryObj } from '@storybook/react';
import { AdminDashboard } from './AdminDashboard';
import HomePage from './HomePage';
import Portfolio from './Portfolio';
import CoffeeShop from './CoffeeShop';
import ISP from './ISP';

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

export const PortfolioShowcase: Story = {
  render: () => <Portfolio />,
};

export const CoffeeShopShowcase: Story = {
  render: () => <CoffeeShop />,
};

export const ISPShowcase: Story = {
  render: () => <ISP />,
};