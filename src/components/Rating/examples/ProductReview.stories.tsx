import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { ProductReview, ProductReviewProps } from './ProductReview';

export default {
  title: 'Examples/ProductReview',
  component: ProductReview,
  parameters: {
    docs: {
      description: {
        component: 'Product review form example using the Rating component',
      },
    },
  },
} as Meta<typeof ProductReview>;

const Template: StoryFn<ProductReviewProps> = (args: ProductReviewProps) => <ProductReview {...args} />;

export const Default = Template.bind({});
Default.args = {
  productName: 'Wireless Headphones',
  productImage: 'https://via.placeholder.com/100',
  initialRating: 0,
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
  onSubmit: (rating: number, comment: string) => {
    console.log('Rating:', rating);
    console.log('Comment:', comment);
  },
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
  productName: 'Bluetooth Speaker',
  initialRating: 0,
  onSubmit: (rating: number, comment: string) => {
    console.log('Rating:', rating);
    console.log('Comment:', comment);
  },
};
