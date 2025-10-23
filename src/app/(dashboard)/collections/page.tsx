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
    <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
      <div className="order-2 lg:order-1 grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {collections?.items.map((collection) => (
          <Card
            key={collection.id}
            className="@container/card data-[slot=card]:from-primary/5 data-[slot=card]:to-card 
                       dark:data-[slot=card]:bg-card data-[slot=card]:bg-gradient-to-t 
                       data-[slot=card]:shadow-xs"
          >
            <CardHeader>
              <CardDescription>{collection.name}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {collection.slug}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  {collection.imageUrl} - Image URL
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {collection.description} <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                {collection.isActive ? "Active" : "Inactive"}
              </div>
              <div className="text-muted-foreground">
                Position: {collection.position}
              </div>
              <EditModalForm
                entityName="Brand"
                data={collection}
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
                  return updateCollection(data.id, data);
                }}
              />
              <DeleteButton
                id={collection.id}
                deleteAction={deleteCollection}
                entityName="Collection"
              />
            </CardFooter>
          </Card>
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
