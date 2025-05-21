"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }

    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Auto-advance slides every 5 seconds if there's more than one image
  // useEffect(() => {
  //   if (images.length <= 1) return;

  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [currentIndex, images.length]);

  // If there's only one image or no images, don't show controls
  if (images.length <= 1) {
    return (
      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
        <Image
          src={images[0] || "/placeholder.svg?height=250&width=400"}
          alt={alt}
          width={400}
          height={250}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-48 overflow-hidden rounded-t-lg"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute top-0 left-0 w-full h-full transition-opacity duration-300",
              index === currentIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}
          >
            <Image
              src={image || "/placeholder.svg?height=250&width=400"}
              alt={`${alt} - image ${index + 1}`}
              width={400}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 bg-gray-800 p-2 rounded-xl">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-colors cursor-pointer",
              index === currentIndex ? "bg-white" : "bg-white/50"
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
