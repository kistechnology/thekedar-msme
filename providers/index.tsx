"use client";

import { Refine } from "@refinedev/core";
import { RefineThemes } from "@refinedev/mantine";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import routerProvider from "@refinedev/nextjs-router/app";

// Since we're frontend-only, we'll create a simple data provider
// This will be replaced with Zustand/localStorage integration later
const dataProvider: any = {
  default: {
    getList: async () => ({ data: [], total: 0 }),
    getOne: async () => ({ data: null }),
    create: async () => ({ data: null }),
    update: async () => ({ data: null }),
    deleteOne: async () => ({ data: null }),
    getApiUrl: () => "",
  },
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={RefineThemes.Blue as any}>
      <ModalsProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider as any}
          resources={[
            {
              name: "templates",
              list: "/templates",
              create: "/templates/create",
              edit: "/templates/edit/:id",
            },
          ]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Notifications position="top-right" />
          {children}
        </Refine>
      </ModalsProvider>
    </MantineProvider>
  );
}
