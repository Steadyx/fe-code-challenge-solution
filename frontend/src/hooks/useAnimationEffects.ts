import { useState, useEffect, useRef } from 'react';

type TrendType = 'increase' | 'decrease' | 'neutral';

const useAnimationEffects = (
  price: number,
  trend: TrendType,
  threshold: number = 25
) => {
  const [animation, setAnimation] = useState<{
    isShaking: boolean;
    priceChangeEffect: 'increase' | 'decrease' | null;
  }>({ isShaking: false, priceChangeEffect: null });

  const prevRef = useRef<{ price: number; trend: TrendType } | null>(null);

  useEffect(() => {
    const prev = prevRef.current;

    const percentageChange = prev?.price
      ? ((price - prev.price) / Math.abs(prev.price)) * 100
      : 0;

    const isPriceChanged = prev?.price !== price;
    const isTrendChanged = prev?.trend !== trend;
    const shouldShake = (isPriceChanged && Math.abs(percentageChange) > threshold) || isTrendChanged;

    const effect = isPriceChanged
      ? (percentageChange > 0 ? 'increase' : 'decrease')
      : null;

    if ((shouldShake || effect) && prev) {
      setAnimation({
        isShaking: shouldShake,
        priceChangeEffect: effect,
      });

      const timeout = setTimeout(() => {
        setAnimation({ isShaking: false, priceChangeEffect: null });
      }, 300);

      return () => clearTimeout(timeout);
    }

    prevRef.current = { price, trend };
  }, [price, trend, threshold]);

  return animation;
};

export default useAnimationEffects;
