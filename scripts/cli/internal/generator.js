/**
 * Atomix CLI Internal Generator
 * Core logic for scaffolding components and assets
 */

import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { templateEngine, COMPLEXITY_LEVELS } from './template-engine.js';
import { detectFramework } from '../utils/detector.js';
import { filesystem } from './filesystem.js';
import { aiEngine } from './ai-engine.js';
import { 
  sanitizeInput, 
  validateComponentNameSecure, 
  RateLimiter 
} from '../utils/security.js';
import { AtomixCLIError } from '../utils/error.js';
import { tokenProvider } from './tokens/token-provider.js';
import { tokenValidator } from './tokens/token-validator.js';
import { componentValidator } from './component-validator.js';
import { generateComponentStylesPackage } from './itcss-generator.js';
import { generateHookFile } from './hook-generator.js';

export { COMPLEXITY_LEVELS };

export const COMPONENT_FEATURES = {
  TYPESCRIPT: { name: 'typescript', default: true },
  STORYBOOK: { name: 'storybook', default: true },
  TESTS: { name: 'tests', default: false },
  HOOK: { name: 'hook', default: true },
  STYLES: { name: 'styles', default: true },
  ACCESSIBILITY: { name: 'accessibility', default: true }
};

// Global rate limiter for AI operations
const aiRateLimiter = new RateLimiter(5, 60000); // 5 requests per minute

export const generator = {
  /**
   * Generates component files based on options
   * @param {string} name - Component name
   * @param {Object} options - Generation options
   * @returns {Promise<string>} Path to generated component
   * @throws {AtomixCLIError} If generation fails
   */
  async generateComponent(name, options = {}) {
    const {
      outputPath,
      complexity = 'medium',
      features = [],
      logger
    } = options;

    // Sanitize and validate component name
    const sanitizedName = sanitizeInput(name, 'componentName');
    const validation = validateComponentNameSecure(sanitizedName);
    if (!validation.isValid) {
      throw new AtomixCLIError(
        `Component name validation failed: ${validation.error}`,
        'INVALID_COMPONENT_NAME',
        [
          'Use PascalCase (e.g., MyComponent, Button)',
          'Start with a letter (not numbers)',
          'Avoid special characters except letters and numbers'
        ]
      );
    }

    // Detect framework
    let framework;
    try {
      framework = await detectFramework();
      if (logger) logger.debug(`Detected framework: ${framework}`);
    } catch (error) {
      throw new AtomixCLIError(
        `Framework detection failed: ${error.message}`,
        'FRAMEWORK_DETECTION_FAILED',
        [
          'Ensure package.json exists in project root',
          'Check for React, Next.js, or vanilla project structure',
          'Run `atomix doctor` to diagnose environment issues'
        ]
      );
    }

    // Load design tokens if available
    let availableTokens = {};
    try {
      const tokenPaths = [
        './design-tokens/tokens.json',
        './src/design-tokens/tokens.json',
        './tokens.json'
      ];
      
      for (const tokenPath of tokenPaths) {
        if (existsSync(join(process.cwd(), tokenPath))) {
          availableTokens = await tokenProvider.loadTokens(tokenPath);
          if (logger) logger.debug(`Loaded design tokens from ${tokenPath}`);
          break;
        }
      }
    } catch (error) {
      if (logger) logger.debug(`Token loading skipped: ${error.message}`);
    }

    const componentPath = join(outputPath, sanitizedName);

    // 1. Generate Component File
    let content;
    let ext = '.tsx';

    try {
      if (framework === 'vanilla') {
        const templateFn = templateEngine.selectTemplate('vanilla', complexity, 'component');
        content = templateEngine.render(templateFn, sanitizedName);
        ext = '.html';
      } else if (framework === 'next') {
        const templateFn = templateEngine.selectTemplate('next', complexity, 'component');
        content = templateEngine.render(templateFn, sanitizedName);
      } else {
        // Default to React
        const templateFn = templateEngine.selectTemplate('react', complexity, 'component');
        content = templateEngine.render(templateFn, sanitizedName);
      }
    } catch (error) {
      if (error instanceof AtomixCLIError) {
        throw error;
      }
      throw new AtomixCLIError(
        `Failed to select template: ${error.message}`,
        'TEMPLATE_SELECTION_FAILED',
        [
          `Check if complexity level '${complexity}' is valid`,
          `Verify framework '${framework}' is supported`,
          'Run `atomix doctor` to check template availability'
        ]
      );
    }

    // Validate generated component against design system rules
    const componentValidation = tokenValidator.validateComponent(content, availableTokens);
    if (!componentValidation.valid && logger) {
      logger.debug(`Component validation: ${componentValidation.issues.length} issues found`);
    }

    await filesystem.writeFile(join(componentPath, `${sanitizedName}${ext}`), content, 'utf8');
    if (logger) logger.debug(`Created ${sanitizedName}${ext}`);

    // 2. Index File (only for React/Next)
    if (framework !== 'vanilla') {
      try {
        const indexTemplateFn = templateEngine.selectTemplate(framework, complexity, 'index');
        const indexContent = templateEngine.render(indexTemplateFn, sanitizedName);
        await filesystem.writeFile(join(componentPath, 'index.ts'), indexContent, 'utf8');
        if (logger) logger.debug(`Created index.ts`);
      } catch (error) {
        throw new AtomixCLIError(
          `Failed to generate index file: ${error.message}`,
          'INDEX_GENERATION_FAILED',
          [
            'Check index template exists for framework',
            'Verify template exports in template files',
            'Try generating without index feature'
          ]
        );
      }
    }

    // 3. Optional Features
    if (features.includes('storybook')) {
      try {
        const storyTemplateFn = templateEngine.selectTemplate(framework, complexity, 'story');
        const storyContent = templateEngine.render(storyTemplateFn, sanitizedName);
        await filesystem.writeFile(join(componentPath, `${sanitizedName}.stories.tsx`), storyContent, 'utf8');
        if (logger) logger.debug(`Created ${sanitizedName}.stories.tsx`);
      } catch (error) {
        throw new AtomixCLIError(
          `Failed to generate Storybook story: ${error.message}`,
          'STORYBOOK_GENERATION_FAILED',
          [
            'Check storybook template exists',
            'Verify story feature is supported for this framework',
            'Try generating without --storybook flag'
          ]
        );
      }
    }

    if (features.includes('tests')) {
      try {
        const testTemplateFn = templateEngine.selectTemplate(framework, complexity, 'test');
        const testContent = templateEngine.render(testTemplateFn, sanitizedName);
        await filesystem.writeFile(join(componentPath, `${sanitizedName}.test.tsx`), testContent, 'utf8');
        if (logger) logger.debug(`Created ${sanitizedName}.test.tsx`);
      } catch (error) {
        throw new AtomixCLIError(
          `Failed to generate test file: ${error.message}`,
          'TEST_GENERATION_FAILED',
          [
            'Check test template exists',
            'Verify test feature is supported for this framework',
            'Try generating without --tests flag'
          ]
        );
      }
    }

    if (features.includes('hook') && framework !== 'vanilla') {
      try {
        const hookDir = join(outputPath, '..', 'lib', 'composables');
        const hookTemplateFn = templateEngine.selectTemplate(framework, complexity, 'hook');
        const hookContent = templateEngine.render(hookTemplateFn, sanitizedName);
        await filesystem.writeFile(join(hookDir, `use${sanitizedName}.ts`), hookContent, 'utf8');
        if (logger) logger.debug(`Created use${sanitizedName}.ts`);
      } catch (error) {
        throw new AtomixCLIError(
          `Failed to generate composable hook: ${error.message}`,
          'HOOK_GENERATION_FAILED',
          [
            'Check hook template exists',
            'Verify hook feature is supported for this framework',
            'Try generating without --hook flag'
          ]
        );
      }
    }

    // 4. Styles (ITCSS) - Enhanced with auto-generation
    if (features.includes('styles')) {
      try {
        const stylesResult = await generateComponentStylesPackage(sanitizedName, process.cwd(), {
          force: options.force || false
        });
        
        if (logger && stylesResult.created.length > 0) {
          logger.debug(`Created ${stylesResult.created.length} ITCSS style files`);
        }
      } catch (error) {
        throw new AtomixCLIError(
          `Failed to generate ITCSS styles: ${error.message}`,
          'STYLE_GENERATION_FAILED',
          [
            'Check SCSS templates exist',
            'Verify styles directory structure',
            'Try generating without --styles flag'
          ]
        );
      }
    }

    // 5. Composable Hook - Enhanced generation
    if (features.includes('hook') && framework !== 'vanilla') {
      try {
        const hookResult = await generateHookFile(sanitizedName, process.cwd(), {
          force: options.force || false
        });
        
        if (logger && hookResult.created.length > 0) {
          logger.debug(`Created ${hookResult.created.length} composable hook files`);
        }
      } catch (error) {
        throw new AtomixCLIError(
          `Failed to generate composable hook: ${error.message}`,
          'HOOK_GENERATION_FAILED',
          [
            'Check hook template exists',
            'Verify hook feature is supported for this framework',
            'Try generating without --hook flag'
          ]
        );
      }
    }

    return componentPath;
  },

  /**
   * Generates component files using AI based on a prompt
   * @param {string} name - Component name
   * @param {string} prompt - AI prompt
   * @param {Object} options - Generation options
   * @returns {Promise<string>} Path to generated component
   * @throws {AtomixCLIError} If generation fails
   */
  async generateAIComponent(name, prompt, options = {}) {
    const { outputPath, logger } = options;
    
    // Apply rate limiting for AI operations
    const userId = process.env.USER || 'anonymous';
    if (!aiRateLimiter.checkLimit(userId)) {
      throw new AtomixCLIError(
        `Rate limit exceeded. Please wait before generating more AI components. Remaining: ${aiRateLimiter.getRemaining(userId)} seconds`,
        'RATE_LIMIT_EXCEEDED',
        [
          'Wait for rate limit to reset (60 seconds)',
          'Reduce frequency of AI component generation',
          'Use regular generation instead of AI for simple components'
        ]
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name, 'componentName');
    sanitizeInput(prompt, 'prompt'); // Sanitize but use original
    
    const validation = validateComponentNameSecure(sanitizedName);
    if (!validation.isValid) {
      throw new AtomixCLIError(
        `Component name validation failed: ${validation.error}`,
        'INVALID_COMPONENT_NAME',
        [
          'Use PascalCase (e.g., MyComponent, Button)',
          'Start with a letter (not numbers)',
          'Avoid special characters except letters and numbers'
        ]
      );
    }

    const componentPath = join(outputPath, sanitizedName);

    // Call AI Engine
    let generated;
    try {
      generated = await aiEngine.generateComponent(name, prompt);
    } catch (error) {
      throw new AtomixCLIError(
        `AI generation failed: ${error.message}`,
        'AI_GENERATION_FAILED',
        [
          'Check your internet connection',
          'Verify AI engine credentials are configured',
          'Try again in a few moments',
          'Use regular generation as fallback'
        ]
      );
    }

    // Write component file
    try {
      await filesystem.writeFile(join(componentPath, `${sanitizedName}.tsx`), generated.component, 'utf8');
      if (logger) logger.debug(`Created ${sanitizedName}.tsx (AI)`);
    } catch (error) {
      throw new AtomixCLIError(
        `Failed to write AI-generated component: ${error.message}`,
        'FILE_WRITE_FAILED',
        [
          'Check you have write permissions for the target directory',
          'Ensure the path is valid and within project root',
          'Verify disk space is available'
        ]
      );
    }

    // Index file
    try {
      const indexTemplateFn = templateEngine.selectTemplate('react', 'medium', 'index');
      const indexContent = templateEngine.render(indexTemplateFn, sanitizedName);
      await filesystem.writeFile(join(componentPath, 'index.ts'), indexContent, 'utf8');
    } catch (error) {
      throw new AtomixCLIError(
        `Failed to write index file: ${error.message}`,
        'FILE_WRITE_FAILED',
        [
          'Check index template exists',
          'Verify write permissions',
          'AI generation may have incomplete templates'
        ]
      );
    }

    // Optional files from AI
    if (generated.styles) {
      await filesystem.writeFile(join(componentPath, `${sanitizedName}.scss`), generated.styles, 'utf8');
    }

    if (generated.tests) {
      await filesystem.writeFile(join(componentPath, `${sanitizedName}.test.tsx`), generated.tests, 'utf8');
    }

    if (generated.stories) {
      await filesystem.writeFile(join(componentPath, `${sanitizedName}.stories.tsx`), generated.stories, 'utf8');
    }

    if (generated.readme) {
      await filesystem.writeFile(join(componentPath, 'README.md'), generated.readme, 'utf8');
    }

    return componentPath;
  },

  /**
   * Validates a generated component
   * @param {string} name - Component name
   * @param {string} componentPath - Path to component directory
   * @returns {Promise<Object>} { valid: boolean, issues: string[] }
   */
  async validate(name, componentPath) {
    const issues = [];
    const componentFile = join(componentPath, `${name}.tsx`);
    
    if (!existsSync(componentFile)) {
      issues.push(`Target file missing: ${name}.tsx`);
      return { valid: false, issues };
    }

    const content = await readFile(componentFile, 'utf8');
    
    // Use new component validator for comprehensive checks
    const validationResults = componentValidator.validate(content, name);
    
    // Add all issues from component validator
    for (const issue of validationResults.issues) {
      issues.push(`[${issue.rule}] ${issue.message}${issue.suggestion ? ' - ' + issue.suggestion : ''}`);
    }
    
    // Legacy checks (keep for backward compatibility)
    // 1. Check for displayName (already covered by componentValidator)
    // 2. Check for JSDoc documentation (already covered)
    // 3. Check for TypeScript type definitions (already covered)
    // 4. Check for forwardRef usage (already covered)
    // 5. Check for Accessibility attributes (already covered)
    // 6. Check for hardcoded colors (already covered)

    return {
      valid: validationResults.valid,
      issues
    };
  }
};
