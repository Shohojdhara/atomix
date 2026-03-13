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
      : commonTemplates.readme.nextjs(basename(process.cwd()));
    await writeFile('README.md', readme, 'utf8');

    return true;
  },

  async _updatePackageJson() {
    const packageJsonPath = join(process.cwd(), 'package.json');
    let pkg = { scripts: {}, dependencies: {}, devDependencies: {} };

    if (existsSync(packageJsonPath)) {
      pkg = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    }

    // Merge logic... (Simplified for refactor brevity)
    // Add scripts
    pkg.scripts['build:theme'] = `atomix build-theme themes/custom`;
    
    await writeFile(packageJsonPath, JSON.stringify(pkg, null, 2), 'utf8');
  }
};
