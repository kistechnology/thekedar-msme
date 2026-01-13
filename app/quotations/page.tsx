"use client";

import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import { useQuotationStore } from "@/lib/stores/quotationStore";
import { Button, Paper, Text, Group, Badge, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Plus, FileText, Calendar } from "lucide-react";
import Link from "next/link";

export default function QuotationsListPage() {
  const router = useRouter();
  const { quotations, deleteQuotation } = useQuotationStore();

  const handleCreateNew = () => {
    router.push("/quotations/create");
  };

  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <MainLayout>
      <PageHeader
        title="Quotations"
        description="Manage your window and door quotations"
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Quotations" },
        ]}
        showCreateButton
        createButtonLabel="New Quotation"
        onCreateClick={handleCreateNew}
      />

      {quotations.length === 0 ? (
        <Paper p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <FileText size={48} color="var(--mantine-color-gray-5)" />
            <Text size="lg" fw={500} c="dimmed">
              No quotations yet
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Create your first quotation to get started
            </Text>
            <Button
              leftSection={<Plus size={16} />}
              onClick={handleCreateNew}
              mt="md"
            >
              Create First Quotation
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Stack gap="md">
          {quotations.map((quotation) => (
            <Paper
              key={quotation.id}
              p="md"
              radius="md"
              withBorder
              style={{ cursor: "pointer" }}
              component={Link}
              href={`/quotations/edit/${quotation.id}`}
            >
              <Group justify="space-between" align="flex-start">
                <div style={{ flex: 1 }}>
                  <Group gap="sm" mb="xs">
                    <Text fw={600} size="lg">
                      {quotation.customerName}
                    </Text>
                    <Badge color="blue" variant="light">
                      {quotation.id.split("-")[1]}
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed" mb="xs">
                    Quotation #{quotation.id.slice(0, 8)}
                  </Text>
                  <Group gap="md" mt="xs">
                    <Group gap={4}>
                      <Calendar size={14} />
                      <Text size="xs" c="dimmed">
                        {formatDate(quotation.date)}
                      </Text>
                    </Group>
                    <Text size="xs" c="dimmed">
                      Items: {quotation.items.length}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Total: ₹{quotation.summary.grandTotal.toLocaleString("en-IN")}
                    </Text>
                  </Group>
                </div>
              </Group>
            </Paper>
          ))}
        </Stack>
      )}
    </MainLayout>
  );
}
