"use client";

import { useForm } from "@mantine/form";
import {
  Paper,
  TextInput,
  Textarea,
  Button,
  Group,
  Title,
  Text,
  Stack,
  Divider,
} from "@mantine/core";
import { useQuotationStore } from "@/lib/stores/quotationStore";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { Check } from "lucide-react";

interface ClientDetailsFormProps {
  quotationId?: string; // If provided, we're editing
  onSuccess?: () => void;
}

export default function ClientDetailsForm({
  quotationId,
  onSuccess,
}: ClientDetailsFormProps) {
  const router = useRouter();
  const {
    createQuotation,
    updateQuotation,
    getQuotation,
    companySettings,
  } = useQuotationStore();

  // If editing, load existing quotation data
  const existingQuotation = quotationId ? getQuotation(quotationId) : null;

  const form = useForm({
    initialValues: {
      // Company Details
      companyName: existingQuotation?.company.name || companySettings.name || "",
      companyAddress:
        existingQuotation?.company.address || companySettings.address || "",
      companyGSTIN:
        existingQuotation?.company.gstin || companySettings.gstin || "",
      companyMobile:
        existingQuotation?.company.mobile || companySettings.mobile || "",
      companyEmail:
        existingQuotation?.company.email || companySettings.email || "",
      companyLogo: existingQuotation?.company.logo || companySettings.logo || null,

      // Customer Details
      customerName: existingQuotation?.customerName || "",
      customerAddress: existingQuotation?.customerAddress || "",
      customerMobile: existingQuotation?.customerMobile || "",
      customerEmail: existingQuotation?.customerEmail || "",
      customerGSTIN: existingQuotation?.customerGSTIN || "",
      date: existingQuotation?.date
        ? new Date(existingQuotation.date)
        : new Date(),

      // Notes
      topNote: existingQuotation?.notes.top || "",
      middleNote: existingQuotation?.notes.middle || "",
      bottomNote: existingQuotation?.notes.bottom || "",

      // Terms & Bank
      termsAndConditions: existingQuotation?.termsAndConditions || "",
      bankDetails: existingQuotation?.bankDetails || "",
    },
    validate: {
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
      customerName: (value) =>
        value.trim().length === 0 ? "Customer name is required" : null,
      date: (value) => (!value ? "Date is required" : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    try {
      if (quotationId) {
        // Update existing quotation
        updateQuotation(quotationId, values);
        showNotification({
          title: "Success",
          message: "Quotation updated successfully!",
          color: "green",
          icon: <Check size={16} />,
        });
      } else {
        // Create new quotation
        const id = createQuotation(values);
        showNotification({
          title: "Success",
          message: "Quotation created successfully!",
          color: "green",
          icon: <Check size={16} />,
        });
        
        // Update company settings for future use
        useQuotationStore.getState().updateCompanySettings({
          name: values.companyName,
          address: values.companyAddress,
          gstin: values.companyGSTIN,
          mobile: values.companyMobile,
          email: values.companyEmail,
        });

        // Navigate to edit page to add items
        router.push(`/quotations/edit/${id}`);
      }
      onSuccess?.();
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to save quotation. Please try again.",
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg">
        {/* Company Details Section */}
        <Paper p="md" radius="md" withBorder>
          <Title order={3} mb="md" c="blue">
            Company Details
          </Title>
          <Stack gap="md">
            <TextInput
              label="Company Name"
              placeholder="Enter company name"
              required
              {...form.getInputProps("companyName")}
            />
            <Textarea
              label="Company Address"
              placeholder="Enter complete address"
              required
              minRows={2}
              {...form.getInputProps("companyAddress")}
            />
            <Group grow>
              <TextInput
                label="GSTIN"
                placeholder="Enter GSTIN"
                required
                {...form.getInputProps("companyGSTIN")}
              />
              <TextInput
                label="Mobile Number"
                placeholder="Enter mobile number"
                required
                {...form.getInputProps("companyMobile")}
              />
            </Group>
            <TextInput
              label="Email"
              placeholder="Enter email address"
              type="email"
              required
              {...form.getInputProps("companyEmail")}
            />
          </Stack>
        </Paper>

        {/* Customer Details Section */}
        <Paper p="md" radius="md" withBorder>
          <Title order={3} mb="md" c="blue">
            Customer Details
          </Title>
          <Stack gap="md">
            <TextInput
              label="Customer/Firm Name"
              placeholder="Enter customer or firm name"
              required
              {...form.getInputProps("customerName")}
            />
            <Textarea
              label="Customer Address"
              placeholder="Enter customer address"
              minRows={2}
              {...form.getInputProps("customerAddress")}
            />
            <Group grow>
              <TextInput
                label="Mobile Number"
                placeholder="Enter mobile number"
                {...form.getInputProps("customerMobile")}
              />
              <TextInput
                label="Email"
                placeholder="Enter email address"
                type="email"
                {...form.getInputProps("customerEmail")}
              />
            </Group>
            <Group grow>
              <TextInput
                label="Customer GSTIN (Optional)"
                placeholder="Enter customer GSTIN if applicable"
                {...form.getInputProps("customerGSTIN")}
              />
              <TextInput
                label="Quotation Date"
                type="date"
                required
                value={
                  form.values.date
                    ? new Date(form.values.date).toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) => {
                  form.setFieldValue("date", e.target.value ? new Date(e.target.value) : new Date());
                }}
              />
            </Group>
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
              minRows={2}
              {...form.getInputProps("topNote")}
            />
            <Textarea
              label="Middle Note"
              placeholder="Note to appear in the middle"
              minRows={2}
              {...form.getInputProps("middleNote")}
            />
            <Textarea
              label="Bottom Note"
              placeholder="Note to appear at the bottom"
              minRows={2}
              {...form.getInputProps("bottomNote")}
            />
          </Stack>
        </Paper>

        {/* Terms & Bank Details Section */}
        <Paper p="md" radius="md" withBorder>
          <Title order={3} mb="md" c="blue">
            Terms & Bank Details
          </Title>
          <Stack gap="md">
            <Textarea
              label="Terms & Conditions"
              placeholder="Enter terms and conditions"
              minRows={3}
              {...form.getInputProps("termsAndConditions")}
            />
            <Textarea
              label="Bank Details"
              placeholder="Enter bank account details"
              minRows={2}
              {...form.getInputProps("bankDetails")}
            />
          </Stack>
        </Paper>

        {/* Submit Button */}
        <Group justify="flex-end" mt="md">
          <Button
            type="submit"
            size="md"
            leftSection={<Check size={16} />}
          >
            {quotationId ? "Update Details" : "Save & Continue"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
