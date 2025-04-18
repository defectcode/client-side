import React, { useRef, useState } from "react";
import Image from "next/image";
import { IProduct } from "@/shared/types/product.interface";

interface CustomCarouselProps {
  product: IProduct | null | undefined;
}

export function CustomCarousel({ product }: CustomCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Protejează împotriva accesului la un obiect undefined
  if (!product || !product.images || product.images.length === 0) {
    return 
  }

  const productImages = product.images;

  return (
    <div className="relative w-full overflow-hidden h-[361px]">
      {/* Afișăm doar imaginea curentă */}
      <div className="w-full h-full flex justify-center items-center">
        <Image
          src={productImages[currentIndex]}
          alt={product.title ?? "Product image"}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Indicatori (dots) */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-2 h-4">
        {productImages.map((_, index) => (
          <span
            key={index}
            className={`h-[6px] w-[6px] rounded-full transition-all duration-300 cursor-pointer 
              ${index === currentIndex ? 'bg-[#FFFFFF]/50' : 'bg-[#E8E8ED] opacity-50'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div> */}
    </div>
  );
}
