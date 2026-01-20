# Atomix v2.0.0 Migration Guide

This guide details the breaking changes and improvements introduced in Atomix v2.0.0. This release focuses on API standardization, accessibility improvements, and better alignment with React patterns.

## Global Changes

### ARIA Prop Standardization
All ARIA-related props have been renamed from camelCase (e.g., `ariaLabel`) to kebab-case (e.g., `aria-label`). This aligns with React's native ARIA prop support and accessibility standards.

- **Old**: `ariaLabel`, `ariaDescribedBy`, `ariaExpanded`, `ariaControls`
- **New**: `aria-label`, `aria-describedby`, `aria-expanded`, `aria-controls`

**Affected Components**:
- Button, ButtonGroup
- Input, Textarea, Select, Checkbox, Radio, Toggle
- Modal, EdgePanel, Accordion
- Pagination, Navbar, Breadcrumb
- Card, Progress, Spinner, Badge

---

## Component Changes

### Toggle
The Toggle component API has been refactored to follow standard React form patterns.

- **Removed**: `initialOn`, `onToggleOn`, `onToggleOff`
- **Added**: `checked`, `defaultChecked`, `onChange`

Follows standard React checkbox patterns for both controlled and uncontrolled usage.

### Callout
The Callout component has undergone prop name changes for better clarity.

- **Old**: `oneLine` -> **New**: `compact`
- **Old**: `toast` -> **New**: `isToast`

SCSS class names have also been updated: `.c-callout--oneline` is now `.c-callout--compact`.

### Rating
Standardized prop naming for consistency.

- **Old**: `color` -> **New**: `variant`

### Accordion
Consolidated event handlers.

- **Removed**: `onOpen`, `onClose`
- **Added**: `onOpenChange`

Use `onOpenChange={(isOpen) => ...}` to handle both opening and closing events.

---

## Non-Breaking Improvements

### Form Components
- **Input & Textarea**: Added `defaultValue` prop for uncontrolled component support.

### Accessibility Enhancements
- **Spinner**: Added default `role="status"` and `aria-label="Loading"`. These can be overridden via props.
- **Badge**: Added `onRemove` callback and `aria-label` support. Providing `onRemove` now automatically renders a close button within the badge.

## Automated Migration

To assist with the migration, we recommend using search-and-replace in your IDE or the following patterns:

### ARIA Props (Search/Replace)
- `ariaLabel=` -> `aria-label=`
- `ariaDescribedBy=` -> `aria-describedby=`
- `ariaExpanded=` -> `aria-expanded=`
- `ariaControls=` -> `aria-controls=`

### Component Specific Props
- `oneLine` (on `Callout`) -> `compact`
- `toast` (on `Callout`) -> `isToast`
- `color` (on `Rating`) -> `variant`
- `initialOn` (on `Toggle`) -> `defaultChecked`

> [!TIP]
> For large codebases, consider using a tool like `jscodeshift`. We are exploring providing official codemod scripts in a future release.
