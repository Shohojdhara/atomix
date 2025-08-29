import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SliderSlide } from '../../lib/types/components';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
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

// Basic slides with gradient backgrounds
const basicSlides: SliderSlide[] = [
  {
    id: '1',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">Welcome to Atomix</h2>
          <p className="u-fs-base u-c-white u-mb-4">
            A modern design system for building responsive interfaces
          </p>
          <Button variant="primary">Get Started</Button>
        </div>
      </div>
    ),
  },
  {
    id: '2',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">Flexible Components</h2>
          <p className="u-fs-base u-c-white u-mb-4">
            Build with reusable and customizable components
          </p>
          <Button variant="light">Learn More</Button>
        </div>
      </div>
    ),
  },
  {
    id: '3',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">Easy to Use</h2>
          <p className="u-fs-base u-c-white u-mb-4">Simple API and comprehensive documentation</p>
          <Button variant="light">View Docs</Button>
        </div>
      </div>
    ),
  },
  {
    id: '4',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">Fully Responsive</h2>
          <p className="u-fs-base u-c-white u-mb-4">
            Works on all device sizes from mobile to desktop
          </p>
          <Button variant="dark">See Demo</Button>
        </div>
      </div>
    ),
  },
  {
    id: '5',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">Accessible Design</h2>
          <p className="u-fs-base u-c-white u-mb-4">WCAG 2.1 AA compliant for all users</p>
          <Button variant="info">Learn More</Button>
        </div>
      </div>
    ),
  },
  {
    id: '6',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">Themeable</h2>
          <p className="u-fs-base u-c-white u-mb-4">
            Easily customize colors, spacing and typography
          </p>
          <Button variant="warning">View Themes</Button>
        </div>
      </div>
    ),
  },
  {
    id: '7',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">Performance Focused</h2>
          <p className="u-fs-base u-c-white u-mb-4">
            Optimized for fast loading and smooth interactions
          </p>
          <Button variant="success">See Benchmarks</Button>
        </div>
      </div>
    ),
  },
  {
    id: '8',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">Developer Friendly</h2>
          <p className="u-fs-base u-c-white u-mb-4">Well documented with clear APIs and examples</p>
          <Button variant="primary">View Docs</Button>
        </div>
      </div>
    ),
  },
  {
    id: '9',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">Modular Components</h2>
          <p className="u-fs-base u-c-white u-mb-4">
            Import only what you need to reduce bundle size
          </p>
          <Button variant="dark">See Components</Button>
        </div>
      </div>
    ),
  },
  {
    id: '10',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">Cross Browser</h2>
          <p className="u-fs-base u-c-white u-mb-4">
            Consistent experience across all modern browsers
          </p>
          <Button variant="secondary">View Support</Button>
        </div>
      </div>
    ),
  },
  {
    id: '11',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">RTL Support</h2>
          <p className="u-fs-base u-c-white u-mb-4">Full right-to-left language support built-in</p>
          <Button variant="info">Learn More</Button>
        </div>
      </div>
    ),
  },
  {
    id: '12',
    content: (
      <div
        className="u-p-5 u-h-100"
        style={{
          background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
          width: '100%',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="u-text-center">
          <h2 className="u-fs-3 u-c-white u-mb-3">Open Source</h2>
          <p className="u-fs-base u-c-white u-mb-4">Free to use and contribute to the community</p>
          <Button variant="success">View on GitHub</Button>
        </div>
      </div>
    ),
  },
];

// Product showcase slides using cards
const productSlides: SliderSlide[] = [
  {
    id: '1',
    content: (
      <Card className="u-h-100">
        <div className="u-text-center u-p-4">
          <div
            className="u-mb-4"
            style={{
              width: '100%',
              height: '150px',
              background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)',
              borderRadius: '4px',
            }}
          />
          <h3 className="u-fs-4 u-fw-bold u-mb-2">Premium Plan</h3>
          <p className="u-fs-sm u-c-muted u-mb-3">Perfect for small teams and growing businesses</p>
          <div className="u-mb-4">
            <span className="u-fs-1 u-fw-bold">$29</span>
            <span className="u-fs-sm u-c-muted">/month</span>
          </div>
          <Button variant="primary" className="u-w-100">
            Get Started
          </Button>
        </div>
      </Card>
    ),
  },
  {
    id: '2',
    content: (
      <Card className="u-h-100">
        <div className="u-text-center u-p-4">
          <div
            className="u-mb-4"
            style={{
              width: '100%',
              height: '150px',
              background: 'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)',
              borderRadius: '4px',
            }}
          />
          <h3 className="u-fs-4 u-fw-bold u-mb-2">Business Plan</h3>
          <p className="u-fs-sm u-c-muted u-mb-3">For established teams with advanced needs</p>
          <div className="u-mb-4">
            <span className="u-fs-1 u-fw-bold">$79</span>
            <span className="u-fs-sm u-c-muted">/month</span>
          </div>
          <Button variant="secondary" className="u-w-100">
            Get Started
          </Button>
        </div>
      </Card>
    ),
  },
  {
    id: '3',
    content: (
      <Card className="u-h-100">
        <div className="u-text-center u-p-4">
          <div
            className="u-mb-4"
            style={{
              width: '100%',
              height: '150px',
              background: 'linear-gradient(45deg, #ffecd2 0%, #fcb69f 100%)',
              borderRadius: '4px',
            }}
          />
          <h3 className="u-fs-4 u-fw-bold u-mb-2">Enterprise Plan</h3>
          <p className="u-fs-sm u-c-muted u-mb-3">Custom solutions for large organizations</p>
          <div className="u-mb-4">
            <span className="u-fs-1 u-fw-bold">Custom</span>
          </div>
          <Button variant="dark" className="u-w-100">
            Contact Sales
          </Button>
        </div>
      </Card>
    ),
  },
  {
    id: '4',
    content: (
      <Card className="u-h-100">
        <div className="u-text-center u-p-4">
          <div
            className="u-mb-4"
            style={{
              width: '100%',
              height: '150px',
              background: 'linear-gradient(45deg, #a8c8ec 0%, #72a2e0 100%)',
              borderRadius: '4px',
            }}
          />
          <h3 className="u-fs-4 u-fw-bold u-mb-2">Developer Plan</h3>
          <p className="u-fs-sm u-c-muted u-mb-3">For developers and technical teams</p>
          <div className="u-mb-4">
            <span className="u-fs-1 u-fw-bold">$49</span>
            <span className="u-fs-sm u-c-muted">/month</span>
          </div>
          <Button variant="info" className="u-w-100">
            Get Started
          </Button>
        </div>
      </Card>
    ),
  },
];

// Testimonial slides
const testimonialSlides: SliderSlide[] = [
  {
    id: '1',
    content: (
      <Card className="u-h-100">
        <div className="u-p-5 u-text-center">
          <div className="u-mb-4 u-d-flex u-justify-content-center">
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              }}
            />
          </div>
          <p className="u-fs-base u-fst-italic u-mb-4">
            "Atomix has completely transformed how we build our user interfaces. The components are
            intuitive and the design system is consistent across all our products."
          </p>
          <h4 className="u-fs-4 u-fw-bold">Jane Cooper</h4>
          <p className="u-fs-sm u-c-muted">Product Designer, TechCorp</p>
        </div>
      </Card>
    ),
  },
  {
    id: '2',
    content: (
      <Card className="u-h-100">
        <div className="u-p-5 u-text-center">
          <div className="u-mb-4 u-d-flex u-justify-content-center">
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
              }}
            />
          </div>
          <p className="u-fs-base u-fst-italic u-mb-4">
            "Implementing Atomix reduced our development time by 40%. The documentation is excellent
            and the components are highly customizable."
          </p>
          <h4 className="u-fs-4 u-fw-bold">John Doe</h4>
          <p className="u-fs-sm u-c-muted">Frontend Developer, StartupX</p>
        </div>
      </Card>
    ),
  },
  {
    id: '3',
    content: (
      <Card className="u-h-100">
        <div className="u-p-5 u-text-center">
          <div className="u-mb-4 u-d-flex u-justify-content-center">
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
              }}
            />
          </div>
          <p className="u-fs-base u-fst-italic u-mb-4">
            "The accessibility features in Atomix are impressive. Our products now meet WCAG 2.1 AA
            standards with minimal effort."
          </p>
          <h4 className="u-fs-4 u-fw-bold">Sarah Johnson</h4>
          <p className="u-fs-sm u-c-muted">Accessibility Lead, InclusiveTech</p>
        </div>
      </Card>
    ),
  },
];

// Feature showcase slides
const featureSlides: SliderSlide[] = [
  {
    id: '1',
    content: (
      <div className="u-h-100" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="o-grid u-w-100">
          <div className="o-grid__col u-col-12 u-col-md-6 u-d-flex u-flex-column u-justify-content-center u-p-5">
            <h2 className="u-fs-3 u-fw-bold u-mb-3">Responsive Design</h2>
            <p className="u-fs-base u-c-muted u-mb-4">
              All components are built with mobile-first responsive design principles, ensuring your
              interfaces look great on any device.
            </p>
            <div>
              <Button variant="primary">Learn More</Button>
            </div>
          </div>
          <div className="o-grid__col u-col-12 u-col-md-6 u-d-flex u-align-items-center u-justify-content-center u-p-5">
            <div
              className="u-w-100 u-h-100"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              Mobile First
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '2',
    content: (
      <div className="u-h-100" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="o-grid u-w-100">
          <div className="o-grid__col u-col-12 u-col-md-6 u-d-flex u-flex-column u-justify-content-center u-p-5">
            <h2 className="u-fs-3 u-fw-bold u-mb-3">Accessibility</h2>
            <p className="u-fs-base u-c-muted u-mb-4">
              Built with WCAG 2.1 AA compliance in mind, ensuring your applications are usable by
              everyone, including people with disabilities.
            </p>
            <div>
              <Button variant="secondary">Accessibility Guide</Button>
            </div>
          </div>
          <div className="o-grid__col u-col-12 u-col-md-6 u-d-flex u-align-items-center u-justify-content-center u-p-5">
            <div
              className="u-w-100 u-h-100"
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              WCAG 2.1 AA
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '3',
    content: (
      <div className="u-h-100" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="o-grid u-w-100">
          <div className="o-grid__col u-col-12 u-col-md-6 u-d-flex u-flex-column u-justify-content-center u-p-5">
            <h2 className="u-fs-3 u-fw-bold u-mb-3">Customizable</h2>
            <p className="u-fs-base u-c-muted u-mb-4">
              Easily customize colors, spacing, typography and more through CSS variables or SCSS
              mixins to match your brand identity.
            </p>
            <div>
              <Button variant="success">Customization Guide</Button>
            </div>
          </div>
          <div className="o-grid__col u-col-12 u-col-md-6 u-d-flex u-align-items-center u-justify-content-center u-p-5">
            <div
              className="u-w-100 u-h-100"
              style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              Theme Variables
            </div>
          </div>
        </div>
      </div>
    ),
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
  parameters: {
    docs: {
      description: {
        story: 'A basic slider with gradient slides and loop enabled.',
      },
    },
  },
};

export const WithNavigation: Story = {
  args: {
    slides: basicSlides,
    height: 300,
    width: '100%',
    navigation: true,
    onInit: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with navigation buttons to move between slides.',
      },
    },
  },
};

export const WithPagination: Story = {
  args: {
    slides: basicSlides,
    height: 300,
    width: '100%',
    pagination: true,
    onInit: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Slider with pagination bullets to indicate current slide and allow direct navigation.',
      },
    },
  },
};

export const WithNavigationAndPagination: Story = {
  args: {
    slides: basicSlides,
    height: 300,
    width: '100%',
    navigation: true,
    pagination: true,
    onInit: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with both navigation buttons and pagination bullets for complete control.',
      },
    },
  },
};

export const ProductShowcase: Story = {
  args: {
    slides: productSlides,
    height: 350,
    width: '100%',
    spaceBetween: 20,
    navigation: true,
    pagination: true,
    onInit: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Product showcase slider with card-based slides.',
      },
    },
  },
};

export const Testimonials: Story = {
  args: {
    slides: testimonialSlides,
    height: 300,
    width: '100%',
    navigation: true,
    pagination: true,
    onInit: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Testimonial slider with customer feedback cards.',
      },
    },
  },
};

export const Features: Story = {
  args: {
    slides: featureSlides,
    height: 300,
    width: '100%',
    navigation: true,
    pagination: true,
    onInit: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Feature showcase slider with split layout content.',
      },
    },
  },
};

export const MultipleSlides: Story = {
  args: {
    slides: basicSlides,
    height: 250,
    width: '100%',
    slidesToShow: 3,
    spaceBetween: 20,
    navigation: true,
    onInit: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider showing multiple slides at once with spacing between them.',
      },
    },
  },
};

export const CenteredSlides: Story = {
  args: {
    slides: basicSlides,
    height: 250,
    width: '100%',
    slidesToShow: 2.5,
    spaceBetween: 15,
    centeredSlides: true,
    navigation: true,
    pagination: true,
    onInit: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with centered slides and partial visibility of adjacent slides.',
      },
    },
  },
};

export const Autoplay: Story = {
  args: {
    slides: basicSlides,
    height: 300,
    width: '100%',
    autoplay: true,
    loop: true,
    navigation: true,
    pagination: true,
    onInit: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with automatic playback that cycles through slides every 3 seconds.'
      }
    }
  }
};

export const Vertical: Story = {
  args: {
    slides: basicSlides.slice(0, 3),
    height: 400,
    width: '100%',
    direction: 'vertical',
    navigation: true,
    pagination: true,
    onInit: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical slider that moves through slides in a vertical direction.',
      },
    },
  },
};
