"use client";

import { Refine } from "@refinedev/core";
import { RefineThemes } from "@refinedev/mantine";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import routerProvider from "@refinedev/nextjs-router/app";
import { Suspense, useEffect, useState } from "react";

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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <MantineProvider theme={RefineThemes.Blue as any}>
      <ModalsProvider>
        {isClient ? (
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
              syncWithLocation: false,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Notifications position="top-right" />
            <Suspense fallback={
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div>Loading...</div>
              </div>
            }>
              {children}
            </Suspense>
          </Refine>
        ) : (
          <Suspense fallback={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
              <div>Loading...</div>
            </div>
          }>
            {children}
          </Suspense>
        )}
      </ModalsProvider>
    </MantineProvider>
  );
}
