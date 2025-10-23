"use client";

import React, { useState } from "react";
import { getCategory } from "@/actions/categories/getCategory";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EntityForm, FieldConfig } from "@/components/forms/PostForm";
import { createCategory } from "@/actions/categories/createCategory";
import { EditModalForm } from "@/components/forms/EditForm";
import { DeleteButton } from "@/components/forms/DeleteButton";
import { deleteCategory } from "@/actions/categories/deleteCategory";
import { updateCategory } from "@/actions/categories/updateCategory";
import { CategoryData } from "@/types/categoriesGet";

const categoryFields: FieldConfig[] = [
  {
    name: "parentId",
    label: "Parent ID",
    placeholder: "Parent ID",
    required: true,
    type: "number",
  },
  { name: "name", label: "Name", placeholder: "Name", required: true },
  { name: "slug", label: "Slug", placeholder: "Slug", required: true },
  {
    name: "description",
    label: "Description",
    placeholder: "Description",
    required: false,
  },
  { name: "isActive", label: "Active?", type: "checkbox", initialValue: true },
  {
    name: "position",
    label: "Position",
    placeholder: "Position",
    required: false,
    type: "number",
    initialValue: 0,
  },
];

export default function CategoryEdit() {
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!categoryId) return;
    setLoading(true);
    const data = await getCategory(Number(categoryId));
    setCategory(data);
    setLoading(false);
  };

  return (
    <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      <div className="flex gap-2 mb-4 col-span-full">
        <input
          type="number"
          placeholder="Enter Category ID"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
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

      {category && (
        <Card
          key={category.id}
          className="@container/card data-[slot=card]:from-primary/5 data-[slot=card]:to-card 
                 dark:data-[slot=card]:bg-card data-[slot=card]:bg-gradient-to-t 
                 data-[slot=card]:shadow-xs"
        >
          <CardHeader>
            <CardDescription>{category.name}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {category.slug}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {category.isActive ? "Active" : "Inactive"}
              </Badge>
            </CardAction>
          </CardHeader>

          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {category.description}
            </div>
            <div className="text-muted-foreground">
              Position: {category.position} | Parent ID: {category.parentId}
            </div>
            <EditModalForm
              entityName="Brand"
              data={category}
              fields={[
                { name: "name", label: "Name" },
                { name: "slug", label: "Slug" },
                { name: "parentId", label: "Parent ID", type: "number" },
                { name: "description", label: "Description" },
                { name: "isActive", label: "Active", type: "checkbox" },
                { name: "position", label: "Position", type: "number" },
              ]}
              submitAction={async (data) => {
                return updateCategory(data.id, data);
              }}
            />
            <DeleteButton
              id={category.id}
              deleteAction={deleteCategory}
              entityName="Category"
            />
          </CardFooter>
        </Card>
      )}
      <div className="order-1 lg:order-2">
        <EntityForm
          title="Add a New Category"
          fields={categoryFields}
          submitAction={createCategory}
        />
      </div>
    </div>
  );
}
