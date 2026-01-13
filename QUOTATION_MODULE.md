# Quotation Module - Implementation Guide

## Data Storage Approach

We're using **Zustand with localStorage persistence** for storing quotation data locally. This approach provides:

### ✅ Advantages:
1. **Simple & Lightweight**: No backend needed, works offline
2. **Automatic Persistence**: Data saved automatically to browser localStorage
3. **Type-Safe**: Full TypeScript support
4. **Reactive**: Components automatically update when data changes
5. **Persistent Across Sessions**: Data survives page refreshes

### Storage Details:
- **Storage Key**: `quotation-storage`
- **Location**: Browser localStorage
- **Format**: JSON (automatically serialized/deserialized)
- **Size Limit**: ~5-10MB per domain (sufficient for many quotations)

## File Structure

```
types/
  └── quotation.ts              # TypeScript types for Quotation data model

lib/stores/
  └── quotationStore.ts         # Zustand store with localStorage persistence

components/quotation/
  └── ClientDetailsForm.tsx     # Form component for company & customer details

app/quotations/
  ├── page.tsx                  # Quotations list page
  ├── create/
  │   └── page.tsx              # Create new quotation page
  └── edit/
      └── [id]/
          └── page.tsx          # Edit quotation page
```

## Data Model

### Quotation Structure:
```typescript
{
  id: string                    // Unique identifier
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
  
  customerName: string          // Required
  customerAddress?: string
  customerMobile?: string
  customerEmail?: string
  customerGSTIN?: string
  date: Date
  
  notes: {                      // Optional notes
    top: string
    middle: string
    bottom: string
  }
  
  items: QuotationItem[]        // Will be added in next phase
  summary: QuotationSummary     // Auto-calculated
  
  termsAndConditions: string
  bankDetails: string
}
```

## Store Methods

### Available Actions:
- `createQuotation(formData)` - Create new quotation, returns ID
- `updateQuotation(id, formData)` - Update existing quotation
- `deleteQuotation(id)` - Delete quotation
- `getQuotation(id)` - Get quotation by ID
- `duplicateQuotation(id)` - Duplicate quotation, returns new ID
- `updateCompanySettings(settings)` - Update shared company settings

### Usage Example:
```tsx
import { useQuotationStore } from "@/lib/stores/quotationStore";

function MyComponent() {
  const { quotations, createQuotation } = useQuotationStore();
  
  const handleCreate = () => {
    const id = createQuotation({
      companyName: "My Company",
      customerName: "Customer Name",
      // ... other fields
    });
    console.log("Created quotation:", id);
  };
}
```

## Form Fields

### Company Details (Required):
- Company Name
- Company Address
- GSTIN
- Mobile Number
- Email

### Customer Details:
- Customer/Firm Name (Required)
- Customer Address (Optional)
- Mobile Number (Optional)
- Email (Optional)
- Customer GSTIN (Optional)
- Quotation Date (Required)

### Notes (Optional):
- Top Note
- Middle Note
- Bottom Note

### Terms & Bank:
- Terms & Conditions
- Bank Details

## Features Implemented

✅ **Form Validation**: Required fields validated
✅ **Auto-save Company Settings**: Company details saved for future use
✅ **Edit Mode**: Can edit existing quotations
✅ **List View**: View all quotations
✅ **Navigation**: Proper routing and breadcrumbs
✅ **Notifications**: Success/error notifications
✅ **Responsive Design**: Mobile-friendly forms

## Next Steps

1. **Add Items Table**: Editable table for quotation items
2. **Auto-calculations**: Area, totals, GST calculations
3. **PDF Export**: Generate PDF from quotation
4. **WhatsApp Share**: Share quotation via WhatsApp
5. **Image Upload**: Company logo and window drawings

## Testing

To test the implementation:

1. Navigate to `/quotations/create`
2. Fill in company and customer details
3. Submit the form
4. Check browser localStorage for `quotation-storage` key
5. Verify data persists after page refresh
6. Test edit functionality at `/quotations/edit/[id]`

## Data Persistence

- Data is automatically saved to localStorage on every create/update
- Data persists across browser sessions
- Data is specific to the browser/domain
- To clear data: Clear browser localStorage or use browser dev tools
