import React, { useState } from 'react';
import { fn } from '@storybook/test';
import { PhotoViewer } from '../PhotoViewer';

const images = [
  'https://picsum.photos/id/10/800/600',
  'https://picsum.photos/id/11/800/1000',
  'https://picsum.photos/id/12/800/500',
  'https://picsum.photos/id/13/800/800',
];

export const SimpleGallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showViewer, setShowViewer] = useState(false);
  
  const handleOpen = (index: number) => {
    setSelectedIndex(index);
    setShowViewer(true);
  };
  
  const handleClose = () => {
    setShowViewer(false);
  };
  
  // Create spy functions for event handlers
  const handleImageChange = fn((index: number) => {
    setSelectedIndex(index);
  });
  
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Simple Gallery Example</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {images.map((src, index) => (
          <div 
            key={index}
            onClick={() => handleOpen(index)}
            style={{ 
              cursor: 'pointer',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease'
            }}
          >
            <img 
              src={src} 
              alt={`Gallery image ${index + 1}`} 
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        ))}
      </div>
      
      {showViewer && (
        <PhotoViewer
          images={images}
          startIndex={selectedIndex}
          onClose={handleClose}
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

export default SimpleGallery;