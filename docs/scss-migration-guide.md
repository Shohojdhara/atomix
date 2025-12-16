# SCSS Migration Guide - CSS Custom Properties

## Overview

This guide explains how to enhance SCSS component files to support the new `--atomix-*` CSS custom properties while maintaining backward compatibility with existing `--#{$prefix}*` variables.

## Migration Pattern

### Before (Legacy Only)
```scss
.c-component {
  --#{$prefix}component-color: #{$component-color};
  
  color: var(--#{$prefix}component-color);
}
```

### After (With New Variables + Fallbacks)
```scss
.c-component {
  // Legacy CSS variables (backward compatibility)
  --#{$prefix}component-color: #{$component-color};
  
  // New customization CSS variables with fallbacks
  --atomix-component-color: var(--#{$prefix}component-color);
  
  // Use new variables in styles
  color: var(--atomix-component-color);
}
```

## Benefits

1. **Backward Compatibility** - Existing `--#{$prefix}*` variables continue to work
2. **New Flexibility** - Components can be customized via `--atomix-*` variables
3. **Cascading Fallbacks** - New variables fall back to legacy variables
4. **Runtime Customization** - Users can override `--atomix-*` variables at runtime

## Component-Specific Examples

### Badge Component ✅ (Completed)

```scss
.c-badge {
  // Legacy variables
  --#{$prefix}tag-font-size: #{$badge-font-size};
  --#{$prefix}tag-color: var(--#{$prefix}body-color);
  --#{$prefix}tag-bg-color: var(--#{$prefix}body-bg);
  
  // New customization variables with fallbacks
  --atomix-badge-font-size: var(--#{$prefix}tag-font-size);
  --atomix-badge-color: var(--#{$prefix}tag-color);
  --atomix-badge-bg: var(--#{$prefix}tag-bg-color);
  
  // Use new variables
  font-size: var(--atomix-badge-font-size);
  color: var(--atomix-badge-color);
  background: var(--atomix-badge-bg);
}
```

### Button Component (Template)

```scss
.c-btn {
  // Legacy variables
  --#{$prefix}btn-padding-x: #{$btn-padding-x};
  --#{$prefix}btn-padding-y: #{$btn-padding-y};
  --#{$prefix}btn-font-size: #{$btn-font-size};
  --#{$prefix}btn-color: #{$btn-color};
  --#{$prefix}btn-bg: transparent;
  --#{$prefix}btn-border-radius: #{$btn-border-radius};
  
  // New customization variables with fallbacks
  --atomix-button-padding-x: var(--#{$prefix}btn-padding-x);
  --atomix-button-padding-y: var(--#{$prefix}btn-padding-y);
  --atomix-button-font-size: var(--#{$prefix}btn-font-size);
  --atomix-button-color: var(--#{$prefix}btn-color);
  --atomix-button-bg: var(--#{$prefix}btn-bg);
  --atomix-button-border-radius: var(--#{$prefix}btn-border-radius);
  
  // Use new variables
  padding: var(--atomix-button-padding-y) var(--atomix-button-padding-x);
  font-size: var(--atomix-button-font-size);
  color: var(--atomix-button-color);
  background: var(--atomix-button-bg);
  border-radius: var(--atomix-button-border-radius);
}
```

### Card Component (Template)

```scss
.c-card {
  // Legacy variables
  --#{$prefix}card-bg: #{$card-bg};
  --#{$prefix}card-border-color: #{$card-border-color};
  --#{$prefix}card-border-radius: #{$card-border-radius};
  
  // New customization variables with fallbacks
  --atomix-card-bg: var(--#{$prefix}card-bg);
  --atomix-card-border-color: var(--#{$prefix}card-border-color);
  --atomix-card-border-radius: var(--#{$prefix}card-border-radius);
  
  // Use new variables
  background: var(--atomix-card-bg);
  border-color: var(--atomix-card-border-color);
  border-radius: var(--atomix-card-border-radius);
}
```

## Variable Naming Convention

### Pattern
```
--atomix-{component}-{property}
```

### Examples
- `--atomix-button-bg` (background)
- `--atomix-button-color` (text color)
- `--atomix-button-padding-x` (horizontal padding)
- `--atomix-button-padding-y` (vertical padding)
- `--atomix-button-border-radius` (border radius)
- `--atomix-button-font-size` (font size)
- `--atomix-button-font-weight` (font weight)

### State Modifiers
- `--atomix-button-hover-bg` (hover background)
- `--atomix-button-active-bg` (active background)
- `--atomix-button-disabled-opacity` (disabled opacity)
- `--atomix-button-focus-shadow` (focus shadow)

### Part-Specific Variables
- `--atomix-button-icon-size` (icon size)
- `--atomix-card-header-bg` (card header background)
- `--atomix-card-footer-padding` (card footer padding)

## Migration Checklist

For each component SCSS file:

- [ ] Identify all existing `--#{$prefix}*` variables
- [ ] Create corresponding `--atomix-*` variables
- [ ] Set fallback values to legacy variables
- [ ] Update property usage to use new variables
- [ ] Test backward compatibility
- [ ] Test new variable overrides

## Priority Components

### High Priority (User-Facing)
1. ✅ Badge
2. ⏳ Button
3. ⏳ Card
4. ⏳ Input
5. ⏳ Modal
6. ⏳ Dropdown

### Medium Priority (Common)
7. ⏳ Progress
8. ⏳ Tabs
9. ⏳ Tooltip
10. ⏳ Alert/Messages

### Lower Priority (Specialized)
11. ⏳ DataTable
12. ⏳ Accordion
13. ⏳ Breadcrumb
14. ⏳ Pagination

## Testing

### Test Backward Compatibility
```tsx
// Old usage should still work
<Badge label="Test" variant="primary" />
```

### Test New Variables
```tsx
// New customization should work
<Badge
  label="Test"
  cssVars={{
    '--atomix-badge-bg': '#FF0000',
    '--atomix-badge-border-radius': '20px'
  }}
/>
```

### Test Fallback Chain
```scss
// Should fall back correctly
.c-badge {
  --atomix-badge-bg: var(--#{$prefix}tag-bg-color); // Falls back to legacy
  background: var(--atomix-badge-bg); // Uses new variable
}
```

## Common Pitfalls

### ❌ Don't Remove Legacy Variables
```scss
// BAD - Breaks backward compatibility
.c-badge {
  --atomix-badge-color: #{$badge-color};
  color: var(--atomix-badge-color);
}
```

### ✅ Keep Legacy Variables
```scss
// GOOD - Maintains compatibility
.c-badge {
  --#{$prefix}tag-color: #{$badge-color};
  --atomix-badge-color: var(--#{$prefix}tag-color);
  color: var(--atomix-badge-color);
}
```

### ❌ Don't Use SCSS Variables Directly
```scss
// BAD - Can't be customized at runtime
.c-badge {
  color: $badge-color;
}
```

### ✅ Use CSS Custom Properties
```scss
// GOOD - Can be customized at runtime
.c-badge {
  --atomix-badge-color: #{$badge-color};
  color: var(--atomix-badge-color);
}
```

## Implementation Status

### Completed ✅
- Badge (`_components.badge.scss`)

### In Progress ⏳
- Button (template ready)
- Card (template ready)
- Progress (template ready)

### Pending
- 50+ remaining components

## Notes

- This migration is **incremental** - components can be updated one at a time
- All changes are **backward compatible**
- New variables are **opt-in** - existing code continues to work
- Focus on **high-priority** components first
- Test thoroughly after each component migration

## Resources

- [CSS Variables Reference](./customization/CSS_VARIABLES.md)
- [Migration Guide](../MIGRATION_GUIDE.md)
- [Implementation Status](../IMPLEMENTATION_STATUS.md)
