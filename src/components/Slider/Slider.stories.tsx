import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SliderSlide } from '../../lib/types/components';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    slides: { control: 'object' },
    slidesToShow: { control: { type: 'number', min: 1, max: 5 } },
    slidesToScroll: { control: { type: 'number', min: 1, max: 3 } },
    spaceBetween: { control: { type: 'number', min: 0, max: 50 } },
    centeredSlides: { control: 'boolean' },
    loop: { control: 'boolean' },
    initialSlide: { control: { type: 'number', min: 0 } },
    direction: { control: { type: 'select' }, options: ['horizontal', 'vertical'] },
    speed: { control: { type: 'number', min: 100, max: 2000 } },
    autoplay: { control: 'boolean' },
    navigation: { control: 'boolean' },
    pagination: { control: 'boolean' },
    height: { control: { type: 'number', min: 200, max: 800 } },
    width: { control: 'text' },
    grabCursor: { control: 'boolean' },
    keyboard: { control: 'boolean' },
    mousewheel: { control: 'boolean' },
    freeMode: { control: 'boolean' },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicSlides: SliderSlide[] = [
  {
    id: '1',
    content: (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        Slide 1
      </div>
    ),
  },
  {
    id: '2',
    content: (
      <div
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        Slide 2
      </div>
    ),
  },
  {
    id: '3',
    content: (
      <div
        style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        Slide 3
      </div>
    ),
  },
  {
    id: '4',
    content: (
      <div
        style={{
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        Slide 4
      </div>
    ),
  },
  {
    id: '5',
    content: (
      <div
        style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        Slide 5
      </div>
    ),
  },
];

const imageSlides: SliderSlide[] = [
  {
    id: '1',
    image: 'https://picsum.photos/800/400?random=1',
    alt: 'Random image 1',
    content: null,
  },
  {
    id: '2',
    image: 'https://picsum.photos/800/400?random=2',
    alt: 'Random image 2',
    content: null,
  },
  {
    id: '3',
    image: 'https://picsum.photos/800/400?random=3',
    alt: 'Random image 3',
    content: null,
  },
  {
    id: '4',
    image: 'https://picsum.photos/800/400?random=4',
    alt: 'Random image 4',
    content: null,
  },
];

export const Basic: Story = {
  args: {
    slides: basicSlides,
    height: 300,
    onInit: fn(),
    slidesToShow: 1,
    loop: true,
  },
};

export const WithNavigation: Story = {
  args: {
    slides: basicSlides,
    height: 300,
    width: '600px',
    navigation: true,
    onInit: fn(),
  },
};

export const WithPagination: Story = {
  args: {
    slides: basicSlides,
    height: 300,
    width: '600px',
    pagination: true,
    onInit: fn(),
  },
};

export const ImageSlider: Story = {
  args: {
    slides: imageSlides,
    height: 400,
    width: '800px',
    navigation: true,
    pagination: true,
    onInit: fn(),
  },
};

export const MultipleSlides: Story = {
  args: {
    slides: basicSlides,
    height: 250,
    width: '800px',
    slidesToShow: 3,
    spaceBetween: 20,
    navigation: true,
    onInit: fn(),
  },
};

export const Autoplay: Story = {
  args: {
    slides: basicSlides,
    height: 300,
    width: '600px',
    autoplay: { delay: 3000 },
    navigation: true,
    pagination: true,
    onInit: fn(),
  },
};

export const Vertical: Story = {
  args: {
    slides: basicSlides.slice(0, 3),
    height: 400,
    width: '300px',
    direction: 'vertical',
    navigation: true,
    onInit: fn(),
  },
};
