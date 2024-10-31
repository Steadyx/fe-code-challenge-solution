import { useMemo } from 'react';

type UseSymbolCardClassNameProps = {
  isShaking: boolean;
  priceChangeEffect: 'increase' | 'decrease' | 'neutral' | null;
  isSelected: boolean;
  hasActiveCard: boolean;
};

const useSymbolCardClassName = ({
  isShaking,
  priceChangeEffect,
  isSelected,
  hasActiveCard,
}: UseSymbolCardClassNameProps) => {
  return useMemo(() => {
    const baseClasses = [
      'symbolCard',
      isShaking && 'symbolCard__shake-animation',
      priceChangeEffect === 'increase' && 'symbolCard--price-increase',
      priceChangeEffect === 'decrease' && 'symbolCard--price-decrease',
    ].filter(Boolean);

    if (hasActiveCard) {
      return isSelected
        ? `${baseClasses.join(' ')} symbolCard--active`
        : `${baseClasses.join(' ')} symbolCard--inactive`;
    }

    return baseClasses.join(' ');
  }, [isShaking, priceChangeEffect, isSelected, hasActiveCard]);
};

export default useSymbolCardClassName;
