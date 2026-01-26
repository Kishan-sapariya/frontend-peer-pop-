// components/ImageCarousel.js
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageCarousel({ images, altPrefix }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const showPrevButton = images.length > 1 && currentIndex > 0;
  const showNextButton = images.length > 1 && currentIndex < images.length - 1;

  return (
    <div className="relative w-full h-auto max-h-96 aspect-video rounded-lg overflow-hidden flex items-center justify-center">
      <img
        src={images[currentIndex]}
        alt={`${altPrefix} - Image ${currentIndex + 1}`}
        className="w-full h-full object-contain bg-gray-200 transition-opacity duration-300"
      />

      {/* Left Navigation Button */}
      {showPrevButton && (
        <Button
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white rounded-full p-1 z-10"
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      )}

      {/* Right Navigation Button */}
      {showNextButton && (
        <Button
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white rounded-full p-1 z-10"
          onClick={handleNext}
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      )}

      {/* Image Counter (Optional, but useful for carousels) */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
