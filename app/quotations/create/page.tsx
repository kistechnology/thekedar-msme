"use client";

import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import ClientDetailsForm from "@/components/quotation/ClientDetailsForm";
import { FilePlus } from "lucide-react";

export default function CreateQuotationPage() {
  return (
    <MainLayout>
      <PageHeader
        title="Create New Quotation"
        description="Enter company and customer details to create a new quotation"
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Quotations", href: "/quotations" },
          { title: "Create New" },
        ]}
      />

      <ClientDetailsForm />
    </MainLayout>
  );
}
