import React from "react";
import { EntityForm, FieldConfig } from "@/components/forms/PostForm";

import { getCollections } from "@/actions/collections/getCollections";
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
import { createCollection } from "@/actions/collections/createCollection";
import { DeleteButton } from "@/components/forms/DeleteButton";
import { deleteCollection } from "@/actions/collections/deleteCollection";
import { EditModalForm } from "@/components/forms/EditForm";
import { updateCollection } from "@/actions/collections/updateCollection";
import { EntityCard } from "@/components/BoxCard";

const collectionFields: FieldConfig[] = [
  {
    name: "name",
    label: "Collection Name",
    placeholder: "Collection Name",
    required: true,
  },
  { name: "slug", label: "Slug", placeholder: "Slug", required: true },
  {
    name: "imageUrl",
    label: "Image URL",
    placeholder: "Image URL",
    required: false,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Description",
    required: false,
  },
  { name: "isActive", label: "Active?", type: "checkbox", initialValue: true },
  { name: "position", label: "Position", type: "number", initialValue: 0 },
];

export default async function BrandsEdit() {
  const collections = await getCollections();

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full items-start">
      <div className="order-2 lg:order-1 grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
        {collections?.items.map((collection) => (
          <EntityCard
            key={collection.id}
            data={collection}
            description={collection.name}
            title={collection.slug}
            badgeText={`${collection.imageUrl}`}
            footerPrimary={collection.description}
            footerSecondary={collection.isActive ? "Active" : "Inactive"}
            footerTertiary={`Position: ${collection.position}`}
            entityName="Collection"
            fields={[
              { name: "name", label: "Name" },
              { name: "slug", label: "Slug" },
              { name: "imageUrl", label: "Image URL" },
              { name: "description", label: "Description" },
              { name: "isActive", label: "Active", type: "checkbox" },
              { name: "position", label: "Position", type: "number" },
            ]}
            submitAction={async (data) => {
              "use server";
              const { id, ...updateData } = data;
              return updateCollection(id, updateData);
            }}
            deleteAction={deleteCollection}
            EditModalForm={EditModalForm}
            DeleteButton={DeleteButton}
          />
        ))}
      </div>
      <div className="order-1 lg:order-2">
        <EntityForm
          title="Add a New Collection"
          fields={collectionFields}
          submitAction={createCollection}
        />
      </div>
    </div>
  );
}
