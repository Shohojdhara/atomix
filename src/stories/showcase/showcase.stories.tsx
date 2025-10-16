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

export const Dashboard: Story = {
  decorators: [
    Story => (
      <div
        style={{
          background:
            'url(https://images.unsplash.com/photo-1544420844-cc2a3f40bd91?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3136), linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(255, 0, 0, 0.3) 100%)',
            backgroundBlendMode: 'soft-light',
            backgroundPosition: 'center',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        }}
      >
        <Story />
      </div>
    ),
  ],
};

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
