"use client";

import { AppShell, Text, Group, Anchor } from "@mantine/core";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AppShell.Footer p="md" hiddenFrom="md">
      <Group justify="center">
        <Text size="xs" c="dimmed">
          © {currentYear} Thekedar MSME. All rights reserved.
        </Text>
      </Group>
    </AppShell.Footer>
  );
}
