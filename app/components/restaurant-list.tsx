// @ts-nocheck
"use client";

import { trpc } from "@/utils/trpc";
import { RestaurantCard } from "./restaurant-card";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function RestaurantList() {
  const searchParams = useSearchParams();

  const queryInput = useMemo(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    return {
      category: category && category !== "entire" ? category : undefined,
      search: search || undefined,
    };
  }, [searchParams]);

  console.log("Query input >>>>", queryInput);

  const { data: restaurants, isLoading } =
    trpc.restaurant.getAll.useQuery(queryInput);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-3"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!restaurants?.json || restaurants?.json?.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No restaurants found</h3>
        <p className="text-gray-500">Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {restaurants?.json?.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          id={restaurant.id}
          name={restaurant.name}
          desc={restaurant.desc}
          rating={restaurant.rating}
          rating_count={restaurant.rating_count}
          category={restaurant.category}
          city={restaurant.city}
          price_range={restaurant.price_range}
          images={restaurant.images}
          featured={restaurant.featured as unknown}
          isFavorite={restaurant.isFavorite}
        />
      ))}
    </div>
  );
}
