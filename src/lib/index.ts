// Import and re-export as namespaces with proper typing
import * as composablesImport from './composables';
import * as utilsImport from './utils';
import * as typesImport from './types';
import * as constantsImport from './constants';
import * as themeImport from './theme';

// Export as namespaces with explicit typing
export const composables: typeof composablesImport = composablesImport;
export const utils: typeof utilsImport = utilsImport;
export const types: typeof typesImport = typesImport;
export const constants: typeof constantsImport = constantsImport;
export const theme: typeof themeImport = themeImport;

// NEW: Export individual modules for direct imports
export * from './composables';
export * from './constants';
export * from './constants/cssVariables';
export * from './types';
export * from './types/partProps';
export * from './utils';
export * from './utils/componentUtils';
export * from './theme';
export * from './patterns';
export * from './hooks';
