import { useState, useEffect, useRef } from 'react';

type TrendType = 'increase' | 'decrease' | 'neutral';

const useAnimationEffects = (
  price: number,
  trend: TrendType,
  threshold: number = 25
) => {
  const [animation, setAnimation] = useState({
    isShaking: false,
    priceChangeEffect: null as 'increase' | 'decrease' | null,
  });

  const prevRef = useRef<{ price: number; trend: TrendType } | null>(null);

  useEffect(() => {
    const prev = prevRef.current;

    if (prev) {
      const percentageChange = prev.price
        ? ((price - prev.price) / Math.abs(prev.price)) * 100
        : 0;

      const shouldShake = Math.abs(percentageChange) >= threshold || prev.trend !== trend;
      const priceChangeEffect = percentageChange > 0 ? 'increase' : percentageChange < 0 ? 'decrease' : null;

      if (shouldShake || priceChangeEffect) {
        setAnimation({ isShaking: shouldShake, priceChangeEffect });

        const timeout = setTimeout(() => {
          setAnimation({ isShaking: false, priceChangeEffect: null });
        }, 300);

        return () => clearTimeout(timeout);
      }
    }

    prevRef.current = { price, trend };
  }, [price, trend, threshold]);

  return animation;
};

export default useAnimationEffects;
