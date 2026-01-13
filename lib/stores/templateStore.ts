"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { QuotationTemplate, TemplateFormData } from "@/types/quotation";

interface TemplateStore {
  templates: QuotationTemplate[];
  currentTemplate: QuotationTemplate | null;
  
  // Actions
  createTemplate: (formData: TemplateFormData) => string;
  updateTemplate: (id: string, formData: Partial<TemplateFormData>) => void;
  deleteTemplate: (id: string) => void;
  getTemplate: (id: string) => QuotationTemplate | undefined;
  duplicateTemplate: (id: string) => string;
  setCurrentTemplate: (template: QuotationTemplate | null) => void;
}

// Helper function to generate unique ID
const generateId = () => {
  return `tpl-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Helper function to convert form data to template
const formDataToTemplate = (
  formData: TemplateFormData,
  id?: string
): QuotationTemplate => {
  const templateId = id || generateId();
  const now = new Date();
  
  return {
    id: templateId,
    name: formData.templateName,
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
    
    notes: {
      top: formData.topNote,
      middle: formData.middleNote,
      bottom: formData.bottomNote,
    },
    
    items: formData.items || [],
    
    termsAndConditions: formData.selectedTerms,
    termsConfig: formData.termsConfig || undefined,
    customTerms: Object.keys(formData.customTerms || {}).length > 0 ? formData.customTerms : undefined,
    bankDetails: formData.bankDetails,
    headerTemplateId: formData.headerTemplateId || "header-2", // Modern header by default
    footerTemplateId: formData.footerTemplateId || "footer-1",
  };
};

export const useTemplateStore = create<TemplateStore>()(
  persist(
    (set, get) => ({
      templates: [],
      currentTemplate: null,
      
      createTemplate: (formData) => {
        const template = formDataToTemplate(formData);
        set((state) => ({
          templates: [template, ...state.templates],
          currentTemplate: template,
        }));
        return template.id;
      },
      
      updateTemplate: (id, formData) => {
        set((state) => {
          const template = state.templates.find((t) => t.id === id);
          if (!template) return state;
          
          const updatedTemplate: QuotationTemplate = {
            ...template,
            ...formDataToTemplate(
              {
                templateName: formData.templateName || template.name,
                companyName: formData.companyName || template.company.name,
                companyAddress: formData.companyAddress || template.company.address,
                companyGSTIN: formData.companyGSTIN || template.company.gstin,
                companyMobile: formData.companyMobile || template.company.mobile,
                companyEmail: formData.companyEmail || template.company.email,
                companyLogo: formData.companyLogo ?? template.company.logo,
                topNote: formData.topNote ?? template.notes.top,
                middleNote: formData.middleNote ?? template.notes.middle,
                bottomNote: formData.bottomNote ?? template.notes.bottom,
                items: formData.items ?? template.items ?? [],
                selectedTerms: formData.selectedTerms ?? template.termsAndConditions,
                termsConfig: formData.termsConfig ?? template.termsConfig ?? {},
                customTerms: formData.customTerms ?? template.customTerms ?? {},
                bankDetails: formData.bankDetails ?? template.bankDetails,
                headerTemplateId: formData.headerTemplateId ?? template.headerTemplateId ?? "header-2",
                footerTemplateId: formData.footerTemplateId ?? template.footerTemplateId ?? "footer-1",
              },
              id
            ),
            updatedAt: new Date(),
          };
          
          return {
            templates: state.templates.map((t) =>
              t.id === id ? updatedTemplate : t
            ),
            currentTemplate:
              state.currentTemplate?.id === id
                ? updatedTemplate
                : state.currentTemplate,
          };
        });
      },
      
      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
          currentTemplate:
            state.currentTemplate?.id === id
              ? null
              : state.currentTemplate,
        }));
      },
      
      getTemplate: (id) => {
        const template = get().templates.find((t) => t.id === id);
        if (!template) return undefined;
        
        // Migrate bankDetails from string to BankDetails object if needed
        let bankDetails = template.bankDetails;
        if (typeof bankDetails === "string") {
          bankDetails = {
            bankName: "",
            branch: "",
            accountNumber: "",
            accountHolderName: "",
            ifscCode: "",
            accountType: "",
            upiId: "",
            otherDetails: bankDetails, // Preserve old text in otherDetails
          };
        }
        
        // Ensure dates are Date objects (in case they were deserialized as strings)
        return {
          ...template,
          bankDetails,
          createdAt: template.createdAt instanceof Date 
            ? template.createdAt 
            : new Date(template.createdAt),
          updatedAt: template.updatedAt instanceof Date 
            ? template.updatedAt 
            : new Date(template.updatedAt),
        };
      },
      
      duplicateTemplate: (id) => {
        const template = get().templates.find((t) => t.id === id);
        if (!template) return "";
        
        const duplicated = formDataToTemplate({
          templateName: `${template.name} (Copy)`,
          companyName: template.company.name,
          companyAddress: template.company.address,
          companyGSTIN: template.company.gstin,
          companyMobile: template.company.mobile,
          companyEmail: template.company.email,
          companyLogo: template.company.logo,
          topNote: template.notes.top,
          middleNote: template.notes.middle,
          bottomNote: template.notes.bottom,
          items: template.items || [],
          selectedTerms: template.termsAndConditions,
          termsConfig: template.termsConfig || {},
          customTerms: template.customTerms || {},
          bankDetails: template.bankDetails,
          headerTemplateId: template.headerTemplateId || "header-2",
          footerTemplateId: template.footerTemplateId || "footer-1",
        });
        
        set((state) => ({
          templates: [duplicated, ...state.templates],
          currentTemplate: duplicated,
        }));
        
        return duplicated.id;
      },
      
      setCurrentTemplate: (template) => {
        set({ currentTemplate: template });
      },
    }),
    {
      name: "template-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist templates
      partialize: (state) => ({
        templates: state.templates,
      }),
      // Handle Date serialization/deserialization
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert date strings back to Date objects after rehydration
          state.templates = state.templates.map((t) => ({
            ...t,
            createdAt: new Date(t.createdAt),
            updatedAt: new Date(t.updatedAt),
          }));
        }
      },
    }
  )
);
