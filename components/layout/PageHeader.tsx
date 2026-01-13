"use client";

import { Group, Title, Text, Button, ActionIcon } from "@mantine/core";
import { Plus, MoreVertical, Download, Filter } from "lucide-react";
import Breadcrumbs from "./Breadcrumbs";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Array<{ title: string; href?: string }>;
  actions?: React.ReactNode;
  showCreateButton?: boolean;
  createButtonLabel?: string;
  onCreateClick?: () => void;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  showCreateButton = false,
  createButtonLabel = "Create New",
  onCreateClick,
}: PageHeaderProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      
      <Group justify="space-between" align="flex-start" mb="md">
        <div>
          <Title order={2} mb={description ? "xs" : 0}>
            {title}
          </Title>
          {description && (
            <Text size="sm" c="dimmed" mt="xs">
              {description}
            </Text>
          )}
        </div>

        <Group gap="xs">
          {actions}
          {showCreateButton && (
            <Button
              leftSection={<Plus size={16} />}
              onClick={onCreateClick}
              size="md"
            >
              {createButtonLabel}
            </Button>
          )}
        </Group>
      </Group>
    </div>
  );
}
