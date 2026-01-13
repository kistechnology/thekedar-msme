"use client";

import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import TemplateForm from "@/components/quotation/TemplateForm";

export default function CreateTemplatePage() {
  return (
    <MainLayout>
      <PageHeader
        title="Create New Template"
        description="Create a reusable quotation template with your company details"
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Templates", href: "/templates" },
          { title: "Create New" },
        ]}
      />

      <TemplateForm />
    </MainLayout>
  );
}
