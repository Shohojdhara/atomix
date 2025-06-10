"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@shohojdhara/atomix';
import { Search } from './Search';
import type { NavigationItem, NavigationSection } from '../config/navigation';

interface SidebarProps {
  navigationItems: NavigationSection[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: NavigationItem[];
}

export function Sidebar({ navigationItems, searchQuery, setSearchQuery, searchResults }: SidebarProps) {
  return (
    <aside className="docs-sidebar">
      <div className="search-container">
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search documentation..."
        />
      </div>
      {searchQuery ? (
        <div className="search-results">
          {searchResults.map((result, index) => (
            <Button key={index} href={result.href} as={Link}>
              {result.title}
            </Button>
          ))}
        </div>
      ) : (
        <nav className="docs-nav">
          {navigationItems.map((section, index) => (
            <div key={index} className="nav-section">
              <h3>{section.title}</h3>
              <div className="nav-items">
                {section.items.map((item, itemIndex) => (
                  <Button key={itemIndex} href={item.href} as={Link}>
                    {item.title}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      )}
    </aside>
  );
}