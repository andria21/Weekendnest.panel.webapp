import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  {
    value: "en",
    label: "USA",
  },
  {
    value: "ge",
    label: "Georgia",
  },
  {
    value: "ru",
    label: "Russia",
  },
];

export function LanguagePicker() {
  return (
    <Select>
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value} className="cursor-pointer">
              {lang.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
