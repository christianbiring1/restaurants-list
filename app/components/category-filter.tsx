"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { textByStoreCategory, popularCategories } from "@/constants/categories";
import { cn } from "@/lib/utils";

export function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "entire";

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handleCategoryChange = (category: string) => {
    router.push(`${pathname}?${createQueryString("category", category)}`);
  };

  return (
    <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
      <button
        onClick={() => handleCategoryChange("entire")}
        className={cn(
          "px-4 py-2 text-sm rounded-md whitespace-nowrap",
          currentCategory === "entire"
            ? "bg-gray-800 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        )}
      >
        entire
      </button>
      {popularCategories.slice(1).map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={cn(
            "px-4 py-2 text-sm rounded-md whitespace-nowrap",
            currentCategory === category
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          )}
        >
          {textByStoreCategory[category as any]}
        </button>
      ))}
    </div>
  );
}
