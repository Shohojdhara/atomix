# Atomix Engineering Audit (2025-11-02)

This audit highlights prioritized, actionable improvements for the Atomix component library. Items are grouped by priority to minimize risk for consumers and improve maintainability.

---

## P0 – Critical correctness issues (can break consumers)

- CJS/ESM mismatch in package exports
  - Observed: package.json declares "type": "module" while also exposing a CommonJS entry. The CJS entry must use a .cjs artifact and export map should point to it for `require`.
  - Action:
    - Ensure Rollup emits a CJS bundle with a .cjs filename (e.g., dist/index.cjs) and update:
      - main: "dist/index.cjs"
      - module: "dist/index.esm.js"
      - exports["."].require → "./dist/index.cjs"

- Theme export pattern
  - Observed: Theme exports should use pattern substitution (./themes/* → ./dist/themes/*). Avoid globbing like *.css in the target.
  - Action:
    - Use a direct substitution mapping so consumers can import: `@shohojdhara/atomix/themes/atomix.dark.css`.

---

## P1 – High impact maintainability and DX

- Test runner consolidation
  - Observed: Some tests use Jest APIs (jest.mock/jest.fn) while Vitest is the configured runner.
  - Action:
    - Migrate to Vitest APIs (vi.mock / vi.fn) or gate remaining Jest specs behind a separate runner and exclude them from Vitest.

- Engines alignment
  - Observed: Docs and modern tooling prefer Node 18+, but engines may be looser.
  - Action: Set engines.node to ">=18" (or ">=20" LTS) for consistency across dev and CI.

- Peer dependencies hygiene
  - Observed: Third‑party UI/icon libraries appear in both dependencies and peerDependencies in some revisions.
  - Action: Choose policy (peer or dep). For libraries like icons, prefer peer + devDependency for local dev, and remove from dependencies.

---

## P2 – Quality, correctness, and API polish

- Testing improvements
  - Minimize snapshot reliance for visual components; use targeted assertions for DOM attributes and key class names. Keep a single smoke snapshot if necessary.
  - Ensure deterministic tests by mocking RAF/animation or canvas/webgl when used.

- Test setup hardening
  - Add `afterEach(() => vi.restoreAllMocks())` to avoid mock leakage (present in src/test/setup.ts, keep it enforced).

- Accessibility: Accordion
  - Add `aria-disabled={disabled}` alongside the `disabled` attribute.
  - Mark decorative icons `aria-hidden="true"`.

- Classname helper (`cn`)
  - Either document limited API (strings/arrays only) or adopt the classnames package for object/nested input parity to avoid surprises.

- Public API side effects
  - Keep `sideEffects: false` and ensure components don't import styles implicitly. Styles should be opt‑in via exported CSS/SCSS entry points.

---

## P3 – Tooling consistency and docs

- Rollup outputs
  - Verify both ESM and CJS bundles and deterministic CSS bundles: dist/atomix.css and dist/atomix.min.css.

- ATTW and Changesets
  - Run `yarn attw` in CI to validate export/type integrity after changing exports.

- Storybook styles convention
  - Prefer loading built CSS under Storybook for stable snapshots; alternatively load source SCSS consistently. The project README documents this—keep it enforced.

---

## Quick‑apply checklist

1) Fix package exports and formats
- Emit `.cjs` and update `exports`/`main`.
- Map themes with pattern substitution (./themes/* → ./dist/themes/*).

2) Clean up test runner and migrate tests
- Replace Jest APIs with Vitest (`vi.*`).
- Remove or isolate Jest dependencies/config if not used.
- Ensure `afterEach(() => vi.restoreAllMocks())` is present.

3) Align engines and peers
- Set `engines.node` to ">=18".
- Normalize icon library policy (peer + devDependency or dependency only).

4) Improve tests and a11y
- Reduce snapshot scope; add focused assertions.
- Update Accordion a11y attributes as noted.

5) CI and publishing safety
- Add CI: `yarn typecheck`, `yarn lint`, `yarn test`, `yarn attw`, and a dry‑run build.

---

## 30/60/90‑day roadmap

- 30 days
  - Ship P0 fixes (exports, themes) and publish a patch release.
  - Migrate blocking tests to Vitest; stabilize CI green on Node 18/20.

- 60 days
  - Audit components for implicit style side effects and a11y improvements (Accordion, others).
  - Replace heavy snapshots; add targeted tests for complex visuals (e.g., AtomixGlass filters/effects with mocks).

- 90 days
  - Harden Rollup config (source maps, minification pass review) and improve documentation around imports (`./css`, `./scss`, `./themes/*`).
  - Consider adding CSS source maps in published bundles for better consumer DX.

---

Last updated: 2025‑11‑02