import { IProduct } from "@/shared/types/product.interface";
import { useState, useEffect } from "react";

const useCountdownTimer = (product: IProduct | undefined) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!product || !product.createdAt) return;

    const createdAt = new Date(product.createdAt).getTime();
    const targetDate = createdAt + product.times * 24 * 60 * 60 * 1000;

    const updateTimeLeft = () => {
      const diff = Math.floor((targetDate - Date.now()) / 1000);
      setTimeLeft(diff > 0 ? diff : 0);
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [product]);


  const formatTime = () => {
    if (!product || !product.createdAt) return "";
    if (timeLeft <= 0) return "Time's up!";
    if (timeLeft >= 86400) return `${Math.floor(timeLeft / 86400)} days left`;
    if (timeLeft >= 3600) return `${Math.floor(timeLeft / 3600)} hours left`;
    if (timeLeft >= 60) return `${Math.floor(timeLeft / 60)} minutes left`;
    return `${timeLeft} seconds left`;
  };

  return {
    timeLeft,
    formatted: formatTime(),
  };
};

export default useCountdownTimer;
