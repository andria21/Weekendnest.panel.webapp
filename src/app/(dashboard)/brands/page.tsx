import { getBrands } from "@/actions/brands/brands";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { EntityForm, FieldConfig } from "@/components/forms/PostForm";
import { EditModalForm } from "@/components/forms/EditForm";
import { DeleteButton } from "@/components/forms/DeleteButton";
import { createBrand } from "@/actions/brands/brandPost";
import { deleteBrand } from "@/actions/brands/brandDelete";
import { updateBrand } from "@/actions/brands/brandPut";
import { EntityCard } from "@/components/BoxCard";

const brandFields: FieldConfig[] = [
  {
    name: "name",
    label: "Brand Name",
    placeholder: "Brand Name",
    required: true,
  },
  { name: "slug", label: "Slug", placeholder: "Slug", required: true },
  {
    name: "logoUrl",
    label: "Logo URL",
    placeholder: "Logo URL",
    required: false,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Description",
    required: false,
  },
  { name: "isActive", label: "Active", type: "checkbox", initialValue: true },
];

export default async function BrandsEdit() {
  const brands = await getBrands();

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-start">
      <div className="order-2 lg:order-1 grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
        {brands.items.map((brand) => (
          <EntityCard
            key={brand.id}
            data={brand}
            description={brand.name}
            title={brand.slug}
            badgeText={`${brand.logoUrl} - LOGO URL`}
            footerPrimary={brand.description}
            footerSecondary={brand.isActive ? "Active" : "Inactive"}
            entityName="Brand"
            fields={[
              { name: "name", label: "Name" },
              { name: "slug", label: "Slug" },
              { name: "logoUrl", label: "Logo URL" },
              { name: "description", label: "Description" },
              { name: "isActive", label: "Active", type: "checkbox" },
            ]}
            submitAction={updateBrand}
            deleteAction={deleteBrand}
            EditModalForm={EditModalForm}
            DeleteButton={DeleteButton}
          />
        ))}
      </div>
      <div className="order-1 lg:order-2">
        <EntityForm
          title="Add a New Brand"
          fields={brandFields}
          submitAction={createBrand}
        />
      </div>
    </div>
  );
}
