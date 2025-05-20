import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { SectionIntro } from './SectionIntro';
import { Button } from '../Button';

const meta: Meta<typeof SectionIntro> = {
  title: 'Components/SectionIntro',
  component: SectionIntro,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    label: { control: 'text' },
    text: { control: 'text' },
    alignment: { 
      control: { type: 'select' }, 
      options: ['left', 'center', 'right'] 
    },
    size: { 
      control: { type: 'select' }, 
      options: ['sm', 'md', 'lg'] 
    },
    skeleton: { control: 'boolean' },
    showOverlay: { control: 'boolean' },
    actions: { control: false },
    backgroundImageSrc: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SectionIntro>;

// Default SectionIntro
export const Default: Story = {
  args: {
    title: 'Our Mission',
    label: 'About Us',
    text: 'We are dedicated to creating beautiful, functional, and accessible components that help developers build amazing websites and applications.',
    alignment: 'left',
    size: 'md',
  },
};

// Left-aligned with actions
export const WithActions: Story = {
  args: {
    ...Default.args,
    actions: (
      <div className="u-flex u-gap-md">
        <Button label="Learn More" />
        <Button label="Contact Us" variant="secondary" />
      </div>
    ),
  },
};

// Center-aligned
export const Centered: Story = {
  args: {
    ...Default.args,
    alignment: 'center',
    text: 'We are dedicated to creating beautiful, functional, and accessible components that help developers build amazing websites and applications.',
  },
};

// Right-aligned
export const RightAligned: Story = {
  args: {
    ...Default.args,
    alignment: 'right',
    text: 'We are dedicated to creating beautiful, functional, and accessible components that help developers build amazing websites and applications.',
  },
};

// With background image
export const WithBackground: Story = {
  args: {
    ...Default.args,
    backgroundImageSrc: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    showOverlay: true,
    alignment: 'center',
    title: 'Discover Our Vision',
    label: 'About Us',
    text: 'We are dedicated to creating beautiful, functional, and accessible components that help developers build amazing websites and applications.',
  },
};

// With image
export const WithImage: Story = {
  args: {
    ...Default.args,
    imageSrc: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    imageAlt: 'Team collaboration',
  },
};

// Small size
export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

// Large size
export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};

// Skeleton loading state
export const Skeleton: Story = {
  args: {
    ...Default.args,
    skeleton: true,
  },
};

// Full example with all features
export const FullExample: Story = {
  args: {
    title: 'Building the Future Together',
    label: 'Our Vision',
    text: 'We believe in creating technology that empowers people to achieve more. Our components are designed with accessibility, performance, and developer experience in mind.',
    alignment: 'center',
    size: 'lg',
    backgroundImageSrc: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    showOverlay: true,
    actions: (
      <div className="u-flex u-gap-md u-justify-center">
        <Button label="Get Started" size="lg" />
        <Button label="Learn More" size="lg" variant="secondary" />
      </div>
    ),
  },
};
