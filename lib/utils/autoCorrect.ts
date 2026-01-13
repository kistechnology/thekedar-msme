// Auto-correction and spell checking utility

/**
 * Common spelling corrections dictionary
 */
const commonCorrections: Record<string, string> = {
  // Common typos
  "teh": "the",
  "adn": "and",
  "taht": "that",
  "recieve": "receive",
  "seperate": "separate",
  "occured": "occurred",
  "accomodate": "accommodate",
  "definately": "definitely",
  "existance": "existence",
  "goverment": "government",
  "independant": "independent",
  "neccessary": "necessary",
  "occassion": "occasion",
  "priviledge": "privilege",
  "seige": "siege",
  "thier": "their",
  "untill": "until",
  "writting": "writing",
  
  // Business/Company related
  "pvt": "Pvt",
  "ltd": "Ltd",
  "inc": "Inc",
  "corp": "Corp",
  "llp": "LLP",
  "gst": "GST",
  "gstin": "GSTIN",
  "mob": "Mob",
  "mob.": "Mob.",
  "ph": "Ph",
  "ph.": "Ph.",
  "email": "Email",
  "e-mail": "E-mail",
};

/**
 * Words that should always be lowercase (articles, prepositions, conjunctions)
 */
const lowercaseWords = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "in",
  "into", "nor", "of", "on", "or", "the", "to", "with", "via"
]);

/**
 * Words that should always be uppercase (acronyms)
 */
const uppercaseWords = new Set([
  "GST", "GSTIN", "PAN", "AADHAR", "IFSC", "UPI", "RTGS", "NEFT",
  "LLP", "PVT", "LTD", "INC", "CORP", "USA", "UK", "INDIA"
]);

/**
 * Correct spelling of a word
 */
export function correctSpelling(word: string): string {
  const lowerWord = word.toLowerCase();
  
  // Check common corrections
  if (commonCorrections[lowerWord]) {
    return commonCorrections[lowerWord];
  }
  
  // If it's an acronym, return uppercase
  if (uppercaseWords.has(word.toUpperCase())) {
    return word.toUpperCase();
  }
  
  return word;
}

/**
 * Capitalize a word according to English rules
 */
export function capitalizeWord(word: string, isFirstWord: boolean = false): string {
  if (!word) return word;
  
  const lower = word.toLowerCase();
  
  // Always uppercase acronyms
  if (uppercaseWords.has(word.toUpperCase())) {
    return word.toUpperCase();
  }
  
  // First word of sentence: capitalize first letter
  if (isFirstWord) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  
  // Articles, prepositions, conjunctions: lowercase (unless first word)
  if (lowercaseWords.has(lower)) {
    return lower;
  }
  
  // Proper nouns and other words: capitalize first letter
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Auto-correct a sentence/text
 */
export function autoCorrectText(text: string): string {
  if (!text || text.trim().length === 0) return text;
  
  // Split into words while preserving spaces and punctuation
  const words = text.split(/(\s+|[.,;:!?()\-])/);
  
  return words
    .map((word, index) => {
      // Skip whitespace and punctuation
      if (/^\s*$/.test(word) || /^[.,;:!?()\-]+$/.test(word)) {
        return word;
      }
      
      // Check if this is the first word (after trimming leading spaces)
      const isFirstWord = index === 0 || words.slice(0, index).every(w => /^\s*$/.test(w));
      
      // Correct spelling first
      const corrected = correctSpelling(word);
      
      // Then apply capitalization
      return capitalizeWord(corrected, isFirstWord);
    })
    .join("");
}

/**
 * Auto-correct company name (special handling for business names)
 */
export function autoCorrectCompanyName(name: string): string {
  if (!name || name.trim().length === 0) return name;
  
  // Split by common separators
  const parts = name.split(/\s+/);
  
  return parts
    .map((part, index) => {
      const lower = part.toLowerCase();
      
      // Business suffixes: capitalize properly
      if (lower === "pvt" || lower === "pvt.") return "Pvt.";
      if (lower === "ltd" || lower === "ltd.") return "Ltd.";
      if (lower === "inc" || lower === "inc.") return "Inc.";
      if (lower === "corp" || lower === "corp.") return "Corp.";
      if (lower === "llp") return "LLP";
      
      // First word: capitalize
      if (index === 0) {
        return capitalizeWord(part, true);
      }
      
      // Other words: capitalize (proper nouns in company names)
      return capitalizeWord(part);
    })
    .join(" ");
}

/**
 * Auto-correct email (ensure lowercase)
 */
export function autoCorrectEmail(email: string): string {
  if (!email) return email;
  return email.toLowerCase().trim();
}

/**
 * Auto-correct address
 */
export function autoCorrectAddress(address: string): string {
  if (!address || address.trim().length === 0) return address;
  
  // Split by newlines or commas
  const lines = address.split(/[,\n]/);
  
  return lines
    .map((line, lineIndex) => {
      const trimmed = line.trim();
      if (!trimmed) return trimmed;
      
      // Capitalize first letter of each line
      return capitalizeWord(trimmed, true);
    })
    .filter(Boolean)
    .join(", ");
}

/**
 * Auto-correct GSTIN (uppercase, remove spaces)
 */
export function autoCorrectGSTIN(gstin: string): string {
  if (!gstin) return gstin;
  return gstin.toUpperCase().replace(/\s+/g, "").trim();
}

/**
 * Auto-correct mobile number (remove spaces, keep only digits and +)
 */
export function autoCorrectMobile(mobile: string): string {
  if (!mobile) return mobile;
  return mobile.replace(/[^\d+]/g, "").trim();
}
