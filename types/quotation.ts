// Quotation Template Data Model Types

export interface CompanyDetails {
  logo: string | null; // Base64 or URL
  name: string;
  address: string;
  gstin: string;
  mobile: string;
  email: string;
}

export interface BankDetails {
  bankName: string;
  branch: string;
  accountNumber: string;
  accountHolderName: string;
  ifscCode: string;
  accountType?: string; // Savings, Current, etc.
  upiId?: string; // Optional UPI ID
  otherDetails?: string; // Any additional bank details
}

// Template Item - Reusable item definition in a template
export interface TemplateItem {
  id: string; // Unique ID for the item
  itemCode: string; // Item code (e.g., "WIN-001")
  description: string; // Item description
  drawing: string | null; // PNG base64 or URL for item drawing
}

export interface QuotationItem {
  id: string; // Unique ID for the item
  serialNo: number; // Auto-incrementing
  itemCode: string;
  description: string;
  windowDrawing: string | null; // PNG base64 or URL
  dimensions: {
    width: number;
    height: number;
    unit: "mm" | "cm";
  };
  area: number; // Auto-calculated (sqft)
  quantity: number;
  totalArea: number; // Auto-calculated (sqft)
  unitPrice: number;
  totalPrice: number; // Auto-calculated
  hardware: string;
  glassType: string;
}

export interface QuotationSummary {
  subtotal: number;
  tax: number; // GST
  discount: number;
  grandTotal: number;
}

// Quotation Template - Reusable template for creating quotations
export interface QuotationTemplate {
  id: string; // Unique identifier
  name: string; // Template name
  createdAt: Date;
  updatedAt: Date;
  
  // Company/Hero Section
  company: CompanyDetails;
  
  // Notes
  notes: {
    top: string;
    middle: string;
    bottom: string;
  };
  
  // Item Definitions (reusable items/components)
  items: TemplateItem[]; // Standard items that can be used in quotations
  
  // Additional Sections
  termsAndConditions: string[]; // Array of term IDs (selected from standard terms)
  termsConfig?: Record<string, Record<string, string | number>>; // Configured values for terms: { termId: { variableKey: value } }
  customTerms?: Record<string, string>; // Custom terms per category: { categoryId: customText }
  bankDetails: BankDetails;
  
  // Template Design Options
  headerTemplateId: string; // Selected header template ID
  footerTemplateId: string; // Selected footer template ID
}

// Form data for creating/editing template
export interface TemplateFormData {
  // Template Name
  templateName: string;
  
  // Company Details
  companyName: string;
  companyAddress: string;
  companyGSTIN: string;
  companyMobile: string;
  companyEmail: string;
  companyLogo: string | null;
  
  // Notes
  topNote: string;
  middleNote: string;
  bottomNote: string;
  
  // Items
  items: TemplateItem[]; // Standard items/components
  
  // Terms & Bank
  selectedTerms: string[]; // Array of term IDs
  termsConfig: Record<string, Record<string, string | number>>; // Configured values: { termId: { variableKey: value } }
  customTerms: Record<string, string>; // Custom terms per category: { categoryId: customText }
  bankDetails: BankDetails;
  
  // Template Design Options
  headerTemplateId: string; // Selected header template ID
  footerTemplateId: string; // Selected footer template ID
}

// Form data for creating/editing quotation
export interface QuotationFormData {
  // Company Details
  companyName: string;
  companyAddress: string;
  companyGSTIN: string;
  companyMobile: string;
  companyEmail: string;
  companyLogo: string | null;
  
  // Customer Details
  customerName: string;
  customerAddress?: string;
  customerMobile?: string;
  customerEmail?: string;
  customerGSTIN?: string;
  date: Date;
  
  // Notes
  topNote: string;
  middleNote: string;
  bottomNote: string;
  
  // Terms & Bank
  termsAndConditions: string;
  bankDetails: string;
}

// Actual Quotation (will be created from template later)
export interface Quotation {
  id: string;
  templateId?: string; // Reference to template used (optional for backward compatibility)
  createdAt: Date;
  updatedAt: Date;
  
  // Company Details (from template or directly set)
  company: CompanyDetails;
  
  // Customer Info (added when creating quotation)
  customerName: string;
  customerAddress?: string;
  customerMobile?: string;
  customerEmail?: string;
  customerGSTIN?: string;
  date: Date;
  
  // Notes
  notes: {
    top: string;
    middle: string;
    bottom: string;
  };
  
  // Content Table
  items: QuotationItem[];
  
  // Summary
  summary: QuotationSummary;
  
  // Additional Sections (for backward compatibility)
  termsAndConditions: string;
  bankDetails: string;
}
