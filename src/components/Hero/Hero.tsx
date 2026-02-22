import React, { CSSProperties, useEffect } from 'react';
import { HeroProps, HeroAlignment } from '../../lib/types/components';
import { useHero } from '../../lib/composables/useHero';
import { HERO } from '../../lib/constants/components';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

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
  imageColClassName,
  imageColStyle,
  contentColSize = 5,
  contentColClassName,
  contentColStyle,
  contentWidth,
  className = '',
  style,
  parallax = false,
  parallaxIntensity = 0.5,
  videoBackground,
  children,
  glass,
  videoOptions = {
    autoplay: true,
    loop: true,
    muted: true,
  },
  backgroundSlider,
  headingLevel = 'h1',
  reverseOnMobile = false,
  parts,
  ...rest
}: HeroProps) => {
  // Define dynamic heading tag
  const HeadingTag = headingLevel;
  const {
    generateHeroClassNames,
    generateImageColClass,
    generateContentColClass,
    hasBackgroundImage,
    hasForegroundImage,
    useGridLayout,
    heroRef,
    videoRef,
    backgroundSlider: sliderHook,
    hasBackgroundSlider,
  } = useHero({
    title,
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
    backgroundSlider,
    reverseOnMobile,
  });

  // Create custom style for hero element with content width if provided
  const heroStyle: React.CSSProperties | undefined = {
    ...(contentWidth ? { '--atomix-hero-content-width': contentWidth } : {}),
    ...style,
  };

  const renderVideoBackground = () => {
    if (!videoBackground) return null;

    const { autoplay, loop, muted, posterUrl } = videoOptions;

    return (
      <video
        ref={videoRef as React.LegacyRef<HTMLVideoElement>}
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
    // Render background slider if configured
    if (hasBackgroundSlider && backgroundSlider && sliderHook) {
      const { slides, transition = 'fade', transitionDuration = 1000 } = backgroundSlider;
      const { currentIndex, slideRefs, videoRefs } = sliderHook;

      // Determine transition class
      let transitionClass = HERO.CLASSES.SLIDER_FADE;
      if (transition === 'slide') {
        transitionClass = HERO.CLASSES.SLIDER_SLIDE;
      }

      return (
        <div
          className={`${HERO.SELECTORS.SLIDER.replace('.', '')} ${transitionClass}`}
          style={
            {
              '--slider-transition-duration': `${transitionDuration}ms`,
            } as React.CSSProperties
          }
          onMouseEnter={() => {
            if (backgroundSlider.autoplay?.pauseOnHover) {
              sliderHook.pauseAutoplay();
            }
          }}
          onMouseLeave={() => {
            if (backgroundSlider.autoplay?.pauseOnHover) {
              sliderHook.resumeAutoplay();
            }
          }}
        >
          {slides.map((slide, index: number) => {
            const isActive = index === currentIndex;
            const slideRef = slideRefs[index];
            const videoRef = videoRefs[index];

            return (
              <div
                key={index}
                ref={slideRef}
                className={`${HERO.SELECTORS.SLIDER_ITEM.replace('.', '')} ${isActive ? HERO.CLASSES.SLIDER_ITEM_ACTIVE : ''}`}
                aria-hidden={!isActive}
              >
                {slide.type === 'video' ? (
                  <video
                    ref={videoRef as React.LegacyRef<HTMLVideoElement>}
                    className={'c-hero__bg-video'}
                    src={slide.src}
                    poster={slide.videoOptions?.posterUrl || slide.alt}
                    muted={slide.videoOptions?.muted ?? true}
                    loop={slide.videoOptions?.loop ?? true}
                    playsInline
                    aria-hidden="true"
                    autoPlay={slide.videoOptions?.autoplay !== false}
                  >
                    <source src={slide.src} type={`video/${slide.src.split('.').pop() || 'mp4'}`} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={slide.src}
                    alt={slide.alt || 'Background slide'}
                    className={HERO.SELECTORS.BG_IMAGE.replace('.', '')}
                  />
                )}
              </div>
            );
          })}
          {showOverlay && (
            <div
              className={`${HERO.SELECTORS.OVERLAY.replace('.', '')} ${parts?.overlay?.className || ''}`.trim()}
              style={parts?.overlay?.style}
            ></div>
          )}
        </div>
      );
    }

    // Fall back to single background image/video
    if (!hasBackgroundImage && !videoBackground) return null;

    return (
      <div
        className={`${HERO.SELECTORS.BG.replace('.', '')} ${parts?.background?.className || ''}`.trim()}
        style={parts?.background?.style}
      >
        {backgroundImageSrc && (
          <img
            src={backgroundImageSrc}
            alt="Background"
            className={HERO.SELECTORS.BG_IMAGE.replace('.', '')}
          />
        )}
        {renderVideoBackground()}
        {showOverlay && (
          <div
            className={`${HERO.SELECTORS.OVERLAY.replace('.', '')} ${parts?.overlay?.className || ''}`.trim()}
            style={parts?.overlay?.style}
          ></div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    const content = (
      <div
        className={`${HERO.SELECTORS.CONTENT.replace('.', '')} ${parts?.content?.className || ''}`.trim()}
        style={parts?.content?.style}
      >
        {subtitle && (
          <p
            className={`${HERO.SELECTORS.SUBTITLE.replace('.', '')} ${parts?.subtitle?.className || ''}`.trim()}
            style={parts?.subtitle?.style}
          >
            {subtitle}
          </p>
        )}
        <HeadingTag
          className={`${HERO.SELECTORS.TITLE.replace('.', '')} ${parts?.title?.className || ''}`.trim()}
          style={parts?.title?.style}
        >
          {title}
        </HeadingTag>
        {text && (
          <p
            className={`${HERO.SELECTORS.TEXT.replace('.', '')} ${parts?.text?.className || ''}`.trim()}
            style={parts?.text?.style}
          >
            {text}
          </p>
        )}
        {actions && (
          <div
            className={`${HERO.SELECTORS.ACTIONS.replace('.', '')} ${parts?.actions?.className || ''}`.trim()}
            style={parts?.actions?.style}
          >
            {actions}
          </div>
        )}
      </div>
    );

    // If glass is explicitly set to false, don't apply glass effect
    if (glass === false) {
      return content;
    }

    // If glass is true or an object, apply glass effect
    if (glass) {
      // If glass is true, use default glass props
      if (glass === true) {
        return (
          <div
            className={`${HERO.SELECTORS.CONTENT.replace('.', '')} ${parts?.content?.className || ''}`.trim()}
            style={parts?.content?.style}
          >
            <AtomixGlass
              displacementScale={60}
              blurAmount={3}
              saturation={180}
              aberrationIntensity={0}
              cornerRadius={8}
              overLight={false}
              mode="standard"
            >
              <div className="u-p-4">
                {subtitle && (
                  <p
                    className={`${HERO.SELECTORS.SUBTITLE.replace('.', '')} ${parts?.subtitle?.className || ''}`.trim()}
                    style={parts?.subtitle?.style}
                  >
                    {subtitle}
                  </p>
                )}
                <HeadingTag
                  className={`${HERO.SELECTORS.TITLE.replace('.', '')} ${parts?.title?.className || ''}`.trim()}
                  style={parts?.title?.style}
                >
                  {title}
                </HeadingTag>
                {text && (
                  <p
                    className={`${HERO.SELECTORS.TEXT.replace('.', '')} ${parts?.text?.className || ''}`.trim()}
                    style={parts?.text?.style}
                  >
                    {text}
                  </p>
                )}
                {actions && (
                  <div
                    className={`${HERO.SELECTORS.ACTIONS.replace('.', '')} ${parts?.actions?.className || ''}`.trim()}
                    style={parts?.actions?.style}
                  >
                    {actions}
                  </div>
                )}
              </div>
            </AtomixGlass>
          </div>
        );
      }

      // If glass is an object, use provided glass props
      return (
        <div
          className={`${HERO.SELECTORS.CONTENT.replace('.', '')} ${parts?.content?.className || ''}`.trim()}
          style={parts?.content?.style}
        >
          <AtomixGlass {...glass}>
            <div className="u-p-4">
              {subtitle && (
                <p
                  className={`${HERO.SELECTORS.SUBTITLE.replace('.', '')} ${parts?.subtitle?.className || ''}`.trim()}
                  style={parts?.subtitle?.style}
                >
                  {subtitle}
                </p>
              )}
              <HeadingTag
                className={`${HERO.SELECTORS.TITLE.replace('.', '')} ${parts?.title?.className || ''}`.trim()}
                style={parts?.title?.style}
              >
                {title}
              </HeadingTag>
              {text && (
                <p
                  className={`${HERO.SELECTORS.TEXT.replace('.', '')} ${parts?.text?.className || ''}`.trim()}
                  style={parts?.text?.style}
                >
                  {text}
                </p>
              )}
              {actions && (
                <div
                  className={`${HERO.SELECTORS.ACTIONS.replace('.', '')} ${parts?.actions?.className || ''}`.trim()}
                  style={parts?.actions?.style}
                >
                  {actions}
                </div>
              )}
            </div>
          </AtomixGlass>
        </div>
      );
    }

    // Default behavior - no glass effect
    return content;
  };

  const renderForegroundImage = () => {
    if (!hasForegroundImage) return null;

    if (alignment === 'center') {
      return (
        <div
          className={`${HERO.SELECTORS.IMAGE_WRAPPER.replace('.', '')} ${imageColClassName || ''} ${parts?.imageWrapper?.className || ''}`.trim()}
          style={{ ...imageColStyle, ...parts?.imageWrapper?.style }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className={`${HERO.SELECTORS.IMAGE.replace('.', '')} ${parts?.image?.className || ''}`.trim()}
            style={parts?.image?.style}
          />
        </div>
      );
    }

    return (
      <div
        className={`${generateImageColClass(imageColSize, imageColClassName)} ${parts?.imageWrapper?.className || ''}`.trim()}
        style={{ ...imageColStyle, ...parts?.imageWrapper?.style }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className={`${HERO.SELECTORS.IMAGE.replace('.', '')} ${parts?.image?.className || ''}`.trim()}
          style={parts?.image?.style}
        />
      </div>
    );
  };

  const renderGridContent = () => {
    // For left-aligned content, render content first then image
    if (alignment === 'left') {
      return (
        <>
          <div
            className={generateContentColClass(contentColSize, contentColClassName)}
            style={contentColStyle}
          >
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
        <div
          className={generateContentColClass(contentColSize, contentColClassName)}
          style={contentColStyle}
        >
          {renderContent()}
        </div>
      </>
    );
  };

  return (
    <div
      ref={heroRef as React.LegacyRef<HTMLDivElement>}
      className={`${generateHeroClassNames(className)} ${parts?.root?.className || ''}`.trim()}
      style={{ ...heroStyle, ...parts?.root?.style }}
      data-parallax={parallax ? 'true' : undefined}
      data-parallax-intensity={parallax ? parallaxIntensity : undefined}
      {...rest}
    >
      {renderBackground()}
      <div
        className={`${HERO.SELECTORS.CONTAINER.replace('.', '')} o-container ${parts?.container?.className || ''}`.trim()}
        style={parts?.container?.style}
      >
        {children ? (
          <div
            className={`${HERO.SELECTORS.GRID.replace('.', '')} ${parts?.grid?.className || ''}`.trim()}
            style={parts?.grid?.style}
          >
            {children}
          </div>
        ) : useGridLayout ? (
          <div
            className={`${HERO.SELECTORS.GRID.replace('.', '')} o-grid ${parts?.grid?.className || ''}`.trim()}
            style={parts?.grid?.style}
          >
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
