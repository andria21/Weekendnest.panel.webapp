"use client";

import { useState, startTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export interface FieldConfig {
  name: string;
  label: string;
  type?: "text" | "number" | "checkbox" | "select";
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  required?: boolean;
  initialValue?: unknown;
  serverAction?: (value: unknown) => Promise<unknown>;
}

export interface EntityFormProps<T> {
  title?: string;
  fields: FieldConfig[];
  submitAction: (data: T) => Promise<unknown>;
}

export function EntityForm<T>({
  title,
  fields,
  submitAction,
}: EntityFormProps<T>) {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] =
      field.initialValue ?? (field.type === "checkbox" ? false : "");
    return acc;
  }, {} as Record<string, unknown>);

  const [formState, setFormState] =
    useState<Record<string, unknown>>(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: unknown) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    startTransition(async () => {
      try {
        const result = await submitAction(formState as T);
        toast.success("Saved successfully!");
        setFormState(initialState);
        console.log("Submission result:", result);
      } catch (err) {
        toast.error("Something went wrong");
        console.error(err);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full p-6 gap-4 dark:bg-[#171717] rounded-2xl shadow-md"
    >
      {title && (
        <h1 className="text-center pb-2 text-lg font-semibold text-white">
          {title}
        </h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {fields.map((field) => {
          switch (field.type) {
            case "checkbox":
              return (
                <div key={field.name} className="w-full">
                  <Label
                    htmlFor={field.name}
                    className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors
               has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50
               dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                  >
                    <Checkbox
                      id={field.name}
                      checked={!!formState[field.name]}
                      onCheckedChange={(checked) =>
                        handleChange(field.name, !!checked)
                      }
                      className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white
                 dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                    <div className="grid gap-1.5 font-normal">
                      <span className="text-sm leading-none font-medium">
                        {formState[field.name] ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </Label>
                </div>
              );
            case "select":
              return (
                <div key={field.name} className="flex flex-col gap-2">
                  <label htmlFor={field.name} className="text-white">
                    {field.label}
                  </label>
                  <select
                    id={field.name}
                    value={(formState[field.name] as string) ?? ""}
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
            default: // text / number
              return (
                <Input
                  key={field.name}
                  name={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={(formState[field.name] as string | number) ?? ""}
                  required={field.required}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full"
                />
              );
          }
        })}
      </div>

      <div className="flex">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
