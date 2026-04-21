/**
 * Card component module
 *
 * This module exports the Card component and its variants.
 * Types and hooks are defined in the lib directory.
 */

// Export the main Card component with subcomponents
export { Card, CardHeader, CardBody, CardFooter } from './Card';
export type { CardProps, CardHeaderProps, CardBodyProps, CardFooterProps } from './Card';

// Export the ElevationCard component
export { default as ElevationCard, type ElevationCardProps } from './ElevationCard';



// Default export for the main Card component
export { default } from './Card';