import './symbolCard.css';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import SymbolCardHeader from './SymbolCardHeader'
import SymbolCardContent from './SymbolCardContent';
import upTrendImage from '@/assets/up.png';
import downTrendImage from '@/assets/down.png';
import useAnimationEffects from '@/hooks/useAnimationEffects';


type TrendType = 'increase' | 'decrease' | 'neutral';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  isSelected: boolean;
  hasActiveCard: boolean;
};

const SymbolCard: React.FC<SymbolCardProps> =
  ({ id, onClick, price, isSelected = false, hasActiveCard }) => {
    const { companyName, industry, marketCap, trend } = useAppSelector((state) => state.stocks.entities[id]);

    const normalizedTrend: TrendType = useMemo(() => {
      if (trend) {
        const lowerTrend = trend.toLowerCase();
        if (lowerTrend === 'increase') return 'increase';
        if (lowerTrend === 'decrease') return 'decrease';
      }
      return 'neutral';
    }, [trend]);

    const { isShaking, priceChangeEffect } = useAnimationEffects(price, normalizedTrend);

    const [currentTrendEffect, setCurrentTrendEffect] = useState<'increase' | 'decrease' | null>(
      null
    );

    useEffect(() => {
      if (priceChangeEffect === 'increase' || priceChangeEffect === 'decrease') {
        setCurrentTrendEffect(priceChangeEffect);
      }
    }, [priceChangeEffect]);

    const cardClassName = useMemo(() => {
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

    const handleOnClick = useCallback(() => {
      onClick(id);
    }, [onClick, id]);


    const trendImage = useMemo(() => {
      if (currentTrendEffect === 'increase') {
        return upTrendImage;
      } else if (currentTrendEffect === 'decrease') {
        return downTrendImage;
      }
      return null;
    }, [currentTrendEffect]);


    return (
      <div
        className={cardClassName}
        onClick={handleOnClick}
        tabIndex={0}
        role="button"
        aria-selected={isSelected}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleOnClick();
          }
        }}
      >
        {trendImage && (
          <img
            className="symbolCard__trend-image"
            src={trendImage}
            alt={`${currentTrendEffect} trend`}
          />
        )}
        <SymbolCardHeader id={id} trend={normalizedTrend} />
        <SymbolCardContent
          price={price}
          companyName={companyName}
          industry={industry}
          marketCap={marketCap}
        />
      </div >
    );
  };

export default memo(SymbolCard);
