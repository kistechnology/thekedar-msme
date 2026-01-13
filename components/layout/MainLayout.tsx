"use client";

import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DesktopSidebar from "./DesktopSidebar";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 64 }}
      footer={{ height: 0 }}
      navbar={{
        width: 280,
        breakpoint: "sm",
      }}
      padding={0}
    >
      <Header opened={mobileOpened} toggle={toggleMobile} />
      <DesktopSidebar />
      <Sidebar opened={mobileOpened} onClose={closeMobile} />
      <AppShell.Main
        style={{
          backgroundColor: "var(--mantine-color-gray-0)",
          minHeight: "calc(100vh - 64px)",
          paddingBottom: "80px", // Space for bottom navigation on mobile
        }}
      >
        <Container size="xl" py="md" px="md">
          {children}
        </Container>
      </AppShell.Main>
      <Footer />
      <BottomNavigation />
      <ScrollToTop />
    </AppShell>
  );
}
