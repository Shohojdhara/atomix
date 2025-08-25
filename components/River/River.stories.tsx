import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { River } from './River';
import type { RiverProps } from './River';

export default {
  title: 'Components/River',
  component: River,
  argTypes: {
    center: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    breakout: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    reverse: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    backgroundImageSrc: {
      control: { type: 'text' },
      description: 'Background image source URL',
    },
    showOverlay: {
      control: { type: 'boolean' },
      defaultValue: true,
      description: 'Show background overlay',
    },
    contentWidth: {
      control: { type: 'text' },
      description: 'Custom width for the river content (e.g., "800px", "50%")',
    },
  },
} as Meta<typeof River>;

const Template: StoryFn<typeof River> = args => (
  <div style={{ padding: '0', maxWidth: '100%' }}>
    <River {...args} />
  </div>
);

// Default river (image left, content right)
export const Default = Template.bind({});
Default.args = {
  title: 'Streamline Your Workflow',
  text: 'Our platform provides a comprehensive suite of tools to optimize your workflow and increase productivity. With intuitive interfaces and powerful features, you can accomplish more in less time.',
  actions: (
    <a href="#" className="c-btn c-btn--primary">
      Get Started
    </a>
  ),
  imageSrc: 'https://unsplash.it/g/500/300',
  imageAlt: 'Workflow diagram',
};

// Reverse layout (content left, image right)
export const Reverse = Template.bind({});
Reverse.args = {
  ...Default.args,
  title: 'Data-Driven Insights',
  text: 'Harness the power of analytics to make informed decisions. Our advanced data visualization tools help you understand trends and identify opportunities for growth.',
  reverse: true,
};

// Center layout (content centered)
export const Centered = Template.bind({});
Centered.args = {
  ...Default.args,
  title: 'Award-Winning Support',
  text: 'Our dedicated team of experts is available around the clock to provide assistance and ensure your success. Experience the highest level of customer service.',
  center: true,
};

// Breakout layout (full width)
export const Breakout = Template.bind({});
Breakout.args = {
  ...Default.args,
  title: 'Scale With Confidence',
  text: "Our robust infrastructure adapts to your needs, whether you're a small business or a global enterprise. Grow your operations without worrying about technical limitations.",
  breakout: true,
};

// Multi-paragraph text
export const MultiParagraph = Template.bind({});
MultiParagraph.args = {
  ...Default.args,
  title: 'Revolutionize Your Approach',
  text: [
    'Our innovative solutions are designed to transform how you work, making complex tasks simple and intuitive.',
    "By focusing on user experience and practical functionality, we've created tools that adapt to your workflow rather than forcing you to adapt to them.",
    'Experience the difference that thoughtful design and powerful technology can make in your daily operations.',
  ],
  actions: (
    <a href="#" className="c-btn c-btn--primary">
      Learn More
    </a>
  ),
};

// Content columns
export const ContentColumns = Template.bind({});
ContentColumns.args = {
  contentColumns: [
    {
      type: 'title',
      content: <h2 className="c-river__title">Flexible Content Layout</h2>,
    },
    {
      type: 'text',
      content: (
        <div>
          <p className="c-river__text">
            Use content columns to create custom layouts with different types of content. This
            approach gives you more control over the structure and presentation of your information.
          </p>
          <p className="c-river__text">
            Perfect for featuring important statistics, quotes, or highlighting key information
            alongside your main content.
          </p>
        </div>
      ),
    },
  ],
  actions: (
    <a href="#" className="c-btn c-btn--primary">
      Explore Options
    </a>
  ),
  imageSrc: 'https://unsplash.it/g/500/300',
};

// Custom title styling
export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: <h1 className="c-river__title u-text-gradient">Custom Title with Gradient</h1>,
  text: 'The sun had set, leaving the sky painted in shades of orange and pink as the stars twinkled above. The air was filled with the sound of crickets and the rustle of leaves in the gentle breeze.',
  actions: (
    <a href="#" className="c-btn u-pl-0">
      Text Link <i className="icon-lux-circle"></i>
    </a>
  ),
  imageSrc: 'https://unsplash.it/g/712/196',
  imageAlt: 'Image',
};

// With background image
export const WithBackgroundAndContent = Template.bind({});
WithBackgroundAndContent.args = {
  title: 'Build Faster Applications',
  text: 'Our component library is designed for developers who want to create beautiful interfaces with minimal effort. With built-in TypeScript support and comprehensive documentation, you can focus on building features, not fighting with UI.',
  actions: (
    <a href="#" className="c-btn c-btn--light">
      View Documentation
    </a>
  ),
  imageSrc: 'https://unsplash.it/g/500/300',
  backgroundImageSrc: 'https://unsplash.it/g/1920/600',
  showOverlay: true,
};

// With custom content width
export const CustomContentWidth = Template.bind({});
CustomContentWidth.args = {
  title: 'Powerful Developer Experience',
  text: 'Our River component gives you complete control over your content layout. Customize content width, background images, and layouts to create engaging sections that convert visitors into customers.',
  actions: (
    <a href="#" className="c-btn c-btn--primary">
      Explore API
    </a>
  ),
  imageSrc: 'https://unsplash.it/g/500/300',
  contentWidth: '800px',
};

// Multiple Rivers layout example
const MultipeRiversExample: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <River
        title="Component-Driven Development"
        text="Build your UI from the ground up using our composable components. Each component is designed to work seamlessly with the rest of the library."
        actions={
          <a href="#" className="c-btn c-btn--primary">
            Get Started
          </a>
        }
        imageSrc="https://unsplash.it/g/712/196"
      />

      <River
        title="TypeScript First"
        text="Every component includes full TypeScript definitions, giving you complete type safety and excellent IDE integration."
        actions={
          <a href="#" className="c-btn c-btn--primary">
            Read Docs
          </a>
        }
        imageSrc="https://unsplash.it/g/712/196"
        reverse={true}
      />

      <River
        title="Flexible Layouts"
        text="Create engaging content sections with various layout options. Center, reverse, or breakout - all with simple props."
        actions={
          <a href="#" className="c-btn c-btn--primary">
            See Examples
          </a>
        }
        imageSrc="https://unsplash.it/g/1920/320"
        center={true}
      />

      <River
        title="Pixel-Perfect Design"
        text="Our components follow a consistent design system, ensuring your application looks professional across all pages and states."
        actions={
          <a href="#" className="c-btn c-btn--light">
            View Design System
          </a>
        }
        backgroundImageSrc="https://unsplash.it/g/1920/600"
      />
    </div>
  );
};

export const MultipleRivers: StoryFn<typeof River> = () => <MultipeRiversExample />;
