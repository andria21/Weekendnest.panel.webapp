"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface DeleteButtonProps<T> {
  id: T;
  deleteAction: (id: T) => Promise<boolean>;
  onSuccess?: () => void;
  entityName?: string; // for toast message
}

export const DeleteButton = <T extends string | number>({
  id,
  deleteAction,
  onSuccess,
  entityName = "Item",
}: DeleteButtonProps<T>) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    toast(
      `Are you sure you want to delete this ${entityName}?`,
      {
        action: {
          label: "Yes",
          onClick: () => {
            startTransition(async () => {
              try {
                const success = await deleteAction(id);
                if (success) {
                  toast.success(`${entityName} deleted successfully!`);
                  if (onSuccess) onSuccess();
                } else {
                  toast.error(`Failed to delete ${entityName}.`);
                }
              } catch (err) {
                toast.error(`Something went wrong while deleting ${entityName}.`);
                console.error(err);
              }
            });
          },
        },
      }
    );
  };

  return (
    <Button
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
      className="flex items-center gap-2 cursor-pointer"
    >
      <Trash2 className="h-4 w-4" />
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};
