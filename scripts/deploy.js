const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure we're in the project root
const projectRoot = path.resolve(__dirname, '..');
process.chdir(projectRoot);

// Clean and build
console.log('Cleaning and building...');
execSync('rm -rf dist/*', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit' });

// Verify files exist
const distDir = path.join(projectRoot, 'dist');
const files = fs.readdirSync(distDir);
console.log('Files in dist:', files);

// Force push to Apps Script
console.log('Deploying to Apps Script...');
execSync('npx clasp push -f', { stdio: 'inherit' }); 