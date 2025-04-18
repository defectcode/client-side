import Image from 'next/image';
import { useState } from 'react';
import { IProduct } from '@/shared/types/product.interface';

interface ProductGalleryProps {
  product: IProduct;
}

export function ProductGalleryMobile({ product }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className="relative w-screen h-screen">
      <Image
        src={product.images[currentIndex]}
        alt={product.title}
        layout="fill"
        objectFit="cover"
      />

      <div
        className="absolute w-full h-[272px] bottom-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.4) 75%, rgba(0, 0, 0, 0.1) 90%, rgba(0, 0, 0, 0) 100%)",
        }}
      ></div>
    </div>
  );
}
