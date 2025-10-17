"use client";

import { useState, FormEvent } from "react";
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
import { updateBrand } from "@/actions/brands/brandPut";

interface EditBrandModalProps {
  brand: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    description?: string;
    isActive: boolean;
  };
}

export const EditBrandModal = ({ brand }: EditBrandModalProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(brand.name);
  const [slug, setSlug] = useState(brand.slug);
  const [logoUrl, setLogoUrl] = useState(brand.logoUrl || "");
  const [description, setDescription] = useState(brand.description || "");
  const [isActive, setIsActive] = useState(brand.isActive);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await updateBrand({
      id: parseInt(brand.id),
      name,
      slug,
      logoUrl,
      description,
      isActive,
    });

    console.log("Updated brand:", result);
    setIsSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer hover:bg-input/90 dark:hover:bg-foreground/50"
        >
          <Pencil className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogPortal>
        {/* overlay */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn z-50" />

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Brand</DialogTitle>
            <DialogDescription>
              Update brand details below and click save.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Brand name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="Brand slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                placeholder="https://..."
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Short description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <Label htmlFor="isActive">Active</Label>
              <input
                id="isActive"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 accent-primary"
              />
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="flex items-center justify-center gap-2 cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
