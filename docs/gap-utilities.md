# Gap Utility Classes

Gap utility classes in Atomix allow you to easily control spacing between elements in flex and grid layouts without having to add margin or padding to individual child elements.

## Available Gap Utilities

### Basic Gap Classes

These classes control the gap between items in both flex and grid layouts:

- `.u-gap-0` - No gap (0)
- `.u-gap-1` - Small gap (0.25rem)
- `.u-gap-2` - (0.5rem)
- `.u-gap-3` - (0.75rem)
- `.u-gap-4` - (1rem)
- `.u-gap-5` - (1.25rem)
- `.u-gap-6` - (1.5rem)
- `.u-gap-7` - (1.75rem)
- `.u-gap-8` - (2rem)
- `.u-gap-9` - (2.25rem)
- `.u-gap-10` - (2.5rem)
- `.u-gap-11` - (2.75rem)
- `.u-gap-12` - (3rem)
- `.u-gap-14` - (3.5rem)
- `.u-gap-16` - (4rem)
- `.u-gap-20` - (5rem)
- `.u-gap-24` - (6rem)
- `.u-gap-32` - (8rem)
- `.u-gap-40` - (10rem)
- `.u-gap-48` - (12rem)
- `.u-gap-56` - (14rem)
- `.u-gap-64` - (16rem)
- `.u-gap-72` - (18rem)
- `.u-gap-80` - (20rem)
- `.u-gap-90` - (22.5rem)

### Directional Gap Classes

- `.u-row-gap-{size}` - Controls row gaps specifically
- `.u-column-gap-{size}` - Controls column gaps specifically

### Responsive Gap Classes

All gap utilities are responsive and can be applied at specific breakpoints:

- `.u-{breakpoint}-gap-{size}` - Gap at specific breakpoint
- `.u-{breakpoint}-row-gap-{size}` - Row gap at specific breakpoint
- `.u-{breakpoint}-column-gap-{size}` - Column gap at specific breakpoint

Where `{breakpoint}` can be:
- `sm` - 640px and up
- `md` - 768px and up
- `lg` - 1024px and up
- `xl` - 1280px and up

## Usage Examples

### Basic Grid with Gap

```html
<div class="u-grid u-gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Flex Container with Gap

```html
<div class="u-flex u-gap-6">
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
</div>
```

### Responsive Gaps

```html
<div class="u-grid u-gap-2 u-md-gap-4 u-lg-gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Separate Row and Column Gaps

```html
<div class="u-grid u-row-gap-4 u-column-gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

### Responsive Directional Gaps

```html
<div class="u-grid u-row-gap-2 u-column-gap-4 u-lg-row-gap-6 u-lg-column-gap-8">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

## Browser Support

The `gap` property is well-supported in modern browsers:
- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+

For older browsers, consider using margin/padding on individual items as a fallback.

## Benefits of Using Gap Utilities

1. **Cleaner HTML** - No need to add spacing classes to individual child elements
2. **Better Semantics** - Gap is applied to the container, reflecting the actual layout intention
3. **Responsive Control** - Adjust spacing at different breakpoints from the parent
4. **Flex and Grid Compatible** - Works with both layout systems
5. **Consistent Spacing** - Uses the same spacing scale throughout the system