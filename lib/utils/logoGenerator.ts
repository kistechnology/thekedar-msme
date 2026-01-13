// Utility to generate logo from company name initials

/**
 * Generate initials from company name
 * @param companyName - The company name
 * @returns Initials (e.g., "ABC Corp" -> "AC")
 */
export function getCompanyInitials(companyName: string): string {
  if (!companyName || companyName.trim().length === 0) {
    return "C"; // Default to "C" for Company
  }

  const words = companyName.trim().split(/\s+/);
  
  if (words.length === 1) {
    // Single word: take first 2 letters
    return words[0].substring(0, 2).toUpperCase();
  }
  
  // Multiple words: take first letter of first two words
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Generate a data URL for a logo based on company name initials
 * @param companyName - The company name
 * @param size - Size of the logo (default: 200)
 * @returns Data URL of the generated logo
 */
export function generateLogoFromName(
  companyName: string,
  size: number = 200
): string {
  const initials = getCompanyInitials(companyName);
  
  // Generate a color based on the company name (consistent color for same name)
  const hash = companyName.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // Generate a nice color palette
  const colors = [
    { bg: '#1976d2', text: '#ffffff' }, // Blue
    { bg: '#388e3c', text: '#ffffff' }, // Green
    { bg: '#f57c00', text: '#ffffff' }, // Orange
    { bg: '#7b1fa2', text: '#ffffff' }, // Purple
    { bg: '#c2185b', text: '#ffffff' }, // Pink
    { bg: '#0288d1', text: '#ffffff' }, // Light Blue
    { bg: '#5d4037', text: '#ffffff' }, // Brown
    { bg: '#455a64', text: '#ffffff' }, // Blue Grey
  ];
  
  const colorIndex = Math.abs(hash) % colors.length;
  const color = colors[colorIndex];
  
  // Create SVG
  const fontSize = size * 0.4; // Font size is 40% of logo size
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${color.bg}" rx="${size * 0.1}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="${fontSize}" 
        fill="${color.text}" 
        text-anchor="middle" 
        dominant-baseline="middle" 
        font-weight="bold"
      >${initials}</text>
    </svg>
  `.trim();
  
  // Convert SVG to data URL
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
