import React, { useState, useEffect } from 'react';
import Support from './Support';
import Modal from '../../../../../app/components/Header/components/Modal';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SupportForm from '@/app/components/Header/components/Payment/SupportForm';
import { IProduct } from '@/shared/types/product.interface';
import useCountdownTimer from './hooks/useCountdownTimer';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');



const FundraisingProgress = ({ product }: { product: IProduct }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalRaised, setTotalRaised] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const countdown = useCountdownTimer(product);


    const goalAmount = product?.goalAmount 
  ? parseInt(product.goalAmount.replace(/,/g, ''), 10) 
  : 0;


    useEffect(() => {
        const fetchProductDonations = async () => {
            try {
                const response = await fetch(`/api/orders/transactions/product/${product.id}`);
                if (!response.ok) throw new Error("Failed to fetch donations");

                const data = await response.json();
                setTotalRaised(data.totalRaised || 0);
                setTotalTransactions(data.totalGifters || 0);
            } catch (error) {
                console.error("Error fetching product donations:", error);
            }
        };

        fetchProductDonations();
        const interval = setInterval(fetchProductDonations, 15000);
        return () => clearInterval(interval);
    }, [product.id]);


    
    let rawProgressPercentage = (totalRaised / goalAmount) * 100 || 0;
    let progressPercentage: number = rawProgressPercentage > 0 && rawProgressPercentage < 1 
    ? parseFloat(rawProgressPercentage.toFixed(1)) 
    : Math.round(rawProgressPercentage);


    return (
        <div className="text-white">
            <div className="flex items-center justify-between mb-2 w-full lg:w-[346px]">
                <span className="text-[20px] lg:text-2xl font-ekmukta font-bold text-[#FFFFFF] leading-[1]">
                    ${totalRaised.toFixed(2)}
                </span>
                <span className="text-md block font-ekMukta text-[15px] md:text-[#E8E8ED] text-[#C1C1C1] leading-[1]">
                    <span className="text-[#FFFFFF] font-semibold font-ekMukta">{countdown.formatted}</span>
                </span>
            </div>

            <div className="relative w-full max-w-[400px] mx-auto"> 
                <div className="h-1 bg-[#FFFFFF]/50 rounded-full w-full relative">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-[#E50815] via-[#E50815] to-white"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }} 
                    ></div>

                    <div
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ left: `calc(${Math.min(progressPercentage, 100)}% - 6px)` }} 
                    >
                        <div className="w-[8px] h-[8px] rounded-full bg-white flex items-center justify-center">
                            <div className="w-[6px] h-[6px] rounded-full bg-white"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-[10px] lg:w-[346px]">
                <div className="flex flex-col">
                    <span className="font-semibold text-[15px] lg:text-[20px]">
                        <span className='font-semibold font-ekMukta text-[15px] md:text-[#E8E8ED] text-[#FFFFFF]'>
                            {progressPercentage}<span className='text-[13px] font-ekMukta'>%</span>&nbsp;
                        </span>
                        <span className="text-[#C1C1C1] font-ekmukta text-[15px]">
                            raised of ${product.price} goal
                        </span>
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-semibold font-ekMukta text-[16px] lg:text-[20px] md:text-[#E8E8ED] text-[#FFFFFF]">
                        {totalTransactions}
                    </span>
                    <span className="flex items-center text-[#C1C1C1] font-ekMukta font-normal text-[15px]">
                        gifters
                    </span>
                </div>
            </div>

            <div className="hidden md:block mt-2 lg:mt-10">
                <Support onClick={() => setIsModalOpen(true)} />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Elements stripe={stripePromise}>
                <SupportForm
                    product={product}
                    onDonationSuccess={() => {
                        // refă fetch-ul manual după plată reușită
                        fetch(`/api/orders/transactions/product/${product.id}`)
                        .then(res => res.json())
                        .then(data => {
                            setTotalRaised(data.totalRaised || 0);
                            setTotalTransactions(data.totalGifters || 0);
                        })
                        .catch(console.error);
                    }}
                />
                </Elements>
            </Modal>
        </div>
    );
}

export default FundraisingProgress;
