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
import BrandForm from "@/components/forms/CustomForm";
import { EditBrandModal } from "@/components/forms/EditForm";
import { DeleteBrandButton } from "@/components/forms/DeleteButton";

export default async function BrandsEdit() {
  const brands = await getBrands();

  return (
    <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      <div className="order-2 lg:order-1 grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {brands.items.map((brand) => (
          <Card
            key={brand.id}
            className="@container/card data-[slot=card]:from-primary/5 data-[slot=card]:to-card 
                       dark:data-[slot=card]:bg-card data-[slot=card]:bg-gradient-to-t 
                       data-[slot=card]:shadow-xs"
          >
            <CardHeader>
              <CardDescription>{brand.name}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {brand.slug}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  {brand.logoUrl} - LOGO URL
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {brand.description} <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                {brand.isActive ? "Active" : "Inactive"}
              </div>
              <EditBrandModal brand={brand} />
              <DeleteBrandButton id={brand.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="order-1 lg:order-2">
        <BrandForm />
      </div>
    </div>
  );
}
