"use client";

import { AppShell, NavLink, ScrollArea, Group, Text, Divider } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Settings,
  LayoutDashboard,
} from "lucide-react";

interface SidebarProps {
  opened: boolean;
  onClose?: () => void;
}

const navigationItems = [
  {
    label: "Dashboard",
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

export default function Sidebar({ opened, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose?.(); // Close drawer on mobile after navigation
  };

  return (
    <AppShell.Navbar
      p="md"
      hidden={!opened}
      hiddenFrom="sm"
      style={{ 
        width: 280,
        borderRight: "1px solid var(--mantine-color-gray-3)",
      }}
    >
      <AppShell.Section>
        <Text size="lg" fw={600} mb="md" px="xs">
          Menu
        </Text>
        <Divider mb="md" />
      </AppShell.Section>
      
      <AppShell.Section grow component={ScrollArea}>
        <Group gap={4}>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <NavLink
                key={item.href}
                label={item.label}
                leftSection={<Icon size={20} />}
                active={isActive}
                onClick={() => handleNavigation(item.href)}
                variant={isActive ? "light" : "subtle"}
                color={isActive ? "blue" : "gray"}
                style={{
                  borderRadius: "8px",
                  padding: "12px 16px",
                  fontWeight: isActive ? 600 : 500,
                }}
              />
            );
          })}
        </Group>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
