import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PayPalButton from './PayPal/PayPalButton';
import { IProduct } from '@/shared/types/product.interface';
import type { PaymentRequest } from '@stripe/stripe-js';
import CheckoutButton from '@/components/checkout';


interface SupportFormProps {
  product?: IProduct;
  onDonationSuccess?: () => void;
}

const SupportForm: React.FC<SupportFormProps> = ({ product, onDonationSuccess }) => {
  const [amount, setAmount] = useState(50);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [fullWishAmount] = useState(product?.price || 0);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [canUsePaymentRequest, setCanUsePaymentRequest] = useState(false);
  const [walletType, setWalletType] = useState<'google' | 'apple'>('google');

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };
    if (amount > 0) fetchClientSecret();
  }, [amount]);

  useEffect(() => {
    if (stripe && amount > 0) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Support Amount',
          amount: amount * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
          setCanUsePaymentRequest(true);
        }
      });

      pr.on('paymentmethod', async (event) => {
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret!, {
          payment_method: event.paymentMethod.id,
        });

        if (error) {
          event.complete('fail');
          console.error("🔴 Payment Error:", error);
        } else {
          event.complete('success');
          await handlePaymentSuccess(paymentIntent);
        }
      });
    }
  }, [stripe, amount, clientSecret]);

  const handleStripePayment = async () => {
    if (!stripe || !elements || !clientSecret) return;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: { name: 'Anonymous' },
      },
    });

    if (result.error) {
      console.error(result.error.message);
      handlePaymentFailure();
    } else if (result.paymentIntent?.status === 'succeeded') {
      await handlePaymentSuccess(result.paymentIntent);
    }
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    const userEmail = paymentIntent?.charges?.data[0]?.billing_details?.email || "no-email@example.com";
    try {
      await fetch('/api/sendThankYouEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, amount }),
      });
      onDonationSuccess?.();
      router.push('/success');
    } catch (error) {
      router.push('/error');
    }
  };

  const handlePaymentFailure = () => router.push('/error');

  const handleAmountChange = (amt: number) => {
    setIsCustomAmount(false);
    setCustomAmount('');
    setAmount(amt);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    setAmount(value === '' ? 0 : parseFloat(value));
  };

  useEffect(() => {
    const isAppleDevice = /iPhone|iPad|Macintosh/.test(navigator.userAgent);
    setWalletType(isAppleDevice ? 'apple' : 'google');
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-[350px] h-auto w-full">
      <div className='w-full max-w-md'>
        <p className="mb-5 text-[#B7B7B7] text-[14px] font-inter leading-[1]">Select your gift amount</p>
        <div className="flex flex-wrap justify-between mb-5 text-sm">
          <div className="flex items-center justify-between w-full gap-2">
            {[1, 50, 500].map((val) => (
              <button
                key={val}
                onClick={() => handleAmountChange(val)}
                className={`flex items-center justify-center rounded-xl w-1/4 h-[45px] text-[16px] ${amount === val && !isCustomAmount ? 'bg-white text-black font-bold' : 'bg-[#252525] border border-[#F1F1F1]/10'}`}
              >${val}</button>
            ))}
            <div className="relative flex items-center w-1/4">
              <div className={`absolute left-[15px] font-ekMukta text-[16px] ${isCustomAmount ? 'text-black font-bold' : 'text-white'}`}>$</div>
              <input
                type="number"
                value={customAmount}
                onClick={() => setIsCustomAmount(true)}
                onChange={handleCustomAmountChange}
                className={`pl-[25px] py-[10px] rounded-xl w-full h-[45px] text-base focus:outline-none ${isCustomAmount ? 'bg-white text-black font-bold' : 'bg-[#252525] border border-[#F1F1F1]/10 text-white'}`}
                placeholder="Other"
              />
            </div>
          </div>

          <button
            onClick={() => handleAmountChange(fullWishAmount)}
            className={`flex items-center justify-between px-[14px] rounded-xl w-full h-[45px] mt-5 ${amount === fullWishAmount ? 'bg-white text-black' : 'bg-[#252525] border border-[#F1F1F1]/10'}`}
          >
            <p className={`text-[16px] ${amount === fullWishAmount ? 'font-semibold' : ''}`}>Gift the Full Wish Amount</p>
            <p className={`text-[15px] ${amount === fullWishAmount ? 'font-extrabold' : ''}`}>${amount}</p>
          </button>
        </div>

        <div className="my-5 flex justify-between items-center">
          <p className="text-white text-[16px]">Total</p>
          <div className="flex-grow border-t border-dotted border-gray-600 mx-[33px]"></div>
          <p className="text-white text-[16px]">${amount}</p>
        </div>

        <p className="mb-5 text-[#B7B7B7] text-[14px]">Select a Payment Method</p>
        <div className="flex items-center justify-between gap-4">
          {['stripe', 'card', 'paypal'].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={`rounded-xl flex items-center justify-center flex-grow h-[45px] ${paymentMethod === method ? 'bg-black text-white' : 'bg-[#252525] border border-[#F1F1F1]/10'}`}
            >
              {method === 'paypal' ? (
                <Image src="/icons/paypal.svg" width={48} height={1} alt="paypal" />
              ) : method === 'card' ? (
                <Image src="/icons/card.svg" width={64} height={1} alt="card" />
              ) : (
                <Image
                  src={walletType === 'apple' ? '/icons/apple-pay.png' : '/icons/google-pay.png'}
                  width={45}
                  height={1}
                  alt={`${walletType}-pay`}
                />
              )}
            </button>
          ))}
        </div>

        {/* {paymentMethod === 'stripe' && canUsePaymentRequest && paymentRequest && (
          <div className="mt-4">
            <PaymentRequestButtonElement options={{ paymentRequest }} />
          </div>
        )} */}

                {paymentMethod === 'stripe' && (
          <div className="flex justify-center items-end h-[48px]">
            <CheckoutButton amount={amount} onSuccess={undefined} />
          </div>
        )}

        {paymentMethod === 'card' && (
          <div className="mt-6">
            <CardElement />
            <button
              className="w-full h-[45px] bg-black text-white rounded-xl font-bold mt-4"
              onClick={handleStripePayment}
            >
              Gift Now
            </button>
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <div className="mt-6">
            <PayPalButton
              amount={amount}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportForm;