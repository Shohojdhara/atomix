/**
 * Script to prepare a unified GitHub Pages deployment
 * - Copies documentation site contents to the root directory
 * - Copies Storybook build to the /storybook directory
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  // Source directories
  sources: {
    storybook: path.resolve(__dirname, '../storybook-static'),
    docs: path.resolve(__dirname, '../deploy/docs'),
  },
  // Target directories
  targets: {
    root: path.resolve(__dirname, '../deploy'),
    storybook: path.resolve(__dirname, '../deploy/storybook'),
  },
};

// Helper function to copy directories recursively
function copyDirectory(source, target) {
  // Create the target directory if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Get all items in the source directory
  const items = fs.readdirSync(source);

  // Loop through all items and copy them
  for (const item of items) {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    // Get item stats
    const stats = fs.statSync(sourcePath);
    
    if (stats.isDirectory()) {
      // If it's a directory, recursively copy it
      copyDirectory(sourcePath, targetPath);
    } else {
      // If it's a file, copy it
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

// Create the main index.html file for when docs aren't available
function createIndexHtml() {
  const indexPath = path.join(config.targets.root, 'index.html');
  
  // Create a basic index.html with links
  const indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Atomix Design System</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
    }
    h1 { color: #1e293b; }
    .links {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 30px;
    }
    a {
      display: inline-block;
      background-color: #3b82f6;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
    }
    a:hover {
      background-color: #2563eb;
    }
  </style>
</head>
<body>
  <h1>Atomix Design System</h1>
  <p>Welcome to the Atomix Design System documentation</p>
  <div class="links">
    <a href="storybook/index.html">Storybook</a>
  </div>
</body>
</html>
  `;
  fs.writeFileSync(indexPath, indexContent);
}

// Main process
function main() {
  console.log('Preparing deployment for GitHub Pages...');
  
  // Create the deployment directory if it doesn't exist
  if (!fs.existsSync(config.targets.root)) {
    fs.mkdirSync(config.targets.root, { recursive: true });
  } else {
    // Clean up any existing files except the docs directory - we'll handle that separately
    const items = fs.readdirSync(config.targets.root);
    for (const item of items) {
      if (item === 'docs') continue;
      
      const itemPath = path.join(config.targets.root, item);
      if (fs.lstatSync(itemPath).isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(itemPath);
      }
    }
  }

  // Check if docs have been built
  const docsExist = fs.existsSync(config.sources.docs);
  
  if (docsExist) {
    // Move docs content to the root
    console.log('Documentation site found, copying to root...');
    
    // Read all files from the docs directory
    const docsItems = fs.readdirSync(config.sources.docs);
    
    // Copy each item to the root
    for (const item of docsItems) {
      const sourcePath = path.join(config.sources.docs, item);
      const targetPath = path.join(config.targets.root, item);
      
      const stats = fs.statSync(sourcePath);
      
      if (stats.isDirectory()) {
        // If it's a directory, recursively copy it
        copyDirectory(sourcePath, targetPath);
      } else {
        // If it's a file, copy it
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
    
    // Clean up the docs directory as we've moved everything to root
    fs.rmSync(config.sources.docs, { recursive: true, force: true });
  } else {
    // Create a basic index.html if docs don't exist
    console.log('Documentation site not found, creating basic index.html...');
    createIndexHtml();
  }

  // Copy the Storybook build to the storybook directory if it exists
  if (fs.existsSync(config.sources.storybook)) {
    console.log('Copying Storybook build to /storybook...');
    copyDirectory(config.sources.storybook, config.targets.storybook);
  } else {
    console.warn('Storybook build not found. Run "npm run build-storybook" first.');
  }

  console.log('Deployment preparation complete!');
  console.log(`Files ready in: ${config.targets.root}`);
}

// Run the main process
main(); 