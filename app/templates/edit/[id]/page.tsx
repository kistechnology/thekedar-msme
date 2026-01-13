"use client";

import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import TemplateForm from "@/components/quotation/TemplateForm";
import { useTemplateStore } from "@/lib/stores/templateStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Paper, Text, Button, Stack } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;
  const { getTemplate } = useTemplateStore();
  const template = getTemplate(templateId);

  useEffect(() => {
    if (!template && templateId) {
      // Template not found, redirect to list
      router.push("/templates");
    }
  }, [template, templateId, router]);

  if (!template) {
    return (
      <MainLayout>
        <Paper p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Text size="lg" fw={500} c="dimmed">
              Template not found
            </Text>
            <Button
              component={Link}
              href="/templates"
              leftSection={<ArrowLeft size={16} />}
            >
              Back to Templates
            </Button>
          </Stack>
        </Paper>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader
        title="Edit Template"
        description={`Editing template: ${template.name}`}
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Templates", href: "/templates" },
          { title: "Edit" },
        ]}
      />

      <TemplateForm
        templateId={templateId}
        onSuccess={() => {
          router.push("/templates");
        }}
      />
    </MainLayout>
  );
}
