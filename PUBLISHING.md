# Publishing Guide

This guide covers how to publish the Atomix Design System to npm.

## Prerequisites

1. **npm Account**: Ensure you have an npm account with publish permissions for `@shohojdhara/atomix`
2. **Authentication**: Login to npm: `npm login`
3. **Build Tools**: All dependencies installed: `npm install`

## Publishing Process

### Automated Release (Recommended)

```bash
# For patch release (0.1.15 → 0.1.16)
npm run release:patch

# For minor release (0.1.15 → 0.2.0)
npm run release:minor

# For major release (0.1.15 → 1.0.0)
npm run release:major
```

This will:
- Build the package
- Update version in package.json
- Update CHANGELOG.md
- Create git commit and tag
- Provide next steps

### Manual Publishing

1. **Build the package**:
   ```bash
   npm run build
   ```

2. **Test the package**:
   ```bash
   npm run publish:check
   ```

3. **Publish**:
   ```bash
   # For stable release
   npm run publish:latest
   
   # For beta/rc release
   npm run publish:rc
   ```

## Pre-publish Checklist

- [ ] All tests pass
- [ ] Build completes successfully
- [ ] Package size is acceptable (`npm run analyze:size`)
- [ ] CHANGELOG.md is updated
- [ ] Version number follows semver
- [ ] All files are included in `files` field of package.json

## GitHub Actions

The repository includes automated publishing via GitHub Actions:

1. **On Release**: Automatically publishes when a GitHub release is created
2. **Manual Trigger**: Can be triggered manually from Actions tab

## Package Structure

```
dist/
├── css/
│   ├── atomix.css
│   └── atomix.min.css
├── js/
│   ├── atomix.react.cjs.js
│   ├── atomix.react.esm.js
│   └── atomix.react.umd.js
└── types/
    └── index.d.ts
```

## Troubleshooting

### Build Issues
- Ensure all dependencies are installed
- Check webpack configuration
- Verify TypeScript compilation

### Publishing Issues
- Verify npm authentication: `npm whoami`
- Check package name availability
- Ensure proper permissions for scoped package

### Size Issues
- Run `npm run analyze:bundle` to check bundle size
- Consider code splitting or tree shaking improvements

## Best Practices

1. **Semantic Versioning**: Follow semver strictly
2. **Changelog**: Always update CHANGELOG.md
3. **Testing**: Test in real projects before publishing
4. **Documentation**: Keep README.md up to date
5. **Security**: Regularly audit dependencies