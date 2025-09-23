import type { Meta, StoryObj } from '@storybook/react';
import { AdminDashboard } from './AdminDashboard';
import CoffeeShop from './CoffeeShop';
import Ecommerce from './Ecommerce';
import Healthcare from './Healthcare';
import HomePage from './HomePage';
import ISP from './ISP';
import Portfolio from './Portfolio';
import Saas from './Saas';
import Travel from './Travel';

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

export const SaasShowcase: Story = {
  render: () => <Saas />,
};

export const EcommerceShowcase: Story = {
  render: () => <Ecommerce />,
};

export const HealthcareShowcase: Story = {
  render: () => <Healthcare />,
};

export const TravelShowcase: Story = {
  render: () => <Travel />,
};

