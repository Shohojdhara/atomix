/**
 * Vanilla Component Templates
 * Pure HTML/CSS/JS snippets
 */

export const vanillaTemplates = {
  /**
   * Simple HTML Snippet
   */
  simple: (name) => `<div class="${name.toLowerCase()}">
  <h1>${name} Component</h1>
</div>
`,

  /**
   * Full Vanilla Component (HTML + JS)
   */
  component: (name) => `<div class="${name.toLowerCase()}" id="${name.toLowerCase()}-root">
  <h1>${name} Component</h1>
</div>

<script>
  (function() {
    const root = document.getElementById('${name.toLowerCase()}-root');
    console.log('${name} initialized');
  })();
</script>
`,

  /**
   * CSS Snippet
   */
  styles: (name) => `.${name.toLowerCase()} {
  display: block;
  padding: 1rem;
  border: 1px solid var(--atomix-border-color, #ccc);
}
`
};
