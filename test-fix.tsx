import React from 'react';
import { Footer } from './src/components/Footer/Footer';
import { FooterSection } from './src/components/Footer/FooterSection';
import { FooterLink } from './src/components/Footer/FooterLink';

const TestFooter = () => {
  return (
    <div>
      <h1>Test Footer with Newsletter</h1>
      <Footer 
        brand="Test Brand"
        copyright="© 2024 Test Company"
        showNewsletter={true}
      >
        <FooterSection title="Products">
          <FooterLink href="/product1">Product 1</FooterLink>
          <FooterLink href="/product2">Product 2</FooterLink>
        </FooterSection>
        
        <FooterSection title="Company">
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterSection>
      </Footer>
      
      <h1>Test Footer without Newsletter</h1>
      <Footer 
        brand="Test Brand"
        copyright="© 2024 Test Company"
        showNewsletter={false}
      >
        <FooterSection title="Products">
          <FooterLink href="/product1">Product 1</FooterLink>
          <FooterLink href="/product2">Product 2</FooterLink>
        </FooterSection>
        
        <FooterSection title="Company">
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </FooterSection>
      </Footer>
    </div>
  );
};

export default TestFooter;