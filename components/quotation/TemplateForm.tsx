"use client";

import { useForm } from "@mantine/form";
import {
  Paper,
  TextInput,
  Textarea,
  Button,
  Group,
  Title,
  Stack,
  FileButton,
  Image,
  Box,
  Text,
  Select,
} from "@mantine/core";
import { Upload, X } from "lucide-react";
import { useTemplateStore } from "@/lib/stores/templateStore";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { Check } from "lucide-react";
import TermsSelector from "./TermsSelector";
import ItemDetailsForm from "./ItemDetailsForm";
import TemplatePreview from "./TemplatePreview";
import { formatTermsAsText, defaultSelectedTerms, allTerms } from "@/lib/data/termsAndConditions";
import { headerTemplates, footerTemplates } from "@/lib/data/headerFooterTemplates";
import {
  autoCorrectCompanyName,
  autoCorrectEmail,
  autoCorrectAddress,
  autoCorrectGSTIN,
  autoCorrectMobile,
  autoCorrectText,
} from "@/lib/utils/autoCorrect";

interface TemplateFormProps {
  templateId?: string; // If provided, we're editing
  onSuccess?: () => void;
}

// Helper function to initialize default config values for pre-selected configurable terms
function getDefaultTermsConfig(): Record<string, Record<string, string | number>> {
  const config: Record<string, Record<string, string | number>> = {};
  
  defaultSelectedTerms.forEach((termId) => {
    const term = allTerms.find((t) => t.id === termId);
    if (term?.configurable && term.variables) {
      const termConfig: Record<string, string | number> = {};
      term.variables.forEach((variable) => {
        termConfig[variable.key] = variable.defaultValue;
      });
      config[termId] = termConfig;
    }
  });
  
  return config;
}

export default function TemplateForm({
  templateId,
  onSuccess,
}: TemplateFormProps) {
  const router = useRouter();
  const { createTemplate, updateTemplate, getTemplate } = useTemplateStore();

  // If editing, load existing template data
  const existingTemplate = templateId ? getTemplate(templateId) : null;

  const form = useForm({
    initialValues: {
      // Template Name
      templateName: existingTemplate?.name || "",

      // Company Details
      companyLogo: existingTemplate?.company.logo || null,
      companyName: existingTemplate?.company.name || "",
      companyAddress: existingTemplate?.company.address || "",
      companyGSTIN: existingTemplate?.company.gstin || "",
      companyMobile: existingTemplate?.company.mobile || "",
      companyEmail: existingTemplate?.company.email || "",

      // Notes
      topNote: existingTemplate?.notes.top || "",
      middleNote: existingTemplate?.notes.middle || "",
      bottomNote: existingTemplate?.notes.bottom || "",

      // Items
      items: existingTemplate?.items || [],

      // Terms & Bank
      selectedTerms: existingTemplate?.termsAndConditions || (templateId ? [] : defaultSelectedTerms),
      termsConfig: existingTemplate?.termsConfig || (templateId ? {} : getDefaultTermsConfig()),
      customTerms: existingTemplate?.customTerms || {},
      bankDetails: existingTemplate?.bankDetails || {
        bankName: "",
        branch: "",
        accountNumber: "",
        accountHolderName: "",
        ifscCode: "",
        accountType: "",
        upiId: "",
        otherDetails: "",
      },
      
      // Template Design Options
      headerTemplateId: existingTemplate?.headerTemplateId || "header-2", // Modern header by default
      footerTemplateId: existingTemplate?.footerTemplateId || "footer-1",
    },
    validate: {
      templateName: (value) =>
        value.trim().length === 0 ? "Template name is required" : null,
      companyName: (value) =>
        value.trim().length === 0 ? "Company name is required" : null,
      companyAddress: (value) =>
        value.trim().length === 0 ? "Company address is required" : null,
      companyGSTIN: (value) =>
        value.trim().length === 0 ? "GSTIN is required" : null,
      companyMobile: (value) =>
        value.trim().length === 0 ? "Mobile number is required" : null,
      companyEmail: (value) =>
        value.trim().length === 0 ? "Email is required" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    try {
      if (templateId) {
        // Update existing template
        updateTemplate(templateId, values);
        showNotification({
          title: "Success",
          message: "Template updated successfully!",
          color: "green",
          icon: <Check size={16} />,
        });
      } else {
        // Create new template
        const id = createTemplate(values);
        showNotification({
          title: "Success",
          message: "Template created successfully!",
          color: "green",
          icon: <Check size={16} />,
        });
        // Navigate to templates list
        router.push("/templates");
      }
      onSuccess?.();
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to save template. Please try again.",
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg">
        {/* Template Name Section */}
        <Paper p="md" radius="md" withBorder>
          <Title order={3} mb="md" c="blue">
            Template Information
          </Title>
          <TextInput
            label="Template Name"
            placeholder="e.g., Standard Quotation Template"
            description="Give your template a name for easy identification"
            required
            {...form.getInputProps("templateName")}
          />
        </Paper>

        {/* Company Details Section */}
        <Paper p="md" radius="md" withBorder>
          <Title order={3} mb="md" c="blue">
            Company Details
          </Title>
          <Stack gap="md">
            {/* Company Logo */}
            <div>
              <Text size="sm" fw={500} mb="xs">
                Company Logo (Optional)
              </Text>
              <Group gap="md" align="flex-start">
                {form.values.companyLogo ? (
                  <Box
                    style={{
                      position: "relative",
                      border: "1px solid var(--mantine-color-gray-3)",
                      borderRadius: "8px",
                      padding: "8px",
                      backgroundColor: "var(--mantine-color-gray-0)",
                    }}
                  >
                    <Image
                      src={form.values.companyLogo}
                      alt="Company logo"
                      style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        objectFit: "contain",
                      }}
                    />
                    <Button
                      size="xs"
                      variant="subtle"
                      color="red"
                      onClick={() => form.setFieldValue("companyLogo", null)}
                      style={{ position: "absolute", top: 4, right: 4 }}
                      leftSection={<X size={14} />}
                    >
                      Remove
                    </Button>
                  </Box>
                ) : (
                  <FileButton
                    onChange={(file) => {
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64String = reader.result as string;
                        form.setFieldValue("companyLogo", base64String);
                      };
                      reader.readAsDataURL(file);
                    }}
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                  >
                    {(props) => (
                      <Button
                        {...props}
                        leftSection={<Upload size={16} />}
                        variant="light"
                        size="sm"
                      >
                        Upload Logo
                      </Button>
                    )}
                  </FileButton>
                )}
                <div style={{ flex: 1 }}>
                  <Text size="xs" c="dimmed">
                    Upload your company logo (PNG, JPEG, or SVG). Recommended size: 200x200px or larger. Logo will appear in the quotation header.
                  </Text>
                </div>
              </Group>
            </div>

            <TextInput
              label="Company Name"
              placeholder="Enter company name"
              required
              {...form.getInputProps("companyName")}
              onBlur={(e) => {
                const corrected = autoCorrectCompanyName(e.target.value);
                if (corrected !== e.target.value) {
                  form.setFieldValue("companyName", corrected);
                }
              }}
            />
            <Textarea
              label="Company Address"
              placeholder="Enter complete address"
              required
              minRows={2}
              {...form.getInputProps("companyAddress")}
              onBlur={(e) => {
                const corrected = autoCorrectAddress(e.target.value);
                if (corrected !== e.target.value) {
                  form.setFieldValue("companyAddress", corrected);
                }
              }}
            />
            <Group grow>
              <TextInput
                label="GSTIN"
                placeholder="Enter GSTIN"
                required
                {...form.getInputProps("companyGSTIN")}
                onBlur={(e) => {
                  const corrected = autoCorrectGSTIN(e.target.value);
                  if (corrected !== e.target.value) {
                    form.setFieldValue("companyGSTIN", corrected);
                  }
                }}
              />
              <TextInput
                label="Mobile Number"
                placeholder="Enter mobile number"
                required
                {...form.getInputProps("companyMobile")}
                onBlur={(e) => {
                  const corrected = autoCorrectMobile(e.target.value);
                  if (corrected !== e.target.value) {
                    form.setFieldValue("companyMobile", corrected);
                  }
                }}
              />
            </Group>
            <TextInput
              label="Email"
              placeholder="Enter email address"
              type="email"
              required
              {...form.getInputProps("companyEmail")}
              onBlur={(e) => {
                const corrected = autoCorrectEmail(e.target.value);
                if (corrected !== e.target.value) {
                  form.setFieldValue("companyEmail", corrected);
                }
              }}
            />
          </Stack>
        </Paper>

        {/* Notes Section */}
        <Paper p="md" radius="md" withBorder>
          <Title order={3} mb="md" c="blue">
            Notes (Optional)
          </Title>
          <Stack gap="md">
            <Textarea
              label="Top Note"
              placeholder="Note to appear at the top of quotation"
              description="This note will appear before the items table"
              minRows={2}
              {...form.getInputProps("topNote")}
              onBlur={(e) => {
                const corrected = autoCorrectText(e.target.value);
                if (corrected !== e.target.value) {
                  form.setFieldValue("topNote", corrected);
                }
              }}
            />
            <Textarea
              label="Middle Note"
              placeholder="Note to appear in the middle"
              description="This note will appear between items and summary"
              minRows={2}
              {...form.getInputProps("middleNote")}
              onBlur={(e) => {
                const corrected = autoCorrectText(e.target.value);
                if (corrected !== e.target.value) {
                  form.setFieldValue("middleNote", corrected);
                }
              }}
            />
            <Textarea
              label="Bottom Note"
              placeholder="Note to appear at the bottom"
              description="This note will appear after the summary"
              minRows={2}
              {...form.getInputProps("bottomNote")}
              onBlur={(e) => {
                const corrected = autoCorrectText(e.target.value);
                if (corrected !== e.target.value) {
                  form.setFieldValue("bottomNote", corrected);
                }
              }}
            />
          </Stack>
        </Paper>

        {/* Item Details Section */}
        <Paper p="md" radius="md" withBorder>
          <Title order={3} mb="md" c="blue">
            Item Details
          </Title>
          <ItemDetailsForm
            items={form.values.items || []}
            onChange={(items) => form.setFieldValue("items", items)}
          />
        </Paper>

        {/* Terms & Conditions Section */}
        <Paper p="md" radius="md" withBorder>
          <Title order={3} mb="md" c="blue">
            Terms & Conditions
          </Title>
          <TermsSelector
            selectedTerms={form.values.selectedTerms}
            onChange={(terms) => form.setFieldValue("selectedTerms", terms)}
            termsConfig={form.values.termsConfig || {}}
            onConfigChange={(termId, variableKey, value) => {
              const currentConfig = form.values.termsConfig || {};
              form.setFieldValue("termsConfig", {
                ...currentConfig,
                [termId]: {
                  ...(currentConfig[termId] || {}),
                  [variableKey]: value,
                },
              });
            }}
            customTerms={form.values.customTerms || {}}
            onCustomTermsChange={(categoryId, customText) => {
              form.setFieldValue("customTerms", {
                ...(form.values.customTerms || {}),
                [categoryId]: customText,
              });
            }}
          />
        </Paper>

        {/* Bank Details Section */}
        <Paper p="md" radius="md" withBorder>
          <Title order={3} mb="md" c="blue">
            Bank Details
          </Title>
          <Stack gap="md">
            <Group grow>
              <TextInput
                label="Bank Name"
                placeholder="Enter bank name"
                required
                {...form.getInputProps("bankDetails.bankName")}
              />
              <TextInput
                label="Branch"
                placeholder="Enter branch name"
                required
                {...form.getInputProps("bankDetails.branch")}
              />
            </Group>
            <Group grow>
              <TextInput
                label="Account Number"
                placeholder="Enter account number"
                required
                {...form.getInputProps("bankDetails.accountNumber")}
              />
              <TextInput
                label="Account Holder Name"
                placeholder="Enter account holder name"
                required
                {...form.getInputProps("bankDetails.accountHolderName")}
              />
            </Group>
            <Group grow>
              <TextInput
                label="IFSC Code"
                placeholder="Enter IFSC code"
                required
                {...form.getInputProps("bankDetails.ifscCode")}
              />
              <TextInput
                label="Account Type"
                placeholder="e.g., Savings, Current"
                {...form.getInputProps("bankDetails.accountType")}
              />
            </Group>
            <TextInput
              label="UPI ID (Optional)"
              placeholder="Enter UPI ID if available"
              {...form.getInputProps("bankDetails.upiId")}
            />
            <Textarea
              label="Other Details (Optional)"
              placeholder="Any additional bank details"
              minRows={2}
              {...form.getInputProps("bankDetails.otherDetails")}
            />
          </Stack>
        </Paper>

        {/* Template Design Options */}
        <Paper p="md" radius="md" withBorder>
          <Title order={3} mb="md" c="blue">
            Template Design
          </Title>
          <Stack gap="md">
            <Select
              label="Header Template"
              description="Choose how the header will appear in quotations"
              data={headerTemplates.map((t) => ({
                value: t.id,
                label: `${t.name} - ${t.description}`,
              }))}
              value={form.values.headerTemplateId}
              onChange={(value) => form.setFieldValue("headerTemplateId", value || "header-1")}
            />
            <Select
              label="Footer Template"
              description="Choose how the footer will appear in quotations"
              data={footerTemplates.map((t) => ({
                value: t.id,
                label: `${t.name} - ${t.description}`,
              }))}
              value={form.values.footerTemplateId}
              onChange={(value) => form.setFieldValue("footerTemplateId", value || "footer-1")}
            />
          </Stack>
        </Paper>

        {/* Template Preview */}
        <Paper p="md" radius="md" withBorder style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
          <Title order={3} mb="md" c="blue">
            Template Preview
          </Title>
          <Text size="sm" c="dimmed" mb="md">
            Preview how your quotation will look with the current settings
          </Text>
          <TemplatePreview formData={form.values} />
        </Paper>

        {/* Submit Button */}
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            size="md"
            leftSection={<Check size={16} />}
          >
            {templateId ? "Update Template" : "Save Template"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
