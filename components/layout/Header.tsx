"use client";

import { AppShell, Burger, Group, Title, ActionIcon, Avatar, Menu, Text, Divider } from "@mantine/core";
import { Bell, User, LogOut, Settings, ChevronDown } from "lucide-react";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export default function Header({ opened, toggle }: HeaderProps) {
  return (
    <AppShell.Header
      style={{
        borderBottom: "1px solid var(--mantine-color-gray-3)",
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <Group h="100%" px="md" justify="space-between">
        <Group gap="sm">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            aria-label="Toggle navigation"
          />
          <Title order={3} c="blue" fw={600}>
            Thekedar MSME
          </Title>
        </Group>

        <Group gap="xs">
          <ActionIcon 
            variant="subtle" 
            size="lg" 
            aria-label="Notifications"
            color="gray"
          >
            <Bell size={20} />
          </ActionIcon>
          
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <Group gap="xs" style={{ cursor: "pointer" }}>
                <Avatar size="sm" radius="xl" color="blue">
                  <User size={16} />
                </Avatar>
                <Group gap={4} hiddenFrom="md">
                  <Text size="sm" fw={500}>
                    User
                  </Text>
                  <ChevronDown size={16} />
                </Group>
              </Group>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item leftSection={<User size={16} />}>
                Profile
              </Menu.Item>
              <Menu.Item leftSection={<Settings size={16} />}>
                Settings
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item 
                leftSection={<LogOut size={16} />}
                color="red"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
