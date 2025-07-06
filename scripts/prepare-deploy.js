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
const storybookDeployDir = path.join(deployDir, 'storybook');

if (fs.existsSync(storybookDir)) {
  // Remove existing storybook directory in deploy
  if (fs.existsSync(storybookDeployDir)) {
    fs.rmSync(storybookDeployDir, { recursive: true, force: true });
  }

  // Copy storybook-static to deploy/storybook
  fs.cpSync(storybookDir, storybookDeployDir, { recursive: true });
  console.log('✅ Storybook copied to deploy/storybook');
} else {
  console.warn('⚠️  storybook-static directory not found. Run npm run build-storybook first.');
}

// Create main index.html that redirects to storybook
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atomix Design System</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #666;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            transition: background 0.2s;
        }
        .btn:hover {
            background: #5a6fd8;
        }
        .version {
            margin-top: 20px;
            font-size: 14px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Atomix Design System</h1>
        <p>Welcome to the Atomix Design System preview. Explore our component library and documentation.</p>
        <a href="./storybook/" class="btn">View Storybook</a>
        <div class="version">Preview Build</div>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(deployDir, 'index.html'), indexHtml);
console.log('✅ Main index.html created');

// Create a simple 404 page
const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Atomix Design System</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            color: #333;
            margin-bottom: 20px;
        }
        p {
            color: #666;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            transition: background 0.2s;
        }
        .btn:hover {
            background: #5a6fd8;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/" class="btn">Go Home</a>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(deployDir, '404.html'), notFoundHtml);
console.log('✅ 404.html created');

console.log('🎉 Deploy preparation completed successfully!');
