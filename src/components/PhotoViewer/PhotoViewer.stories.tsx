import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { PhotoViewer } from "./PhotoViewer";
import { ImageType } from "../../lib/types/components";
import { ImageGallery } from "./examples/ImageGallery";
import { SimpleGallery } from "./examples/SimpleGallery";

const meta: Meta<typeof PhotoViewer> = {
  title: "Components/PhotoViewer",
  component: PhotoViewer,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof PhotoViewer>;

/**
 * Default PhotoViewer with a set of images
 */
export const Default: Story = {
  args: {
    images: [
      "https://picsum.photos/id/10/800/600",
      "https://picsum.photos/id/11/800/1000",
      "https://picsum.photos/id/12/800/500",
      "https://picsum.photos/id/13/800/800",
    ],
    startIndex: 0,
    onImageChange: fn(),
  },
};

/**
 * PhotoViewer starting at the second image
 */
export const StartAtSecond: Story = {
  args: {
    images: [
      "https://picsum.photos/id/10/800/600",
      "https://picsum.photos/id/11/800/1000",
      "https://picsum.photos/id/12/800/500",
      "https://picsum.photos/id/13/800/800",
    ],
    startIndex: 1,
    onImageChange: fn(),
  },
};

/**
 * Disabled PhotoViewer
 */
export const Disabled: Story = {
  args: {
    images: [
      "https://picsum.photos/id/10/800/600",
      "https://picsum.photos/id/11/800/1000",
      "https://picsum.photos/id/12/800/500",
      "https://picsum.photos/id/13/800/800",
    ],
    disabled: true,
    onImageChange: fn(),
  },
};

/**
 * PhotoViewer with custom class
 */
export const WithCustomClass: Story = {
  args: {
    images: [
      "https://picsum.photos/id/10/800/600",
      "https://picsum.photos/id/11/800/1000",
      "https://picsum.photos/id/12/800/500",
      "https://picsum.photos/id/13/800/800",
    ],
    className: "custom-photo-viewer",
    onImageChange: fn(),
  },
};

/**
 * PhotoViewer with enhanced image objects
 */
export const WithEnhancedImages: Story = {
  args: {
    images: [
      {
        src: "https://picsum.photos/id/10/800/600",
        alt: "Mountain Landscape",
        title: "Mountain Landscape",
        description: "Beautiful mountain landscape with a lake view",
        tags: ["nature", "mountains", "landscape"],
      } as ImageType, // Cast to ImageType
      {
        src: "https://picsum.photos/id/11/800/1000",
        alt: "Beach Sunset",
        title: "Beach Sunset",
        description: "Stunning sunset over the ocean",
        tags: ["beach", "sunset", "ocean"],
      } as ImageType, // Cast to ImageType
      {
        src: "https://picsum.photos/id/12/800/500",
        alt: "Forest Path",
        title: "Forest Path",
        description: "A serene path through a dense forest",
        tags: ["forest", "nature", "path"],
      } as ImageType, // Cast to ImageType
    ],
    onImageChange: fn(),
  },
};

/**
 * PhotoViewer with left thumbnails
 */
export const LeftThumbnails: Story = {
  args: {
    images: [
      "https://picsum.photos/id/10/800/600",
      "https://picsum.photos/id/11/800/1000",
      "https://picsum.photos/id/12/800/500",
      "https://picsum.photos/id/13/800/800",
    ],
    thumbnailPosition: "left",
    onImageChange: fn(),
  },
};

/**
 * Example of an image gallery using MasonryGrid with PhotoViewer integration
 */
export const ImageGalleryExample: Story = {
  render: () => <ImageGallery />,
  parameters: {
    docs: {
      description: {
        story:
          "This example demonstrates how to integrate the PhotoViewer with a MasonryGrid to create an image gallery with smooth transitions. Click on any image to open the PhotoViewer.",
      },
    },
  },
};

/**
 * Example of a simple image gallery using the SimpleGallery component
 */
export const SimpleGalleryExample: Story = {
  render: () => <SimpleGallery />,
  parameters: {
    docs: {
      description: {
        story:
          "This example demonstrates a basic image gallery using the SimpleGallery component, which integrates the PhotoViewer. Click on any image to open the PhotoViewer.",
      },
    },
  },
};
