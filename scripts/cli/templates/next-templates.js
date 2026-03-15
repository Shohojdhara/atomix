/**
 * Next.js Component Templates
 * Optimized for Server Components and App Router
 */

export const nextTemplates = {
  /**
   * Simple Server Component
   */
  simple: (name) => `/**
 * ${name} Component (Server Component)
 */
import React from 'react';

export default function ${name}() {
  return (
    <div className="${name.toLowerCase()}">
      <h1>${name} Component</h1>
    </div>
  );
}
`,

  /**
   * Client Component
   */
  client: (name) => `'use client';

/**
 * ${name} Component (Client Component)
 */
import React, { useState } from 'react';

export default function ${name}() {
  const [active, setActive] = useState(false);

  return (
    <div className="${name.toLowerCase()}">
      <h1>${name} Component</h1>
      <button onClick={() => setActive(!active)}>
        Toggle: {active ? 'On' : 'Off'}
      </button>
    </div>
  );
}
`,

  /**
   * Complex Server Component with async data
   */
  complex: (name) => `/**
 * ${name} Component (Server Component with Data)
 */
import React from 'react';

async function getData() {
  // Simulating data fetch
  return { title: '${name}' };
}

export default async function ${name}() {
  const data = await getData();

  return (
    <div className="${name.toLowerCase()}">
      <h1>{data.title}</h1>
      <p>This is a complex Next.js server component.</p>
    </div>
  );
}
`
};
