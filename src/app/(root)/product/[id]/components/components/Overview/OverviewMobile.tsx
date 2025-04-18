import React from 'react';
import StageDescription from './components/StageDescription';
import Info from './components/Info';
import DonationProgress from './components/components/DonationProgress';
import { IProduct } from '@/shared/types/product.interface';
import StageDescriptionMobile from './components/StageDescriptionMobile';

interface OverviewProps {
  products: IProduct;
}

const Overview = ({ products }: OverviewProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div>
        {/* <StageDescriptionMobile products={products} /> */}
      </div>
      {/* <DonationProgress /> */}
      {/* <Info /> */}
    </div>
  );
};

export default Overview;
