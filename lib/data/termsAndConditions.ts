// Standard Terms & Conditions for Quotation Templates

export interface TermCategory {
  id: string;
  name: string;
  terms: Term[];
}

export interface Term {
  id: string;
  text: string;
  category: string;
  configurable?: boolean; // Whether this term has configurable values
  variables?: TermVariable[]; // Variables that can be customized
}

export interface TermVariable {
  key: string; // Variable key (e.g., "advance_percentage")
  placeholder: string; // Placeholder in text (e.g., "{advance_percentage}")
  label: string; // Label for input (e.g., "Advance Percentage")
  type: "percentage" | "number" | "days" | "floor" | "text";
  defaultValue: string | number; // Default value
  unit?: string; // Unit to display (e.g., "%", "days", "floor")
}

export const termsAndConditionsData: TermCategory[] = [
  {
    id: "payment",
    name: "Payment Terms",
    terms: [
      {
        id: "payment-1",
        text: "{advance_percentage}% advance along with order confirmation",
        category: "payment",
        configurable: true,
        variables: [
          {
            key: "advance_percentage",
            placeholder: "{advance_percentage}",
            label: "Advance Percentage",
            type: "percentage",
            defaultValue: 50,
            unit: "%",
          },
        ],
      },
      {
        id: "payment-2",
        text: "{second_payment_percentage}% payment after {payment_days} days of glass order",
        category: "payment",
        configurable: true,
        variables: [
          {
            key: "second_payment_percentage",
            placeholder: "{second_payment_percentage}",
            label: "Second Payment Percentage",
            type: "percentage",
            defaultValue: 30,
            unit: "%",
          },
          {
            key: "payment_days",
            placeholder: "{payment_days}",
            label: "Payment Days",
            type: "days",
            defaultValue: 10,
            unit: "days",
          },
        ],
      },
      {
        id: "payment-3",
        text: "Balance {balance_percentage}% payable before dispatch of material",
        category: "payment",
        configurable: true,
        variables: [
          {
            key: "balance_percentage",
            placeholder: "{balance_percentage}",
            label: "Balance Percentage",
            type: "percentage",
            defaultValue: 20,
            unit: "%",
          },
        ],
      },
      {
        id: "payment-4",
        text: "No material will be dispatched without full and final payment",
        category: "payment",
      },
    ],
  },
  {
    id: "prices",
    name: "Prices & Validity",
    terms: [
      {
        id: "prices-1",
        text: "Prices are based on sizes and specifications provided by the customer",
        category: "prices",
      },
      {
        id: "prices-2",
        text: "Prices are valid for size variations up to ±{size_variation} mm per window, provided design and style remain unchanged",
        category: "prices",
        configurable: true,
        variables: [
          {
            key: "size_variation",
            placeholder: "{size_variation}",
            label: "Size Variation",
            type: "number",
            defaultValue: 50,
            unit: "mm",
          },
        ],
      },
      {
        id: "prices-3",
        text: "Any change beyond this will attract revised pricing",
        category: "prices",
      },
    ],
  },
  {
    id: "delivery",
    name: "Delivery Timeline",
    terms: [
      {
        id: "delivery-1",
        text: "Delivery period shall be {delivery_days} days from the date of Purchase Order (PO)",
        category: "delivery",
        configurable: true,
        variables: [
          {
            key: "delivery_days",
            placeholder: "{delivery_days}",
            label: "Delivery Days",
            type: "days",
            defaultValue: 60,
            unit: "days",
          },
        ],
      },
      {
        id: "delivery-2",
        text: "Delivery timelines may vary due to force majeure or client-side delays",
        category: "delivery",
      },
    ],
  },
  {
    id: "scope",
    name: "Scope of Supply",
    terms: [
      {
        id: "scope-1",
        text: "Supply is limited strictly to items mentioned in the quotation",
        category: "scope",
      },
      {
        id: "scope-2",
        text: "Any additional work or material shall be charged extra",
        category: "scope",
      },
    ],
  },
  {
    id: "site",
    name: "Site Readiness",
    terms: [
      {
        id: "site-1",
        text: "Customer shall ensure the site is fully ready for installation",
        category: "site",
      },
      {
        id: "site-2",
        text: "Installation should be done after completion of civil construction and during fit-out stage",
        category: "site",
      },
    ],
  },
  {
    id: "client",
    name: "Client Responsibilities",
    terms: [
      {
        id: "client-1",
        text: "Scaffolding, electricity, and water shall be provided by the client free of cost",
        category: "client",
      },
      {
        id: "client-2",
        text: "Any delay due to non-availability of these shall not be our responsibility",
        category: "client",
      },
    ],
  },
  {
    id: "installation",
    name: "Installation Conditions",
    terms: [
      {
        id: "installation-1",
        text: "To achieve best results and quality installation, aluminium windows and doors must be fitted in dust-free conditions",
        category: "installation",
      },
      {
        id: "installation-2",
        text: "Installation during ongoing construction may affect finish and alignment",
        category: "installation",
      },
    ],
  },
  {
    id: "handling",
    name: "Handling & Storage",
    terms: [
      {
        id: "handling-1",
        text: "Material should be stored safely at site after delivery",
        category: "handling",
      },
      {
        id: "handling-2",
        text: "Any damage after delivery due to mishandling or improper storage will be chargeable",
        category: "handling",
      },
    ],
  },
  {
    id: "cleaning",
    name: "Cleaning & Protection",
    terms: [
      {
        id: "cleaning-1",
        text: "Windows will be dispatched in neat, clean, and proper packaging",
        category: "cleaning",
      },
      {
        id: "cleaning-2",
        text: "Cleaning of cement, POP, paint, or construction residue is not included",
        category: "cleaning",
      },
      {
        id: "cleaning-3",
        text: "Protection tape removal will be done as required",
        category: "cleaning",
      },
    ],
  },
  {
    id: "glass",
    name: "Glass & Modifications",
    terms: [
      {
        id: "glass-1",
        text: "Glass cutting for exhaust fan or any post-manufacturing modification will be charged as per actuals",
        category: "glass",
      },
      {
        id: "glass-2",
        text: "Any on-site alteration may impact warranty",
        category: "glass",
      },
    ],
  },
  {
    id: "finishes",
    name: "Special Finishes",
    terms: [
      {
        id: "finishes-1",
        text: "Extra charges shall apply for special color coating, textures, or finishes",
        category: "finishes",
      },
      {
        id: "finishes-2",
        text: "Color shade variations may occur due to batch processing",
        category: "finishes",
      },
    ],
  },
  {
    id: "transport",
    name: "Transportation & Lifting",
    terms: [
      {
        id: "transport-1",
        text: "Lead and lift charges are included up to {included_floor} floor only",
        category: "transport",
        configurable: true,
        variables: [
          {
            key: "included_floor",
            placeholder: "{included_floor}",
            label: "Included Floor",
            type: "floor",
            defaultValue: 4,
            unit: "floor",
          },
        ],
      },
      {
        id: "transport-2",
        text: "Above 4th floor, charges shall be applicable as per actuals",
        category: "transport",
      },
    ],
  },
  {
    id: "inspection",
    name: "Inspection & Handover",
    terms: [
      {
        id: "inspection-1",
        text: "Installed windows shall be handed over on a daily basis",
        category: "inspection",
      },
      {
        id: "inspection-2",
        text: "Any issues must be reported immediately during handover",
        category: "inspection",
      },
    ],
  },
  {
    id: "delay",
    name: "Delay Due to Client",
    terms: [
      {
        id: "delay-1",
        text: "Any delay caused due to site unavailability, design changes, or payment delays shall lead to extension of delivery/installation timelines",
        category: "delay",
      },
    ],
  },
  {
    id: "warranty",
    name: "Warranty",
    terms: [
      {
        id: "warranty-1",
        text: "Warranty shall be applicable only on manufacturing defects",
        category: "warranty",
      },
      {
        id: "warranty-2",
        text: "Damage due to misuse, mishandling, or external impact is excluded",
        category: "warranty",
      },
    ],
  },
  {
    id: "force",
    name: "Force Majeure",
    terms: [
      {
        id: "force-1",
        text: "The company shall not be liable for delays due to events beyond control such as strikes, natural calamities, government restrictions, or supply chain disruptions",
        category: "force",
      },
    ],
  },
  {
    id: "cancellation",
    name: "Cancellation Policy",
    terms: [
      {
        id: "cancellation-1",
        text: "Order once confirmed cannot be cancelled",
        category: "cancellation",
      },
      {
        id: "cancellation-2",
        text: "Advance paid is non-refundable once manufacturing has commenced",
        category: "cancellation",
      },
    ],
  },
  {
    id: "taxation",
    name: "Taxation",
    terms: [
      {
        id: "taxation-1",
        text: "GST and any other applicable taxes shall be charged extra as per prevailing government norms",
        category: "taxation",
      },
    ],
  },
  {
    id: "dispute",
    name: "Dispute Resolution",
    terms: [
      {
        id: "dispute-1",
        text: "All disputes shall be subject to {jurisdiction} jurisdiction only",
        category: "dispute",
        configurable: true,
        variables: [
          {
            key: "jurisdiction",
            placeholder: "{jurisdiction}",
            label: "Jurisdiction",
            type: "text",
            defaultValue: "Lucknow",
            unit: "",
          },
        ],
      },
    ],
  },
  {
    id: "acceptance",
    name: "Acceptance of Terms",
    terms: [
      {
        id: "acceptance-1",
        text: "Placement of Purchase Order or payment of advance shall be deemed as acceptance of all terms and conditions mentioned herein",
        category: "acceptance",
      },
    ],
  },
];

// Flatten all terms for easy access
export const allTerms: Term[] = termsAndConditionsData.flatMap(
  (category) => category.terms
);

// Default pre-selected terms (commonly used terms)
export const defaultSelectedTerms: string[] = [
  "payment-1", // Advance percentage
  "payment-4", // No dispatch without full payment
  "prices-1", // Prices based on sizes and specifications
  "delivery-1", // Delivery period
  "scope-1", // Supply limited to items mentioned
  "taxation-1", // GST and taxes
  "warranty-1", // Warranty on manufacturing defects
  "acceptance-1", // Acceptance of terms
];

// Helper function to get term text by ID
export const getTermText = (termId: string): string => {
  const term = allTerms.find((t) => t.id === termId);
  return term?.text || "";
};

// Helper function to format term text with configured values
export const formatTermWithValues = (
  term: Term,
  configuredValues?: Record<string, string | number>
): string => {
  let text = term.text;
  
  if (term.configurable && term.variables) {
    term.variables.forEach((variable) => {
      const value = configuredValues?.[variable.key] ?? variable.defaultValue;
      
      // Handle special cases for floor (4th, 5th, etc.)
      if (variable.type === "floor") {
        const num = Number(value);
        const suffix = num === 1 ? "st" : num === 2 ? "nd" : num === 3 ? "rd" : "th";
        text = text.replace(variable.placeholder, `${num}${suffix}`);
      } else if (variable.type === "percentage") {
        // For percentage, show with % sign
        text = text.replace(variable.placeholder, `${value}%`);
      } else if (variable.unit) {
        // For other types with units
        text = text.replace(variable.placeholder, `${value} ${variable.unit}`);
      } else {
        // For text or no unit
        text = text.replace(variable.placeholder, String(value));
      }
    });
  }
  
  return text;
};

// Helper function to format selected terms as text with configured values
export const formatTermsAsText = (
  selectedTermIds: string[],
  configuredValues?: Record<string, Record<string, string | number>>
): string => {
  return selectedTermIds
    .map((id) => {
      const term = allTerms.find((t) => t.id === id);
      if (!term) return "";
      
      const values = configuredValues?.[id];
      const formattedText = formatTermWithValues(term, values);
      return `• ${formattedText}`;
    })
    .filter(Boolean)
    .join("\n");
};
