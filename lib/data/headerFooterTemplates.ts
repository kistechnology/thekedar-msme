// Header and Footer Template Options

export interface HeaderTemplate {
  id: string;
  name: string;
  description: string;
  layout: "centered" | "left-aligned" | "split"; // Layout options
  showLogo: boolean;
  showCompanyName: boolean;
  showAddress: boolean;
  showContact: boolean;
  showGSTIN: boolean;
}

export interface FooterTemplate {
  id: string;
  name: string;
  description: string;
  layout: "simple" | "detailed";
  showBankDetails: boolean;
  showTerms: boolean;
  showContact: boolean;
}

// Pre-configured Header Templates
export const headerTemplates: HeaderTemplate[] = [
  {
    id: "header-1",
    name: "Classic Header",
    description: "Centered layout with logo, company name, and contact details",
    layout: "centered",
    showLogo: true,
    showCompanyName: true,
    showAddress: true,
    showContact: true,
    showGSTIN: true,
  },
  {
    id: "header-2",
    name: "Modern Header",
    description: "Left-aligned layout with logo and company details side by side",
    layout: "left-aligned",
    showLogo: true,
    showCompanyName: true,
    showAddress: true,
    showContact: true,
    showGSTIN: true,
  },
];

// Pre-configured Footer Templates
export const footerTemplates: FooterTemplate[] = [
  {
    id: "footer-1",
    name: "Standard Footer",
    description: "Includes bank details and terms & conditions",
    layout: "detailed",
    showBankDetails: true,
    showTerms: true,
    showContact: false,
  },
  {
    id: "footer-2",
    name: "Compact Footer",
    description: "Minimal footer with essential information only",
    layout: "simple",
    showBankDetails: true,
    showTerms: true,
    showContact: true,
  },
];

// Get header template by ID
export const getHeaderTemplate = (id: string): HeaderTemplate | undefined => {
  return headerTemplates.find((t) => t.id === id);
};

// Get footer template by ID
export const getFooterTemplate = (id: string): FooterTemplate | undefined => {
  return footerTemplates.find((t) => t.id === id);
};
