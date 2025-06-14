import React, { useState } from 'react';
import { fn } from '@storybook/test';
import { MasonryGridItem } from '../../../layouts/MasonryGrid/MasonryGridItem';
import { MasonryGrid } from '../../../layouts/MasonryGrid/MasonryGrid';
import { PhotoViewer } from '../PhotoViewer';
import { Card } from '../../Card/Card';

// Define the image gallery item type
export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  url: string;
  width: number;
  height: number;
}

// Create sample gallery data with different aspect ratios
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: 'Mountain Landscape',
    description: 'Beautiful mountain landscape with a lake view',
    url: 'https://picsum.photos/id/10/800/600',
    width: 800,
    height: 600
  },
  {
    id: 2,
    title: 'Beach Sunset',
    description: 'Stunning sunset over the ocean',
    url: 'https://picsum.photos/id/11/800/1000',
    width: 800,
    height: 1000
  },
  {
    id: 3,
    title: 'Forest Path',
    description: 'A serene path through a dense forest',
    url: 'https://picsum.photos/id/12/800/500',
    width: 800,
    height: 500
  },
  {
    id: 4,
    title: 'City Skyline',
    description: 'Urban skyline with modern architecture',
    url: 'https://picsum.photos/id/13/800/800',
    width: 800,
    height: 800
  },
  {
    id: 5,
    title: 'Abstract Art',
    description: 'Colorful abstract painting with geometric shapes',
    url: 'https://picsum.photos/id/14/800/600',
    width: 800,
    height: 600
  },
  {
    id: 6,
    title: 'Wildlife',
    description: 'Wild animals in their natural habitat',
    url: 'https://picsum.photos/id/15/800/1200',
    width: 800,
    height: 1200
  },
  {
    id: 7,
    title: 'Architecture',
    description: 'Impressive architectural details of a historic building',
    url: 'https://picsum.photos/id/16/800/600',
    width: 800,
    height: 600
  },
  {
    id: 8,
    title: 'Food Photography',
    description: 'Delicious culinary creation beautifully presented',
    url: 'https://picsum.photos/id/17/800/700',
    width: 800,
    height: 700
  },
  {
    id: 9,
    title: 'Portrait',
    description: 'Expressive portrait capturing human emotion',
    url: 'https://picsum.photos/id/18/800/1000',
    width: 800,
    height: 1000
  },
  {
    id: 10,
    title: 'Nature Closeup',
    description: 'Macro photography revealing intricate natural details',
    url: 'https://picsum.photos/id/19/800/600',
    width: 800,
    height: 600
  },
  {
    id: 11,
    title: 'Travel Destination',
    description: 'Iconic landmark from a popular travel destination',
    url: 'https://picsum.photos/id/20/800/900',
    width: 800,
    height: 900
  },
  {
    id: 12,
    title: 'Minimalist Scene',
    description: 'Clean, minimalist composition with simple elements',
    url: 'https://picsum.photos/id/21/800/600',
    width: 800,
    height: 600
  }
];

export const ImageGallery: React.FC = () => {
  // State to track which images are selected for the PhotoViewer
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  
  // Create enhanced image objects for the PhotoViewer
  const enhancedImages = galleryImages.map(image => ({
    src: image.url,
    alt: image.title,
    title: image.title,
    description: image.description,
    tags: [`${image.width}x${image.height}`]
  }));
  
  // Handle clicking on a gallery item
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setShowPhotoViewer(true);
  };
  
  // Handle closing the PhotoViewer
  const handlePhotoViewerClose = () => {
    setShowPhotoViewer(false);
  };
  
  // Create spy function for image change handler
  const handleImageChange = fn((index: number) => {
    setSelectedImageIndex(index);
  });
  
  return (
    <div className="c-image-gallery">
      <h2 className="c-image-gallery__title">Image Gallery</h2>
      <p className="c-image-gallery__description">
        Click on any image to view it in the PhotoViewer. Navigate through the gallery using the arrow buttons or thumbnails.
      </p>
      
      {/* MasonryGrid for the image gallery */}
      <MasonryGrid 
        xs={1} 
        sm={2} 
        md={3} 
        lg={4} 
        gap={16}
        animate={true}
        imagesLoaded={true}
      >
        {galleryImages.map((image, index) => (
          <MasonryGridItem key={image.id}>
            <div 
              className="c-image-gallery__item"
              onClick={() => handleImageClick(index)}
            >
              <Card
                image={image.url}
                imageAlt={image.title}
                title={image.title}
                text={image.description}
                className="c-image-gallery__card"
              />
            </div>
          </MasonryGridItem>
        ))}
      </MasonryGrid>
      
      {/* PhotoViewer component */}
      {showPhotoViewer && (
        <PhotoViewer 
          images={enhancedImages}
          startIndex={selectedImageIndex}
          onClose={handlePhotoViewerClose}
          thumbnailPosition="bottom"
          enableFullscreen={true}
          enableGestures={true}
          enableKeyboardNavigation={true}
          onImageChange={handleImageChange}
        />
      )}
    </div>
  );
};

export default ImageGallery;