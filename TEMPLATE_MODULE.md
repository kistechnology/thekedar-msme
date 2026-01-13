# Quotation Template Module - Implementation Guide

## Overview

This module allows users to **create and manage quotation templates**. These templates contain:
- Company details (name, address, GSTIN, mobile, email)
- Notes (top, middle, bottom)
- Terms & Conditions
- Bank Details

Later, when creating an actual quotation, users will:
1. Select a template
2. Add customer details
3. Add items
4. Generate the quotation

## Data Storage Approach

**Zustand with localStorage persistence** - Same approach as before, but now storing templates instead of quotations.

### Storage Details:
- **Storage Key**: `template-storage`
- **Location**: Browser localStorage
- **Format**: JSON (automatically serialized/deserialized)
- **Size Limit**: ~5-10MB per domain

## File Structure

```
types/
  └── quotation.ts              # TypeScript types (QuotationTemplate, TemplateFormData)

lib/stores/
  └── templateStore.ts          # Zustand store for templates

components/quotation/
  └── TemplateForm.tsx          # Form component for template creation/editing

app/templates/
  ├── page.tsx                  # Templates list page
  ├── create/
  │   └── page.tsx              # Create new template page
  └── edit/
      └── [id]/
          └── page.tsx          # Edit template page
```

## Data Model

### QuotationTemplate Structure:
```typescript
{
  id: string                    // Unique identifier (e.g., "tpl-1234567890-abc123")
  name: string                  // Template name (e.g., "Standard Template")
  createdAt: Date              // Creation timestamp
  updatedAt: Date              // Last update timestamp
  
  company: {                    // Company/Hero Section
    logo: string | null
    name: string
    address: string
    gstin: string
    mobile: string
    email: string
  }
  
  notes: {                      // Optional notes
    top: string
    middle: string
    bottom: string
  }
  
  termsAndConditions: string
  bankDetails: string
}
```

## Store Methods

### Available Actions:
- `createTemplate(formData)` - Create new template, returns ID
- `updateTemplate(id, formData)` - Update existing template
- `deleteTemplate(id)` - Delete template
- `getTemplate(id)` - Get template by ID
- `duplicateTemplate(id)` - Duplicate template, returns new ID
- `setCurrentTemplate(template)` - Set current template

### Usage Example:
```tsx
import { useTemplateStore } from "@/lib/stores/templateStore";

function MyComponent() {
  const { templates, createTemplate } = useTemplateStore();
  
  const handleCreate = () => {
    const id = createTemplate({
      templateName: "My Template",
      companyName: "My Company",
      // ... other fields
    });
    console.log("Created template:", id);
  };
}
```

## Form Fields

### Template Information:
- **Template Name** (Required) - Name to identify the template

### Company Details (Required):
- Company Name
- Company Address
- GSTIN
- Mobile Number
- Email

### Notes (Optional):
- Top Note - Appears before items table
- Middle Note - Appears between items and summary
- Bottom Note - Appears after summary

### Terms & Bank:
- Terms & Conditions
- Bank Details

## Features Implemented

✅ **Template Management**: Create, edit, delete, duplicate templates
✅ **Form Validation**: Required fields validated
✅ **Notifications**: Success/error messages
✅ **Navigation**: Proper routing and breadcrumbs
✅ **Responsive Design**: Mobile-friendly forms
✅ **List View**: View all templates with actions
✅ **Edit Mode**: Can update existing templates
✅ **Duplicate**: Clone templates easily

## Navigation

- **Dashboard** (`/`) - Overview with template count
- **Templates** (`/templates`) - List all templates
- **Create Template** (`/templates/create`) - Create new template
- **Edit Template** (`/templates/edit/[id]`) - Edit existing template

## Next Steps

1. **Create Quotation from Template**: 
   - Select template
   - Add customer details
   - Add items
   - Generate quotation

2. **Items Table**: 
   - Editable table for quotation items
   - Auto-calculations

3. **PDF Export**: 
   - Generate PDF from quotation

4. **WhatsApp Share**: 
   - Share quotation via WhatsApp

## Testing

To test the implementation:

1. Navigate to `/templates/create`
2. Fill in template name and company details
3. Add optional notes, terms, and bank details
4. Submit the form
5. Check browser localStorage for `template-storage` key
6. Verify data persists after page refresh
7. Test edit functionality at `/templates/edit/[id]`
8. Test duplicate and delete from templates list

## Data Persistence

- Data is automatically saved to localStorage on every create/update
- Data persists across browser sessions
- Data is specific to the browser/domain
- To clear data: Clear browser localStorage or use browser dev tools

## Difference from Previous Implementation

**Before**: Creating quotations directly with customer details
**Now**: Creating reusable templates first, then quotations will be created from templates

This separation allows:
- Multiple templates for different use cases
- Reusable company information
- Faster quotation creation (select template → add customer → done)
