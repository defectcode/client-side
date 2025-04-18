'use client';
import React, { useState, useEffect } from 'react';
import StageDescription from './components/StageDescription';
import FundingBreakdown from './components/FundingBreakdown';

const Overview = ({ products = [] }) => {
  const [filters, setFilters] = useState({});

  useEffect(() => {
    console.log('Products:', products);
  }, [products]);

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-[#000000] py-8">
      {/* Container Centrat cu max 1400px */}
      <div className="flex w-full max-w-[1400px] mx-auto h-full">
        {/* Partea Stângă */}
        <div className="w-2/3 p-8 bg-[#000000] flex flex-col justify-center">
          <StageDescription />
        </div>
        
        {/* Partea Dreaptă */}
        <div className="w-1/3 p-8 bg-[#000000] flex flex-col justify-center">
          <FundingBreakdown />
        </div>
      </div>
    </div>
  );
};

export default Overview;
