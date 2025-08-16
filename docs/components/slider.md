# Slider Component

A comprehensive, world-class slider component with advanced features and smooth animations. This is one of the most feature-rich slider implementations available, rivaling and surpassing popular libraries like Swiper.js.

## Features

### 🎨 Visual Effects
- **Slide** - Default sliding transition
- **Fade** - Smooth fade transitions between slides
- **Cube** - 3D cube rotation effect
- **Coverflow** - Apple-style coverflow effect
- **Flip** - 3D flip transitions
- **Cards** - Stack of cards effect
- **Creative** - Custom transform effects

### Core Features
- **Multiple slides per view** with responsive breakpoints
- **Touch/swipe gestures** and mouse drag support
- **Autoplay** with pause on hover and custom delays
- **Loop mode** for infinite scrolling
- **Free mode** (no snap to slides)
- **Vertical and horizontal** orientation
- **Keyboard and mousewheel** control
- **Full accessibility** support with ARIA labels and screen reader announcements

### Advanced Features
- **Multiple pagination types**: bullets, fraction, progressbar, custom
- **Navigation arrows** with custom styling and disabled states
- **Scrollbar** with drag support
- **Multiple transition effects**: slide, fade, cube, coverflow, flip, cards, creative
- **Thumbnail navigation** with horizontal/vertical layouts
- **Zoom functionality** for images
- **Lazy loading** for performance optimization
- **Virtual slides** for handling large datasets
- **Responsive design** with detailed breakpoint configuration
- **Custom styling** and theming support

### Performance Features
- **Hardware acceleration** using CSS transforms
- **Optimized rendering** with virtual slides
- **Lazy loading** of images and content
- **Efficient event handling** with proper cleanup
- **Memory management** with automatic garbage collection

## Installation

The Slider component is included in the Atomix design system:

```bash
npm install @atomix/react
```

## Basic Usage

### React Component

```tsx
import { Slider } from '@atomix/react';

const slides = [
  {
    id: 'slide-1',
    content: <div>Slide 1 Content</div>,
    title: 'Slide 1',
    description: 'Description for slide 1',
    image: 'path/to/image1.jpg',
  },
  {
    id: 'slide-2',
    content: <div>Slide 2 Content</div>,
    title: 'Slide 2',
    description: 'Description for slide 2',
    image: 'path/to/image2.jpg',
  },
  // ... more slides
];

function MyComponent() {
  return (
    <Slider
      slides={slides}
      slidesToShow={1}
      autoplay={{ delay: 3000, pauseOnHover: true }}
      pagination={{ type: 'bullets', clickable: true }}
      navigation={true}
    />
  );
}
```

### Vanilla JavaScript

```html
<!-- HTML -->
<div id="my-slider" data-slider data-autoplay="3000">
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</div>
```

```javascript
// JavaScript
const slider = new window.Atomix.Slider('#my-slider', {
  slidesToShow: 1,
  autoplay: { delay: 3000, pauseOnHover: true },
  pagination: { type: 'bullets', clickable: true },
  navigation: true
});
```

## Configuration Options

### Basic Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `slides` | `SliderSlide[]` | `[]` | Array of slide objects |
| `slidesToShow` | `number` | `1` | Number of slides to show at once |
| `slidesToScroll` | `number` | `1` | Number of slides to scroll at once |
| `spaceBetween` | `number` | `0` | Space between slides in pixels |
| `centeredSlides` | `boolean` | `false` | Whether to center slides |
| `loop` | `boolean` | `false` | Whether to loop slides infinitely |
| `initialSlide` | `number` | `0` | Initial slide index |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider direction |
| `speed` | `number` | `300` | Transition speed in milliseconds |
| `easing` | `string` | `'ease-out'` | CSS easing function |

### Interaction Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowTouchMove` | `boolean` | `true` | Whether to allow touch/swipe gestures |
| `threshold` | `number` | `5` | Touch threshold for swipe in pixels |
| `mousewheel` | `boolean` | `false` | Whether to enable mouse wheel control |
| `keyboard` | `boolean` | `false` | Whether to enable keyboard control |
| `grabCursor` | `boolean` | `false` | Whether to show grab cursor on hover |
| `freeMode` | `boolean` | `false` | Whether to enable free mode (no snap) |
| `resistanceRatio` | `number` | `0.85` | Resistance ratio for edges |

### Autoplay Configuration

```tsx
autoplay: {
  delay: 3000,                    // Delay between transitions
  stopOnInteraction: true,        // Stop on user interaction
  pauseOnHover: true,            // Pause on hover
  reverseDirection: false        // Reverse direction
}
```

### Pagination Configuration

```tsx
pagination: {
  type: 'bullets',               // 'bullets' | 'fraction' | 'progressbar' | 'custom'
  clickable: true,               // Whether bullets are clickable
  hideOnClick: false,            // Hide pagination on click
  renderCustom: (current, total) => `${current}/${total}` // Custom render function
}
```

### Navigation Configuration

```tsx
navigation: {
  enabled: true,                 // Whether navigation is enabled
  prevEl: <CustomPrevButton />,  // Custom previous button
  nextEl: <CustomNextButton />,  // Custom next button
  hideOnClick: false,            // Hide navigation on click
  disabledClass: 'disabled'      // Custom disabled class
}
```

### Effect Configuration

```tsx
effect: {
  type: 'coverflow',             // Effect type
  options: {
    rotate: 50,                  // Rotation angle
    stretch: 0,                  // Stretch factor
    depth: 100,                  // Depth offset
    modifier: 1,                 // Effect modifier
    shadows: true                // Enable shadows
  }
}
```

### Responsive Breakpoints

```tsx
breakpoints: {
  640: {
    slidesToShow: 1,
    spaceBetween: 16
  },
  768: {
    slidesToShow: 2,
    spaceBetween: 20
  },
  1024: {
    slidesToShow: 3,
    spaceBetween: 24
  }
}
```

## Advanced Examples

### Image Gallery with Thumbnails

```tsx
<Slider
  slides={imageSlides}
  slidesToShow={1}
  loop={true}
  navigation={true}
  pagination={{ type: 'fraction' }}
  thumbs={{
    enabled: true,
    slides: imageSlides,
    slidesToShow: 6,
    spaceBetween: 10,
    clickable: true
  }}
  zoom={{
    enabled: true,
    maxRatio: 3,
    toggle: true
  }}
/>
```

### Product Carousel

```tsx
<Slider
  slides={productSlides}
  slidesToShow={4}
  spaceBetween={24}
  loop={true}
  grabCursor={true}
  pagination={{ type: 'bullets', clickable: true }}
  navigation={true}
  breakpoints={{
    320: { slidesToShow: 1, spaceBetween: 12 },
    640: { slidesToShow: 2, spaceBetween: 16 },
    768: { slidesToShow: 3, spaceBetween: 20 },
    1024: { slidesToShow: 4, spaceBetween: 24 }
  }}
/>
```

### Coverflow Effect

```tsx
<Slider
  slides={slides}
  slidesToShow={3}
  centeredSlides={true}
  spaceBetween={30}
  loop={true}
  grabCursor={true}
  effect={{
    type: 'coverflow',
    options: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      shadows: true
    }
  }}
/>
```

### Vertical Slider

```tsx
<Slider
  slides={slides}
  direction="vertical"
  slidesToShow={3}
  spaceBetween={16}
  height="500px"
  mousewheel={true}
  pagination={{ type: 'bullets', clickable: true }}
/>
```

### Free Mode with Scrollbar

```tsx
<Slider
  slides={slides}
  slidesToShow={4}
  spaceBetween={20}
  freeMode={true}
  grabCursor={true}
  scrollbar={{ draggable: true }}
  mousewheel={true}
/>
```

## Slide Object Structure

```tsx
interface SliderSlide {
  id: string;                    // Unique identifier
  content: ReactNode;            // Slide content
  image?: string;                // Optional image source
  alt?: string;                  // Image alt text
  title?: string;                // Optional title
  description?: string;          // Optional description
  href?: string;                 // Optional link URL
  onClick?: () => void;          // Optional click handler
  className?: string;            // Custom CSS class
}
```

## Events and Callbacks

### React Events

```tsx
<Slider
  slides={slides}
  onSlideChange={(activeIndex) => console.log('Slide changed:', activeIndex)}
  onSlideChangeTransitionStart={(activeIndex) => console.log('Transition start:', activeIndex)}
  onSlideChangeTransitionEnd={(activeIndex) => console.log('Transition end:', activeIndex)}
  onInit={(slider) => console.log('Slider initialized:', slider)}
  onDestroy={() => console.log('Slider destroyed')}
  onReachBeginning={() => console.log('Reached beginning')}
  onReachEnd={() => console.log('Reached end')}
  onAutoplayStart={() => console.log('Autoplay started')}
  onAutoplayStop={() => console.log('Autoplay stopped')}
/>
```

### Vanilla JS Events

```javascript
const slider = new Atomix.Slider('#slider', {
  onSlideChange: (activeIndex) => console.log('Slide changed:', activeIndex),
  onInit: (slider) => console.log('Slider initialized:', slider)
});

// Or listen to custom events
slider.element.addEventListener('slider:slideChange', (e) => {
  console.log('Slide changed:', e.detail);
});
```

## API Methods

### React Ref Methods

```tsx
const sliderRef = useRef();

// Go to specific slide
sliderRef.current?.goToSlide(2);

// Go to next slide
sliderRef.current?.slideNext();

// Go to previous slide
sliderRef.current?.slidePrev();

// Start autoplay
sliderRef.current?.startAutoplay();

// Stop autoplay
sliderRef.current?.stopAutoplay();
```

### Vanilla JS Methods

```javascript
const slider = new Atomix.Slider('#slider');

// Navigation methods
slider.goToSlide(2);
slider.slideNext();
slider.slidePrev();

// Autoplay methods
slider.startAutoplay();
slider.stopAutoplay();

// State methods
const state = slider.getState();
const config = slider.getConfig();
slider.updateConfig({ speed: 500 });

// Cleanup
slider.destroy();
```

## Styling and Theming

### CSS Custom Properties

```css
.c-slider {
  --atomix-slider-height: 400px;
  --atomix-slider-space-between: 20px;
  --atomix-slider-transition-duration: 300ms;
}
```

### Size Variants

```tsx
<Slider size="sm" slides={slides} />  <!-- Small -->
<Slider size="md" slides={slides} />  <!-- Medium (default) -->
<Slider size="lg" slides={slides} />  <!-- Large -->
```

### Custom Classes

```tsx
<Slider
  slides={slides}
  className="my-custom-slider"
  containerClass="my-container"
  wrapperClass="my-wrapper"
  slideClass="my-slide"
/>
```

## Accessibility

The Slider component is fully accessible and includes:

- **ARIA labels** and roles for screen readers
- **Keyboard navigation** with arrow keys, Home, End, and Spacebar
- **Focus management** with proper tab order
- **Screen reader announcements** for slide changes
- **High contrast mode** support
- **Reduced motion** support for users with vestibular disorders

### Keyboard Shortcuts

- **Arrow Keys**: Navigate slides (direction-aware)
- **Home**: Go to first slide
- **End**: Go to last slide
- **Spacebar**: Toggle autoplay
- **Tab**: Navigate through interactive elements

## Performance Optimization

### Lazy Loading

```tsx
<Slider
  slides={slides}
  lazy={{
    enabled: true,
    loadPrevNext: true,
    loadPrevNextAmount: 2
  }}
/>
```

### Virtual Slides

```tsx
<Slider
  slides={slides}
  virtual={{
    enabled: true,
    cache: true,
    addSlidesBefore: 2,
    addSlidesAfter: 2
  }}
/>
```

## Browser Support

- **Modern browsers** (Chrome 60+, Firefox 60+, Safari 12+, Edge 79+)
- **Mobile browsers** with touch support
- **Progressive enhancement** for older browsers
- **Hardware acceleration** where available

## Migration from Other Libraries

### From Swiper.js

The Atomix Slider API is designed to be familiar to Swiper.js users:

```javascript
// Swiper.js
new Swiper('.swiper', {
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: { delay: 3000 }
});

// Atomix Slider
new Atomix.Slider('.slider', {
  slidesToShow: 3,
  spaceBetween: 30,
  autoplay: { delay: 3000 }
});
```

### From Slick Carousel

```javascript
// Slick
$('.slider').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000
});

// Atomix Slider
new Atomix.Slider('.slider', {
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: { delay: 3000 }
});
```

## Troubleshooting

### Common Issues

1. **Slides not showing**: Ensure slides array is not empty and contains valid slide objects
2. **Touch not working**: Check that `allowTouchMove` is enabled
3. **Autoplay not starting**: Verify autoplay configuration and check for JavaScript errors
4. **Responsive not working**: Ensure breakpoints are configured correctly
5. **Performance issues**: Enable lazy loading and virtual slides for large datasets

### Debug Mode

```javascript
const slider = new Atomix.Slider('#slider', {
  // ... config
}, { debug: true }); // Enable debug logging
```

## Examples and Demos

Visit our [Storybook documentation](https://atomix-storybook.netlify.app) to see live examples and interactive demos of all slider configurations and features.

## Contributing

The Slider component is part of the Atomix design system. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## License

MIT License - see LICENSE file for details.