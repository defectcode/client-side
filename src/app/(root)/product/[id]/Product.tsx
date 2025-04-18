'use client'

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { productService } from '@/services/product.service';
import { IProduct } from '@/shared/types/product.interface';
import { ProductInfo } from './product-info/ProductInfo';
import { ProductGalleryDesktop } from './prodcut-gallery/ProdcutGalleryDesktop';
import { ProductGalleryMobile } from './prodcut-gallery/ProdcutGalleryMobile';
import useDeviceType from './components/hooks/useDeviceType';
import OverviewMobile from './components/components/Overview/OverviewMobile';
import Overview from './components/components/Overview/Overview';
import RewardsMobile from '@/app/crowdfunding/components/components/Rewards/RewardsMobile';
import Rewards from '@/app/crowdfunding/components/components/Rewards/Rewards';
import CommunityMobile from '@/app/crowdfunding/components/components/Community/CommunityMobile';
import Community from '@/app/crowdfunding/components/components/Community/Community';
import ExtrasMobile from '@/app/crowdfunding/components/components/Extras/ExtrasMobile';
import Extras from '@/app/crowdfunding/components/components/Extras/ExtrasMobile';
import NavBarCrowdfundingMobileStatic from '@/app/crowdfunding/components/mobile/NavBarCrowdfundingMobileStatic';
import HeaderCrowdfunding from '@/app/crowdfunding/HeaderCrowdfunding';
import NavBarCrowdfundingMobile from '@/app/crowdfunding/components/mobile/NavBarCrowdfundingMobile';
import { IRewards } from '@/shared/types/rewards.interface';

interface ProductProps {
  initialProduct: IProduct;
  products: IProduct;
  id?: string;
  rewards: IRewards[],
}

export function Product({ products, initialProduct, id = '', rewards }: ProductProps) {
  const { data: product } = useQuery({
    queryKey: ['product', initialProduct.id],
    queryFn: () => productService.getById(id),
    initialData: initialProduct,
    enabled: !!id, 
  });

  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); // Rulează o dată la montare
    window.addEventListener('resize', handleResize); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const isMobile = useDeviceType();
    const [activeSection, setActiveSection] = useState('overview');

    const renderSection = () => {
        switch (activeSection) {
            case 'overview':
                return isMobile ? <OverviewMobile products={products} /> : <Overview />;
            case 'rewards':
                return isMobile ? <RewardsMobile rewards={rewards} /> : <Rewards />;
            case 'community':
                return isMobile ? <CommunityMobile /> : <Community />;
            case 'extras':
                return isMobile ? <ExtrasMobile /> : <Extras />;
            default:
                return isMobile ? <OverviewMobile products={products} /> : <Overview />;
        }
    };

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <div>
      <div className="mx-auto">
        <div className="w-full">
          {/* {isDesktop ? (
            <ProductGalleryDesktop product={product} />
          ) : (
            <ProductGalleryMobile product={product} />
          )} */}

          {isMobile && activeSection === 'overview' && <ProductGalleryMobile product={product} />}
          {/* {!isMobile && activeSection === 'overview' && <HeaderCrowdfunding />} */}
        </div>

        {!isMobile && activeSection === 'overview' && <HeaderCrowdfunding />}
            
            {['rewards', 'community', 'extras'].includes(activeSection) && (
                <NavBarCrowdfundingMobileStatic
                    setActiveSection={setActiveSection}
                    activeSection={activeSection}
                />
            )}


            {isMobile ? (
                <div>
                    <NavBarCrowdfundingMobile 
                        setActiveSection={setActiveSection} 
                        activeSection={activeSection} 
                    />
                </div>
                ) : (
                    null
                )
            }
        <div className="w-full lg:w-1/3 lg:mt-0 md:px-0">
          {/* <ProductInfo product={product} /> */}
          <div>{renderSection()}</div>
          
        </div>
      </div>
    </div>
  );
}
