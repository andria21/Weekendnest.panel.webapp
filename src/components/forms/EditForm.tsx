"use client";

import React, { useState, FormEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogPortal,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

export interface FieldConfig {
  name: string;
  label: string;
  type?: "text" | "number" | "checkbox" | "select";
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  required?: boolean;
}

interface EditModalProps<T extends { id: number }> {
  entityName: string;
  data: T;
  fields: FieldConfig[];
  submitAction: (data: T) => Promise<unknown>;
  onSuccess?: () => void;
}

export const EditModalForm = <T extends { id: number }>({
  entityName,
  data,
  fields,
  submitAction,
  onSuccess,
}: EditModalProps<T>) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<T>({ ...data });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();

  const handleChange = (name: string, value: string | number | boolean) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitAction(formState);
      toast.success(`${entityName} updated successfully!`);
      if (onSuccess) onSuccess();
      setOpen(false);
    } catch (err) {
      toast.error(`Failed to update ${entityName}.`);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer hover:bg-input/90 dark:hover:bg-foreground/50"
        >
          <Pencil className="h-5 w-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Edit {entityName}</DrawerTitle>
          <DrawerDescription>
            Update {entityName.toLowerCase()} details below and click save.
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="edit-form">
            {fields.map((field) => {
              const value = formState[field.name as keyof T];

              switch (field.type) {
                case "checkbox":
                  return (
                    <div key={field.name} className="flex items-center gap-2">
                      <input
                        id={field.name}
                        type="checkbox"
                        checked={!!value}
                        onChange={(e) =>
                          handleChange(field.name, e.target.checked)
                        }
                        className="h-4 w-4 accent-primary"
                      />
                      <label htmlFor={field.name} className="text-white">
                        {field.label}
                      </label>
                    </div>
                  );

                case "select":
                  return (
                    <div key={field.name} className="grid gap-2">
                      <Label htmlFor={field.name}>{field.label}</Label>
                      <select
                        id={field.name}
                        value={value as string}
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                        className="border border-input bg-background rounded-md px-3 py-2"
                        required={field.required}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );

                default:
                  return (
                    <div key={field.name} className="grid gap-2">
                      <Label htmlFor={field.name}>{field.label}</Label>
                      <Input
                        id={field.name}
                        type={field.type || "text"}
                        placeholder={field.placeholder}
                        value={(value as string | number) ?? ""}
                        required={field.required}
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                        className="w-full"
                      />
                    </div>
                  );
              }
            })}
          </form>
        </div>

        <DrawerFooter>
          <Button type="submit" disabled={isSubmitting} form="edit-form">
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" type="button" disabled={isSubmitting}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
