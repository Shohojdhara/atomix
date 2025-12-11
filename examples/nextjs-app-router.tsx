/**
 * Next.js App Router Example Usage
 * 
 * This example demonstrates how to use @shohojdhara/atomix components
 * in a Next.js application with the App Router (Next.js 13+).
 * 
 * Usage:
 * 1. Place this file in your app/ directory (e.g., app/page.tsx)
 * 2. Add 'use client' directive for client-side interactions
 * 3. Import CSS at the top of the file or in app/layout.tsx
 */

'use client';

import React from 'react';
import { Button, Badge, Card } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';

export default function HomePage() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <Card
        title="Welcome to Atomix with Next.js App Router"
        text="This example demonstrates how to use @shohojdhara/atomix components in a Next.js application with the App Router. All components are SSR-compatible and tree-shakable."
        icon={<Badge label="New" variant="primary" size="sm" />}
        actions={
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button
              label="Primary Action"
              variant="primary"
              size="lg"
              onClick={() => alert('Primary button clicked!')}
            />
            <Button
              label="Secondary Action"
              variant="secondary"
              size="lg"
              onClick={() => alert('Secondary button clicked!')}
            />
          </div>
        }
      />
    </main>
  );
}
