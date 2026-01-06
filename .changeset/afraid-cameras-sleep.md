---
'@shohojdhara/atomix': patch
---

patchFix fs/promises module resolution error by removing server-side only functions (saveTheme, saveCSSFile, loadThemeFromConfig) from the browser bundle. This makes the library fully compatible with Next.js App Router and other browser environments. Breaking Change: Removed Node.js specific file-system utilities from main exports.
