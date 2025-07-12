import React from 'react';
import { StoryFn, Meta } from '@storybook/react-webpack5';
import { ProductReview, ProductReviewProps } from './ProductReview';

export default {
  title: 'Components/ProductReview',
  component: ProductReview,
  parameters: {
    docs: {
      description: {
        component: 'Product review form for collecting user ratings and feedback',
      },
    },
  },
  argTypes: {
    productName: { control: 'text' },
    productImage: { control: 'text' },
    initialRating: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    maxRating: { control: { type: 'number', min: 1, max: 10 } },
    allowHalf: { control: 'boolean' },
    ratingColor: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'light', 'dark'],
      },
    },
    onSubmit: { action: 'submitted' },
  },
} as Meta<typeof ProductReview>;

const Template: StoryFn<ProductReviewProps> = (args: ProductReviewProps) => (
  <ProductReview {...args} />
);

export const Default = Template.bind({});
Default.args = {
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
};

export const WithInitialRating = Template.bind({});
WithInitialRating.args = {
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
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  productName: 'Bluetooth Speaker',
  initialRating: 0,
  maxRating: 5,
  allowHalf: true,
  ratingColor: 'warning',
  onSubmit: (rating: number, comment: string) => {
    console.log('Rating:', rating);
    console.log('Comment:', comment);
  },
};

export const CustomRatingScale = Template.bind({});
CustomRatingScale.args = {
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
};
