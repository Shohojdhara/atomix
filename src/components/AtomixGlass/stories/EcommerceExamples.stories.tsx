/**
 * EcommerceExamples.stories.tsx
 *
 * E-commerce examples for AtomixGlass including product cards,
 * pricing tables, shopping carts, and checkout flows.
 *
 * @package Atomix
 * @component AtomixGlass
 */
import React from 'react';
import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AtomixGlass from '../AtomixGlass';
import { BackgroundWrapper, backgroundImages, StoryErrorBoundary } from './shared-components';
import { baseArgTypes } from './argTypes';

import { Button } from '../../Button';
import { Badge } from '../../Badge';

const meta: Meta<typeof AtomixGlass> = {
  title: 'Components/AtomixGlass/Examples/E-commerce Examples',
  component: AtomixGlass,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'E-commerce examples demonstrating AtomixGlass for product displays, pricing tables, and shopping experiences.',
      },
    },
  },
  tags: ['!autodocs'],
  argTypes: {
    ...baseArgTypes,
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof AtomixGlass>;

/**
 * Pricing Table
 *
 * Three-tier pricing table with monthly/yearly billing toggle and feature comparison.
 */
export const PricingTable: Story = {
  render: () => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans = [
      {
        name: 'Starter',
        description: 'Perfect for individuals',
        price: { monthly: 9, yearly: 90 },
        features: ['5 Projects', '10GB Storage', 'Basic Support', 'API Access'],
        popular: false,
        color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      {
        name: 'Professional',
        description: 'For growing teams',
        price: { monthly: 29, yearly: 290 },
        features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Analytics'],
        popular: true,
        color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      {
        name: 'Enterprise',
        description: 'For large organizations',
        price: { monthly: 99, yearly: 990 },
        features: ['Unlimited Everything', '1TB Storage', 'Dedicated Support', 'SLA'],
        popular: false,
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
    ];

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[0]} overlay overlayOpacity={0.4}>
          <div className="u-min-h-screen" style={{ padding: '60px 24px', minHeight: '100vh' }}>
            {/* Header */}
            <div className="u-text-center u-text-white u-mb-5">
              <Badge variant="outline-light" size="lg" className="u-mb-3">
                💎 Pricing Plans
              </Badge>
              <h1 className="u-mt-0 u-text-4xl u-font-bold" style={{ fontSize: '48px' }}>
                Choose Your Plan
              </h1>
              <p className="u-text-lg u-opacity-90">Start free, then scale as you grow</p>

              {/* Billing Toggle */}
              <div className="u-flex u-items-center u-justify-center u-gap-3 u-mt-4">
                <Button
                  variant={billingCycle === 'monthly' ? 'primary' : 'outline-light'}
                  glass={{ elasticity: 0 }}
                  onClick={() => setBillingCycle('monthly')}
                  size="sm"
                >
                  Monthly
                </Button>
                <Button
                  variant={billingCycle === 'yearly' ? 'primary' : 'outline-light'}
                  glass={{ elasticity: 0 }}
                  onClick={() => setBillingCycle('yearly')}
                  size="sm"
                >
                  Yearly <Badge variant="success" className="u-ml-2">Save 17%</Badge>
                </Button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                maxWidth: '1200px',
                margin: '0 auto',
              }}
            >
              {plans.map((plan, index) => (
                <AtomixGlass
                  key={index}
                  displacementScale={plan.popular ? 100 : 40}
                  blurAmount={1}
                  saturation={plan.popular ? 180 : 130}
                  borderRadius={24}
                  mode="standard"
                  style={{ position: 'relative' }}
                  padding="32px"
                >
                  {plan.popular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: plan.color,
                        color: 'white',
                        padding: '4px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div className="u-text-white">
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '16px',
                        background: plan.color,
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                      }}
                      aria-hidden="true"
                    >
                      {index === 0 ? '🚀' : index === 1 ? '⭐' : '👑'}
                    </div>

                    <h3 className="u-m-0 u-text-xl u-font-bold">{plan.name}</h3>
                    <p className="u-m-0 u-text-sm u-opacity-80 u-mb-3">{plan.description}</p>

                    <div className="u-mb-4">
                      <span className="u-text-4xl u-font-bold">${plan.price[billingCycle]}</span>
                      <span className="u-text-sm u-opacity-70">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>

                    <Button
                      variant={plan.popular ? 'primary' : 'outline-light'}
                      glass={{ elasticity: 0 }}
                      className="u-block u-w-full u-mb-4"
                    >
                      Get Started
                    </Button>

                    <div
                      style={{
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        paddingTop: '16px',
                      }}
                    >
                      <p className="u-text-xs u-font-semibold u-text-uppercase u-mb-2 u-opacity-70">
                        What's Included
                      </p>
                      <ul className="u-m-0 u-p-0" style={{ listStyle: 'none' }}>
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="u-flex u-items-center u-gap-2 u-mb-2 u-text-sm">
                            <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AtomixGlass>
              ))}
            </div>
          </div>
        </BackgroundWrapper>
      </StoryErrorBoundary>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Three-tier pricing table with billing cycle toggle, feature lists, and highlighted popular plan.',
      },
    },
  },
};

/**
 * Product Card
 *
 * Modern product card with image, rating, price, and add to cart functionality.
 */
export const ProductCard: Story = {
  render: () => (
    <StoryErrorBoundary>
      <BackgroundWrapper backgroundImage={backgroundImages[6]} overlay overlayOpacity={0.3}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            padding: '40px',
          }}
        >
          {[
            { name: 'Premium Headphones', price: 299, rating: 4.8, reviews: 256, image: '🎧', badge: 'New' },
            { name: 'Smart Watch Pro', price: 449, rating: 4.9, reviews: 512, image: '⌚', badge: 'Best Seller' },
            { name: 'Wireless Earbuds', price: 179, rating: 4.7, reviews: 189, image: '🎵', badge: null },
          ].map((product, index) => (
            <AtomixGlass
              key={index}
              displacementScale={60}
              blurAmount={0.75}
              saturation={140}
              borderRadius={20}
              mode="standard"
            >
              <div className="u-text-white">
                {product.badge && (
                  <Badge variant="primary" className="u-mb-3">
                    {product.badge}
                  </Badge>
                )}
                
                <div
                  style={{
                    height: '200px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '80px',
                    marginBottom: '20px',
                  }}
                  aria-label={product.name}
                >
                  {product.image}
                </div>

                <h3 className="u-m-0 u-text-lg u-font-bold u-mb-2">{product.name}</h3>
                
                <div className="u-flex u-items-center u-gap-2 u-mb-3">
                  <div style={{ color: '#fbbf24', fontSize: '16px' }}>
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="u-text-sm u-opacity-80">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <div className="u-flex u-items-center u-justify-between">
                  <span className="u-text-2xl u-font-bold">${product.price}</span>
                  <Button glass size="sm" variant="primary">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </AtomixGlass>
          ))}
        </div>
      </BackgroundWrapper>
    </StoryErrorBoundary>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Product cards with images, ratings, prices, and add to cart buttons in a responsive grid layout.',
      },
    },
  },
};

/**
 * Shopping Cart Summary
 *
 * Cart summary with items, quantities, and total calculation.
 */
export const ShoppingCart: Story = {
  render: () => {
    const [items] = useState([
      { id: 1, name: 'Premium Headphones', price: 299, quantity: 1, image: '🎧' },
      { id: 2, name: 'USB-C Cable', price: 19, quantity: 2, image: '🔌' },
      { id: 3, name: 'Phone Case', price: 39, quantity: 1, image: '📱' },
    ]);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
      <StoryErrorBoundary>
        <BackgroundWrapper backgroundImage={backgroundImages[2]} overlay overlayOpacity={0.4}>
          <div style={{ maxWidth: '500px' }} className="u-mx-auto">
            <AtomixGlass
              displacementScale={65}
              blurAmount={0.75}
              saturation={140}
              borderRadius={24}
              mode="standard"
              padding="32px"
            >
              <div className="u-text-white">
                <h2 className="u-mt-0 u-text-2xl u-font-bold u-mb-4">Shopping Cart</h2>

                <div className="u-divide-y" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  {items.map((item) => (
                    <div key={item.id} className="u-py-3 u-flex u-items-center u-gap-3">
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '28px',
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      >
                        {item.image}
                      </div>
                      <div className="u-flex-1">
                        <p className="u-m-0 u-font-medium">{item.name}</p>
                        <p className="u-m-0 u-text-sm u-opacity-70">
                          ${item.price} × {item.quantity}
                        </p>
                      </div>
                      <p className="u-m-0 u-font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    borderTop: '2px solid rgba(255,255,255,0.1)',
                    paddingTop: '20px',
                    marginTop: '20px',
                  }}
                >
                  <div className="u-flex u-items-center u-justify-between u-mb-4">
                    <span className="u-text-lg u-font-semibold">Total</span>
                    <span className="u-text-3xl u-font-bold">${total.toFixed(2)}</span>
                  </div>
                  <Button variant="primary" glass={{ elasticity: 0 }} size="lg" className="u-block u-w-full">
                    Checkout
                  </Button>
                  <p className="u-text-center u-text-xs u-opacity-70 u-mt-3">
                    Free shipping on orders over $500
                  </p>
                </div>
              </div>
            </AtomixGlass>
          </div>
        </BackgroundWrapper>
      </StoryErrorBoundary>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shopping cart summary with product items, quantities, subtotal calculations, and checkout button.',
      },
    },
  },
};
