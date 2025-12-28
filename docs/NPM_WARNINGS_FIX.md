# Fixing npm 11.x Deprecated Config Warnings

## Problem

npm 11.x shows warnings about deprecated configs that don't exist:
```
npm warn Unknown project config "version-git-tag". This will stop working in the next major version of npm.
npm warn Unknown project config "argv". This will stop working in the next major version of npm.
npm warn Unknown project config "version-commit-hooks". This will stop working in the next major version of npm.
npm warn Unknown project config "version-git-message". This will stop working in the next major version of npm.
npm warn Unknown project config "version-tag-prefix". This will stop working in the next major version of npm.
```

## Root Cause

This is a known issue with npm 11.x where it checks for deprecated config options and warns about them even when they don't exist in your project. These configs are not set anywhere - npm is just checking for them and warning.

## Solution

### Option 1: Downgrade to npm 10.x (Recommended)

```bash
npm install -g npm@10
```

This will install npm 10.x which doesn't have this issue.

### Option 2: Wait for npm Fix

This is a known npm 11.x bug. You can wait for npm to fix it in a future version.

### Option 3: Suppress Warnings (Not Recommended)

If you must use npm 11.x, you can suppress these warnings by setting loglevel in `.npmrc`:

```ini
loglevel=error
```

However, this will suppress all warnings, not just these specific ones.

## Verification

After downgrading to npm 10.x, run:

```bash
npm run validate:config
```

You should no longer see these warnings.

## References

- npm 11.x release notes
- npm GitHub issues (search for "Unknown project config" warnings)

