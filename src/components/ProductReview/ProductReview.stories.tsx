import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductReview } from './ProductReview';
import { THEME_COLORS } from '../../lib/constants/components';

const meta = {
  title: 'Components/ProductReview',
  component: ProductReview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The ProductReview component provides a comprehensive form for collecting user ratings and feedback on products. It supports customizable rating scales, half-star ratings, product images, and detailed comment sections. Ideal for e-commerce sites, review platforms, or any application requiring product feedback collection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    productName: {
      control: 'text',
      description: 'Name of the product being reviewed',
    },
    productImage: {
      control: 'text',
      description: 'URL of the product image',
    },
    initialRating: {
      control: { type: 'number', min: 0, max: 5, step: 0.5 },
      description: 'Initial rating value',
    },
    maxRating: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum rating value',
    },
    allowHalf: {
      control: 'boolean',
      description: 'Whether to allow half-star ratings',
    },
    ratingColor: {
      control: {
        type: 'select',
        options: THEME_COLORS,
      },
      description: 'Color variant for the rating stars',
    },
  },
} satisfies Meta<typeof ProductReview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productName: 'Wireless Headphones',
    productImage: 'https://via.placeholder.com/100',
    initialRating: 0,
    maxRating: 5,
    allowHalf: true,
    ratingColor: 'warning',
    onSubmit: (rating: number, comment: string) => {
      console.log('Rating:', rating);
      console.log('Comment:', comment);
    },
  },
};

export const WithInitialRating: Story = {
  args: {
    productName: 'Smart Watch',
    productImage: 'https://via.placeholder.com/100',
    initialRating: 4,
    maxRating: 5,
    allowHalf: true,
    ratingColor: 'warning',
    onSubmit: (rating: number, comment: string) => {
      console.log('Rating:', rating);
      console.log('Comment:', comment);
    },
  },
};

export const WithoutImage: Story = {
  args: {
    productName: 'Bluetooth Speaker',
    initialRating: 0,
    maxRating: 5,
    allowHalf: true,
    ratingColor: 'warning',
    onSubmit: (rating: number, comment: string) => {
      console.log('Rating:', rating);
      console.log('Comment:', comment);
    },
  },
};

export const CustomRatingScale: Story = {
  args: {
    productName: 'Gaming Laptop',
    productImage: 'https://via.placeholder.com/100',
    initialRating: 0,
    maxRating: 10,
    allowHalf: false,
    ratingColor: 'primary',
    onSubmit: (rating: number, comment: string) => {
      console.log('Rating:', rating);
      console.log('Comment:', comment);
    },
  },
};
