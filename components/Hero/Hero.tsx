import React, { CSSProperties, useEffect } from 'react';
import { HeroProps, HeroAlignment } from '../../lib/types/components';
import { useHero } from '../../lib/composables/useHero';
import { HERO } from '../../lib/constants/components';

export const Hero: React.FC<HeroProps> = ({
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
  contentWidth,
  className = '',
  parallax = false,
  parallaxIntensity = 0.5,
  videoBackground,
  videoOptions = {
    autoplay: true,
    loop: true,
    muted: true,
  },
}) => {
  const {
    generateHeroClassNames,
    generateImageColClass,
    generateContentColClass,
    hasBackgroundImage,
    hasForegroundImage,
    useGridLayout,
    heroRef,
    videoRef,
  } = useHero({
    alignment,
    imageColSize,
    contentColSize,
    imageSrc,
    backgroundImageSrc,
    showOverlay,
    fullViewportHeight,
    contentWidth,
    parallax,
    parallaxIntensity,
    videoBackground,
  });

  // Create custom style for hero element with content width if provided
  const heroStyle: React.CSSProperties | undefined = contentWidth
    ? ({
        '--atomix-hero-content-width': contentWidth,
      } as React.CSSProperties)
    : undefined;

  const renderVideoBackground = () => {
    if (!videoBackground) return null;

    const { autoplay, loop, muted, posterUrl } = videoOptions;

    return (
      <video
        ref={videoRef}
        className="c-hero__video"
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        playsInline
        poster={posterUrl}
      >
        <source src={videoBackground} type={`video/${videoBackground.split('.').pop() || 'mp4'}`} />
        Your browser does not support the video tag.
      </video>
    );
  };

  const renderBackground = () => {
    if (!hasBackgroundImage && !videoBackground) return null;

    return (
      <div className={HERO.SELECTORS.BG.replace('.', '')}>
        {backgroundImageSrc && (
          <img
            src={backgroundImageSrc}
            alt="Background"
            className={HERO.SELECTORS.BG_IMAGE.replace('.', '')}
          />
        )}
        {renderVideoBackground()}
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
          <img src={imageSrc} alt={imageAlt} className={HERO.SELECTORS.IMAGE.replace('.', '')} />
        </div>
      );
    }

    return (
      <div className={generateImageColClass()}>
        <img src={imageSrc} alt={imageAlt} className={HERO.SELECTORS.IMAGE.replace('.', '')} />
      </div>
    );
  };

  const renderGridContent = () => {
    // For left-aligned content, render content first then image
    if (alignment === 'left') {
      return (
        <>
          <div className={generateContentColClass()}>{renderContent()}</div>
          {renderForegroundImage()}
        </>
      );
    }

    // For right-aligned or default, render image first then content
    return (
      <>
        {renderForegroundImage()}
        <div className={generateContentColClass()}>{renderContent()}</div>
      </>
    );
  };

  return (
    <div
      ref={heroRef}
      className={generateHeroClassNames(className)}
      style={heroStyle}
      data-parallax={parallax ? 'true' : undefined}
      data-parallax-intensity={parallax ? parallaxIntensity : undefined}
    >
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

export type { HeroProps };

Hero.displayName = 'Hero';

export default Hero;
