// Script to create placeholder logo image
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Create placeholder logo - a simple company icon
const svg = `
  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="#e3f2fd" rx="10"/>
    <rect x="50" y="50" width="100" height="100" fill="#1976d2" rx="5"/>
    <text x="100" y="120" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" font-weight="bold">C</text>
  </svg>
`;

async function createPlaceholderLogo() {
  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(publicDir, 'placeholder-logo.png'));

    console.log('✅ Created placeholder-logo.png');
    console.log(`📁 Location: ${path.join(publicDir, 'placeholder-logo.png')}`);
  } catch (error) {
    console.error('❌ Error creating placeholder logo:', error.message);
  }
}

createPlaceholderLogo();
