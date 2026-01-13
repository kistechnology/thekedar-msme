"use client";

import { Button, Paper, Text, Stack } from "@mantine/core";
import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { Suspense } from "react";

function NotFoundContent() {
  return (
    <MainLayout>
      <Paper p="xl" radius="md" withBorder>
        <Stack align="center" gap="md">
          <Text size="xl" fw={700} c="blue">
            404 - Page Not Found
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            The page you're looking for doesn't exist.
          </Text>
          <Button component={Link} href="/" mt="md">
            Go to Home
          </Button>
        </Stack>
      </Paper>
    </MainLayout>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Text>Loading...</Text>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  );
}
