import React, { useRef, useEffect } from 'react';
import { RIVER } from '../../lib/constants/components';
import { useRiver, RiverProps } from '../../lib/composables/useRiver';

/**
 * River component for displaying content with image sections
 */
export const River: React.FC<RiverProps> = ({
  title,
  text,
  actions,
  imageSrc,
  imageAlt = 'Image',
  center = false,
  breakout = false,
  reverse = false,
  contentColumns,
  backgroundImageSrc,
  showOverlay = true,
  contentWidth,
  className = '',
}) => {
  const riverRef = useRef<HTMLDivElement>(null);
  const riverInstance = useRef<any>(null);

  const {
    generateRiverClassNames,
    generateContentClass,
    generateVisualClass,
    hasBackgroundImage,
    hasForegroundImage,
    textContent,
  } = useRiver({
    title,
    text,
    imageSrc,
    imageAlt,
    center,
    breakout,
    reverse,
    backgroundImageSrc,
    showOverlay,
    contentWidth,
  });

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined' || !riverRef.current) return undefined;

    // Dynamically import the river script to avoid server-side rendering issues
    import('./scripts').then(({ default: RiverClass }) => {
      if (riverRef.current) {
        riverInstance.current = new RiverClass(riverRef.current, {
          center,
          breakout,
          reverse,
          backgroundImageSrc,
          showOverlay,
        });
      }
    });

    // Cleanup on unmount
    return () => {
      if (riverInstance.current) {
        riverInstance.current.destroy();
      }
    };
  }, [center, breakout, reverse, backgroundImageSrc, showOverlay]);

  // Create custom style for river element with content width if provided
  const riverStyle: React.CSSProperties | undefined = contentWidth
    ? ({
        [RIVER.ATTRIBUTES.CONTENT_WIDTH]: contentWidth,
      } as React.CSSProperties)
    : undefined;

  const renderBackground = () => {
    if (!hasBackgroundImage) return null;

    return (
      <div className={RIVER.SELECTORS.BG.replace('.', '')}>
        <img
          src={backgroundImageSrc}
          alt="Background"
          className={RIVER.SELECTORS.BG_IMAGE.replace('.', '')}
        />
        {showOverlay && <div className={RIVER.SELECTORS.OVERLAY.replace('.', '')}></div>}
      </div>
    );
  };

  const renderContent = () => (
    <div className={generateContentClass()}>
      {title && <h2 className={RIVER.SELECTORS.TITLE.replace('.', '')}>{title}</h2>}
      {textContent.map((paragraph, index) => (
        <p key={index} className={RIVER.SELECTORS.TEXT.replace('.', '')}>
          {paragraph}
        </p>
      ))}
      {actions && <div className={RIVER.SELECTORS.ACTIONS.replace('.', '')}>{actions}</div>}
    </div>
  );

  const renderImage = () => {
    if (!hasForegroundImage) return null;

    return (
      <div className={generateVisualClass()}>
        <div className={RIVER.SELECTORS.IMAGE_WRAPPER.replace('.', '')}>
          <img src={imageSrc} alt={imageAlt} className={RIVER.SELECTORS.IMAGE.replace('.', '')} />
        </div>
      </div>
    );
  };

  // Render with content columns (advanced layout)
  if (contentColumns && contentColumns.length > 0) {
    return (
      <div className={generateRiverClassNames(className)} ref={riverRef} style={riverStyle}>
        {renderBackground()}
        <div className={`${RIVER.SELECTORS.CONTAINER.replace('.', '')} o-container`}>
          <div className={RIVER.SELECTORS.ROW.replace('.', '')}>
            {!reverse && renderImage()}
            <div className={generateContentClass()}>
              {contentColumns.map((column, index) => (
                <div
                  key={index}
                  className={`${RIVER.SELECTORS.CONTENT_COL.replace('.', '')} ${RIVER.SELECTORS[`CONTENT_COL_${column.type.toUpperCase()}` as keyof typeof RIVER.SELECTORS].replace('.', '')}`}
                >
                  {column.content}
                </div>
              ))}
              {actions && <div className={RIVER.SELECTORS.ACTIONS.replace('.', '')}>{actions}</div>}
            </div>
            {reverse && renderImage()}
          </div>
        </div>
      </div>
    );
  }

  // Render with standard layout
  return (
    <div className={generateRiverClassNames(className)} ref={riverRef} style={riverStyle}>
      {renderBackground()}
      <div className={`${RIVER.SELECTORS.CONTAINER.replace('.', '')} o-container`}>
        <div className={RIVER.SELECTORS.ROW.replace('.', '')}>
          {!reverse && renderImage()}
          {renderContent()}
          {reverse && renderImage()}
        </div>
      </div>
    </div>
  );
};

export type { RiverProps };

River.displayName = 'River';

export default River;
