import React from 'react';
import { HeroProps, HeroAlignment } from '../../lib/types/components';
import { useHero } from '../../lib/composables/useHero';
import { HERO } from '../../lib/constants/components';

export type HeroComponentProps = HeroProps;

export const Hero: React.FC<HeroComponentProps> = ({
  title,
  subtitle,
  text,
  imageSrc,
  imageAlt = 'Hero image',
  alignment = 'left',
  backgroundImageSrc,
  showOverlay = true,
  fullViewportHeight = false,
  actions,
  imageColSize = 7,
  contentColSize = 5,
  className = '',
}) => {
  const { 
    generateHeroClassNames, 
    generateImageColClass, 
    generateContentColClass,
    hasBackgroundImage,
    hasForegroundImage,
    useGridLayout
  } = useHero({
    alignment,
    imageColSize,
    contentColSize,
    imageSrc,
    backgroundImageSrc,
    showOverlay,
    fullViewportHeight
  });

  const renderBackground = () => {
    if (!hasBackgroundImage) return null;
    
    return (
      <div className={HERO.SELECTORS.BG.replace('.', '')}>
        <img
          src={backgroundImageSrc}
          alt="Background"
          className={HERO.SELECTORS.BG_IMAGE.replace('.', '')}
        />
        {showOverlay && <div className={HERO.SELECTORS.OVERLAY.replace('.', '')}></div>}
      </div>
    );
  };

  const renderContent = () => (
    <div className={HERO.SELECTORS.CONTENT.replace('.', '')}>
      {subtitle && <p className={HERO.SELECTORS.SUBTITLE.replace('.', '')}>{subtitle}</p>}
      <h1 className={HERO.SELECTORS.TITLE.replace('.', '')}>{title}</h1>
      {text && <p className={HERO.SELECTORS.TEXT.replace('.', '')}>{text}</p>}
      {actions && <div className={HERO.SELECTORS.ACTIONS.replace('.', '')}>{actions}</div>}
    </div>
  );

  const renderForegroundImage = () => {
    if (!hasForegroundImage) return null;
    
    if (alignment === 'center') {
      return (
        <div className={HERO.SELECTORS.IMAGE_WRAPPER.replace('.', '')}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className={HERO.SELECTORS.IMAGE.replace('.', '')}
          />
        </div>
      );
    }
    
    return (
      <div className={generateImageColClass()}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className={HERO.SELECTORS.IMAGE.replace('.', '')}
        />
      </div>
    );
  };

  const renderGridContent = () => {
    // For left-aligned content, render content first then image
    if (alignment === 'left') {
      return (
        <>
          <div className={generateContentColClass()}>
            {renderContent()}
          </div>
          {renderForegroundImage()}
        </>
      );
    }
    
    // For right-aligned or default, render image first then content
    return (
      <>
        {renderForegroundImage()}
        <div className={generateContentColClass()}>
          {renderContent()}
        </div>
      </>
    );
  };

  return (
    <div className={generateHeroClassNames(className)}>
      {renderBackground()}
      <div className={`${HERO.SELECTORS.CONTAINER.replace('.', '')} o-container`}>
        {useGridLayout ? (
          <div className={`${HERO.SELECTORS.GRID.replace('.', '')} o-grid`}>
            {renderGridContent()}
          </div>
        ) : (
          <>
            {renderContent()}
            {renderForegroundImage()}
          </>
        )}
      </div>
    </div>
  );
}; 