import React, { memo, useState, FormEvent } from 'react';
import { PaginationProps } from '../../lib/types/components';
import { usePagination, DOTS } from '../../lib/composables/usePagination';
import { PAGINATION_DEFAULTS } from '../../lib/constants/components';
import { Icon, IconProps } from '../Icon/Icon';
import { AtomixGlass } from '../AtomixGlass/AtomixGlass';

/**
 * Navigation button types for pagination
 */
type NavButtonType = 'first' | 'prev' | 'next' | 'last';

/**
 * Props for the PaginationNavButton component
 */
interface PaginationNavButtonProps {
  type: NavButtonType;
  onClick: () => void;
  disabled: boolean;
  label: string;
  iconName: IconProps['name'];
}

/**
 * PaginationNavButton component for rendering first, previous, next, and last buttons
 */
export const PaginationNavButton: React.FC<PaginationNavButtonProps> = memo(({
  type,
  onClick,
  disabled,
  label,
  iconName,
}) => (
  <li
    className={`c-pagination__item c-pagination__item--${type} ${disabled ? 'is-disabled' : ''}`}
    aria-disabled={disabled}
  >
    <button
      type="button"
      className="c-pagination__link"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <Icon name={iconName} size="sm" aria-hidden="true" />
    </button>
  </li>
));

/**
 * Pagination component
 */
export const Pagination: React.FC<PaginationProps> = memo(({
  currentPage = PAGINATION_DEFAULTS.currentPage,
  totalPages = PAGINATION_DEFAULTS.totalPages,
  onPageChange,
  siblingCount = PAGINATION_DEFAULTS.siblingCount,
  showFirstLastButtons = PAGINATION_DEFAULTS.showFirstLastButtons,
  showPrevNextButtons = PAGINATION_DEFAULTS.showPrevNextButtons,
  showSearch = false,
  searchPlaceholder = 'Go to page',
  size = PAGINATION_DEFAULTS.size,
  className = '',
  style,
  'aria-label': ariaLabel = 'Pagination',
  glass,
}) => {
  const { paginationRange, goToPage, nextPage, prevPage, firstPage, lastPage } = usePagination({
    currentPage,
    totalPages,
    siblingCount,
    onPageChange,
  });

  const [searchValue, setSearchValue] = useState<string>('');
  const [searchError, setSearchError] = useState<string>('');

  // Don't render pagination with a single page or no pages
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchError('');

    const pageNumber = parseInt(searchValue, 10);

    if (isNaN(pageNumber)) {
      setSearchError('Please enter a valid page number');
      return;
    }

    if (pageNumber < 1 || pageNumber > totalPages) {
      setSearchError(`Page must be between 1 and ${totalPages}`);
      return;
    }

    if (pageNumber === currentPage) {
      setSearchError('You are already on this page');
      return;
    }

    goToPage(pageNumber);
    setSearchValue('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setSearchValue(value);
      setSearchError('');
    }
  };

  const paginationContent = (
    <nav
      className={`c-pagination c-pagination--${size} ${className}`}
      style={style}
      aria-label={ariaLabel}
    >
      <ul className="c-pagination__items">
        {showFirstLastButtons && (
          <PaginationNavButton
            type="first"
            onClick={firstPage}
            disabled={currentPage === 1}
            label="Go to first page"
            iconName="SkipBack"
          />
        )}

        {showPrevNextButtons && (
          <PaginationNavButton
            type="prev"
            onClick={prevPage}
            disabled={currentPage === 1}
            label="Go to previous page"
            iconName="CaretLeft"
          />
        )}

        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li
                key={`dots-${index}`}
                className="c-pagination__item c-pagination__item--dots"
                aria-hidden="true"
              >
                &#8230;
              </li>
            );
          }

          const isActive = pageNumber === currentPage;

          return (
            <li
              key={pageNumber}
              className={`c-pagination__item ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <button
                type="button"
                className="c-pagination__link"
                onClick={() => goToPage(pageNumber as number)}
                aria-label={`Page ${pageNumber}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {showPrevNextButtons && (
          <PaginationNavButton
            type="next"
            onClick={nextPage}
            disabled={currentPage === totalPages}
            label="Go to next page"
            iconName="CaretRight"
          />
        )}

        {showFirstLastButtons && (
          <PaginationNavButton
            type="last"
            onClick={lastPage}
            disabled={currentPage === totalPages}
            label="Go to last page"
            iconName="SkipForward"
          />
        )}
      </ul>

      {showSearch && (
        <form
          className="c-pagination__search"
          onSubmit={handleSearchSubmit}
          aria-label="Jump to page"
        >
          <div className="c-pagination__search-wrapper">
            <label htmlFor={`pagination-search-${currentPage}`} className="c-pagination__search-label">
              <span className="c-pagination__search-label-text">Go to page:</span>
              <input
                id={`pagination-search-${currentPage}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`c-pagination__search-input ${searchError ? 'is-error' : ''}`}
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={handleSearchChange}
                aria-label="Page number"
                aria-invalid={searchError ? 'true' : 'false'}
                aria-describedby={searchError ? `pagination-error-${currentPage}` : undefined}
              />
            </label>
            <button
              type="submit"
              className="c-pagination__search-button"
              aria-label="Go to page"
            >
              <Icon name="ArrowRight" size="sm" aria-hidden="true" />
            </button>
          </div>
          {searchError && (
            <div
              id={`pagination-error-${currentPage}`}
              className="c-pagination__search-error"
              role="alert"
            >
              {searchError}
            </div>
          )}
        </form>
      )}
    </nav>
  );

  if (glass) {
    // Default glass settings for pagination
    const defaultGlassProps = {
      displacementScale: 60,
      blurAmount: 1,
      saturation: 160,
      aberrationIntensity: 0.5,
      cornerRadius: 8,
      mode: 'shader' as const,
    };

    const glassProps = glass === true ? defaultGlassProps : { ...defaultGlassProps, ...glass };

    return <AtomixGlass {...glassProps}>{paginationContent}</AtomixGlass>;
  }

  return paginationContent;
});

export type { PaginationProps };

Pagination.displayName = 'Pagination';
PaginationNavButton.displayName = 'PaginationNavButton';

export default Pagination;
