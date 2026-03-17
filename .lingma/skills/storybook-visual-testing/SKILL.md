---
name: storybook-visual-testing
description: Guidelines for documenting components and ensuring visual consistency using Storybook.
---

# Storybook & Visual Testing Skill

Guidelines for maintaining high-quality component documentation and visual testing standards in Atomix.

## Story Structure

Every component should have a `.stories.tsx` file in its directory.
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // Define controls for props
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    // Default prop values
  },
};
```

## Documentation Standards

1.  **Autodocs**: Always include the `autodocs` tag to generate automatic documentation pages.
2.  **ArgTypes**: Explicitly define `argTypes` for complex props to provide better controls (select, radio, color, etc.).
3.  **Descriptions**: Use JSDoc comments in the component's TypeScript definition; Storybook will automatically pick these up.
4.  **Layouts**: Use `layout: 'centered'` for individual components and `layout: 'fullscreen'` for sections or pages.

## Visual Testing & Previews

1.  **Color Modes**: Use the Storybook toolbar to test components in both `light` and `dark` modes. The system uses `data-atomix-color-mode` for these transitions.
2.  **Viewports**: Test responsiveness using the built-in viewports (Mobile, Tablet, Desktop).
3.  **Backgrounds**: Toggle between different backgrounds to ensure contrast and readability, especially for glassmorphic components.

## Interaction Testing

Use the `play` function in Storybook to automate interaction tests:
```typescript
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/testing-library';

export const InteractiveState: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByText('Clicked')).toBeInTheDocument();
  },
};
```

## Performance Guidelines
- Avoid heavy computation inside stories.
- Use `preview.tsx` decorators for global state or theme injection rather than wrapping individual stories.
- Keep the `dist` directory up to date, as Storybook serves static assets from there via `staticDirs`.
