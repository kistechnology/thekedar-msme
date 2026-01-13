"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Quotation, QuotationFormData } from "@/types/quotation";

interface QuotationStore {
  quotations: Quotation[];
  currentQuotation: Quotation | null;
  
  // Actions
  createQuotation: (formData: QuotationFormData) => string;
  updateQuotation: (id: string, formData: Partial<QuotationFormData>) => void;
  deleteQuotation: (id: string) => void;
  getQuotation: (id: string) => Quotation | undefined;
  duplicateQuotation: (id: string) => string;
  setCurrentQuotation: (quotation: Quotation | null) => void;
  
  // Company settings (shared across all quotations)
  companySettings: {
    name: string;
    address: string;
    gstin: string;
    mobile: string;
    email: string;
    logo: string | null;
  };
  updateCompanySettings: (settings: Partial<QuotationStore["companySettings"]>) => void;
}

// Helper function to generate unique ID
const generateId = () => {
  return `qt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Helper function to convert form data to quotation
const formDataToQuotation = (
  formData: QuotationFormData,
  id?: string
): Quotation => {
  const quotationId = id || generateId();
  const now = new Date();
  
  return {
    id: quotationId,
    createdAt: now,
    updatedAt: now,
    
    company: {
      logo: formData.companyLogo,
      name: formData.companyName,
      address: formData.companyAddress,
      gstin: formData.companyGSTIN,
      mobile: formData.companyMobile,
      email: formData.companyEmail,
    },
    
    customerName: formData.customerName,
    customerAddress: formData.customerAddress,
    customerMobile: formData.customerMobile,
    customerEmail: formData.customerEmail,
    customerGSTIN: formData.customerGSTIN,
    date: formData.date,
    
    notes: {
      top: formData.topNote,
      middle: formData.middleNote,
      bottom: formData.bottomNote,
    },
    
    items: [], // Will be added later
    
    summary: {
      subtotal: 0,
      tax: 0,
      discount: 0,
      grandTotal: 0,
    },
    
    termsAndConditions: formData.termsAndConditions,
    bankDetails: formData.bankDetails,
  };
};

export const useQuotationStore = create<QuotationStore>()(
  persist(
    (set, get) => ({
      quotations: [],
      currentQuotation: null,
      
      companySettings: {
        name: "",
        address: "",
        gstin: "",
        mobile: "",
        email: "",
        logo: null,
      },
      
      createQuotation: (formData) => {
        const quotation = formDataToQuotation(formData);
        set((state) => ({
          quotations: [quotation, ...state.quotations],
          currentQuotation: quotation,
        }));
        return quotation.id;
      },
      
      updateQuotation: (id, formData) => {
        set((state) => {
          const quotation = state.quotations.find((q) => q.id === id);
          if (!quotation) return state;
          
          const updatedQuotation: Quotation = {
            ...quotation,
            ...formDataToQuotation(
              {
                companyName: formData.companyName || quotation.company.name,
                companyAddress: formData.companyAddress || quotation.company.address,
                companyGSTIN: formData.companyGSTIN || quotation.company.gstin,
                companyMobile: formData.companyMobile || quotation.company.mobile,
                companyEmail: formData.companyEmail || quotation.company.email,
                companyLogo: formData.companyLogo ?? quotation.company.logo,
                customerName: formData.customerName || quotation.customerName,
                customerAddress: formData.customerAddress || quotation.customerAddress || "",
                customerMobile: formData.customerMobile || quotation.customerMobile || "",
                customerEmail: formData.customerEmail || quotation.customerEmail || "",
                customerGSTIN: formData.customerGSTIN || quotation.customerGSTIN || "",
                date: formData.date || quotation.date,
                topNote: formData.topNote ?? quotation.notes.top,
                middleNote: formData.middleNote ?? quotation.notes.middle,
                bottomNote: formData.bottomNote ?? quotation.notes.bottom,
                termsAndConditions: formData.termsAndConditions ?? quotation.termsAndConditions,
                bankDetails: formData.bankDetails ?? quotation.bankDetails,
              },
              id
            ),
            updatedAt: new Date(),
          };
          
          return {
            quotations: state.quotations.map((q) =>
              q.id === id ? updatedQuotation : q
            ),
            currentQuotation:
              state.currentQuotation?.id === id
                ? updatedQuotation
                : state.currentQuotation,
          };
        });
      },
      
      deleteQuotation: (id) => {
        set((state) => ({
          quotations: state.quotations.filter((q) => q.id !== id),
          currentQuotation:
            state.currentQuotation?.id === id
              ? null
              : state.currentQuotation,
        }));
      },
      
      getQuotation: (id) => {
        const quotation = get().quotations.find((q) => q.id === id);
        if (!quotation) return undefined;
        
        // Ensure dates are Date objects (in case they were deserialized as strings)
        return {
          ...quotation,
          createdAt: quotation.createdAt instanceof Date 
            ? quotation.createdAt 
            : new Date(quotation.createdAt),
          updatedAt: quotation.updatedAt instanceof Date 
            ? quotation.updatedAt 
            : new Date(quotation.updatedAt),
          date: quotation.date instanceof Date 
            ? quotation.date 
            : new Date(quotation.date),
        };
      },
      
      duplicateQuotation: (id) => {
        const quotation = get().quotations.find((q) => q.id === id);
        if (!quotation) return "";
        
        const duplicated = formDataToQuotation({
          companyName: quotation.company.name,
          companyAddress: quotation.company.address,
          companyGSTIN: quotation.company.gstin,
          companyMobile: quotation.company.mobile,
          companyEmail: quotation.company.email,
          companyLogo: quotation.company.logo,
          customerName: quotation.customerName,
          customerAddress: quotation.customerAddress || "",
          customerMobile: quotation.customerMobile || "",
          customerEmail: quotation.customerEmail || "",
          customerGSTIN: quotation.customerGSTIN || "",
          date: new Date(),
          topNote: quotation.notes.top,
          middleNote: quotation.notes.middle,
          bottomNote: quotation.notes.bottom,
          termsAndConditions: quotation.termsAndConditions,
          bankDetails: quotation.bankDetails,
        });
        
        set((state) => ({
          quotations: [duplicated, ...state.quotations],
          currentQuotation: duplicated,
        }));
        
        return duplicated.id;
      },
      
      setCurrentQuotation: (quotation) => {
        set({ currentQuotation: quotation });
      },
      
      updateCompanySettings: (settings) => {
        set((state) => ({
          companySettings: {
            ...state.companySettings,
            ...settings,
          },
        }));
      },
    }),
    {
      name: "quotation-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist quotations and company settings
      partialize: (state) => ({
        quotations: state.quotations,
        companySettings: state.companySettings,
      }),
      // Handle Date serialization/deserialization
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert date strings back to Date objects after rehydration
          state.quotations = state.quotations.map((q) => ({
            ...q,
            createdAt: new Date(q.createdAt),
            updatedAt: new Date(q.updatedAt),
            date: new Date(q.date),
          }));
        }
      },
    }
  )
);
