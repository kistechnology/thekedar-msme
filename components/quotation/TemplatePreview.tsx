"use client";

import {
  Paper,
  Title,
  Stack,
  Text,
  Group,
  Divider,
  Table,
  Box,
  Image,
  Badge,
} from "@mantine/core";
import type { TemplateFormData } from "@/types/quotation";
import { getHeaderTemplate, getFooterTemplate } from "@/lib/data/headerFooterTemplates";
import { formatTermsAsText } from "@/lib/data/termsAndConditions";
import { generateLogoFromName } from "@/lib/utils/logoGenerator";

interface TemplatePreviewProps {
  formData: TemplateFormData;
}

export default function TemplatePreview({ formData }: TemplatePreviewProps) {
  const headerTemplate = getHeaderTemplate(formData.headerTemplateId || "header-2"); // Modern header by default
  const footerTemplate = getFooterTemplate(formData.footerTemplateId || "footer-1");

  // Get logo source (generate from company name if no logo uploaded)
  const getLogoSource = () => {
    if (formData.companyLogo) {
      return formData.companyLogo;
    }
    // Generate logo from company name initials
    if (formData.companyName && formData.companyName.trim().length > 0) {
      return generateLogoFromName(formData.companyName);
    }
    // Fallback to placeholder
    return "/placeholder-logo.png";
  };

  // Render Header based on selected template
  const renderHeader = () => {
    if (!headerTemplate) return null;

    if (headerTemplate.layout === "centered") {
      return (
        <Paper p="md" withBorder radius="md" style={{ textAlign: "center" }}>
          <Stack gap="sm">
            {headerTemplate.showLogo && (
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  src={getLogoSource()}
                  alt="Company Logo"
                  style={{ maxWidth: "120px", maxHeight: "120px", objectFit: "contain" }}
                />
              </Box>
            )}
            {headerTemplate.showCompanyName && (
              <Title order={2} c="blue">
                {formData.companyName || "Company Name"}
              </Title>
            )}
            {headerTemplate.showAddress && (
              <Text size="sm" c="dimmed">
                {formData.companyAddress || "Company Address"}
              </Text>
            )}
            {headerTemplate.showContact && (
              <Group gap="md" justify="center">
                <Text size="sm">
                  📞 {formData.companyMobile || "Mobile"}
                </Text>
                <Text size="sm">
                  ✉️ {formData.companyEmail || "Email"}
                </Text>
              </Group>
            )}
            {headerTemplate.showGSTIN && (
              <Text size="sm" fw={500}>
                GSTIN: {formData.companyGSTIN || "GSTIN Number"}
              </Text>
            )}
          </Stack>
        </Paper>
      );
    } else {
      // left-aligned layout
      return (
        <Paper p="md" withBorder radius="md">
          <Group gap="md" align="flex-start">
            {headerTemplate.showLogo && (
              <Image
                src={getLogoSource()}
                alt="Company Logo"
                style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain" }}
              />
            )}
            <Stack gap="xs" style={{ flex: 1 }}>
              {headerTemplate.showCompanyName && (
                <Title order={3} c="blue">
                  {formData.companyName || "Company Name"}
                </Title>
              )}
              {headerTemplate.showAddress && (
                <Text size="sm" c="dimmed">
                  {formData.companyAddress || "Company Address"}
                </Text>
              )}
              <Group gap="md">
                {headerTemplate.showContact && (
                  <>
                    <Text size="sm">📞 {formData.companyMobile || "Mobile"}</Text>
                    <Text size="sm">✉️ {formData.companyEmail || "Email"}</Text>
                  </>
                )}
                {headerTemplate.showGSTIN && (
                  <Text size="sm" fw={500}>
                    GSTIN: {formData.companyGSTIN || "GSTIN"}
                  </Text>
                )}
              </Group>
            </Stack>
          </Group>
        </Paper>
      );
    }
  };

  // Render Footer based on selected template
  const renderFooter = () => {
    if (!footerTemplate) return null;

    return (
      <Paper p="md" withBorder radius="md" style={{ backgroundColor: "var(--mantine-color-gray-0)" }}>
        <Stack gap="md">
          {footerTemplate.showBankDetails && formData.bankDetails && (
            <div>
              <Text fw={600} size="sm" mb="xs">
                Bank Details
              </Text>
              <Text size="xs" c="dimmed">
                {formData.bankDetails.bankName && (
                  <div>Bank: {formData.bankDetails.bankName}</div>
                )}
                {formData.bankDetails.accountNumber && (
                  <div>A/C: {formData.bankDetails.accountNumber}</div>
                )}
                {formData.bankDetails.ifscCode && (
                  <div>IFSC: {formData.bankDetails.ifscCode}</div>
                )}
              </Text>
            </div>
          )}

          {footerTemplate.showTerms && formData.selectedTerms.length > 0 && (
            <div>
              <Text fw={600} size="sm" mb="xs">
                Terms & Conditions
              </Text>
              <Text size="xs" c="dimmed" style={{ whiteSpace: "pre-line" }}>
                {formatTermsAsText(formData.selectedTerms, formData.termsConfig).substring(0, 200)}...
              </Text>
            </div>
          )}

          {footerTemplate.showContact && (
            <Text size="xs" c="dimmed" ta="center">
              {formData.companyMobile} | {formData.companyEmail}
            </Text>
          )}
        </Stack>
      </Paper>
    );
  };

  return (
    <Paper p="xl" radius="md" withBorder style={{ backgroundColor: "white" }}>
      <Stack gap="md">
        {/* Header */}
        {renderHeader()}

        <Divider label="QUOTATION" labelPosition="center" />

        {/* Top Note */}
        {formData.topNote && (
          <Text size="sm" c="dimmed" style={{ fontStyle: "italic" }}>
            {formData.topNote}
          </Text>
        )}

        {/* Content Table - Placeholder */}
        <Paper p="sm" withBorder radius="sm">
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Sr.</Table.Th>
                <Table.Th>Item Code</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Qty</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Total</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {formData.items && formData.items.length > 0 ? (
                formData.items.slice(0, 3).map((item, index) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{item.itemCode || "CODE-001"}</Table.Td>
                    <Table.Td>{item.description || "Item Description"}</Table.Td>
                    <Table.Td>1</Table.Td>
                    <Table.Td>₹1,000</Table.Td>
                    <Table.Td>₹1,000</Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={6} style={{ textAlign: "center", color: "var(--mantine-color-dimmed)" }}>
                    {formData.items?.length === 0 ? "No items added" : "Items will appear here"}
                  </Table.Td>
                </Table.Tr>
              )}
              {formData.items && formData.items.length > 3 && (
                <Table.Tr>
                  <Table.Td colSpan={6} style={{ textAlign: "center", fontStyle: "italic", color: "var(--mantine-color-dimmed)" }}>
                    ... and {formData.items.length - 3} more items
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </Paper>

        {/* Middle Note */}
        {formData.middleNote && (
          <Text size="sm" c="dimmed" style={{ fontStyle: "italic" }}>
            {formData.middleNote}
          </Text>
        )}

        {/* Summary - Placeholder */}
        <Group justify="flex-end">
          <Paper p="md" withBorder radius="sm" style={{ minWidth: "250px" }}>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm">Subtotal:</Text>
                <Text size="sm" fw={500}>₹10,000</Text>
              </Group>
              <Group justify="space-between">
                <Text size="sm">GST (18%):</Text>
                <Text size="sm" fw={500}>₹1,800</Text>
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text fw={600}>Grand Total:</Text>
                <Text fw={700} size="lg" c="blue">₹11,800</Text>
              </Group>
            </Stack>
          </Paper>
        </Group>

        {/* Bottom Note */}
        {formData.bottomNote && (
          <Text size="sm" c="dimmed" style={{ fontStyle: "italic" }}>
            {formData.bottomNote}
          </Text>
        )}

        {/* Footer */}
        {renderFooter()}
      </Stack>
    </Paper>
  );
}
