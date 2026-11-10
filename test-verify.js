// Verification test script for Bambookart
const fs = require('fs');
const path = require('path');

const root = __dirname;
console.log('Testing Bambookart files and configuration...\n');

// 1. Check critical files
const criticalFiles = [
  'index.html',
  'server.js',
  'README.md',
  'css/style.css',
  'js/products.js',
  'js/artisans.js',
  'js/translations.js',
  'js/app.js'
];

let allPassed = true;
criticalFiles.forEach(file => {
  const fullPath = path.join(root, file);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    console.log(`✓ [FILE] ${file} exists (${stats.size} bytes)`);
  } else {
    console.error(`✗ [ERROR] Missing file: ${file}`);
    allPassed = false;
  }
});

// 2. Syntax check JS files
['js/products.js', 'js/artisans.js', 'js/translations.js', 'server.js'].forEach(file => {
  try {
    require(path.join(root, file));
    console.log(`✓ [SYNTAX] ${file} loaded successfully without syntax errors`);
  } catch (err) {
    console.error(`✗ [SYNTAX ERROR] in ${file}:`, err.message);
    allPassed = false;
  }
});

// 3. Check assets
const requiredImages = [
  'logo.svg',
  'vegetable-basket.svg',
  'fruit-basket.svg',
  'winnowing-basket.svg',
  'bamboo-sieve.svg',
  'storage-basket.svg',
  'serving-tray.svg',
  'pooja-tray.svg',
  'bamboo-sticks.svg',
  'roti-basket.svg',
  'harvest-gampa.svg',
  'coarse-sieve.svg',
  'bamboo-craft-pot.svg',
  'artisan-ramaiah.svg',
  'artisan-lakshmi.svg',
  'artisan-subba-rao.svg',
  'artisan-sarada.svg',
  'banner-bg.svg'
];

requiredImages.forEach(img => {
  const p = path.join(root, 'assets', 'images', img);
  if (fs.existsSync(p)) {
    console.log(`✓ [ASSET] assets/images/${img} exists`);
  } else {
    console.error(`✗ [ASSET MISSING] assets/images/${img}`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n🌟 ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
} else {
  console.error('\n❌ Some tests failed. Please review errors above.');
  process.exit(1);
}
