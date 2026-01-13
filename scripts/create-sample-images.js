// Script to create sample PNG images for item drawings
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'public', 'assets', 'images');

// Ensure directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Sample images to create
const sampleImages = [
  {
    filename: 'sliding-window.png',
    width: 300,
    height: 300,
    color: { r: 70, g: 130, b: 180 }, // Steel blue
    label: 'Sliding Window',
  },
  {
    filename: 'casement-door.png',
    width: 300,
    height: 300,
    color: { r: 34, g: 139, b: 34 }, // Forest green
    label: 'Casement Door',
  },
  {
    filename: 'fixed-window.png',
    width: 300,
    height: 300,
    color: { r: 220, g: 20, b: 60 }, // Crimson
    label: 'Fixed Window',
  },
  {
    filename: 'french-door.png',
    width: 300,
    height: 300,
    color: { r: 255, g: 140, b: 0 }, // Dark orange
    label: 'French Door',
  },
  {
    filename: 'bi-fold-door.png',
    width: 300,
    height: 300,
    color: { r: 138, g: 43, b: 226 }, // Blue violet
    label: 'Bi-fold Door',
  },
];

async function createSampleImages() {
  console.log('Creating sample images...\n');

  for (const image of sampleImages) {
    try {
      // Create a colored square with text label
      const svg = `
        <svg width="${image.width}" height="${image.height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${image.width}" height="${image.height}" fill="rgb(${image.color.r},${image.color.g},${image.color.b})"/>
          <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">${image.label}</text>
        </svg>
      `;

      await sharp(Buffer.from(svg))
        .png()
        .toFile(path.join(assetsDir, image.filename));

      console.log(`✅ Created ${image.filename}`);
    } catch (error) {
      console.error(`❌ Error creating ${image.filename}:`, error.message);
    }
  }

  console.log('\n✨ Sample images created successfully!');
  console.log(`📁 Location: ${assetsDir}`);
}

createSampleImages().catch(console.error);
