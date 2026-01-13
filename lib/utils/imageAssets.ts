// Utility to manage image assets for item drawings

// List of available images in the assets folder
// Add image filenames here as you add them to public/assets/images/
export const availableItemDrawings: string[] = [
  "sliding-window.png",
  "casement-door.png",
  "fixed-window.png",
  "french-door.png",
  "bi-fold-door.png",
];

// Get the full path for an image asset
export const getImageAssetPath = (filename: string): string => {
  return `/assets/images/${filename}`;
};

// Check if an image is from assets (starts with /assets/)
export const isAssetImage = (imagePath: string | null): boolean => {
  return imagePath?.startsWith("/assets/") ?? false;
};

// Get all available image assets with their paths
export const getAvailableImageAssets = (): Array<{ filename: string; path: string }> => {
  return availableItemDrawings.map((filename) => ({
    filename,
    path: getImageAssetPath(filename),
  }));
};
