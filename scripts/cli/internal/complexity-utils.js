/**
 * Framework-aware default complexity and normalization for component templates.
 */

/** @typedef {'react' | 'next' | 'vanilla'} Framework */

/**
 * Default complexity when the user does not pass --complexity (framework-specific).
 * @param {Framework} framework
 * @returns {'simple' | 'medium' | 'complex' | 'client'}
 */
export function resolveDefaultComplexity(framework) {
  const f = String(framework).toLowerCase();
  if (f === 'next') return 'simple';
  if (f === 'vanilla') return 'medium';
  return 'medium';
}

/**
 * Map requested complexity to a value valid for selectTemplate (Next has no "medium").
 * @param {Framework} framework
 * @param {string} [complexity]
 * @returns {string}
 */
export function normalizeComplexityForFramework(framework, complexity) {
  const f = String(framework).toLowerCase();
  const c = (complexity || resolveDefaultComplexity(f)).toLowerCase();

  if (f === 'vanilla') {
    return c;
  }

  if (f === 'next') {
    const valid = ['simple', 'client', 'complex'];
    if (valid.includes(c)) return c;
    if (c === 'medium') return 'simple';
    return 'simple';
  }

  if (f === 'react') {
    const valid = ['simple', 'medium', 'complex'];
    if (valid.includes(c)) return c;
    return 'medium';
  }

  return c;
}

/**
 * Resolve effective complexity: use explicit value when provided, else framework default.
 * @param {Framework} framework
 * @param {string|undefined} explicitComplexity - undefined when CLI did not pass --complexity
 */
export function resolveEffectiveComplexity(framework, explicitComplexity) {
  const f = String(framework).toLowerCase();
  if (explicitComplexity === undefined || explicitComplexity === '') {
    return normalizeComplexityForFramework(f, resolveDefaultComplexity(f));
  }
  return normalizeComplexityForFramework(f, explicitComplexity);
}
