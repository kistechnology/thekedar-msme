# Terms & Conditions Module

## Overview

The Terms & Conditions module provides an easy-to-use multi-select interface for selecting standard terms from 20 pre-defined categories. Users can select multiple terms and also add custom terms if needed.

## Features

✅ **20 Standard Categories** with organized terms
✅ **Multi-select Interface** - Easy checkbox selection
✅ **Category-based Organization** - Collapsible categories
✅ **Select All/Deselect All** - Per category
✅ **Custom Terms** - Option to add additional terms
✅ **Visual Feedback** - Shows selected count per category
✅ **Mobile-friendly** - Scrollable interface

## Categories & Terms

### 1. Payment Terms (4 terms)
- 50% advance along with order confirmation
- 30% payment after 10 days of glass order
- Balance 20% payable before dispatch of material
- No material will be dispatched without full and final payment

### 2. Prices & Validity (3 terms)
- Prices are based on sizes and specifications provided by the customer
- Prices are valid for size variations up to ±50 mm per window
- Any change beyond this will attract revised pricing

### 3. Delivery Timeline (2 terms)
- Delivery period shall be 60 days from the date of Purchase Order (PO)
- Delivery timelines may vary due to force majeure or client-side delays

### 4. Scope of Supply (2 terms)
- Supply is limited strictly to items mentioned in the quotation
- Any additional work or material shall be charged extra

### 5. Site Readiness (2 terms)
- Customer shall ensure the site is fully ready for installation
- Installation should be done after completion of civil construction

### 6. Client Responsibilities (2 terms)
- Scaffolding, electricity, and water shall be provided by the client free of cost
- Any delay due to non-availability of these shall not be our responsibility

### 7. Installation Conditions (2 terms)
- Aluminium windows and doors must be fitted in dust-free conditions
- Installation during ongoing construction may affect finish and alignment

### 8. Handling & Storage (2 terms)
- Material should be stored safely at site after delivery
- Any damage after delivery due to mishandling will be chargeable

### 9. Cleaning & Protection (3 terms)
- Windows will be dispatched in neat, clean, and proper packaging
- Cleaning of cement, POP, paint, or construction residue is not included
- Protection tape removal will be done as required

### 10. Glass & Modifications (2 terms)
- Glass cutting for exhaust fan or any post-manufacturing modification will be charged
- Any on-site alteration may impact warranty

### 11. Special Finishes (2 terms)
- Extra charges shall apply for special color coating, textures, or finishes
- Color shade variations may occur due to batch processing

### 12. Transportation & Lifting (2 terms)
- Lead and lift charges are included up to 4th floor only
- Above 4th floor, charges shall be applicable as per actuals

### 13. Inspection & Handover (2 terms)
- Installed windows shall be handed over on a daily basis
- Any issues must be reported immediately during handover

### 14. Delay Due to Client (1 term)
- Any delay caused due to site unavailability, design changes, or payment delays

### 15. Warranty (2 terms)
- Warranty shall be applicable only on manufacturing defects
- Damage due to misuse, mishandling, or external impact is excluded

### 16. Force Majeure (1 term)
- Company shall not be liable for delays due to events beyond control

### 17. Cancellation Policy (2 terms)
- Order once confirmed cannot be cancelled
- Advance paid is non-refundable once manufacturing has commenced

### 18. Taxation (1 term)
- GST and any other applicable taxes shall be charged extra

### 19. Dispute Resolution (1 term)
- All disputes shall be subject to Lucknow jurisdiction only

### 20. Acceptance of Terms (1 term)
- Placement of Purchase Order or payment of advance shall be deemed as acceptance

## Total: 20 Categories, 40 Terms

## Component Structure

### TermsSelector Component
- **Location**: `components/quotation/TermsSelector.tsx`
- **Features**:
  - Collapsible categories
  - Checkbox selection
  - Select All/Deselect All per category
  - Custom terms textarea
  - Selected count display

### Data Structure
- **Location**: `lib/data/termsAndConditions.ts`
- **Structure**: Array of categories, each containing terms
- **Helper Functions**:
  - `getTermText(termId)` - Get term text by ID
  - `formatTermsAsText(selectedTermIds)` - Format selected terms as text

## Data Storage

Terms are stored as:
- **Array of Term IDs**: `["payment-1", "prices-2", ...]`
- **Custom Terms**: Optional string for additional terms
- **In Template**: `termsAndConditions: string[]` and `customTerms?: string`

## Usage in Template Form

The TermsSelector is integrated into the TemplateForm component:
- Replaces the old textarea for terms
- Allows multi-select from standard terms
- Option to add custom terms
- Selected terms are saved as array of IDs

## Display Format

When displaying terms (for PDF/quotation):
1. Selected standard terms are formatted with bullet points
2. Custom terms are appended after standard terms
3. Format: `formatTermsAsText(selectedTermIds) + customTerms`

## Benefits

1. **User-Friendly**: No need to type standard terms manually
2. **Consistency**: Standard terms ensure consistency across quotations
3. **Flexibility**: Can add custom terms when needed
4. **Time-Saving**: Quick selection vs. manual typing
5. **Error Reduction**: Pre-written terms reduce typos
