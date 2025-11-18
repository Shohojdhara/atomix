# AtomixGlass OverLight Options Audit

**Date**: 2024  
**Component**: `AtomixGlass`  
**Focus**: `overLight` prop options and configurations

---

## Executive Summary

The `overLight` prop in AtomixGlass supports three configuration modes: boolean, auto-detection, and object-based configuration. While the implementation is robust, there are documentation gaps and some inconsistencies in how the options are exposed and validated.

---

## Current Implementation

### Type Definition

```typescript
export type OverLightConfig =
  | boolean
  | 'auto'
  | OverLightObjectConfig;

export interface OverLightObjectConfig {
  threshold?: number;      // 0.1 to 1.0 (default: 0.7)
  opacity?: number;         // 0.1 to 1.0
  contrast?: number;        // 0.5 to 2.5
  brightness?: number;       // 0.5 to 2.0
  saturationBoost?: number; // 0.5 to 3.0
}
```

### Default Value

- **Default**: `'auto'` (from `ATOMIX_GLASS.DEFAULTS.OVER_LIGHT`)
- **Auto-detection**: Enabled when `overLight === 'auto'` or when `overLight` is an object

---

## Configuration Modes

### 1. Boolean Mode

**Usage**: `overLight={true}` or `overLight={false}`

**Behavior**:
- ✅ Direct control - no auto-detection
- ✅ Simple API for basic use cases
- ✅ Immediate effect (no detection delay)

**Use Cases**:
- When you know the background is light/dark
- When you want explicit control
- Performance-critical scenarios (avoids detection overhead)

**Example**:
```tsx
<AtomixGlass overLight={true}>
  Content on light background
</AtomixGlass>
```

---

### 2. Auto-Detection Mode

**Usage**: `overLight="auto"`

**Behavior**:
- ✅ Automatically detects background brightness
- ✅ Traverses parent elements (up to 20 levels deep)
- ✅ Samples up to 10 background elements
- ✅ Uses luminance threshold (default: 0.7)
- ⚠️ 150ms delay for detection
- ⚠️ Only runs in browser (SSR-safe)

**Detection Algorithm**:
1. Traverses parent elements starting from glass container
2. Samples background colors and images
3. Calculates average luminance using: `(0.299 * r + 0.587 * g + 0.114 * b) / 255`
4. Compares against threshold (default: 0.7)
5. Sets `detectedOverLight = avgLuminance > threshold`

**Limitations**:
- ⚠️ May not detect complex gradients accurately
- ⚠️ Image backgrounds assume medium luminance (0.5)
- ⚠️ Ignores pure black backgrounds (r, g, b < 10)
- ⚠️ Limited to 20 parent levels and 10 samples

**Example**:
```tsx
<AtomixGlass overLight="auto">
  Content with auto-detected background
</AtomixGlass>
```

---

### 3. Object Configuration Mode

**Usage**: `overLight={{ threshold: 0.8, opacity: 0.6, ... }}`

**Behavior**:
- ✅ Uses auto-detection with custom settings
- ✅ All properties are optional
- ✅ Values are validated and clamped
- ✅ Combines with mouse influence and hover/active states

**Available Properties**:

| Property | Type | Range | Default | Description |
|----------|------|-------|---------|-------------|
| `threshold` | `number` | 0.1 - 1.0 | 0.7 | Luminance threshold for auto-detection |
| `opacity` | `number` | 0.1 - 1.0 | 0.5* | Base opacity (multiplied by hover/active intensity) |
| `contrast` | `number` | 0.5 - 2.5 | 1.4* | Contrast enhancement |
| `brightness` | `number` | 0.5 - 2.0 | 0.85* | Brightness adjustment |
| `saturationBoost` | `number` | 0.5 - 3.0 | 1.3* | Saturation multiplier |

\* Defaults are dynamic and depend on mouse influence, hover, and active states

**Validation**:
- All values are clamped to their respective ranges
- Invalid values (NaN, Infinity, wrong type) fall back to defaults
- Values are validated in `validateConfigValue()` function

**Example**:
```tsx
<AtomixGlass 
  overLight={{
    threshold: 0.8,        // More sensitive detection
    opacity: 0.6,           // Higher base opacity
    contrast: 1.8,          // Higher contrast
    brightness: 1.0,        // Neutral brightness
    saturationBoost: 1.5   // Moderate saturation boost
  }}
>
  Content with custom overLight config
</AtomixGlass>
```

---

## Related Props

### `enableOverLightLayers`

**Type**: `boolean`  
**Default**: `true`  
**Description**: Controls whether to render additional overlay layers for overLight mode

**Behavior**:
- When `true` and `isOverLight === true`: Renders base layer, overlay layer, and overlay highlight
- When `false`: Skips rendering these layers (performance optimization)

**Example**:
```tsx
<AtomixGlass 
  overLight={true}
  enableOverLightLayers={false}  // Disable for performance
>
  Content
</AtomixGlass>
```

---

## Implementation Details

### Auto-Detection Logic

**Location**: `src/lib/composables/useAtomixGlass.ts` (lines 208-384)

**Key Features**:
- ✅ SSR-safe (checks `typeof window !== 'undefined'`)
- ✅ Error handling with fallbacks
- ✅ Depth and sample limits to prevent performance issues
- ✅ Validates RGB values before calculation
- ✅ Handles both solid colors and image backgrounds

**Performance Considerations**:
- ⚠️ Runs with 150ms delay (setTimeout)
- ⚠️ Traverses DOM tree (up to 20 levels)
- ⚠️ Computes styles for each parent element
- ✅ Throttled and optimized with early exits

### Configuration Processing

**Location**: `src/lib/composables/useAtomixGlass.ts` (lines 720-761)

**Key Features**:
- ✅ Dynamic defaults based on mouse influence
- ✅ Hover and active state multipliers
- ✅ Proper value validation and clamping
- ✅ Combines object config with base config

**Dynamic Calculations**:
```typescript
// Base opacity calculation
const baseOpacity = isOverLight 
  ? Math.min(0.6, Math.max(0.2, 0.5 * hoverIntensity * activeIntensity)) 
  : 0;

// Mouse influence
const mouseInfluence = calculateMouseInfluence(mouseOffset);

// Final values include mouse influence
contrast: validatedContrast + mouseInfluence * 0.3,
brightness: validatedBrightness + mouseInfluence * 0.15,
saturationBoost: validatedSaturationBoost + mouseInfluence * 0.4,
```

---

## Visual Effects

### When `overLight={true}` or Auto-Detected

1. **Blend Mode**: Changes from `overlay` to `multiply`
2. **Gradients**: Uses black gradients instead of white
3. **Displacement**: Reduced by 40% (`displacementScale * 0.6`)
4. **Saturation**: Boosted by `saturationBoost` multiplier
5. **Shadows**: Enhanced with dynamic inset shadows
6. **Background Layers**: Renders dark and black background layers
7. **Overlay Layers**: Renders base, overlay, and highlight layers (if enabled)

### CSS Variables Set

When overLight is active, the following CSS variables are set:

- `--atomix-glass-blend-mode`: `multiply`
- `--atomix-glass-base-opacity`: Dynamic opacity value
- `--atomix-glass-base-gradient`: Black linear gradient
- `--atomix-glass-overlay-opacity`: Opacity * 1.1
- `--atomix-glass-overlay-gradient`: Black radial gradient
- `--atomix-glass-hover-*-gradient`: Black radial gradients
- `--atomix-glass-container-shadow`: Dynamic inset shadows
- `--atomix-glass-container-bg`: White-to-black gradient
- `--atomix-glass-container-text-shadow`: Adjusted for light backgrounds
- `--atomix-glass-container-box-shadow`: Enhanced shadow

---

## Issues & Recommendations

### 🔴 Critical Issues

1. **Storybook Control Limitation**
   - **Issue**: Storybook only shows boolean control, not full options
   - **Location**: `src/components/AtomixGlass/stories/AtomixGlass.stories.tsx:91-95`
   - **Impact**: Developers can't test `'auto'` or object config in Storybook
   - **Recommendation**: Add custom control or select control with all options

2. **Documentation Gaps**
   - **Issue**: README only mentions boolean, not `'auto'` or object config
   - **Location**: `src/components/AtomixGlass/README.md:54`
   - **Impact**: Users unaware of advanced options
   - **Recommendation**: Update documentation with all three modes

### 🟡 Medium Priority Issues

3. **Type Safety in Stories**
   - **Issue**: Storybook argTypes doesn't reflect full type
   - **Location**: `src/components/AtomixGlass/stories/AtomixGlass.stories.tsx:91`
   - **Impact**: Type mismatch between props and controls
   - **Recommendation**: Use custom control or update argTypes

4. **Missing Property Documentation**
   - **Issue**: `OverLightObjectConfig` properties not documented
   - **Location**: Component JSDoc comments
   - **Impact**: Developers don't know available options
   - **Recommendation**: Add comprehensive JSDoc comments

5. **Auto-Detection Edge Cases**
   - **Issue**: Complex backgrounds (gradients, multiple layers) may not detect correctly
   - **Location**: `useAtomixGlass.ts:207-384`
   - **Impact**: False positives/negatives in detection
   - **Recommendation**: Consider using Intersection Observer or canvas-based detection

### 🟢 Low Priority / Enhancements

6. **Performance Optimization**
   - **Enhancement**: Cache detection results per element
   - **Benefit**: Avoid re-detection on re-renders
   - **Complexity**: Medium

7. **Detection Accuracy**
   - **Enhancement**: Support for CSS gradients and complex backgrounds
   - **Benefit**: More accurate auto-detection
   - **Complexity**: High

8. **Developer Experience**
   - **Enhancement**: Add `debugOverLight` prop to log detection results
   - **Benefit**: Easier debugging of auto-detection
   - **Complexity**: Low

9. **Validation Feedback**
   - **Enhancement**: Console warnings for invalid config values
   - **Benefit**: Better developer experience
   - **Complexity**: Low

---

## Testing Coverage

### Current Tests

**Location**: `src/components/AtomixGlass/AtomixGlass.test.tsx`

**Coverage**:
- ✅ Boolean `true` applies overLight class
- ✅ Boolean `false` doesn't apply overLight class
- ✅ `'auto'` mode is handled
- ✅ Object config is handled
- ✅ Invalid object config values are handled gracefully

**Missing Tests**:
- ⚠️ Auto-detection accuracy tests
- ⚠️ Object config property validation tests
- ⚠️ Edge cases (SSR, no parent elements, etc.)
- ⚠️ Performance tests for detection

---

## Usage Examples

### Basic Usage

```tsx
// Boolean - explicit control
<AtomixGlass overLight={true}>
  Content
</AtomixGlass>

// Auto-detection
<AtomixGlass overLight="auto">
  Content
</AtomixGlass>

// Object config with custom threshold
<AtomixGlass 
  overLight={{ threshold: 0.8 }}
>
  Content
</AtomixGlass>
```

### Advanced Usage

```tsx
// Full object configuration
<AtomixGlass 
  overLight={{
    threshold: 0.75,      // Custom detection threshold
    opacity: 0.6,          // Higher base opacity
    contrast: 1.8,         // Enhanced contrast
    brightness: 1.1,        // Slightly brighter
    saturationBoost: 1.5   // Moderate saturation boost
  }}
  enableOverLightLayers={true}
>
  Content
</AtomixGlass>
```

### Performance Optimization

```tsx
// Disable layers for better performance
<AtomixGlass 
  overLight="auto"
  enableOverLightLayers={false}
>
  Content
</AtomixGlass>
```

---

## Migration Guide

### From Boolean to Auto-Detection

**Before**:
```tsx
<AtomixGlass overLight={true}>
```

**After**:
```tsx
<AtomixGlass overLight="auto">
```

### From Boolean to Object Config

**Before**:
```tsx
<AtomixGlass overLight={true}>
```

**After**:
```tsx
<AtomixGlass 
  overLight={{
    threshold: 0.7,  // Default threshold
    // Other properties use defaults
  }}
>
```

---

## Conclusion

The `overLight` prop implementation is **robust and feature-rich**, supporting three distinct configuration modes. However, there are **documentation and developer experience gaps** that should be addressed:

1. ✅ **Implementation**: Well-structured, validated, and performant
2. ⚠️ **Documentation**: Needs updates to reflect all options
3. ⚠️ **Storybook**: Controls need enhancement for full feature testing
4. ✅ **Type Safety**: Properly typed with TypeScript
5. ✅ **Error Handling**: Graceful fallbacks for invalid values

**Priority Actions**:
1. Update Storybook controls to support all `overLight` modes
2. Enhance component documentation with examples
3. Add JSDoc comments for `OverLightObjectConfig` properties
4. Consider adding `debugOverLight` prop for development

---

## Appendix: Code References

### Key Files

- **Type Definition**: `src/lib/types/components.ts:29-45`
- **Implementation**: `src/lib/composables/useAtomixGlass.ts:85-761`
- **Component Usage**: `src/components/AtomixGlass/AtomixGlass.tsx:59-118`
- **Constants**: `src/lib/constants/components.ts:1607-1608`
- **Storybook**: `src/components/AtomixGlass/stories/AtomixGlass.stories.tsx:91-95`
- **Tests**: `src/components/AtomixGlass/AtomixGlass.test.tsx:78-156`

### Key Functions

- `getEffectiveOverLight()`: Determines final overLight state
- `validateConfigValue()`: Validates and clamps config values
- Auto-detection logic: `useEffect` in `useAtomixGlass.ts:208-384`
- `overLightConfig` memo: Calculates final configuration values

