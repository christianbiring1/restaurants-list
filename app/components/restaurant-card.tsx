"use client";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { textByStoreCategory } from "@/constants/categories";
import { trpc } from "@/utils/trpc";
import { ImageCarousel } from "./image-carousel";

interface RestaurantCardProps {
  id: string;
  name: string;
  desc: string;
  rating: number;
  rating_count: number;
  category: string;
  city: string;
  price_range: string;
  images: string[];
  featured?: {
    text: string;
    icon: string;
  };
  isFavorite: boolean;
}

export function RestaurantCard({
  id,
  name,
  desc,
  rating,
  rating_count,
  category,
  city,
  price_range,
  images,
  featured,
  isFavorite: initialIsFavorite,
}: RestaurantCardProps) {
  const utils = trpc.useUtils();
  const { mutate } = trpc.restaurant.toggleFavorite.useMutation({
    onSuccess: () => {
      utils.restaurant.getAll.invalidate();
    },
  });

  const toggleFavorite = () => {
    mutate({ id });
  };

  return (
    <div className="flex flex-col rounded-lg overflow-hidden">
      <div className="relative">
        <ImageCarousel images={images} alt={name} />
        <button
          onClick={toggleFavorite}
          className="absolute bottom-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label={
            initialIsFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          <Heart
            className={cn(
              "w-5 h-5",
              initialIsFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
            )}
          />
        </button>
      </div>
      <div className="p-3 flex flex-col gap-1">
        {featured && (
          <div className="flex items-center gap-1 text-orange-500 text-xs">
            <span>★</span>
            <span>{featured.text}</span>
          </div>
        )}
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-base line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-gray-500">({rating_count})</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-1">{desc}</p>
        <div className="text-xs text-gray-500 uppercase">
          {city} · {textByStoreCategory[category as any]} · {price_range} won
        </div>
      </div>
    </div>
  );
}
