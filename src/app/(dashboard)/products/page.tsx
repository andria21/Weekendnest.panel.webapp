import React from "react";
import { EntityForm, FieldConfig } from "@/components/forms/PostForm";

import { getProducts } from "@/actions/products/getProducts";
import { createProduct } from "@/actions/products/createProduct";
import { updateProduct } from "@/actions/products/updateProduct";
import { deleteProduct } from "@/actions/products/deleteProduct";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconTrendingUp } from "@tabler/icons-react";
import { DeleteButton } from "@/components/forms/DeleteButton";
import { EditModalForm } from "@/components/forms/EditForm";

const productFields: FieldConfig[] = [
  {
    name: "sku",
    label: "SKU",
    placeholder: "Product SKU",
    required: true,
  },
  {
    name: "name",
    label: "Product Name",
    placeholder: "Product Name",
    required: true,
  },
  {
    name: "slug",
    label: "Slug",
    placeholder: "Product Slug",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Description",
    required: true,
  },
    {
    name: "brandId",
    label: "Brand ID",
    placeholder: "Brand ID",
    required: true,
    type: "number",
  },
  {
    name: "featured",
    label: "Featured?",
    type: "checkbox",
    initialValue: false,
  },
    {
    name: "status",
    label: "Status",
    placeholder: "Status",
    required: true,
  },
];

export default async function ProductsEdit() {
  const products = await getProducts();  

  return (
    <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-start">
      <div className="order-2 lg:order-1 grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {products?.items.map((product) => (
          <Card
            key={product.id}
            className="@container/card data-[slot=card]:from-primary/5 data-[slot=card]:to-card 
                       dark:data-[slot=card]:bg-card data-[slot=card]:bg-gradient-to-t 
                       data-[slot=card]:shadow-xs"
          >
            <CardHeader>
              <CardDescription>{product.sku}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {product.name}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  {product.slug}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="text-muted-foreground">
                {product.featured ? "Featured Product" : "Standard Product"}
              </div>

              <EditModalForm
                entityName="Product"
                data={product}
                fields={[
                  { name: "sku", label: "SKU" },
                  { name: "name", label: "Name" },
                  { name: "slug", label: "Slug" },
                  { name: "description", label: "Description" },
                  { name: "brandId", label: "Brand ID", type: "number" },
                  { name: "featured", label: "Featured", type: "checkbox" },
                  { name: "status", label: "Status" },
                ]}
                submitAction={async (data) => {
                  "use server";
                  return updateProduct(data.id, data);
                }}
              />

              <DeleteButton
                id={product.id}
                deleteAction={deleteProduct}
                entityName="Product"
              />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="order-1 lg:order-2">
        <EntityForm
          title="Add a New Product"
          fields={productFields}
          submitAction={createProduct}
        />
      </div>
    </div>
  );
}
