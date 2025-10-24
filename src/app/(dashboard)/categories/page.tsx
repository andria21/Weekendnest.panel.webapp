"use client";

import React, { useState } from "react";
import { getCategory } from "@/actions/categories/getCategory";
import { EntityForm, FieldConfig } from "@/components/forms/PostForm";
import { createCategory } from "@/actions/categories/createCategory";
import { EditModalForm } from "@/components/forms/EditForm";
import { DeleteButton } from "@/components/forms/DeleteButton";
import { deleteCategory } from "@/actions/categories/deleteCategory";
import { updateCategory } from "@/actions/categories/updateCategory";
import { CategoryData } from "@/types/categoriesGet";
import { EntityCard } from "@/components/BoxCard";

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
    <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-start">
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
        <EntityCard
          key={category.id}
          data={category}
          description={category.name}
          title={category.slug}
          badgeText={category.isActive ? "Active" : "Inactive"}
          footerPrimary={category.description}
          footerSecondary={`Position: ${category.position} | Parent ID: ${category.parentId}`}
          badgeIcon={null}
          footerIcon={null}
          entityName="Category"
          fields={[
            { name: "name", label: "Name" },
            { name: "slug", label: "Slug" },
            { name: "parentId", label: "Parent ID", type: "number" },
            { name: "description", label: "Description" },
            { name: "isActive", label: "Active", type: "checkbox" },
            { name: "position", label: "Position", type: "number" },
          ]}
          submitAction={async (data) => {
            const { id, ...updateData } = data;
            return updateCategory(id, updateData);
          }}
          deleteAction={deleteCategory}
          EditModalForm={EditModalForm}
          DeleteButton={DeleteButton}
        />
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
