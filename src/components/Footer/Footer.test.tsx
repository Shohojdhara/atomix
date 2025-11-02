import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { FooterSection } from './FooterSection';
import { FooterLink } from './FooterLink';

describe('Footer', () => {
  const defaultProps = {
    brand: 'Atomix',
    copyright: '© 2024 Atomix UI. All rights reserved.',
  };

  test('renders footer with brand and copyright', () => {
    render(<Footer {...defaultProps} />);

    expect(screen.getByText('Atomix')).toBeInTheDocument();
    expect(screen.getByText('© 2024 Atomix UI. All rights reserved.')).toBeInTheDocument();
  });

  test('renders footer with columns layout by default', () => {
    render(
      <Footer {...defaultProps}>
        <FooterSection title="Products">
          <FooterLink href="#product1">Product 1</FooterLink>
        </FooterSection>
      </Footer>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('c-footer--columns');
  });

  test('renders footer with centered layout', () => {
    render(
      <Footer {...defaultProps} layout="centered">
        <FooterSection title="Products">
          <FooterLink href="#product1">Product 1</FooterLink>
        </FooterSection>
      </Footer>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('c-footer--centered');
  });

  test('renders footer with minimal layout', () => {
    render(
      <Footer {...defaultProps} layout="minimal">
        <FooterSection title="Products">
          <FooterLink href="#product1">Product 1</FooterLink>
        </FooterSection>
      </Footer>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('c-footer--minimal');
  });

  test('renders footer with stacked layout', () => {
    render(
      <Footer {...defaultProps} layout="stacked">
        <FooterSection title="Products">
          <FooterLink href="#product1">Product 1</FooterLink>
        </FooterSection>
      </Footer>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('c-footer--stacked');
  });

  test('renders footer with flexible layout', () => {
    render(
      <Footer {...defaultProps} layout="flexible">
        <FooterSection title="Products">
          <FooterLink href="#product1">Product 1</FooterLink>
        </FooterSection>
      </Footer>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('c-footer--flexible');
  });

  test('renders footer with sidebar layout', () => {
    render(
      <Footer {...defaultProps} layout="sidebar">
        <FooterSection title="Products">
          <FooterLink href="#product1">Product 1</FooterLink>
        </FooterSection>
      </Footer>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('c-footer--sidebar');
  });

  test('renders footer with wide layout', () => {
    render(
      <Footer {...defaultProps} layout="wide">
        <FooterSection title="Products">
          <FooterLink href="#product1">Product 1</FooterLink>
        </FooterSection>
      </Footer>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('c-footer--wide');
  });

  test('renders newsletter section when showNewsletter is true', () => {
    render(<Footer {...defaultProps} showNewsletter />);

    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
  });

  test('does not render newsletter section when showNewsletter is false', () => {
    render(<Footer {...defaultProps} showNewsletter={false} />);

    expect(screen.queryByText('Stay Updated')).not.toBeInTheDocument();
  });

  test('renders social links when provided', () => {
    const socialLinks = [
      { platform: 'twitter', url: 'https://twitter.com/example' },
      { platform: 'github', url: 'https://github.com/example' },
    ];

    render(<Footer {...defaultProps} socialLinks={socialLinks} />);

    const socialLinksContainer = screen.getByTestId('footer-social-links');
    expect(socialLinksContainer.children).toHaveLength(2);
  });
});
