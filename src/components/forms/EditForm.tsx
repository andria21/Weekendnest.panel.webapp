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
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer hover:bg-input/90 dark:hover:bg-foreground/50">
          <Pencil className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn z-50" />

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit {entityName}</DialogTitle>
            <DialogDescription>
              Update {entityName.toLowerCase()} details below and click save.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4">
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
                        onChange={(e) => handleChange(field.name, e.target.checked)}
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
                        onChange={(e) => handleChange(field.name, e.target.value)}
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
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        className="w-full"
                      />
                    </div>
                  );
              }
            })}

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
