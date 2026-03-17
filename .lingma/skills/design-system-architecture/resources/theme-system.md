# Atomix Theme System

The theme system bridges TypeScript configuration with CSS variables.

## Key Concepts

### Tokens
Tokens are the design "atoms" (colors, spacing, etc.). They are defined in `src/lib/theme/tokens/`.

### Configuration (`atomix.config.ts`)
Users can override default tokens using a Tailwind-like configuration.
```typescript
export default defineConfig({
  theme: {
    extend: {
      colors: { primary: { main: '#hex' } }
    }
  }
});
```

### Token Injection
The `createTheme()` function processes the config and generates a CSS string of variables.
The `injectTheme()` function applies this CSS to the document.

### Synchronization
The command `npm run sync:tokens` runs `scripts/generate-tokens.ts`, which:
1.  Reads the configuration.
2.  Generates SCSS variables for `01-settings`.
3.  Generates TypeScript constants and types for the theme engine.

## Guidelines for Adding Tokens
1.  Add the token definition to the appropriate file in `src/lib/theme/tokens/`.
2.  Update the `Theme` type in `src/lib/theme/types.ts`.
3.  Ensure the generator logic in `src/lib/theme/generators/` handles the new token category.
4.  Run `npm run sync:tokens`.
