"use client";
import { useState, startTransition } from "react";
import { createBrand, BrandInput } from "@/actions/brands/brandPost";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BrandForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const brandData: BrandInput = {
      name,
      slug,
      logoUrl,
      description,
      isActive,
    };
    startTransition(async () => {
      const result = await createBrand(brandData);
      console.log("Created brand:", result);
      setLoading(false);
      setName("");
      setSlug("");
      setLogoUrl("");
      setDescription("");
      setIsActive(true);
    });
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full p-6 gap-4 bg-[#171717] rounded-2xl shadow-md"
      >
        <h1 className="text-center pb-2 text-lg font-semibold text-white">
          Add a New Brand
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          <Input
            name="name"
            type="text"
            placeholder="Brand Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
          <Input
            name="slug"
            type="text"
            placeholder="Slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full"
          />
        </div>

        <Input
          name="logoUrl"
          type="text"
          placeholder="Logo URL"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          className="w-full"
        />

        <Input
          name="description"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
        />

        <div className="flex ">
          <Button
            variant="default"
            type="submit"
            className="cursor-pointer w-full"
          >
            {loading ? "Creating..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}
