/**
 * Theme Context
 *
 * React context for theme management
 */

import { createContext } from 'react';
import type { ThemeContextValue } from '../types';

/**
 * Theme context with default values
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null);

ThemeContext.displayName = 'ThemeContext';

export default ThemeContext;
