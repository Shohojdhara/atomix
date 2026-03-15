# Atomix CLI Security Guidelines

## Overview
This document outlines the security practices and guidelines for the Atomix CLI tool. It covers input validation, path security, rate limiting, and other security measures implemented to protect users and their systems.

## Security Features

### 1. Input Sanitization
All user-provided inputs are sanitized to prevent injection attacks and malicious content.

#### Supported Input Types:
- **Filenames**: Removes path traversal patterns (`../`), special characters (`<>:"|?*`), and control characters
- **Component Names**: Enforces PascalCase, removes non-alphanumeric characters, and validates against reserved words
- **Paths**: Basic sanitization with comprehensive validation in `validateSecurePath`
- **AI Prompts**: Removes script tags, JavaScript protocols, and data URIs while preserving most content

#### Usage:
```javascript
import { sanitizeInput } from '../utils/security.js';

const safeFilename = sanitizeInput(userInput, 'filename');
const safeComponentName = sanitizeInput(userInput, 'componentName');
const safePrompt = sanitizeInput(userInput, 'prompt');
```

### 2. Path Security and Traversal Prevention
Prevents directory traversal attacks and access to system directories.

#### Validation Rules:
- Blocks paths containing `../` or `..\\` patterns
- Prevents access to system directories (`/etc/`, `/proc/`, `/dev/`, etc.)
- Ensures paths remain within the project directory or specified base path
- Normalizes and resolves paths before validation

#### Usage:
```javascript
import { validateSecurePath } from '../utils/security.js';

const validation = validateSecurePath(userPath, process.cwd());
if (!validation.isValid) {
  throw new Error(`Security error: ${validation.error}`);
}
const safePath = validation.safePath;
```

### 3. Component Name Validation
Enhanced validation for component names with security checks.

#### Validation Rules:
- **PascalCase format**: Must start with uppercase letter, contain only alphanumeric characters
- **Reserved words**: Blocks names like `Component`, `React`, `Fragment`, `Window`, etc.
- **Malicious patterns**: Blocks names containing `eval`, `script`, `javascript`, `onload`, etc.
- **Minimum length**: At least 2 characters

#### Usage:
```javascript
import { validateComponentNameSecure } from '../utils/security.js';

const validation = validateComponentNameSecure(componentName);
if (!validation.isValid) {
  throw new Error(validation.error);
}
```

### 4. Rate Limiting
Protects against abuse of AI-based generation features.

#### Configuration:
- **Default**: 5 requests per minute per user
- **Customizable**: Can be configured with different limits and time windows
- **User-based**: Tracks limits per user identifier

#### Usage:
```javascript
import { RateLimiter } from '../utils/security.js';

const rateLimiter = new RateLimiter(5, 60000); // 5 requests per minute
const userId = process.env.USER || 'anonymous';

if (!rateLimiter.checkLimit(userId)) {
  throw new Error('Rate limit exceeded');
}
```

### 5. File Backup System
Creates backups before overwriting existing files.

#### Features:
- **Automatic backups**: Enabled by default for file write operations
- **Timestamped backups**: Includes timestamp in backup filename
- **Configurable**: Can be disabled via options
- **Error resilient**: Continues operation if backup fails

#### Usage:
```javascript
// Backups are automatically created when using filesystem.writeFile
await filesystem.writeFile(path, content, { backup: true });
```

### 6. Retry Mechanism with Exponential Backoff
Handles transient failures in file operations.

#### Features:
- **Exponential backoff**: Doubles delay between retries
- **Configurable**: Maximum retries and initial delay can be customized
- **Automatic**: Integrated into filesystem operations

#### Usage:
```javascript
import { retryWithBackoff } from '../utils/security.js';

await retryWithBackoff(
  async () => {
    // Your operation here
  },
  3,    // max retries
  100   // initial delay in ms
);
```

## Security Best Practices

### 1. Always Validate User Input
```javascript
// BAD: Direct usage of user input
const componentName = userInput;

// GOOD: Sanitize and validate
const safeName = sanitizeInput(userInput, 'componentName');
const validation = validateComponentNameSecure(safeName);
if (!validation.isValid) {
  // Handle error
}
```

### 2. Use Secure Path Operations
```javascript
// BAD: Direct path usage
const filePath = path.join(process.cwd(), userInput);

// GOOD: Validate path security
const validation = validateSecurePath(userInput, process.cwd());
if (!validation.isValid) {
  throw new Error(`Invalid path: ${validation.error}`);
}
const safePath = validation.safePath;
```

### 3. Implement Rate Limiting for Expensive Operations
```javascript
// For AI generation, file processing, or external API calls
const rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

if (!rateLimiter.checkLimit(userId)) {
  return { error: 'Rate limit exceeded' };
}
```

### 4. Handle Errors Gracefully
```javascript
try {
  await filesystem.writeFile(path, content, { 
    backup: true,
    maxRetries: 3 
  });
} catch (error) {
  logger.error(`Failed after retries: ${error.message}`);
  // Provide user-friendly error message
}
```

## Troubleshooting Security Issues

### Common Errors and Solutions

1. **"Path traversal attempt detected"**
   - **Cause**: User provided a path containing `../` or similar patterns
   - **Solution**: Use relative paths within the project directory

2. **"Component name validation failed"**
   - **Cause**: Invalid component name format or reserved word
   - **Solution**: Use PascalCase names without special characters

3. **"Rate limit exceeded"**
   - **Cause**: Too many requests in a short time period
   - **Solution**: Wait before making additional requests

4. **"Security validation failed"**
   - **Cause**: Attempt to access restricted system directories
   - **Solution**: Use paths within the project scope

## Testing Security Features

Run the security-focused tests to verify all security measures:
```bash
npm test -- scripts/cli/__tests__/security.test.js
```

## Contributing Guidelines

When adding new features to the CLI:

1. **Always sanitize user inputs** using the provided utilities
2. **Validate paths** before file operations
3. **Add security tests** for new functionality
4. **Follow existing patterns** for error handling and validation
5. **Document security considerations** in code comments

## Emergency Response

If a security vulnerability is discovered:

1. **Immediately disable** the affected feature if possible
2. **Create backups** of any critical data
3. **Contact maintainers** through security channels
4. **Do not commit** fixes directly without review
5. **Update documentation** with the vulnerability details

---

*Last Updated: ${new Date().toISOString().split('T')[0]}*
*For security concerns, please create an issue in the project repository.*