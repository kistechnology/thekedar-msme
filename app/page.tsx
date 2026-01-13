"use client";

import { Button, Paper, Text, Group, Card, SimpleGrid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Check, FileText, Settings, TrendingUp } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import { useTemplateStore } from "@/lib/stores/templateStore";

// Force dynamic rendering to avoid SSR issues with localStorage
export const dynamic = 'force-dynamic';

export default function Home() {
  const handleTestNotification = () => {
    showNotification({
      title: "Setup Complete!",
      message: "Refine and Mantine are working correctly!",
      color: "blue",
      icon: <Check size={16} />,
    });
  };

  const { templates } = useTemplateStore();
  
  const stats = [
    { label: "Total Templates", value: templates.length.toString(), icon: FileText, color: "blue" },
    { label: "Ready to Use", value: templates.length.toString(), icon: TrendingUp, color: "green" },
    { label: "Settings", value: "Active", icon: Settings, color: "orange" },
  ];

  return (
    <MainLayout>
      <PageHeader
        title="Dashboard"
        description="Overview of your quotation template management system"
        breadcrumbs={[{ title: "Home" }]}
      />

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md" mb="xl">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="xs" tt="uppercase" fw={700} c="dimmed">
                    {stat.label}
                  </Text>
                  <Text fw={700} size="xl" mt="xs">
                    {stat.value}
                  </Text>
                </div>
                <Icon size={32} color={`var(--mantine-color-${stat.color}-6)`} />
              </Group>
            </Card>
          );
        })}
      </SimpleGrid>

      <Paper p="xl" radius="md" withBorder>
        <Text size="lg" fw={600} mb="md">
          System Status
        </Text>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Text size="sm" fw={500}>
            ✅ Next.js 15 (App Router) - Configured
          </Text>
          <Text size="sm" fw={500}>
            ✅ Refine (MIT OSS) - Configured with Blue Theme
          </Text>
          <Text size="sm" fw={500}>
            ✅ Mantine UI - Configured
          </Text>
          <Text size="sm" fw={500}>
            ✅ TailwindCSS + shadcn/ui - Configured
          </Text>
          <Text size="sm" fw={500}>
            ✅ All Dependencies Installed
          </Text>
          <Text size="sm" fw={500}>
            ✅ Layout Components Created
          </Text>
          <Text size="sm" fw={500}>
            ✅ Professional Admin Panel Layout
          </Text>
        </div>

        <Button
          onClick={handleTestNotification}
          mt="xl"
          size="md"
          fullWidth
        >
          Test Mantine Notification
        </Button>

        <Text size="sm" mt="xl" c="dimmed">
          Create templates to start generating quotations!
        </Text>
      </Paper>
    </MainLayout>
  );
}
