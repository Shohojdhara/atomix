/**
 * Atomix CLI Internal Wizard
 * Core logic for initializing proyectos and generating configuration
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { projectTemplates } from '../templates.js';
import { commonTemplates } from '../templates/common-templates.js';

export const wizard = {
  /**
   * Initializes a project structure based on a template
   */
  async initProject(type, options = {}) {
    const { logger } = options;
    const template = projectTemplates[type];

    if (!template) {
        throw new Error(`Unknown project type: ${type}`);
    }

    // 1. Update package.json
    await this._updatePackageJson(type, template, options);

    // 2. Create directories
    await mkdir('src', { recursive: true });

    // 3. Write template files
    for (const [path, content] of Object.entries(template.files)) {
      const filePath = join(process.cwd(), path);
      await mkdir(dirname(filePath), { recursive: true });
      await writeFile(filePath, content, 'utf8');
      if (logger) logger.debug(`Created ${path}`);
    }

    // 4. Generate README
    const readme = type === 'react' 
      ? commonTemplates.readme.react(basename(process.cwd()))
      : type === 'nextjs'
        ? commonTemplates.readme.nextjs(basename(process.cwd()))
        : commonTemplates.readme.vanilla(basename(process.cwd()));
    await writeFile('README.md', readme, 'utf8');

    return true;
  },

  async _updatePackageJson(type, template, options = {}) {
    const packageJsonPath = join(process.cwd(), 'package.json');
    let pkg = { scripts: {}, dependencies: {}, devDependencies: {} };

    if (existsSync(packageJsonPath)) {
      pkg = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    }

    // Merge logic: ensure Atomix CLI scripts exist for scaffolded projects
    pkg.scripts = pkg.scripts || {};
    pkg.scripts['build:theme'] = pkg.scripts['build:theme'] || 'atomix build-theme themes/custom';
    pkg.scripts['generate:component'] = pkg.scripts['generate:component'] || 'atomix generate component';
    pkg.scripts['validate'] = pkg.scripts['validate'] || 'atomix validate';

    // Add required peer dependencies according to project guidelines
    pkg.dependencies = pkg.dependencies || {};
    pkg.devDependencies = pkg.devDependencies || {};

    // Required runtime dependencies (from CLI_PEER_DEPENDENCIES.md)
    if (!pkg.dependencies.react) {
      pkg.dependencies.react = '^18.0.0';
    }
    if (!pkg.dependencies['react-dom']) {
      pkg.dependencies['react-dom'] = '^18.0.0';
    }
    if (!pkg.dependencies['@phosphor-icons/react']) {
      pkg.dependencies['@phosphor-icons/react'] = '2.1.10';
    }

    // Add @shohojdhara/atomix as dependency
    if (!pkg.dependencies['@shohojdhara/atomix']) {
      pkg.dependencies['@shohojdhara/atomix'] = 'latest';
    }

    // Required devDependencies based on template
    if (template.devDependencies && Array.isArray(template.devDependencies)) {
      // Template defines an array of package names (without versions)
      for (const dep of template.devDependencies) {
        if (!pkg.devDependencies[dep]) {
          // Use default versions for common packages
          const defaultVersions = {
            'vite': '^4.0.0',
            '@vitejs/plugin-react': '^4.0.0',
            'typescript': '^5.0.0',
            '@types/react': '^18.0.0',
            '@types/react-dom': '^18.0.0',
            'sass': '^1.69.0',
            '@types/node': '^20.0.0',
            'eslint': '^8.0.0',
            'eslint-config-next': '^14.0.0'
          };
          pkg.devDependencies[dep] = defaultVersions[dep] || '^1.0.0';
        }
      }
    }

    // Add engines field for Node.js version requirement
    if (!pkg.engines) {
      pkg.engines = {
        node: '>=18.0.0',
        npm: '>=8.0.0'
      };
    }

    await writeFile(packageJsonPath, JSON.stringify(pkg, null, 2), 'utf8');
  }
};
