# SectionIntro

The SectionIntro component is used to introduce content sections with titles, descriptions, and optional imagery. It provides a consistent way to present section headers with various layout options.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [With Actions](#with-actions)
  - [With Images](#with-images)
- [Props](#props)
- [Examples](#examples)
  - [Simple Section Intro](#simple-section-intro)
  - [Centered Section Intro](#centered-section-intro)
  - [Section Intro with Background](#section-intro-with-background)

## Overview

The SectionIntro component provides a standardized way to introduce content sections in your application. It supports various configurations including titles, subtitles, descriptions, actions, and images with different alignment options.

## Features

- Flexible content structure with title, subtitle, and description
- Multiple alignment options (left, center, right)
- Support for background images with overlays
- Foreground image support
- Different size variants (sm, md, lg)
- Skeleton loading state
- Responsive design
- Customizable styling through className prop

## Installation

```bash
npm install @shohojdhara/atomix
```

Import the component and styles:

```tsx
import { SectionIntro } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';
```

## Usage

### Basic Usage

```tsx
import { SectionIntro } from '@shohojdhara/atomix';

export function BasicSectionIntro() {
  return (
    <SectionIntro
      title="Welcome to Our Platform"
      text="Discover amazing features that will transform your workflow."
    />
  );
}
```

### With Actions

```tsx
import { SectionIntro } from '@shohojdhara/atomix';
import { Button } from '@shohojdhara/atomix';

export function SectionIntroWithActions() {
  return (
    <SectionIntro
      title="Get Started Today"
      text="Join thousands of satisfied users who have transformed their workflow."
      actions={
        <>
          <Button variant="primary">Sign Up Free</Button>
          <Button variant="secondary">Learn More</Button>
        </>
      }
    />
  );
}
```

### With Images

```tsx
import { SectionIntro } from '@shohojdhara/atomix';

export function SectionIntroWithImage() {
  return (
    <SectionIntro
      title="Our Product Showcase"
      text="See how our product can benefit your business."
      imageSrc="/images/product-showcase.png"
      imageAlt="Product showcase"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title* | `ReactNode` | `undefined` | The section title |
| label | `ReactNode` | `undefined` | Optional subtitle or overline text |
| text | `ReactNode` | `undefined` | Optional description text |
| actions | `ReactNode` | `undefined` | Optional call to action elements |
| alignment | `'left' \| 'center' \| 'right'` | `'left'` | Alignment of the content |
| backgroundImageSrc | `string` | `undefined` | Optional background image URL |
| showOverlay | `boolean` | `false` | Whether to show an overlay on the background |
| imageSrc | `string` | `undefined` | Optional foreground image URL |
| imageAlt | `string` | `'Section image'` | Alternative text for the image |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| skeleton | `boolean` | `false` | Whether to show a skeleton loading state |
| className | `string` | `''` | Additional CSS class |

## Examples

### Simple Section Intro

```tsx
import { SectionIntro } from '@shohojdhara/atomix';

export function SimpleExample() {
  return (
    <SectionIntro
      title="About Our Company"
      label="Our Story"
      text="We are a team of passionate developers dedicated to creating amazing user experiences."
    />
  );
}
```

### Centered Section Intro

```tsx
import { SectionIntro } from '@shohojdhara/atomix';

export function CenteredExample() {
  return (
    <SectionIntro
      title="Our Mission"
      text="To provide the best tools and resources for developers around the world."
      alignment="center"
      size="lg"
    />
  );
}
```

### Section Intro with Background

```tsx
import { SectionIntro } from '@shohojdhara/atomix';
import { Button } from '@shohojdhara/atomix';

export function BackgroundExample() {
  return (
    <SectionIntro
      title="Join Our Community"
      text="Connect with thousands of developers and designers from around the world."
      backgroundImageSrc="/images/community-bg.jpg"
      showOverlay
      actions={<Button variant="primary">Join Now</Button>}
      alignment="center"
    />
  );
}
```

### Section Intro with Foreground Image

```tsx
import { SectionIntro } from '@shohojdhara/atomix';

export function ImageExample() {
  return (
    <SectionIntro
      title="Product Features"
      text="Explore the powerful features that make our product stand out."
      imageSrc="/images/product-features.png"
      imageAlt="Product features illustration"
      alignment="left"
    />
  );
}
```

### Loading State with Skeleton

```tsx
import { SectionIntro } from '@shohojdhara/atomix';

export function SkeletonExample() {
  return (
    <SectionIntro
      title="Loading Content"
      text="This content is currently loading."
      skeleton
    />
  );
}
```