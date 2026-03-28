/**
 * Next.js Component Templates
 * Optimized for Server Components and App Router
 */

/**
 * Simple Server Component — valid displayName, Props, JSDoc, a11y; no forwardRef (server).
 */
export const nextTemplates = {
  simple: (name) => `import React from 'react';

export interface ${name}Props {
  /** Optional heading override */
  title?: string;
  children?: React.ReactNode;
}

/**
 * ${name} — presentational server component (Atomix scaffold).
 *
 * @param props - ${name} properties
 */
export default function ${name}(props: ${name}Props) {
  const { title = '${name}', children } = props;

  return (
    <section
      className={\`c-${name.toLowerCase()}\`}
      role="region"
      aria-label={title}
      data-testid="${name.toLowerCase()}-root"
    >
      <h1 className={\`c-${name.toLowerCase()}__title\`}>{title}</h1>
      {children}
    </section>
  );
}

${name}.displayName = '${name}';
`,

  /**
   * Client Component
   */
  client: (name) => `'use client';

import React, { forwardRef, useState } from 'react';

export interface ${name}Props {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

/**
 * ${name} — client component with local state (Atomix scaffold).
 */
const ${name}Inner = forwardRef<HTMLDivElement, ${name}Props>(function ${name}Inner(
  { title = '${name}', children, className = '' },
  ref
) {
  const [active, setActive] = useState(false);

  return (
    <section
      ref={ref}
      className={[\`c-${name.toLowerCase()}\`, className].filter(Boolean).join(' ')}
      role="region"
      aria-label={title}
      data-testid="${name.toLowerCase()}-root"
    >
      <h1 className={\`c-${name.toLowerCase()}__title\`}>{title}</h1>
      {children}
      <button type="button" onClick={() => setActive(!active)} aria-pressed={active}>
        Toggle: {active ? 'On' : 'Off'}
      </button>
    </section>
  );
});

${name}Inner.displayName = '${name}';

export default ${name}Inner;
`,

  /**
   * Complex Server Component with async data
   */
  complex: (name) => `import React from 'react';

export interface ${name}Props {
  title?: string;
}

async function getData(): Promise<{ title: string }> {
  return { title: '${name}' };
}

/**
 * ${name} — async server component (Atomix scaffold).
 */
async function ${name}(props: ${name}Props) {
  const data = await getData();
  const title = props.title ?? data.title;

  return (
    <section
      className={\`c-${name.toLowerCase()}\`}
      role="region"
      aria-label={title}
      data-testid="${name.toLowerCase()}-root"
    >
      <h1>{title}</h1>
      <p>This is a complex Next.js server component scaffold.</p>
    </section>
  );
}

${name}.displayName = '${name}';

export default ${name};
`
};
