import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

// const costData = [
//     { category: 'Rent and Prepare the Space', cost: 75000, week: '6-8' },
//     { category: 'Premium Equipment', cost: 65000, week: '3-4' },
//     { category: 'Staff (first month)', cost: 17000, week: '5-6' },
//     { category: 'Materials (first month)', cost: 20000, week: '7-9' },
//     { category: 'Additional Costs for International Shipping and Online Orders', cost: 50000, week: '3-4' },
// ];


const costData = [
    { category: 'Sony ZV-1 II', cost: 799 },
    { category: 'SanDisk Extreme PRO SDXC 1TB (2x)', cost: 290 },
    { category: 'Sony GP-VPT2BT Wireless Grip', cost: 143 },
    { category: 'Sony NP-BX1 Batteries (2x)', cost: 100 },
    { category: 'Sony Camera Bag ', cost: 50 },
    { category: 'Godox LED6R RGB', cost: 35 },
];

const generateColorGradient = (steps) => {
    const startColor = [255, 0, 0];
    const endColor = [255, 255, 255];
    const stepFactor = 1 / (steps - 1);
    const colorArray = [];
    for (let i = 0; i < steps; i++) {
        const r = Math.round(startColor[0] + stepFactor * i * (endColor[0] - startColor[0]));
        const g = Math.round(startColor[1] + stepFactor * i * (endColor[1] - startColor[1]));
        const b = Math.round(startColor[2] + stepFactor * i * (endColor[2] - startColor[2]));
        colorArray.push(`rgb(${r},${g},${b})`);
    }
    return colorArray;
};

const calculateTotalCost = () => {
    return costData.reduce((total, item) => total + item.cost, 0);
};

const DoughnutChart = ({ data }) => {
    const colors = generateColorGradient(data.length);

    const chartData = {
        labels: data.map(item => item.category),
        datasets: [
            {
                data: data.map(item => item.cost),
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

const FundingBreakdownMobile = () => {
    const [totalCost, setTotalCost] = useState(calculateTotalCost());

    useEffect(() => {
        setTotalCost(calculateTotalCost());
    }, []);

    return (
        <div className="h-auto top-0 flex flex-col items-center text-white font-heebo px-5 bg-[#000000] mb-10">
            <h2 className="text-[24px] font-semibold mb-8 mt-10 text-[#FFFFFF] font-ekMukta">Gift Breakdown</h2>
            <div className="relative mb-10">
                <DoughnutChart data={costData} />
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Înlocuiește $ cu $ */}
                    <span className="text-xl text-[#FFFFFF] font-medium">${totalCost.toLocaleString()}</span>
                </div>
            </div>
            <div className="mt-8 w-full max-w-[900px]">
                <div className="grid grid-cols-[1fr_auto_auto] items-start gap-y-[30px] gap-x-[20px]">
                    {/* Headings */}
                    <div className="font-bold text-[14px] font-roboto text-[#F5F5F7] ">Category</div>
                    <div className="font-bold text-[14px] font-roboto text-[#F5F5F7] text-center">
                        <div className="relative flex items-center gap-1">
                            <span>Cost</span>
                        </div>
                    </div>
                    <div className="font-bold text-[14px] font-roboto text-[#F5F5F7] text-center"></div>

                    {/* Data Rows */}
                    {costData.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className="flex items-center relative gap-2">
                                <div className="relative flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.4, duration: 0.5 }}
                                        className="w-[16px] h-[16px] rounded-full"
                                        style={{ backgroundColor: generateColorGradient(costData.length)[index] }}
                                    />
                                    {index < costData.length - 1 && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: '55px' }}
                                            transition={{ delay: (index + 1) * 0.4, duration: 0.5 }}
                                            className="absolute left-1/2 transform -translate-x-1/2 w-[2px]"
                                            style={{ backgroundColor: generateColorGradient(costData.length)[index] }}
                                        />
                                    )}
                                </div>
                                <span className="ml-2 text-[#C4C4C4] text-[14px]">{item.category}</span>
                            </div>
                            <div className="text-[#C4C4C4] text-[14px] font-semibold text-center">
                                {/* Înlocuiește $ cu $ */}
                                ${item.cost.toLocaleString()}
                            </div>
                            <div className="text-[#C4C4C4] text-[14px] text-center">
                                {item.week}
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div>
            </div>
        </div>
    );
};

export default FundingBreakdownMobile;
