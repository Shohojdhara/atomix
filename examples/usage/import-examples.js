/**
 * Import Examples for @shohojdhara/atomix
 * 
 * This file demonstrates various ways to import and use Atomix components
 * in your React applications with proper TypeScript support.
 */

// ===== BASIC IMPORTS =====

// 1. Default import (includes all components)
import Atomix from '@shohojdhara/atomix';
// Usage: <Atomix.Button>Click me</Atomix.Button>

// 2. Named imports (recommended for tree-shaking)
import { Button, Card, Modal } from '@shohojdhara/atomix';
// Usage: <Button>Click me</Button>

// 3. Mixed imports
import Atomix, { Button, Card } from '@shohojdhara/atomix';
// Usage: <Button>Click me</Button> or <Atomix.Modal>...</Atomix.Modal>

// ===== CSS IMPORTS =====

// 4. Import compiled CSS (recommended)
import '@shohojdhara/atomix/styles';
// or
import '@shohojdhara/atomix/css';

// 5. Import minified CSS for production
import '@shohojdhara/atomix/styles/min';
// or
import '@shohojdhara/atomix/css/min';

// 6. Import SCSS source (if you want to customize variables)
import '@shohojdhara/atomix/scss';

// ===== COMPONENT-SPECIFIC IMPORTS =====

// 7. Import specific components (better tree-shaking)
import { Button } from '@shohojdhara/atomix/components';
import { Grid, Container } from '@shohojdhara/atomix/layouts';
import { utils, constants } from '@shohojdhara/atomix/lib';

// ===== LAYOUT IMPORTS =====

// 8. Layout components
import { Grid, GridCol, Container, Row } from '@shohojdhara/atomix/layouts';
import { MasonryGrid, MasonryGridItem } from '@shohojdhara/atomix/layouts';

// ===== UTILITY IMPORTS =====

// 9. Utility functions and constants
import { utils, constants, composables, types } from '@shohojdhara/atomix/lib';

// 10. Specific utilities
import { formatDate } from '@shohojdhara/atomix/lib/utils';
import { BREAKPOINTS } from '@shohojdhara/atomix/lib/constants';
import { useModal } from '@shohojdhara/atomix/lib/composables';

// ===== TYPESCRIPT IMPORTS =====

// 11. Type imports (TypeScript only)
import type { ButtonProps, CardProps, ModalProps } from '@shohojdhara/atomix';
import type { GridProps } from '@shohojdhara/atomix/layouts';
import type { ComponentProps } from '@shohojdhara/atomix/lib/types';

// ===== ESM IMPORTS (Modern bundlers) =====

// 12. Dynamic imports for code splitting
const Button = React.lazy(() => 
  import('@shohojdhara/atomix').then(module => ({ default: module.Button }))
);

// 13. Conditional imports
const loadModal = async () => {
  const { Modal } = await import('@shohojdhara/atomix');
  return Modal;
};

// ===== COMMONJS IMPORTS (Node.js) =====

// 14. CommonJS require (Node.js environments)
const { Button, Card } = require('@shohojdhara/atomix');
const Atomix = require('@shohojdhara/atomix');

// ===== USAGE EXAMPLES =====

// Example React component using various imports
import React from 'react';
import { Button, Card, Grid, GridCol } from '@shohojdhara/atomix';
import { useModal } from '@shohojdhara/atomix/lib/composables';
import '@shohojdhara/atomix/styles';

function MyComponent() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <Grid>
      <GridCol span={6}>
        <Card title="Welcome">
          <p>This is a sample component using Atomix.</p>
          <Button onClick={openModal} variant="primary">
            Open Modal
          </Button>
        </Card>
      </GridCol>
    </Grid>
  );
}

export default MyComponent;