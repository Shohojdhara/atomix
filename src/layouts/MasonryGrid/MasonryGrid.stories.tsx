import { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { default as Card, default as ElevationCard } from '../../components/Card/Card';
import { MasonryGrid } from './MasonryGrid';
import { MasonryGridItem } from './MasonryGridItem';

const meta: Meta<typeof MasonryGrid> = {
  title: 'Layouts/MasonryGrid',
  component: MasonryGrid,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div style={{ padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MasonryGrid>;

// Helper function to get placeholder images with different aspect ratios
const getPlaceholderImage = (index: number, width = 600, height?: number) => {
  // Create different heights for variety if not specified
  const heights = [300, 400, 500, 350, 450, 550, 320, 420];
  const imgHeight = height || heights[index % heights.length];

  // Use different image IDs for variety
  const imageId = (index % 30) + 10; // Use IDs between 10-40 for variety

  // Use Picsum Photos which is more reliable
  return `https://picsum.photos/id/${imageId}/${width}/${imgHeight}`;
};

// Card with image component for masonry grid
const CardWithImage: React.FC<{
  index: number;
  title?: string;
  text?: string;
  useElevation?: boolean;
  width?: number;
  height?: number;
}> = ({ index, title, text, useElevation = false, width, height }) => {
  const CardComponent = useElevation ? ElevationCard : Card;
  const imageUrl = getPlaceholderImage(index, width, height);

  // Generate random content if not provided
  const cardTitle = title || `Card Title ${index + 1}`;
  const cardText =
    text ||
    (index % 2 === 0
      ? 'This is a short description for this card item.'
      : 'This is a longer description that takes up more space to demonstrate how the masonry layout handles different content heights effectively.');

  return (
    <CardComponent
      image={imageUrl}
      imageAlt={`Image ${index + 1}`}
      title={cardTitle}
      text={cardText}
      className="u-h-100"
      actions={
        <React.Fragment>
          <button className="c-btn c-btn--primary c-btn--sm">View</button>
          <button className="c-btn c-btn--outline-primary c-btn--sm">More</button>
        </React.Fragment>
      }
    />
  );
};

/**
 * Basic masonry grid layout with responsive columns
 */
export const BasicMasonryGrid: Story = {
  render: () => (
    <div>
      <h3 className="u-mb-4">Basic Masonry Grid</h3>
      <p className="u-mb-4">
        Items are automatically positioned in the optimal location based on available vertical
        space.
      </p>

      <MasonryGrid xs={1} sm={2} md={3} lg={4}>
        {Array.from({ length: 8 }).map((_, index) => (
          <MasonryGridItem key={index}>
            <CardWithImage index={index} />
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    </div>
  ),
};

/**
 * Masonry grid with custom gap
 */
export const CustomGap: Story = {
  render: () => (
    <div>
      <h3 className="u-mb-4">Custom Gap (24px)</h3>
      <p className="u-mb-4">The gap between items can be customized.</p>

      <MasonryGrid xs={1} sm={2} md={3} lg={4} gap={24}>
        {Array.from({ length: 6 }).map((_, index) => (
          <MasonryGridItem key={index}>
            <CardWithImage index={index + 10} title={`Card with Gap ${index + 1}`} />
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    </div>
  ),
};

/**
 * Masonry grid with dynamic loading
 */
export const DynamicLoading: Story = {
  render: () => {
    // This component demonstrates how the masonry grid handles dynamically loaded content
    const DynamicLoadingExample = () => {
      const [items, setItems] = useState<number[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        // Simulate loading items in batches
        const loadItems = () => {
          setLoading(true);

          // Initial set of items
          setTimeout(() => {
            setItems([0, 1, 2, 3, 4, 5]);
            setLoading(false);
          }, 1000);

          // Add more items after a delay
          setTimeout(() => {
            setItems(prev => [...prev, 6, 7, 8, 9, 10, 11]);
          }, 3000);
        };

        loadItems();
      }, []);

      return (
        <div>
          <h3 className="u-mb-4">Dynamic Loading</h3>
          <p className="u-mb-4">The masonry grid recalculates positions as new items are added.</p>

          {loading && (
            <div className="u-p-4 u-mb-4 u-bg-brand-subtle u-border u-rounded u-text-center">
              <div className="u-spinner u-spinner-primary u-mb-3"></div>
              <p className="u-m-0">Loading initial items...</p>
            </div>
          )}

          <MasonryGrid xs={1} sm={2} md={3} lg={4}>
            {items.map(index => (
              <MasonryGridItem key={index}>
                <CardWithImage
                  index={index + 20}
                  useElevation={true}
                  title={`Dynamic Card ${index + 1}`}
                />
              </MasonryGridItem>
            ))}
          </MasonryGrid>
        </div>
      );
    };

    return <DynamicLoadingExample />;
  },
};

/**
 * Masonry grid with custom column configuration
 */
export const CustomColumns: Story = {
  render: () => (
    <div>
      <h3 className="u-mb-4">Custom Column Configuration</h3>
      <p className="u-mb-4">Different column counts can be specified for each breakpoint.</p>

      <MasonryGrid xs={1} sm={2} md={2} lg={3} xl={4} xxl={5}>
        {Array.from({ length: 10 }).map((_, index) => (
          <MasonryGridItem key={index}>
            <CardWithImage
              index={index + 30}
              title={`Column Config ${index + 1}`}
              text={
                index % 2 === 0
                  ? undefined
                  : 'This card demonstrates the custom column configuration across different breakpoints.'
              }
            />
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    </div>
  ),
};

/**
 * Masonry grid with elevation card content
 */
export const WithElevationCards: Story = {
  render: () => (
    <div>
      <h3 className="u-mb-4">Elevation Cards in Masonry Layout</h3>
      <p className="u-mb-4">
        The masonry grid works well with elevation card components that have hover effects.
      </p>

      <MasonryGrid xs={1} sm={2} md={3} lg={4}>
        {Array.from({ length: 8 }).map((_, index) => (
          <MasonryGridItem key={index}>
            <CardWithImage
              index={index + 40}
              useElevation={true}
              title={`Elevation Card ${index + 1}`}
              text={
                index % 2 === 0
                  ? 'Hover over this card to see the elevation effect.'
                  : 'This card demonstrates the elevation effect when hovered. The masonry layout handles different content heights automatically.'
              }
            />
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    </div>
  ),
};

/**
 * Masonry grid with animation disabled
 */
export const NoAnimation: Story = {
  render: () => (
    <div>
      <h3 className="u-mb-4">No Animation</h3>
      <p className="u-mb-4">The animation can be disabled for immediate positioning.</p>

      <MasonryGrid xs={1} sm={2} md={3} lg={4} animate={false}>
        {Array.from({ length: 6 }).map((_, index) => (
          <MasonryGridItem key={index}>
            <CardWithImage index={index + 50} title={`No Animation ${index + 1}`} />
          </MasonryGridItem>
        ))}
      </MasonryGrid>
    </div>
  ),
};

/**
 * Masonry grid with progressive image loading
 */
export const ProgressiveImageLoading: Story = {
  render: () => {
    const [loadedCount, setLoadedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [layoutComplete, setLayoutComplete] = useState(false);

    return (
      <div>
        <h3 className="u-mb-4">Progressive Image Loading</h3>
        <p className="u-mb-4">
          The grid shows items immediately and updates positions as each image loads.
        </p>

        <div className="u-bg-brand-subtle u-p-3 u-rounded u-mb-4">
          <h4 className="u-mb-2">Loading Progress</h4>
          {totalCount > 0 && (
            <div className="u-mb-2">
              <div className="u-flex u-justify-between u-mb-1">
                <span>
                  Loading images: {loadedCount} of {totalCount}
                </span>
                <span>{Math.round((loadedCount / totalCount) * 100)}%</span>
              </div>
              <div className="u-progress u-mb-2" style={{ height: '8px' }}>
                <div
                  className="u-progress-bar u-bg-primary"
                  style={{ width: `${(loadedCount / totalCount) * 100}%` }}
                ></div>
              </div>
              {layoutComplete && (
                <div className="u-text-success">
                  <span>✓ All images loaded and layout complete!</span>
                </div>
              )}
            </div>
          )}
        </div>

        <MasonryGrid
          xs={1}
          sm={2}
          md={3}
          lg={4}
          gap={16}
          imagesLoaded={true}
          onLayoutComplete={() => setLayoutComplete(true)}
          onImageLoad={(loaded, total) => {
            setLoadedCount(loaded);
            setTotalCount(total);
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <MasonryGridItem key={index}>
              <CardWithImage
                index={index + 70}
                title={`Progressive Loading ${index + 1}`}
                text="This card's image loads independently and updates the layout as it loads."
                // Use different sized images to demonstrate the progressive loading
                height={200 + (index % 3) * 100}
                width={400 + (index % 2) * 100}
              />
            </MasonryGridItem>
          ))}
        </MasonryGrid>
      </div>
    );
  },
};

/**
 * Masonry grid with mixed content
 */
export const MixedContent: Story = {
  render: () => (
    <div>
      <h3 className="u-mb-4">Mixed Content Types</h3>
      <p className="u-mb-4">
        The masonry grid can handle various content types with different heights.
      </p>

      <MasonryGrid xs={1} sm={2} md={3} lg={4}>
        <MasonryGridItem>
          <Card
            title="Text Only Card"
            text="This card contains only text content with no image."
            className="u-h-100"
            actions={<button className="u-btn u-btn-primary u-btn-sm u-mt-3">Action</button>}
          />
        </MasonryGridItem>

        <MasonryGridItem>
          <CardWithImage index={60} useElevation={true} />
        </MasonryGridItem>

        <MasonryGridItem>
          <div className="u-p-4 u-border u-rounded u-bg-brand-subtle u-h-100">
            <h4 className="u-mb-3">Custom Content</h4>
            <p>This is a custom content block using utility classes.</p>
            <div className="u-flex u-justify-between u-mt-3">
              <span className="u-badge u-badge-primary">New</span>
              <span className="u-badge u-badge-secondary">Featured</span>
            </div>
          </div>
        </MasonryGridItem>

        <MasonryGridItem>
          <CardWithImage index={61} />
        </MasonryGridItem>

        <MasonryGridItem>
          <div className="u-p-0 u-border u-rounded u-overflow-hidden u-shadow-sm">
            <img src="https://picsum.photos/id/15/600/400" alt="Nature" className="u-w-100" />
          </div>
        </MasonryGridItem>

        <MasonryGridItem>
          <Card
            title="Card with Icon"
            text="This card includes an icon and uses utility classes for styling."
            className="u-h-100"
            icon={<span className="u-icon u-icon-lg u-text-primary">★</span>}
          />
        </MasonryGridItem>
      </MasonryGrid>
    </div>
  ),
};
