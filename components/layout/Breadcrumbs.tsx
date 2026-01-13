"use client";

import { Breadcrumbs as MantineBreadcrumbs, Anchor, Text } from "@mantine/core";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const paths = pathname?.split("/").filter(Boolean) || [];
    const breadcrumbs: BreadcrumbItem[] = [{ title: "Home", href: "/" }];

    let currentPath = "";
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const title = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      breadcrumbs.push({
        title,
        href: index === paths.length - 1 ? undefined : currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  return (
    <MantineBreadcrumbs
      separator={<ChevronRight size={16} />}
      separatorMargin="md"
      mt="xs"
      mb="md"
    >
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        if (isLast || !item.href) {
          return (
            <Text key={index} size="sm" c="dimmed" fw={500}>
              {item.title}
            </Text>
          );
        }

        return (
          <Anchor
            key={index}
            component={Link}
            href={item.href}
            size="sm"
            c="blue"
          >
            {index === 0 ? <Home size={16} style={{ display: "inline" }} /> : item.title}
          </Anchor>
        );
      })}
    </MantineBreadcrumbs>
  );
}
