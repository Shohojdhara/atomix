#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Ensure deploy directory exists
const deployDir = path.join(process.cwd(), 'deploy');
if (!fs.existsSync(deployDir)) {
  fs.mkdirSync(deployDir, { recursive: true });
}

// Copy storybook-static to deploy directory
const storybookDir = path.join(process.cwd(), 'storybook-static');
const storybookDeployDir = path.join(deployDir, '');

if (fs.existsSync(storybookDir)) {
  // Remove existing contents of deploy directory
  if (fs.existsSync(storybookDeployDir)) {
    fs.rmSync(storybookDeployDir, { recursive: true, force: true });
  }

  // Copy storybook-static to deploy directory root
  fs.cpSync(storybookDir, storybookDeployDir, { recursive: true });
  console.log('✅ Storybook copied to deploy directory');
} else {
  console.warn('⚠️  storybook-static directory not found. Run npm run build-storybook first.');
}

console.log('🎉 Deploy preparation completed successfully!');
