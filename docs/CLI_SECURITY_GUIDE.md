# Atomix CLI - Security Guide

> Security best practices and features of the Atomix CLI

## Table of Contents

- [Overview](#overview)
- [Security Features](#security-features)
- [Path Validation](#path-validation)
- [Input Sanitization](#input-sanitization)
- [Safe Code Parsing](#safe-code-parsing)
- [File Operations](#file-operations)
- [Environment Security](#environment-security)
- [Best Practices](#best-practices)

---

## Overview

The Atomix CLI has been designed with security as a top priority. This guide outlines the security features implemented to protect against common vulnerabilities and provides best practices for secure usage.

### Key Security Principles

1. **No Arbitrary Code Execution** - All dynamic code parsing is done safely
2. **Path Traversal Prevention** - File operations are restricted to project boundaries
3. **Input Sanitization** - All user inputs are cleaned before processing
4. **Minimal Permissions** - Operations require only necessary permissions
5. **Secure Defaults** - Security features are enabled by default

---

## Security Features

### 1. Path Validation

All file operations validate paths to prevent directory traversal attacks:

```javascript
// ✅ Valid paths (within project)
src/components/Button
./themes/dark-theme
../sibling-folder  // Only if within project root

// ❌ Blocked paths
../../etc/passwd
/etc/hosts
.env
.git/config
node_modules/*/package.json
```

**Protection Against:**
- Directory traversal (../)
- Access to system files
- Access to sensitive project files
- Absolute path exploitation

### 2. Input Sanitization

All user inputs are sanitized to prevent shell injection:

```javascript
// Dangerous characters removed:
; & | ` $ < > \ 

// Example:
Input: "test; rm -rf /"
Sanitized: "test rm -rf /"
```

**Protection Against:**
- Command injection
- Shell escape sequences
- Script injection
- Null byte injection

### 3. Component & Theme Name Validation

Strict validation rules prevent security issues:

**Component Names:**
- Must be PascalCase
- Only letters and numbers
- No special characters
- Reserved words blocked

**Theme Names:**
- Must be kebab-case
- Only lowercase letters, numbers, hyphens
- No path separators
- No shell metacharacters

### 4. Sensitive File Protection

The CLI blocks access to sensitive files and directories:

**Blocked Patterns:**
- `.env*` - Environment files
- `.git/*` - Git internals
- `*.pem` - Certificate files
- `*.key` - Private keys
- `*private*` - Files containing "private"
- `*secret*` - Files containing "secret"
- `node_modules` - Dependencies

---

## Path Validation

### How It Works

The `validatePath()` function ensures all file operations stay within project boundaries:

```javascript
import { validatePath } from './cli/utils.js';

const result = validatePath(userInput, projectRoot);
if (result.isValid) {
  // Safe to use result.safePath
} else {
  console.error(result.error);
}
```

### Validation Steps

1. **Normalize Paths** - Remove `.` and `..` segments
2. **Resolve Absolute Path** - Convert to absolute path
3. **Check Boundaries** - Ensure within project directory
4. **Check Sensitive Patterns** - Block access to sensitive files
5. **Return Safe Path** - Provide sanitized, safe path

### Examples

```bash
# ✅ Allowed operations
atomix generate component Button --path ./src/components
atomix build-theme themes/custom

# ❌ Blocked operations
atomix generate component Evil --path ../../etc
atomix build-theme /etc/passwd
atomix generate component Test --path .git/hooks
```

---

## Input Sanitization

### Sanitization Rules

The `sanitizeInput()` function removes dangerous characters:

```javascript
// Characters removed:
; - Command separator
& - Background execution
| - Pipe commands
` - Command substitution
$ - Variable expansion
< > - Redirection
\ - Escape character
\0 - Null byte
```

### Applied To

- Component names
- Theme names
- File paths
- Configuration values
- Any user-provided strings

### Examples

```javascript
// Before sanitization
"test && malicious-command"
"$(cat /etc/passwd)"
"`rm -rf /`"

// After sanitization
"test  malicious-command"
"(cat /etc/passwd)"
"rm -rf /"
```

---

## Safe Code Parsing

### Previous Vulnerability

The CLI previously used `eval()` to parse JavaScript/TypeScript token files:

```javascript
// ❌ DANGEROUS - OLD CODE
tokens = eval(`(${match[1]})`);
```

### Current Implementation

Now uses safe JSON parsing with fallbacks:

```javascript
// ✅ SAFE - NEW CODE
try {
  // Try direct JSON parsing
  tokens = JSON.parse(objectStr);
} catch {
  // Safe transformation and parsing
  objectStr = objectStr
    .replace(/'/g, '"')
    .replace(/(\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
    .replace(/,(\s*[}\]])/g, '$1');
  
  tokens = JSON.parse(objectStr);
}
```

**Benefits:**
- No code execution
- Safe parsing only
- Controlled transformations
- Error handling

---

## File Operations

### Write Operations

All file write operations:
1. Validate the path first
2. Check if within project directory
3. Verify not a sensitive file
4. Create parent directories safely
5. Write with proper permissions

```javascript
// Safe file writing pattern
const validation = validatePath(filePath);
if (!validation.isValid) {
  throw new Error(validation.error);
}

await writeFile(validation.safePath, content, 'utf8');
```

### Read Operations

File reads also validate paths:
- No reading outside project
- No reading sensitive files
- Proper error handling
- Safe path resolution

---

## Environment Security

### Environment Variables

Sensitive data should use environment variables:

```bash
# .env.local (git-ignored)
ATOMIX_API_KEY=secret-key
ATOMIX_THEME_SECRET=theme-secret
```

### Configuration Security

**DO:**
```javascript
// Use environment variables
const apiKey = process.env.ATOMIX_API_KEY;

// Validate configuration
if (!isValidConfig(config)) {
  throw new Error('Invalid configuration');
}
```

**DON'T:**
```javascript
// Don't hardcode secrets
const apiKey = "sk-1234567890";

// Don't eval config files
const config = eval(fs.readFileSync('config.js'));
```

---

## Best Practices

### 1. Keep CLI Updated

Regular updates include security patches:

```bash
npm update @shohojdhara/atomix
```

### 2. Use Configuration Files

Store settings in config files, not command arguments:

```json
{
  "theme": {
    "name": "custom",
    "outputDir": "./dist"
  }
}
```

### 3. Validate All Inputs

Always validate user inputs in custom scripts:

```javascript
import { validateComponentName, sanitizeInput } from '@shohojdhara/atomix/cli/utils';

const name = sanitizeInput(userInput);
const validation = validateComponentName(name);

if (!validation.isValid) {
  console.error(validation.error);
  process.exit(1);
}
```

### 4. Use Proper Permissions

Run CLI with minimal required permissions:

```bash
# ✅ Good - regular user
npx atomix generate component Button

# ❌ Avoid - elevated permissions
sudo atomix generate component Button
```

### 5. Audit Dependencies

Regularly check for vulnerabilities:

```bash
npm audit
npm audit fix
```

### 6. Secure File Storage

- Store sensitive files outside project
- Use `.gitignore` for secrets
- Encrypt sensitive configurations
- Use environment variables

### 7. CI/CD Security

In CI/CD pipelines:

```yaml
# GitHub Actions example
- name: Run Atomix CLI
  env:
    ATOMIX_API_KEY: ${{ secrets.ATOMIX_API_KEY }}
  run: |
    npx atomix validate --tokens
    npx atomix build-theme themes/production
```

---

## Security Checklist

Before deploying or sharing:

- [ ] Update to latest CLI version
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Remove any hardcoded secrets
- [ ] Validate all configuration files
- [ ] Check file permissions are correct
- [ ] Review generated files for sensitive data
- [ ] Ensure `.gitignore` includes sensitive files
- [ ] Test with minimal permissions

---

## Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email security@atomix.design
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We take security seriously and will respond within 48 hours.

---

## Security Updates

### Version 0.3.4 (Current)

**Fixed:**
- Removed `eval()` usage in token parsing
- Added comprehensive path validation
- Implemented input sanitization
- Added sensitive file protection

**Added:**
- Security utility functions
- Path traversal prevention
- Input sanitization throughout
- Safe JSON parsing

### Future Enhancements

- Content Security Policy (CSP) headers
- Subresource Integrity (SRI) for builds
- Signed releases
- Security audit logging

---

**Last Updated:** December 2024  
**Security Contact:** security@atomix.design
