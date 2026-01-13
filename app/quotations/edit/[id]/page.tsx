"use client";

import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import ClientDetailsForm from "@/components/quotation/ClientDetailsForm";
import { useQuotationStore } from "@/lib/stores/quotationStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Paper, Text, Button, Stack } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditQuotationPage() {
  const params = useParams();
  const router = useRouter();
  const quotationId = params.id as string;
  const { getQuotation } = useQuotationStore();
  const quotation = getQuotation(quotationId);

  useEffect(() => {
    if (!quotation && quotationId) {
      // Quotation not found, redirect to list
      router.push("/quotations");
    }
  }, [quotation, quotationId, router]);

  if (!quotation) {
    return (
      <MainLayout>
        <Paper p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Text size="lg" fw={500} c="dimmed">
              Quotation not found
            </Text>
            <Button
              component={Link}
              href="/quotations"
              leftSection={<ArrowLeft size={16} />}
            >
              Back to Quotations
            </Button>
          </Stack>
        </Paper>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        title="Edit Quotation"
        description={`Editing quotation for ${quotation.customerName}`}
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Quotations", href: "/quotations" },
          { title: "Edit" },
        ]}
      />

      <ClientDetailsForm
        quotationId={quotationId}
        onSuccess={() => {
          // Optionally redirect or show success message
        }}
      />
    </MainLayout>
  );
}
