/**
 * Next.js Pages Router Example Usage
 * 
 * This example demonstrates how to use @shohojdhara/atomix components
 * in a Next.js application with the Pages Router.
 * 
 * Usage:
 * 1. Place this file in your pages/ directory (e.g., pages/index.tsx)
 * 2. Import CSS in pages/_app.tsx: import '@shohojdhara/atomix/css';
 * 3. For client-side interactions, add 'use client' directive
 */

'use client';

import React, { useState } from 'react';
import { Button, Badge, Card, Modal } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <Card
        title="Welcome to Atomix with Next.js Pages Router"
        text="This example demonstrates how to use @shohojdhara/atomix components in a Next.js application with the Pages Router, including client-side interactions."
        icon={
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge label="✨ SSR Compatible" variant="primary" size="md" />
            <Badge label="Tree Shakable" variant="success" size="sm" />
          </div>
        }
        actions={
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button
              label="Open Modal"
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            />
            <Button
              label="SSR Action"
              variant="secondary"
              size="lg"
              onClick={() => alert('This works with SSR!')}
            />
          </div>
        }
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Atomix Modal Example"
        size="md"
      >
        <div>
          <p style={{ marginBottom: '1rem' }}>
            This modal component works perfectly with Next.js! It supports
            keyboard navigation, backdrop clicks, and proper accessibility.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
            <Button
              label="Close"
              variant="primary"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
