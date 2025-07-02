#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

function run(command) {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: 'inherit' });
}

function updateChangelog(version) {
  const changelogPath = path.join(__dirname, '../CHANGELOG.md');
  const changelog = fs.readFileSync(changelogPath, 'utf8');
  const date = new Date().toISOString().split('T')[0];
  
  const updatedChangelog = changelog.replace(
    '## [Unreleased]',
    `## [Unreleased]\n\n## [${version}] - ${date}`
  );
  
  fs.writeFileSync(changelogPath, updatedChangelog);
}

const releaseType = process.argv[2] || 'patch';

console.log(`🚀 Starting ${releaseType} release...`);

// Build the package
run('npm run build');

// Update version
run(`npm version ${releaseType} --no-git-tag-version`);

// Read new version
const newPkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const newVersion = newPkg.version;

// Update changelog
updateChangelog(newVersion);

// Commit changes
run('git add .');
run(`git commit -m "chore: release v${newVersion}"`);
run(`git tag v${newVersion}`);

console.log(`✅ Release v${newVersion} prepared!`);
console.log('Next steps:');
console.log('1. git push origin main');
console.log(`2. git push origin v${newVersion}`);
console.log('3. Create GitHub release');
console.log('4. npm publish (or use GitHub Actions)');