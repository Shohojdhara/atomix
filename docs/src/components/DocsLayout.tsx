"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from '@shohojdhara/atomix';
import '@shohojdhara/atomix/css';
import { navigationItems, type NavigationItem, type NavigationSection } from '../config/navigation';
import { Sidebar } from './Sidebar'; // Import the new Sidebar component

// Add search functionality
const useSearch = (items: NavigationSection[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NavigationItem[]>([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const flattenedItems = items.flatMap(section =>
      section.items.map((item) => ({
        ...item,
        section: section.title
      }))
    );

    const results = flattenedItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.section.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(results);
  }, [searchQuery, items]);

  return { searchQuery, setSearchQuery, searchResults };
};

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const { searchQuery, setSearchQuery, searchResults } = useSearch(navigationItems);

  return (
    <div className="docs-layout">
      <Navbar />
      <div className="docs-content">
        <Sidebar 
          navigationItems={navigationItems}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
        />
        <main className="docs-main">{children}</main>
      </div>
    </div>
  );
}
