# Block

The Block component is a flexible layout container designed for creating consistent section layouts. It provides standardized spacing, background variants, and container behavior for organizing content into distinct sections or blocks.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Spacing Options](#spacing-options)
  - [Background Variants](#background-variants)
  - [Full Width Blocks](#full-width-blocks)
  - [Custom HTML Elements](#custom-html-elements)
  - [Container Configuration](#container-configuration)
- [Props](#props)
- [Examples](#examples)

## Overview

The Block component helps create consistent vertical spacing and section layouts throughout your application. It's particularly useful for building landing pages, blog posts, and other content-heavy pages where you need consistent spacing between sections.

## Features

- Flexible spacing options (xs, sm, md, lg, xl, none)
- Multiple background variants
- Full-width content support
- Configurable HTML elements (section, div, article, aside, main)
- Built-in container behavior for responsive layouts
- Container configuration options

## Installation

```bash
npm install @shohojdhara/atomix
```

Import the component and styles:

```tsx
import { Block } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';
```

## Usage

### Basic Usage

The most basic usage of the Block component:

```tsx
import { Block } from '@shohojdhara/atomix';

export function MyComponent() {
  return (
    <Block>
      <h2>Section Title</h2>
      <p>This is content inside a Block component.</p>
    </Block>
  );
}
```

### Spacing Options

Control the vertical padding of your blocks using the `spacing` prop:

```tsx
import { Block } from '@shohojdhara/atomix';

export function SpacingExample() {
  return (
    <>
      <Block spacing="xs">
        <p>Extra small spacing</p>
      </Block>
      
      <Block spacing="sm">
        <p>Small spacing</p>
      </Block>
      
      <Block spacing="md">
        <p>Medium spacing (default)</p>
      </Block>
      
      <Block spacing="lg">
        <p>Large spacing</p>
      </Block>
      
      <Block spacing="xl">
        <p>Extra large spacing</p>
      </Block>
      
      <Block spacing="none">
        <p>No vertical padding</p>
      </Block>
    </>
  );
}
```

### Background Variants

Apply different background colors to your blocks:

```tsx
import { Block } from '@shohojdhara/atomix';

export function BackgroundExample() {
  return (
    <>
      <Block>
        <p>Default background (transparent)</p>
      </Block>
      
      <Block background="primary">
        <p>Primary background</p>
      </Block>
      
      <Block background="secondary">
        <p>Secondary background</p>
      </Block>
      
      <Block background="tertiary">
        <p>Tertiary background</p>
      </Block>
      
      <Block background="invert">
        <p>Inverted background</p>
      </Block>
      
      <Block background="brand">
        <p>Brand background</p>
      </Block>
      
      <Block background="error">
        <p>Error background</p>
      </Block>
      
      <Block background="success">
        <p>Success background</p>
      </Block>
      
      <Block background="warning">
        <p>Warning background</p>
      </Block>
      
      <Block background="info">
        <p>Info background</p>
      </Block>
      
      <Block background="light">
        <p>Light background</p>
      </Block>
    </>
  );
}
```

### Full Width Blocks

Create full-width blocks that extend to the edges of the viewport:

```tsx
import { Block } from '@shohojdhara/atomix';
import { Container } from '@shohojdhara/atomix';

export function FullWidthExample() {
  return (
    <Block fullWidth background="primary">
      <Container type="lg">
        <h2>Full Width Section</h2>
        <p>This block extends to the full width of the viewport.</p>
        <p>The content is still constrained by the Container.</p>
      </Container>
    </Block>
  );
}
```

### Custom HTML Elements

Change the underlying HTML element used for the Block:

```tsx
import { Block } from '@shohojdhara/atomix';

export function ElementExample() {
  return (
    <>
      <Block as="section">
        <h2>Section Element</h2>
        <p>This block renders as a section element.</p>
      </Block>
      
      <Block as="article">
        <h2>Article Element</h2>
        <p>This block renders as an article element.</p>
      </Block>
      
      <Block as="div">
        <h2>Div Element</h2>
        <p>This block renders as a div element.</p>
      </Block>
      
      <Block as="aside">
        <h2>Aside Element</h2>
        <p>This block renders as an aside element.</p>
      </Block>
      
      <Block as="main">
        <h2>Main Element</h2>
        <p>This block renders as a main element.</p>
      </Block>
    </>
  );
}
```

### Container Configuration

Configure the internal container with custom types and classes:

```tsx
import { Block } from '@shohojdhara/atomix';

export function ContainerExample() {
  return (
    <Block 
      container={{
        type: 'fluid',
        className: 'custom-container-class'
      }}
    >
      <h2>Custom Container</h2>
      <p>This block uses a fluid container with a custom class.</p>
    </Block>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| as | `'section' \| 'div' \| 'article' \| 'aside' \| 'main'` | `'section'` | The HTML element to render as |
| spacing | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'none'` | `'md'` | Vertical padding size |
| fullWidth | `boolean` | `false` | Enable full-width content |
| background | `'primary' \| 'secondary' \| 'tertiary' \| 'invert' \| 'brand' \| 'error' \| 'success' \| 'warning' \| 'info' \| 'light'` | `''` | Background color variant |
| container | `object` | `{}` | Container configuration |
| container.type | `string` | `undefined` | Container type for content width (e.g., 'sm', 'md', 'lg', 'xl', 'fluid') |
| container.className | `string` | `undefined` | Additional container classes |
| className | `string` | `''` | Additional CSS class names |
| style | `React.CSSProperties` | `undefined` | Custom styles object |
| children | `ReactNode` | `undefined` | The content to be rendered within the block |

## Examples

### Landing Page Section

```tsx
import { Block } from '@shohojdhara/atomix';
import { Button } from '@shohojdhara/atomix';

export function HeroSection() {
  return (
    <Block spacing="xl" background="primary" fullWidth>
      <h1>Welcome to Our Platform</h1>
      <p>Discover amazing features that will transform your workflow.</p>
      <Button variant="primary">Get Started</Button>
    </Block>
  );
}
```

### Blog Post Layout

```tsx
import { Block } from '@shohojdhara/atomix';

export function BlogPost() {
  return (
    <>
      <Block as="article" spacing="lg">
        <h1>How to Use the Block Component</h1>
        <p>Published on January 1, 2023</p>
        <p>
          The Block component is an essential layout primitive that helps create 
          consistent spacing and sectioning in your applications.
        </p>
      </Block>
      
      <Block spacing="md">
        <h2>Getting Started</h2>
        <p>
          To use the Block component, simply import it and wrap your content.
        </p>
      </Block>
      
      <Block spacing="xl" background="secondary">
        <h2>Conclusion</h2>
        <p>
          The Block component is a powerful tool for creating consistent layouts.
        </p>
      </Block>
    </>
  );
}
```