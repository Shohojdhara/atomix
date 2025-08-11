import { forwardRef, useMemo } from 'react';
import { useSlider } from '../../lib/composables/useSlider';
import { SliderProps } from '../../lib/types/components';

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    slides = [],
    height = 300,
    width = '100%',
    slidesToShow = 1,
    spaceBetween = 0,
    loop = false,
    initialSlide = 0,
    direction = 'horizontal',
    speed = 300,
    allowTouchMove = true,
    threshold = 50,
    grabCursor = true,
    navigation,
    pagination,
    className,
    onSlideChange,
    ...rest
  } = props;

  if (!slides || slides.length === 0) {
    return (
      <div className="c-slider c-slider--empty" style={{ height, width }}>
        <div className="c-slider__empty-message">No slides available</div>
      </div>
    );
  }

  const slider = useSlider({
    slides,
    slidesToShow,
    spaceBetween,
    loop,
    initialSlide,
    direction,
    speed,
    allowTouchMove,
    threshold,
    onSlideChange,
  });

  const {
    containerRef,
    wrapperRef,
    allSlides,
    realIndex,
    translateValue,
    slideWidth,
    transitioning,
    touching,
    slideNext,
    slidePrev,
    goToSlide,
    canSlideNext,
    canSlidePrev,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    loopedSlides,
  } = slider;

  const totalWrapperWidth = useMemo(() => {
    if (slideWidth === 0) return 0;
    return allSlides.length * (slideWidth + spaceBetween) - spaceBetween;
  }, [allSlides.length, slideWidth, spaceBetween]);

  const containerClasses = [
    'c-slider',
    direction === 'vertical' && 'c-slider--vertical',
    grabCursor && 'c-slider--grab-cursor',
    touching && 'c-slider--grabbing',
    loop && 'c-slider--loop',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref || containerRef}
      className={containerClasses}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
        overflow: 'hidden',
        position: 'relative',
        cursor: grabCursor && !touching ? 'grab' : touching ? 'grabbing' : 'default',
        ...rest.style,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      <div
        ref={wrapperRef}
        className="c-slider__wrapper"
        style={{
          display: 'flex',
          flexDirection: direction === 'vertical' ? 'column' : 'row',
          width: direction === 'horizontal' ? `${totalWrapperWidth}px` : '100%',
          height: direction === 'vertical' ? `${totalWrapperWidth}px` : '100%',
          transform:
            direction === 'horizontal'
              ? `translateX(${translateValue}px)`
              : `translateY(${translateValue}px)`,
          transition:
            transitioning && !slider.repositioningRef?.current
              ? `transform ${speed}ms ease-out`
              : 'none',
          willChange: 'transform',
        }}
      >
        {allSlides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={[
              'c-slider__slide',
              (() => {
                if (!loop) return index === realIndex;
                // For triple array: check if this slide index matches current real index
                return index % slides.length === realIndex;
              })() && 'c-slider__slide--active',
              slide.isClone && 'c-slider__slide--duplicate',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{
              width: direction === 'vertical' ? '100%' : `${slideWidth}px`,
              height: direction === 'vertical' ? `${slideWidth}px` : '100%',
              flexShrink: 0,
              marginRight:
                direction === 'horizontal' && index < allSlides.length - 1
                  ? `${spaceBetween}px`
                  : 0,
              marginBottom:
                direction === 'vertical' && index < allSlides.length - 1 ? `${spaceBetween}px` : 0,
            }}
          >
            {slide.video ? (
              <video
                src={slide.video.src}
                poster={slide.video.poster}
                autoPlay={slide.video.autoplay}
                loop={slide.video.loop}
                muted={slide.video.muted}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : slide.backgroundImage ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${slide.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {slide.content}
              </div>
            ) : slide.image ? (
              <img
                src={slide.image}
                alt={slide.alt || slide.title || ''}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              slide.content
            )}

            {(slide.title || slide.description) && (
              <div className="c-slider__slide-content">
                {slide.title && <h3>{slide.title}</h3>}
                {slide.description && <p>{slide.description}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {navigation && (
        <div className="c-slider__navigation">
          <button
            type="button"
            className="c-slider__navigation-prev"
            onClick={slidePrev}
            disabled={!canSlidePrev}
            aria-label="Previous slide"
          />
          <button
            type="button"
            className="c-slider__navigation-next"
            onClick={slideNext}
            disabled={!canSlideNext}
            aria-label="Next slide"
          />
        </div>
      )}

      {pagination && (
        <div className="c-slider__pagination">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`c-slider__pagination-bullet ${index === realIndex ? 'c-slider__pagination-bullet--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';
