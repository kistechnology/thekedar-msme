"use client";

import { Group, Text, ActionIcon, Stack } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Settings,
  LayoutDashboard,
} from "lucide-react";

const navigationItems = [
  {
    label: "Home",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Templates",
    icon: FileText,
    href: "/templates",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <Group
      justify="space-around"
      p="xs"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "var(--mantine-color-body)",
        borderTop: "1px solid var(--mantine-color-gray-3)",
        zIndex: 1000,
        boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
      }}
      hiddenFrom="sm"
    >
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

        return (
          <Stack
            key={item.href}
            gap={4}
            align="center"
            style={{ cursor: "pointer", flex: 1 }}
            onClick={() => handleNavigation(item.href)}
          >
            <ActionIcon
              variant={isActive ? "filled" : "subtle"}
              size="lg"
              aria-label={item.label}
              color={isActive ? "blue" : "gray"}
              radius="xl"
            >
              <Icon size={22} />
            </ActionIcon>
            <Text size="xs" fw={isActive ? 600 : 400} c={isActive ? "blue" : "dimmed"}>
              {item.label}
            </Text>
          </Stack>
        );
      })}
    </Group>
  );
}
