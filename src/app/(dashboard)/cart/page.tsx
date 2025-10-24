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
import { createBrand } from "@/actions/brands/brandPost";
import { getCart } from "@/actions/cart/cartGet";

export default async function CartEdit() {
  const cart = await getCart(1);
  console.log(cart);

  return (
    <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      <div className="order-2 lg:order-1 grid grid-cols-1 xl:grid-cols-2 gap-6 w-full"></div>
    </div>
  );
}
