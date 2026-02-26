import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { HERO } from '../../lib/constants/components';
import { Button } from '../Button/Button';
import { Hero, HeroProps } from './Hero';

// Extract class names without the leading dots
const HERO_CLASS = HERO.SELECTORS.HERO.replace('.', '');
const CONTAINER_CLASS = HERO.SELECTORS.CONTAINER.replace('.', '');
const GRID_CLASS = HERO.SELECTORS.GRID.replace('.', '');
const CONTENT_CLASS = HERO.SELECTORS.CONTENT.replace('.', '');
const SUBTITLE_CLASS = HERO.SELECTORS.SUBTITLE.replace('.', '');
const TITLE_CLASS = HERO.SELECTORS.TITLE.replace('.', '');
const TEXT_CLASS = HERO.SELECTORS.TEXT.replace('.', '');
const ACTIONS_CLASS = HERO.SELECTORS.ACTIONS.replace('.', '');
const IMAGE_CLASS = HERO.SELECTORS.IMAGE.replace('.', '');
const BG_CLASS = HERO.SELECTORS.BG.replace('.', '');
const BG_IMAGE_CLASS = HERO.SELECTORS.BG_IMAGE.replace('.', '');
const OVERLAY_CLASS = HERO.SELECTORS.OVERLAY.replace('.', '');
const IMAGE_WRAPPER_CLASS = HERO.SELECTORS.IMAGE_WRAPPER.replace('.', '');
const CENTER_CLASS = HERO.CLASSES.CENTER;
const RIGHT_CLASS = HERO.CLASSES.RIGHT;
const LEFT_CLASS = HERO.CLASSES.LEFT;
const FULL_VH_CLASS = HERO.CLASSES.FULL_VH;

// Define missing variables
const demoText =
  'Our design system helps you build beautiful, consistent, and accessible user interfaces faster than ever before. With a carefully crafted collection of components and guidelines, you can easily create stunning UIs that stand out.';

const showcaseText =
  'This is an example of showcase text demonstrating the capabilities of the Atomix design system. Create beautiful interfaces with ease and consistency.';

const primaryActionButtons = (
  <>
    <Button variant="primary" size="lg" className="u-mr-3" onClick={fn()}>
      Get Started
    </Button>
    <Button variant="secondary" size="lg" onClick={fn()}>
      Learn More
    </Button>
  </>
);

const showcaseActionButtons = (
  <>
    <Button variant="primary" size="lg" className="u-mr-3" onClick={fn()}>
      View Demo
    </Button>
    <Button variant="outline" size="lg" onClick={fn()}>
      Contact Us
    </Button>
  </>
);

const meta: Meta<HeroProps> = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Hero

## Overview

Hero creates prominent banner sections typically used at the top of pages. It provides a flexible layout for titles, subtitles, text content, call-to-action buttons, and images. Heroes are ideal for landing pages, marketing sections, or any area requiring prominent visual presentation.

## Features

- Flexible content layout
- Customizable alignment (left, center, right)
- Background image support
- Overlay options
- Full viewport height option
- Parallax effect
- Video background support
- Responsive design
- Customizable column sizing
- Content width control

## Accessibility

- Screen reader: Title and content announced properly
- ARIA support: Proper roles and properties for hero components
- Keyboard support: Accessible via keyboard navigation
- Focus management: Maintains focus on interactive elements

## Usage Examples

### Basic Usage

\`\`\`tsx
<Hero 
  title="Hero Title" 
  subtitle="Hero Subtitle" 
  text="Hero text content" 
/>
\`\`\`

### With Image

\`\`\`tsx
<Hero 
  title="Hero Title" 
  text="Hero text content" 
  imageSrc="/path/to/image.jpg"
  imageAlt="Description of image"
/>
\`\`\`

## API Reference

### Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| title | string | - | Hero title |
| subtitle | string | - | Hero subtitle |
| text | string | - | Hero text content |
| imageSrc | string | - | Image source URL |
| imageAlt | string | - | Image alt text |
| alignment | 'left' \\| 'center' \\| 'right' | 'left' | Content alignment |
| backgroundImageSrc | string | - | Background image source URL |
| showOverlay | boolean | false | Show background overlay |
| fullViewportHeight | boolean | false | Make hero full viewport height |
| imageColSize | number | 6 | Image column size (1-12) |
| contentColSize | number | 6 | Content column size (1-12) |
| contentWidth | string | '536px' | Custom width for the hero content |
| parallax | boolean | false | Enable parallax effect on background image |
| parallaxIntensity | number | 0.5 | Parallax effect intensity (0-1) |
| videoBackground | string | - | Video background URL |
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Hero title',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Hero subtitle',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    text: {
      control: 'text',
      description: 'Hero text content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    imageSrc: {
      control: 'text',
      description: 'Image source URL',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    imageAlt: {
      control: 'text',
      description: 'Image alt text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    alignment: {
      control: { type: 'select', options: ['left', 'center', 'right'] },
      description: 'Content alignment',
      table: {
        type: { summary: '"left" | "center" | "right"' },
        defaultValue: { summary: 'left' },
      },
    },
    backgroundImageSrc: {
      control: 'text',
      description: 'Background image source URL',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    showOverlay: {
      control: 'boolean',
      description: 'Show background overlay',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullViewportHeight: {
      control: 'boolean',
      description: 'Make hero full viewport height',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    imageColSize: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Image column size (1-12)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
      },
    },
    contentColSize: {
      control: { type: 'range', min: 1, max: 12, step: 1 },
      description: 'Content column size (1-12)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
      },
    },
    contentWidth: {
      control: 'text',
      description: 'Custom width for the hero content (e.g., "800px", "50%")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '536px' },
      },
    },
    parallax: {
      control: 'boolean',
      description: 'Enable parallax effect on background image',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    parallaxIntensity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Parallax effect intensity (0-1)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' },
      },
    },
    videoBackground: {
      control: 'text',
      description: 'Video background URL',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
  },
} satisfies Meta<HeroProps>;

export default meta;
type Story = StoryObj<HeroProps>;

export const BasicUsage: Story = {
  args: {
    title: 'Discover Amazing Things',
    subtitle: 'With Atomix Design System',
    text: 'Our design system helps you build beautiful, consistent, and accessible user interfaces faster than ever before.',
    alignment: 'center',
    fullViewportHeight: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic hero section with centered content and full viewport height.',
      },
    },
  },
};

/**
 * Hero using Compound Component Pattern
 */
export const CompoundUsage: Story = {
  render: (args) => (
    <Hero {...args}>
      <Hero.Content>
        <Hero.Title level="h1">Compound Component Pattern</Hero.Title>
        <Hero.Subtitle>Fully Customizable Structure</Hero.Subtitle>
        <Hero.Text>
          This example demonstrates the new Compound Component pattern, allowing full control over the internal structure of the Hero component.
        </Hero.Text>
        <Hero.Actions>
          <Button variant="primary" className="u-mr-3">
            Get Started
          </Button>
          <Button variant="outline">Learn More</Button>
        </Hero.Actions>
      </Hero.Content>
    </Hero>
  ),
  args: {
    fullViewportHeight: true,
    alignment: 'center',
    backgroundImageSrc: 'https://picsum.photos/id/1015/1920/1080',
    title: '', // Ignored but kept for types
    showOverlay: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Using the Compound Component pattern for maximum flexibility.',
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    title: 'Beautiful Interfaces',
    subtitle: 'Crafted with Atomix',
    text: 'Create stunning user experiences with our carefully designed components and guidelines.',
    imageSrc:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    imageAlt: 'Laptop with design interface',
    alignment: 'left',
    fullViewportHeight: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero section with accompanying image on the side.',
      },
    },
  },
};

export const WithBackgroundImage: Story = {
  args: {
    title: 'Adventure Awaits',
    subtitle: 'Begin Your Journey',
    text: 'Explore new possibilities and create amazing products with our design system.',
    backgroundImageSrc:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    showOverlay: true,
    alignment: 'center',
    fullViewportHeight: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero section with background image and overlay.',
      },
    },
  },
};

export const WithActions: Story = {
  render: args => (
    <Hero {...args}>
      <div className={ACTIONS_CLASS}>
        <Button variant="primary" size="lg" className="u-mr-3">
          Get Started
        </Button>
        <Button variant="secondary" size="lg">
          Learn More
        </Button>
      </div>
    </Hero>
  ),
  args: {
    title: 'Ready to Get Started?',
    text: 'Join thousands of satisfied users who have transformed their design workflow.',
    alignment: 'center',
    fullViewportHeight: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero section with call-to-action buttons.',
      },
    },
  },
};

/**
 * Default Hero component with right-aligned content and image
 */
export const Default: Story = {
  args: {
    title: 'Modern UI Components for Developers',
    subtitle: 'Atomix Design System',
    text: demoText,
    imageSrc: 'https://picsum.photos/id/0/712/500',
    imageAlt: 'Developer working with code',
    alignment: 'right',
    actions: primaryActionButtons,
  },
};

/**
 * Hero with glass effect
 */
export const WithGlassEffect: Story = {
  args: {
    title: 'Hero with Glass Effect',
    subtitle: 'Modern UI with Glassmorphism',
    text: 'This hero content is wrapped in a glass effect container for a modern look.',
    backgroundImageSrc: 'https://picsum.photos/id/106/1920/1080',
    showOverlay: true,
    alignment: 'center',
    glass: true,
    contentWidth: '800px',
    actions: primaryActionButtons,
  },
};

/**
 * Hero with custom glass effect
 */
export const WithCustomGlassEffect: Story = {
  args: {
    title: 'Hero with Custom Glass Effect',
    subtitle: 'Fully Customizable Glass Properties',
    text: 'This hero uses custom glass effect properties for a unique visual style.',
    backgroundImageSrc: 'https://picsum.photos/id/15/1920/1080',
    showOverlay: true,
    fullViewportHeight: true,
    alignment: 'center',
    glass: {
      displacementScale: 40,
      blurAmount: -0.1,
      saturation: 130,
      aberrationIntensity: 0,
      borderRadius: 45,
      mode: 'standard',
      elasticity: 0.2,
      onClick: () => {
        console.log('Clicked!');
      },
    },
    contentWidth: '800px',
    actions: primaryActionButtons,
  },
};

/**
 * Hero with left-aligned content and image on right
 */
export const LeftAligned: Story = {
  args: {
    ...Default.args,
    title: 'Crafted for Developer Experience',
    alignment: 'left',
    imageSrc: 'https://picsum.photos/id/3/712/500',
  },
};

/**
 * Hero with center-aligned content and image below
 */
export const CenterAligned: Story = {
  args: {
    ...Default.args,
    title: 'Build Faster with Atomix',
    text: 'Our components follow best practices for accessibility, performance, and responsive design. Start building beautiful interfaces in minutes.',
    alignment: 'center',
    imageSrc: 'https://picsum.photos/id/1/1024/300',
  },
};

/**
 * Hero with background image
 */
export const UniqueWithBackgroundImage: Story = {
  args: {
    ...Default.args,
    title: 'Powerful Design System',
    text: showcaseText,
    actions: showcaseActionButtons,
    backgroundImageSrc: 'https://picsum.photos/id/24/1920/1080',
    showOverlay: true,
  },
};

/**
 * Hero with background image and no foreground image
 */
export const BackgroundImageOnly: Story = {
  args: {
    ...Default.args,
    title: 'Beautiful & Accessible Components',
    text: 'Atomix is built with accessibility in mind, ensuring your applications work for everyone. Our components are fully responsive and follow WAI-ARIA guidelines.',
    imageSrc: undefined,
    backgroundImageSrc: 'https://picsum.photos/id/1067/1920/1080',
    showOverlay: true,
    alignment: 'center',
    actions: showcaseActionButtons,
    contentWidth: '800px',
  },
};

/**
 * Full viewport height hero
 */
export const FullViewportHeight: Story = {
  args: {
    ...BackgroundImageOnly.args,
    title: 'Atomix. Build Once. Use Everywhere.',
    text: 'A flexible, scalable design system that works seamlessly across all devices and platforms.',
    fullViewportHeight: true,
  },
};

/**
 * Left-aligned content with background image
 */
export const LeftAlignedWithBackground: Story = {
  args: {
    ...WithBackgroundImage.args,
    title: 'Customizable & Extensible',
    text: 'Easily customize components to match your brand. Built with a flexible architecture that allows for easy extension and adaptation.',
    alignment: 'left',
  },
};

/**
 * Center-aligned content with background and foreground image
 */
export const CenterAlignedWithImageBackground: Story = {
  args: {
    ...WithBackgroundImage.args,
    title: 'Based on Modern Standards',
    text: 'Built with the latest technologies like React, TypeScript, and SCSS. Follows BEM, ITCSS, and OOCSS methodologies for clean, maintainable CSS.',
    alignment: 'center',
    imageSrc: 'https://picsum.photos/id/160/1312/280',
  },
};

/**
 * Center-aligned content with custom content width
 */
export const CustomContentWidth: Story = {
  args: {
    ...CenterAligned.args,
    title: 'Hero with Custom Content Width',
    text: 'This hero component has a custom content width set through the contentWidth prop, which sets the --atomix-hero-content-width CSS variable.',
    contentWidth: '800px',
  },
};

/**
 * Hero with parallax background effect
 */
export const WithParallaxEffect: Story = {
  args: {
    ...BackgroundImageOnly.args,
    title: 'Parallax Background Effect',
    text: 'This hero features a parallax scrolling effect on the background image, creating depth and visual interest as the user scrolls.',
    backgroundImageSrc: 'https://picsum.photos/id/1015/1920/1080',
    parallax: true,
    parallaxIntensity: 0.5,
    fullViewportHeight: true,
  },
};

/**
 * Hero with video background
 */
export const WithVideoBackground: Story = {
  args: {
    title: 'Video Background Hero',
    subtitle: 'Dynamic & Engaging',
    text: 'Add motion and visual interest to your hero sections with video backgrounds. Perfect for creating immersive landing pages.',
    alignment: 'center',
    videoBackground: 'https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4',
    videoOptions: {
      autoplay: true,
      loop: true,
      muted: true,
      posterUrl: 'https://picsum.photos/id/1018/1920/1080',
    },
    showOverlay: true,
    actions: showcaseActionButtons,
    contentWidth: '800px',
  },
};

/**
 * Hero with video background and foreground image
 */
export const VideoBackgroundWithImage: Story = {
  args: {
    ...WithVideoBackground.args,
    title: 'Complete Media Support',
    text: 'Combine video backgrounds with foreground images for rich, layered visual presentations.',
    alignment: 'left',
    imageSrc: 'https://picsum.photos/id/180/712/500',
    imageAlt: 'Product showcase',
  },
};

/**
 * Hero with background image slider (fade transition)
 */
export const WithBackgroundSlider: Story = {
  args: {
    title: 'Dynamic Background Slider',
    subtitle: 'Multiple Images with Fade Transition',
    text: 'This hero features a background slider with multiple images that automatically transition using a smooth fade effect. Perfect for showcasing multiple products or features.',
    alignment: 'center',
    showOverlay: true,
    actions: showcaseActionButtons,
    contentWidth: '800px',
    backgroundSlider: {
      slides: [
        {
          type: 'image',
          src: 'https://picsum.photos/id/1015/1920/1080',
          alt: 'Mountain landscape',
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/1018/1920/1080',
          alt: 'Forest scene',
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/1025/1920/1080',
          alt: 'Ocean view',
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/1035/1920/1080',
          alt: 'City skyline',
        },
      ],
      autoplay: {
        delay: 3000,
        pauseOnHover: false,
      },
      loop: true,
      transition: 'fade',
      transitionDuration: 1000,
    },
  },
};

/**
 * Hero with background slider (mixed images and videos)
 */
export const WithMixedMediaSlider: Story = {
  args: {
    title: 'Mixed Media Background Slider',
    subtitle: 'Images & Videos Combined',
    text: 'This hero demonstrates a background slider that seamlessly transitions between images and videos, creating a rich, dynamic visual experience.',
    alignment: 'center',
    showOverlay: true,
    actions: showcaseActionButtons,
    contentWidth: '800px',
    backgroundSlider: {
      slides: [
        {
          type: 'image',
          src: 'https://picsum.photos/id/1015/1920/1080',
          alt: 'Mountain landscape',
        },
        {
          type: 'video',
          src: 'https://cdn.pixabay.com/video/2021/02/20/65772-515379427_large.mp4',
          videoOptions: {
            autoplay: true,
            loop: true,
            muted: true,
            posterUrl: 'https://picsum.photos/id/1018/1920/1080',
          },
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/1025/1920/1080',
          alt: 'Ocean view',
        },
        {
          type: 'video',
          src: 'https://cdn.pixabay.com/video/2023/11/18/189639-886016299_large.mp4',
          videoOptions: {
            autoplay: true,
            loop: true,
            muted: true,
            posterUrl: 'https://picsum.photos/id/1035/1920/1080',
          },
        },
      ],
      autoplay: {
        delay: 4000,
        pauseOnHover: false,
      },
      loop: true,
      transition: 'fade',
      transitionDuration: 1500,
    },
  },
};

/**
 * Hero with background slider (fast transitions)
 */
export const WithFastSlider: Story = {
  args: {
    title: 'Fast-Paced Background Slider',
    subtitle: 'Quick Transitions',
    text: 'This slider uses faster transition times and shorter delays for a more dynamic, energetic feel.',
    alignment: 'center',
    showOverlay: true,
    actions: primaryActionButtons,
    contentWidth: '800px',
    backgroundSlider: {
      slides: [
        {
          type: 'image',
          src: 'https://picsum.photos/id/106/1920/1080',
          alt: 'Abstract art',
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/107/1920/1080',
          alt: 'Nature scene',
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/108/1920/1080',
          alt: 'Urban landscape',
        },
      ],
      autoplay: {
        delay: 2000,
        pauseOnHover: false,
      },
      loop: true,
      transition: 'fade',
      transitionDuration: 500,
    },
  },
};

/**
 * Hero with background slider (pause on hover)
 */
export const WithPauseOnHoverSlider: Story = {
  args: {
    title: 'Interactive Background Slider',
    subtitle: 'Pause on Hover',
    text: 'Hover over this hero to pause the slider. Move your mouse away to resume. Perfect for giving users control over the experience.',
    alignment: 'center',
    showOverlay: true,
    actions: showcaseActionButtons,
    contentWidth: '800px',
    backgroundSlider: {
      slides: [
        {
          type: 'image',
          src: 'https://picsum.photos/id/1015/1920/1080',
          alt: 'Mountain landscape',
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/1018/1920/1080',
          alt: 'Forest scene',
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/1025/1920/1080',
          alt: 'Ocean view',
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/1035/1920/1080',
          alt: 'City skyline',
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/1041/1920/1080',
          alt: 'Desert landscape',
        },
      ],
      autoplay: {
        delay: 3000,
        pauseOnHover: true,
      },
      loop: true,
      transition: 'fade',
      transitionDuration: 1000,
    },
  },
};

/**
 * Hero with background slider and glass effect
 */
export const SliderWithGlassEffect: Story = {
  args: {
    title: 'Slider with Glass Effect',
    subtitle: 'Best of Both Worlds',
    text: 'Combine the dynamic background slider with the elegant glass effect for a truly modern, sophisticated hero section.',
    alignment: 'center',
    showOverlay: true,
    glass: true,
    actions: showcaseActionButtons,
    contentWidth: '800px',
    backgroundSlider: {
      slides: [
        {
          type: 'video',
          src: 'https://cdn.pixabay.com/video/2021/02/20/65772-515379427_large.mp4',
          videoOptions: {
            autoplay: true,
            loop: true,
            muted: true,
            posterUrl: 'https://picsum.photos/id/1018/1920/1080',
          },
        },
        {
          type: 'video',
          src: 'https://cdn.pixabay.com/video/2020/11/09/56026-478239201_large.mp4',
          videoOptions: {
            autoplay: true,
            loop: true,
            muted: true,
            posterUrl: 'https://picsum.photos/id/1018/1920/1080',
          },
        },
        {
          type: 'video',
          src: 'https://cdn.pixabay.com/video/2023/11/18/189639-886016299_large.mp4',
          videoOptions: {
            autoplay: true,
            loop: true,
            muted: true,
            posterUrl: 'https://picsum.photos/id/1018/1920/1080',
          },
        },
      ],
      autoplay: {
        delay: 30000,
        pauseOnHover: false,
      },
      loop: true,
      transition: 'fade',
      transitionDuration: 1200,
    },
  },
};

/**
 * Hero with background slider (full viewport height)
 */
export const FullHeightSlider: Story = {
  args: {
    title: 'Full Height Background Slider',
    subtitle: 'Immersive Experience',
    text: 'This hero takes the full viewport height and features a background slider, creating an immersive, full-screen experience.',
    alignment: 'center',
    showOverlay: true,
    fullViewportHeight: true,
    actions: showcaseActionButtons,
    contentWidth: '800px',
    backgroundSlider: {
      slides: [
        {
          type: 'image',
          src: 'https://picsum.photos/id/1015/1920/1080',
          alt: 'Mountain landscape',
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/1018/1920/1080',
          alt: 'Forest scene',
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/1025/1920/1080',
          alt: 'Ocean view',
        },
      ],
      autoplay: {
        delay: 4000,
        pauseOnHover: false,
      },
      loop: true,
      transition: 'fade',
      transitionDuration: 1500,
    },
  },
};

// Enhanced preview examples showcasing the most impressive capabilities
/**
 * Premium showcase combining multiple advanced features
 */
export const PremiumShowcase: Story = {
  args: {
    title: 'Premium Hero Experience',
    subtitle: 'Advanced Capabilities Combined',
    text: 'This hero combines multiple advanced features: glass effect, background slider with videos, full viewport height, and interactive elements for a premium user experience.',
    alignment: 'center',
    showOverlay: true,
    fullViewportHeight: true,
    glass: {
      displacementScale: 50,
      blurAmount: 2,
      saturation: 150,
      aberrationIntensity: 0.5,
      borderRadius: 20,
      overLight: true,
      mode: 'standard',
    },
    actions: (
      <>
        <Button variant="primary" size="lg" className="u-mr-3" onClick={fn()}>
          Explore Features
        </Button>
        <Button variant="secondary" size="lg" onClick={fn()}>
          Get Started Now
        </Button>
      </>
    ),
    contentWidth: '900px',
    backgroundSlider: {
      slides: [
        {
          type: 'video',
          src: 'https://cdn.pixabay.com/video/2023/08/17/173860-844114591_large.mp4',
          videoOptions: {
            autoplay: true,
            loop: true,
            muted: true,
            posterUrl: 'https://picsum.photos/id/1015/1920/1080',
          },
        },
        {
          type: 'image',
          src: 'https://picsum.photos/id/1018/1920/1080',
          alt: 'Stunning landscape',
        },
        {
          type: 'video',
          src: 'https://cdn.pixabay.com/video/2023/11/18/189639-886016299_large.mp4',
          videoOptions: {
            autoplay: true,
            loop: true,
            muted: true,
            posterUrl: 'https://picsum.photos/id/1025/1920/1080',
          },
        },
      ],
      autoplay: {
        delay: 6000,
        pauseOnHover: true,
      },
      loop: true,
      transition: 'slide',
      transitionDuration: 2000,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Premium showcase combining multiple advanced features: glass effect, background slider with videos, full viewport height, and interactive elements.',
      },
    },
  },
};

/**
 * Minimalist design focusing on typography and content
 */
export const MinimalistDesign: Story = {
  args: {
    title: 'Focus on What Matters',
    subtitle: 'Clean & Minimal Approach',
    text: 'Sometimes simplicity speaks louder than complexity. This minimalist hero focuses purely on your content with subtle animations and refined typography.',
    alignment: 'center',
    fullViewportHeight: true,
    showOverlay: false,
    contentWidth: '700px',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimalist design focusing on typography and content, with subtle animations and refined aesthetics.',
      },
    },
  },
};

/**
 * Hero with custom column styles
 */
export const WithCustomColumnStyles: Story = {
  args: {
    ...Default.args,
    title: 'Customized Columns',
    text: 'This hero uses custom classes and inline styles on its layout columns. The content column has a custom background and padding, while the image column has a custom rotation effect.',
    imageSrc: 'https://picsum.photos/id/20/712/500',
    contentColClassName: 'u-bg-primary-50 u-p-6 u-rounded-lg',
    contentColStyle: { border: '2px solid var(--atomix-color-primary-500)' },
    imageColClassName: 'u-shadow-lg',
    imageColStyle: { transform: 'rotate(-2deg)', transition: 'transform 0.3s ease' },
    alignment: 'left',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the use of imageColClassName, imageColStyle, contentColClassName, and contentColStyle to individually style the layout columns.',
      },
    },
  },
};
