"use client";

import React, { ReactNode } from "react";

interface SearchProps {
  children: ReactNode;
}

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon?: ReactNode;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

interface SearchResultsProps {
  children: ReactNode;
  id?: string;
  role?: string;
}

interface SearchResultItemProps {
  children: ReactNode;
  as?: React.ElementType;
  href?: string;
  onClick?: () => void;
  role?: string;
}

const SearchContext = React.createContext<null>(null);

export function Search({ children }: SearchProps) {
  return (
    <SearchContext.Provider value={null}>
      <div className="c-search">{children}</div>
    </SearchContext.Provider>
  );
}

Search.Input = function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  leftIcon,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
}: SearchInputProps) {
  return (
    <div className="c-search__input-wrapper">
      {leftIcon && <span className="c-search__icon">{leftIcon}</span>}
      <input
        type="text"
        className="c-search__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
      />
    </div>
  );
};

Search.Results = function SearchResults({
  children,
  id,
  role = "listbox",
}: SearchResultsProps) {
  return (
    <div className="c-search-results" id={id} role={role}>
      {children}
    </div>
  );
};

Search.ResultItem = function SearchResultItem({
  children,
  as: Component = "div",
  href,
  onClick,
  role = "option",
}: SearchResultItemProps) {
  const props = {
    className: "c-search-results__item",
    onClick,
    role,
    ...(href && { href }),
  };

  return <Component {...props}>{children}</Component>;
};