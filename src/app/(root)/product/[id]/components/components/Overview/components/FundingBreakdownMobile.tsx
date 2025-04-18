import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart, ArcElement } from 'chart.js';
import { IProduct } from '@/shared/types/product.interface';

Chart.register(ArcElement);

const generateColorGradient = (steps: number): string[] => {
  const startColor = [255, 0, 0];
  const endColor = [255, 255, 255];
  const stepFactor = 1 / (steps - 1);
  const colorArray: string[] = [];
  for (let i = 0; i < steps; i++) {
    const r = Math.round(startColor[0] + stepFactor * i * (endColor[0] - startColor[0]));
    const g = Math.round(startColor[1] + stepFactor * i * (endColor[1] - startColor[1]));
    const b = Math.round(startColor[2] + stepFactor * i * (endColor[2] - startColor[2]));
    colorArray.push(`rgb(${r},${g},${b})`);
  }
  return colorArray;
};

const calculateTotalCostForProduct = (amounts: number[] = []): number => {
  return amounts.reduce((total, value) => total + value, 0);
};

interface DonationLike {
  description: string;
  amountGoal: number;
}

interface DoughnutChartProps {
  data: DonationLike[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
  const colors = generateColorGradient(data.length);

  const chartData = {
    labels: data.map(item => item.description),
    datasets: [
      {
        data: data.map(item => item.amountGoal),
        backgroundColor: colors,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '75%',
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div style={{ width: '250px', height: '250px' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

interface ProductsProps {
  product: IProduct;
}

export default function FundingBreakdownMobile({ product }: ProductsProps) {
  const [donations, setDonations] = useState<DonationLike[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (product && Array.isArray(product.donationDescriptions) && Array.isArray(product.donationAmounts)) {
      const combined = product.donationDescriptions.map((desc, index) => ({
        description: desc,
        amountGoal: product.donationAmounts[index] || 0,
      }));
      setDonations(combined);
      setTotalCost(calculateTotalCostForProduct(product.donationAmounts));
    }
  }, [product]);

  if (!Array.isArray(product?.donationDescriptions) || !Array.isArray(product?.donationAmounts)) {
    return <div className="h-auto px-5 bg-[#000000] mb-10" />;
  }

  return (
    <div className="h-auto top-0 flex flex-col items-center text-white font-heebo px-5 bg-[#000000] mb-10">
      <h2 className="text-[24px] font-semibold mb-8 mt-10 text-[#FFFFFF] font-ekMukta">Gift Breakdown</h2>
      <div className="relative mb-10">
        <DoughnutChart data={donations} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl text-[#FFFFFF] font-medium">${totalCost.toLocaleString()}</span>
        </div>
      </div>
      <div className="mt-8 w-full max-w-[900px]">
        <div className="grid grid-cols-[1fr_auto_auto] items-start gap-y-[30px] gap-x-[20px]">
          <div className="font-bold text-[14px] font-roboto text-[#F5F5F7] ">Category</div>
          <div className="font-bold text-[14px] font-roboto text-[#F5F5F7] text-center">
            <div className="relative flex items-center gap-1">
              <span>Cost</span>
            </div>
          </div>
          <div className="font-bold text-[14px] font-roboto text-[#F5F5F7] text-center"></div>

          {donations.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center relative gap-2">
                <div className="relative flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.4, duration: 0.5 }}
                    className="w-[16px] h-[16px] rounded-full"
                    style={{ backgroundColor: generateColorGradient(donations.length)[index] }}
                  />
                  {index < donations.length - 1 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: '55px' }}
                      transition={{ delay: (index + 1) * 0.4, duration: 0.5 }}
                      className="absolute left-1/2 transform -translate-x-1/2 w-[2px]"
                      style={{ backgroundColor: generateColorGradient(donations.length)[index] }}
                    />
                  )}
                </div>
                <span className="ml-2 text-[#C4C4C4] text-[14px]">{item.description}</span>
              </div>
              <div className="text-[#C4C4C4] text-[14px] font-semibold text-center">
                ${item.amountGoal.toLocaleString()}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}