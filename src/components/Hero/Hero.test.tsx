import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from './Hero';

// Mock AtomixGlass component
vi.mock('../AtomixGlass/AtomixGlass', () => ({
  AtomixGlass: ({ children, className }: any) => (
    <div data-testid="atomix-glass" className={className}>
      {children}
    </div>
  ),
}));

describe('Hero Component', () => {
  describe('Monolithic Usage', () => {
    it('renders title and subtitle correctly', () => {
      render(<Hero title="Test Title" subtitle="Test Subtitle" />);

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('renders text content correctly', () => {
      render(<Hero title="Title" text="Test Description" />);

      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders background image correctly', () => {
      const bgSrc = 'test-bg.jpg';
      render(<Hero title="Title" backgroundImageSrc={bgSrc} />);

      const bgImage = screen.getByAltText('Background');
      expect(bgImage).toBeInTheDocument();
      expect(bgImage).toHaveAttribute('src', bgSrc);
    });

    it('renders foreground image correctly', () => {
      const imgSrc = 'test-img.jpg';
      render(<Hero title="Title" imageSrc={imgSrc} imageAlt="Foreground Image" />);

      const image = screen.getByAltText('Foreground Image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', imgSrc);
    });

    it('renders actions correctly', () => {
      render(
        <Hero
          title="Title"
          actions={<button>Click Me</button>}
        />
      );

      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('renders children correctly', () => {
      render(
        <Hero title="Title">
          <div data-testid="child-content">Child Content</div>
        </Hero>
      );

      expect(screen.getByTestId('child-content')).toBeInTheDocument();
    });
  });

  describe('Compound Component Usage', () => {
    it('renders Hero.Title, Hero.Subtitle, Hero.Text correctly', () => {
      render(
        <Hero title="">
          <Hero.Content>
            <Hero.Title>Compound Title</Hero.Title>
            <Hero.Subtitle>Compound Subtitle</Hero.Subtitle>
            <Hero.Text>Compound Text</Hero.Text>
          </Hero.Content>
        </Hero>
      );

      expect(screen.getByText('Compound Title')).toBeInTheDocument();
      expect(screen.getByText('Compound Title').tagName).toBe('H1');
      expect(screen.getByText('Compound Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Compound Text')).toBeInTheDocument();
    });

    it('renders Hero.Actions correctly', () => {
      render(
        <Hero title="">
          <Hero.Content>
            <Hero.Actions>
              <button>Action</button>
            </Hero.Actions>
          </Hero.Content>
        </Hero>
      );

      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('renders Hero.Image correctly', () => {
      render(
        <Hero title="">
          <Hero.Image src="compound-img.jpg" alt="Compound Image" />
        </Hero>
      );

      const img = screen.getByAltText('Compound Image');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'compound-img.jpg');
    });

    it('renders Hero.Background via backgroundElement prop', () => {
      render(
        <Hero
          title="Title"
          backgroundElement={<Hero.Background src="bg.jpg" data-testid="custom-bg" />}
        />
      );

      const bg = screen.getByTestId('custom-bg');
      expect(bg).toBeInTheDocument();
      // Verify it renders the image inside
      const img = screen.getByAltText('Background');
      expect(img).toHaveAttribute('src', 'bg.jpg');
    });

    it('Hero.Content supports glass prop', () => {
      render(
        <Hero title="">
          <Hero.Content glass>
             Glass Content
          </Hero.Content>
        </Hero>
      );

      expect(screen.getByTestId('atomix-glass')).toBeInTheDocument();
      expect(screen.getByText('Glass Content')).toBeInTheDocument();
    });
  });
});
