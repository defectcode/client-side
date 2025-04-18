import Image from 'next/image';
import { useRef, useState } from 'react';
import { IProduct } from '@/shared/types/product.interface';
import { images } from '../constants/carouselData';
import Title from "../components/Title";
import FundraisingProgress from '../components/Progres';
import VideoPlayer from '@/app/(root)/wishlist/[id]/components/Video/VideoPlayer';
import Icons from '@/app/(root)/wishlist/[id]/components/Video/Icons';
import GiftSection from '@/app/(root)/wishlist/[id]/components/mobile/GiftSection';

interface ProductGalleryProps {
  product: IProduct;
}

export function ProductGalleryMobile({ product }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentData = images[0];
  const headerRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleScreenClick = () => {
      setIsVideoVisible(true);
      document.body.classList.add('overflow-hidden'); 
  };

  const handleClose = () => {
      setIsVideoVisible(false);
      document.body.classList.remove('overflow-hidden');
  };

  return (
    <div ref={headerRef} className="relative w-screen h-screen">
      {/* Background Image Covering Full Screen */}
      <div className="absolute inset-0">
        <Image
          src={product.images[currentIndex]}
          alt={product.title}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Gradient Overlay - Dreapta pe desktop, de jos în sus pe mobil */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t lg:bg-gradient-to-l from-black/90 via-black/70 to-transparent"></div>

      {/* Overlay Content - Fixat dreapta pe desktop, jos pe mobil */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-center flex flex-col justify-end items-center h-[40%] 
      lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[40%] lg:items-end lg:justify-center lg:p-12 lg:pr-24 lg:text-right">
        <div className="flex flex-col gap-6 w-full">
          <Title title={product.title} description={product.description} />
          <FundraisingProgress product={product} />
          <GiftSection />
        </div>
      </div>

      {/* Play Video Button */}
      <button 
        onClick={handleScreenClick} 
        className="absolute inset-0 flex items-center justify-center z-20 bg-transparent"
      >
        <Image width={50} height={50} src="/imgs/pause.svg" alt="Play Video" className="w-[50px] h-[50px]" />
      </button>

      {/* Video Player */}
      {isVideoVisible && (
        <VideoPlayer 
          videoSrc={product.video}
          onClose={handleClose}
          isMuted={isMuted}
        />
      )}

      <Icons 
        isMuted={isMuted} 
        setIsMuted={setIsMuted} 
        handleScreenClick={handleScreenClick}
      />
    </div>
  );
}
