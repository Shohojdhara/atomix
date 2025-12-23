# Atomix CLI - API Reference

> Programmatic API for the Atomix CLI utilities

## Table of Contents

- [Installation](#installation)
- [Utility Functions](#utility-functions)
  - [Path Validation](#path-validation)
  - [Name Validation](#name-validation)
  - [Input Security](#input-security)
  - [File Operations](#file-operations)
  - [System Utilities](#system-utilities)
- [Error Handling](#error-handling)
- [TypeScript Support](#typescript-support)
- [Examples](#examples)

---

## Installation

The CLI utilities can be imported from the Atomix package:

```javascript
// ES Modules
import { validatePath, validateComponentName } from '@shohojdhara/atomix/cli/utils';

// CommonJS
const { validatePath, validateComponentName } = require('@shohojdhara/atomix/cli/utils');
```

---

## Utility Functions

### Path Validation

#### `validatePath(inputPath, basePath)`

Validates and sanitizes file paths to prevent directory traversal attacks.

**Parameters:**
- `inputPath` (string) - The path to validate
- `basePath` (string, optional) - Base directory (defaults to `process.cwd()`)

**Returns:**
```typescript
{
  isValid: boolean;
  safePath: string | null;
  error?: string;
}
```

**Example:**
```javascript
import { validatePath } from '@shohojdhara/atomix/cli/utils';

const result = validatePath('../src/components', '/home/user/project');

if (result.isValid) {
  console.log('Safe path:', result.safePath);
  // Use result.safePath for file operations
} else {
  console.error('Invalid path:', result.error);
}
```

**Security Features:**
- Prevents directory traversal (`../` attacks)
- Blocks access to sensitive files (.env, .git, private keys)
- Normalizes paths for cross-platform compatibility
- Validates both relative and absolute paths

---

### Name Validation

#### `validateComponentName(name)`

Validates component names according to PascalCase convention.

**Parameters:**
- `name` (string) - The component name to validate

**Returns:**
```typescript
{
  isValid: boolean;
  error?: string;
}
```

**Validation Rules:**
- Must start with uppercase letter
- Only letters and numbers allowed
- Minimum 2 characters
- No reserved words (React, Component, etc.)

**Example:**
```javascript
import { validateComponentName } from '@shohojdhara/atomix/cli/utils';

const result = validateComponentName('MyButton');

if (result.isValid) {
  // Proceed with component creation
} else {
  console.error(result.error);
}

// Invalid examples:
validateComponentName('button');      // ❌ Not PascalCase
validateComponentName('My-Button');   // ❌ Contains hyphen
validateComponentName('React');       // ❌ Reserved word
```

#### `validateThemeName(name)`

Validates theme names according to kebab-case convention.

**Parameters:**
- `name` (string) - The theme name to validate

**Returns:**
```typescript
{
  isValid: boolean;
  error?: string;
}
```

**Validation Rules:**
- Must start with lowercase letter
- Only lowercase letters, numbers, and hyphens
- No consecutive hyphens
- No trailing hyphens

**Example:**
```javascript
import { validateThemeName } from '@shohojdhara/atomix/cli/utils';

const result = validateThemeName('dark-theme');

if (result.isValid) {
  // Proceed with theme creation
} else {
  console.error(result.error);
}

// Invalid examples:
validateThemeName('DarkTheme');    // ❌ Not kebab-case
validateThemeName('dark--theme');  // ❌ Consecutive hyphens
validateThemeName('theme-');       // ❌ Trailing hyphen
```

---

### Input Security

#### `sanitizeInput(input)`

Removes dangerous shell metacharacters from user input.

**Parameters:**
- `input` (string | any) - The input to sanitize

**Returns:**
- `string` - Sanitized input

**Characters Removed:**
- `;` - Command separator
- `&` - Background execution
- `|` - Pipe
- `` ` `` - Command substitution
- `$` - Variable expansion
- `<` `>` - Redirection
- `\` - Escape character
- `\0` - Null byte

**Example:**
```javascript
import { sanitizeInput } from '@shohojdhara/atomix/cli/utils';

const userInput = 'test; rm -rf /';
const safe = sanitizeInput(userInput);
console.log(safe); // "test rm -rf /"

// Also handles non-string inputs
sanitizeInput(123);        // "123"
sanitizeInput(null);       // "null"
sanitizeInput(undefined);  // "undefined"
```

---

### File Operations

#### `fileExists(filePath)`

Asynchronously checks if a file exists and is accessible.

**Parameters:**
- `filePath` (string) - Path to check

**Returns:**
- `Promise<boolean>` - True if file exists and is accessible

**Example:**
```javascript
import { fileExists } from '@shohojdhara/atomix/cli/utils';

const exists = await fileExists('./src/components/Button.tsx');
if (exists) {
  console.log('File exists');
}
```

#### `safePath(...segments)`

Creates a safe file path with proper separators for cross-platform compatibility.

**Parameters:**
- `...segments` (string[]) - Path segments to join

**Returns:**
- `string` - Safe file path

**Example:**
```javascript
import { safePath } from '@shohojdhara/atomix/cli/utils';

const path = safePath('src', 'components', 'Button', 'index.ts');
// Result: "src/components/Button/index.ts" (normalized)
```

---

### System Utilities

#### `checkNodeVersion(requiredVersion)`

Checks if current Node.js version meets requirements.

**Parameters:**
- `requiredVersion` (string) - Minimum required version (e.g., '18.0.0')

**Returns:**
```typescript
{
  compatible: boolean;
  current: string;
  required: string;
}
```

**Example:**
```javascript
import { checkNodeVersion } from '@shohojdhara/atomix/cli/utils';

const result = checkNodeVersion('18.0.0');

if (!result.compatible) {
  console.error(`Node.js ${result.required} or higher required. Current: ${result.current}`);
  process.exit(1);
}
```

#### `isCI()`

Detects if code is running in a CI environment.

**Returns:**
- `boolean` - True if running in CI

**Detected Environments:**
- GitHub Actions
- GitLab CI
- CircleCI
- Travis CI
- Jenkins
- Generic CI

**Example:**
```javascript
import { isCI } from '@shohojdhara/atomix/cli/utils';

if (isCI()) {
  console.log('Running in CI environment');
  // Disable interactive prompts
  // Use automated responses
}
```

#### `isDebug()`

Checks if debug mode is enabled.

**Returns:**
- `boolean` - True if debug mode is active

**Detection Methods:**
- `ATOMIX_DEBUG=true` environment variable
- `--debug` or `-d` command line flag

**Example:**
```javascript
import { isDebug } from '@shohojdhara/atomix/cli/utils';

if (isDebug()) {
  console.log('Debug: Detailed information...');
}
```

---

### Formatting Utilities

#### `formatFileSize(bytes)`

Formats file size in human-readable format.

**Parameters:**
- `bytes` (number) - File size in bytes

**Returns:**
- `string` - Formatted size (e.g., "1.50 KB")

**Example:**
```javascript
import { formatFileSize } from '@shohojdhara/atomix/cli/utils';

formatFileSize(0);          // "0 B"
formatFileSize(1024);       // "1.00 KB"
formatFileSize(1048576);    // "1.00 MB"
formatFileSize(1536);       // "1.50 KB"
```

#### `isValidColor(color)`

Validates CSS color values.

**Parameters:**
- `color` (string) - Color value to validate

**Returns:**
- `boolean` - True if valid color

**Supported Formats:**
- Hex: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`
- Functions: `rgb()`, `rgba()`, `hsl()`, `hsla()`
- Custom properties: `var(--atomix-color)`

**Example:**
```javascript
import { isValidColor } from '@shohojdhara/atomix/cli/utils';

isValidColor('#FF0000');              // ✅ true
isValidColor('rgb(255, 0, 0)');       // ✅ true
isValidColor('var(--atomix-primary)'); // ✅ true
isValidColor('red');                  // ❌ false (named colors not supported)
isValidColor('#GG0000');              // ❌ false (invalid hex)
```

---

### Utility Functions

#### `debounce(func, wait)`

Creates a debounced function for watch mode optimization.

**Parameters:**
- `func` (Function) - Function to debounce
- `wait` (number) - Wait time in milliseconds

**Returns:**
- `Function` - Debounced function

**Example:**
```javascript
import { debounce } from '@shohojdhara/atomix/cli/utils';

const saveFile = debounce(async (content) => {
  await fs.writeFile('output.css', content);
  console.log('File saved');
}, 300);

// Multiple rapid calls will only execute once
saveFile(content1);
saveFile(content2);
saveFile(content3); // Only this one executes after 300ms
```

#### `generateId(prefix)`

Generates a unique identifier.

**Parameters:**
- `prefix` (string, optional) - Prefix for the ID (default: 'atomix')

**Returns:**
- `string` - Unique ID (e.g., 'atomix-kq8d7m-x9j2k')

**Example:**
```javascript
import { generateId } from '@shohojdhara/atomix/cli/utils';

const componentId = generateId('component');  // "component-kq8d7m-x9j2k"
const themeId = generateId('theme');          // "theme-kr3n9p-a7b3m"
const defaultId = generateId();               // "atomix-ks5m2q-c4d8n"
```

#### `validateNpmScripts(packageJson, requiredScripts)`

Validates npm scripts in package.json.

**Parameters:**
- `packageJson` (object) - Parsed package.json content
- `requiredScripts` (string[]) - List of required script names

**Returns:**
```typescript
{
  valid: boolean;
  missing: string[];
}
```

**Example:**
```javascript
import { validateNpmScripts } from '@shohojdhara/atomix/cli/utils';

const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
const result = validateNpmScripts(packageJson, ['build', 'test', 'dev']);

if (!result.valid) {
  console.error('Missing scripts:', result.missing);
}
```

---

## Error Handling

### AtomixCLIError Class

Custom error class with suggestions:

```javascript
class AtomixCLIError extends Error {
  constructor(message, code, suggestions = []) {
    super(message);
    this.name = 'AtomixCLIError';
    this.code = code;
    this.suggestions = suggestions;
  }
}
```

**Usage:**
```javascript
import { AtomixCLIError } from '@shohojdhara/atomix/cli/errors';

throw new AtomixCLIError(
  'Component name must be in PascalCase',
  'INVALID_NAME',
  [
    'Use PascalCase naming (e.g., MyComponent)',
    'Start with an uppercase letter',
    'Use only letters and numbers'
  ]
);
```

### Error Codes

Common error codes used by the CLI:

- `INVALID_NAME` - Invalid component or theme name
- `INVALID_PATH` - Invalid file path
- `FILE_EXISTS` - File already exists
- `NOT_FOUND` - File or directory not found
- `PERMISSION_DENIED` - Insufficient permissions
- `INVALID_CONFIG` - Invalid configuration
- `NOT_IMPLEMENTED` - Feature not implemented

---

## TypeScript Support

### Type Definitions

TypeScript definitions are included:

```typescript
// Import types
import type {
  ValidationResult,
  PathValidationResult,
  NodeVersionCheck,
  NpmScriptValidation
} from '@shohojdhara/atomix/cli/types';

// Function signatures
function validatePath(inputPath: string, basePath?: string): PathValidationResult;
function validateComponentName(name: string): ValidationResult;
function validateThemeName(name: string): ValidationResult;
function sanitizeInput(input: unknown): string;
function fileExists(filePath: string): Promise<boolean>;
function checkNodeVersion(requiredVersion?: string): NodeVersionCheck;
function formatFileSize(bytes: number): string;
function isValidColor(color: string): boolean;
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T;
function generateId(prefix?: string): string;
```

### Interfaces

```typescript
interface ValidationResult {
  isValid: boolean;
  error?: string;
}

interface PathValidationResult {
  isValid: boolean;
  safePath: string | null;
  error?: string;
}

interface NodeVersionCheck {
  compatible: boolean;
  current: string;
  required: string;
}

interface NpmScriptValidation {
  valid: boolean;
  missing: string[];
}
```

---

## Examples

### Complete Validation Flow

```javascript
import {
  validatePath,
  validateComponentName,
  sanitizeInput,
  fileExists
} from '@shohojdhara/atomix/cli/utils';

async function createComponent(userInput, outputPath) {
  // 1. Sanitize user input
  const name = sanitizeInput(userInput);
  
  // 2. Validate component name
  const nameValidation = validateComponentName(name);
  if (!nameValidation.isValid) {
    throw new Error(nameValidation.error);
  }
  
  // 3. Validate output path
  const pathValidation = validatePath(outputPath);
  if (!pathValidation.isValid) {
    throw new Error(pathValidation.error);
  }
  
  // 4. Check if already exists
  const componentPath = path.join(pathValidation.safePath, name);
  if (await fileExists(componentPath)) {
    throw new Error('Component already exists');
  }
  
  // 5. Create component
  await fs.mkdir(componentPath, { recursive: true });
  // ... generate files
}
```

### CI/CD Integration

```javascript
import { isCI, checkNodeVersion, isDebug } from '@shohojdhara/atomix/cli/utils';

function setupEnvironment() {
  // Check Node version
  const nodeCheck = checkNodeVersion('18.0.0');
  if (!nodeCheck.compatible) {
    console.error(`Node.js ${nodeCheck.required}+ required`);
    process.exit(1);
  }
  
  // Configure for CI
  if (isCI()) {
    process.env.ATOMIX_NON_INTERACTIVE = 'true';
    process.env.ATOMIX_COLORS = 'false';
  }
  
  // Enable debug if needed
  if (isDebug()) {
    process.env.DEBUG = '*';
  }
}
```

### Custom Theme Validator

```javascript
import {
  validateThemeName,
  validatePath,
  isValidColor
} from '@shohojdhara/atomix/cli/utils';

async function validateThemeConfig(config) {
  const errors = [];
  
  // Validate theme name
  const nameResult = validateThemeName(config.name);
  if (!nameResult.isValid) {
    errors.push(nameResult.error);
  }
  
  // Validate output path
  const pathResult = validatePath(config.outputPath);
  if (!pathResult.isValid) {
    errors.push(pathResult.error);
  }
  
  // Validate colors
  for (const [key, value] of Object.entries(config.colors)) {
    if (!isValidColor(value)) {
      errors.push(`Invalid color for ${key}: ${value}`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

---

**Version:** 0.3.4  
**Last Updated:** December 2024
