"use client";

import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import { useTemplateStore } from "@/lib/stores/templateStore";
import { Button, Paper, Text, Group, Badge, Stack, ActionIcon, Menu } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Plus, FileText, MoreVertical, Edit, Copy, Trash } from "lucide-react";
import Link from "next/link";
import { showNotification } from "@mantine/notifications";

export default function TemplatesListPage() {
  const router = useRouter();
  const { templates, deleteTemplate, duplicateTemplate } = useTemplateStore();

  const handleCreateNew = () => {
    router.push("/templates/create");
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteTemplate(id);
      showNotification({
        title: "Deleted",
        message: "Template deleted successfully",
        color: "green",
      });
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateTemplate(id);
    showNotification({
      title: "Duplicated",
      message: "Template duplicated successfully",
      color: "blue",
    });
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
        title="Quotation Templates"
        description="Create and manage reusable quotation templates"
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Templates" },
        ]}
        showCreateButton
        createButtonLabel="New Template"
        onCreateClick={handleCreateNew}
      />

      {templates.length === 0 ? (
        <Paper p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <FileText size={48} color="var(--mantine-color-gray-5)" />
            <Text size="lg" fw={500} c="dimmed">
              No templates yet
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Create your first quotation template to get started
            </Text>
            <Button
              leftSection={<Plus size={16} />}
              onClick={handleCreateNew}
              mt="md"
            >
              Create First Template
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Stack gap="md">
          {templates.map((template) => (
            <Paper
              key={template.id}
              p="md"
              radius="md"
              withBorder
            >
              <Group justify="space-between" align="flex-start">
                <div style={{ flex: 1 }}>
                  <Group gap="sm" mb="xs">
                    <Text fw={600} size="lg">
                      {template.name}
                    </Text>
                    <Badge color="blue" variant="light">
                      Template
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed" mb="xs">
                    {template.company.name}
                  </Text>
                  <Group gap="md" mt="xs">
                    <Text size="xs" c="dimmed">
                      Created: {formatDate(template.createdAt)}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Updated: {formatDate(template.updatedAt)}
                    </Text>
                    <Text size="xs" c="blue" fw={500}>
                      {Array.isArray(template.termsAndConditions) 
                        ? `${template.termsAndConditions.length} terms selected`
                        : "0 terms selected"}
                    </Text>
                  </Group>
                </div>

                <Group gap="xs">
                  <Button
                    component={Link}
                    href={`/templates/edit/${template.id}`}
                    variant="light"
                    size="sm"
                    leftSection={<Edit size={14} />}
                  >
                    Edit
                  </Button>
                  <Menu shadow="md" position="bottom-end">
                    <Menu.Target>
                      <ActionIcon variant="subtle" size="lg">
                        <MoreVertical size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<Copy size={16} />}
                        onClick={() => handleDuplicate(template.id)}
                      >
                        Duplicate
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        leftSection={<Trash size={16} />}
                        color="red"
                        onClick={() => handleDelete(template.id, template.name)}
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
            </Paper>
          ))}
        </Stack>
      )}
    </MainLayout>
  );
}
