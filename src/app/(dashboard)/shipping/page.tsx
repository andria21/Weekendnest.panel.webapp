"use client";

import React, { useState } from "react";
import { FieldConfig } from "@/components/forms/PostForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getShippingOptions,
} from "@/actions/shipping/getShipping";
import { ShippingOption } from "@/types/shipping";

const shippingFields: FieldConfig[] = [
  { name: "code", label: "Code", placeholder: "Code", required: true },
  { name: "name", label: "Name", placeholder: "Name", required: true },
  {
    name: "price",
    label: "Price",
    placeholder: "Price",
    required: true,
    type: "number",
  },
];

export default function ShippingEdit() {
  const [country, setCountry] = useState("");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!country) return;
    setLoading(true);
    const data = await getShippingOptions(country);
    setShippingOptions(data);
    setLoading(false);
  };

  return (
    <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-start">
      <div className="flex gap-2 mb-4 col-span-full">
        <input
          type="text"
          placeholder="Enter Country Code"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-gray-400 rounded-md px-3 py-2"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
      </div>

      {shippingOptions.map((option) => (
        <Card
          key={option.code}
          className="@container/card data-[slot=card]:from-primary/5 data-[slot=card]:to-card 
                 dark:data-[slot=card]:bg-card data-[slot=card]:bg-gradient-to-t 
                 data-[slot=card]:shadow-xs"
        >
          <CardHeader>
            <CardDescription>{option.name}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {option.code}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">${option.price}</Badge>
            </CardAction>
          </CardHeader>

          <CardFooter className="flex-col items-start gap-1.5 text-sm">
          </CardFooter>
        </Card>
      ))}

      {/* <div className="order-1 lg:order-2">
        <EntityForm
          title="Add a New Shipping Option"
          fields={shippingFields}
          submitAction={createShippingOption}
        />
      </div> */}
    </div>
  );
}
