import './symbolCard.css';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import TrendImage from '@/components/TrendImage/TrendImage';
import SymbolCardHeader from './SymbolCardHeader'
import SymbolCardContent from './SymbolCardContent';
import useAnimationEffects from '@/hooks/useAnimationEffects';
import useSymbolCardClassName from '@/hooks/useSymbolCardClassName';
import useKeyboardClick from '@/hooks/useKeyboardClick';

type TrendType = 'increase' | 'decrease' | 'neutral';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  isSelected: boolean;
  hasActiveCard: boolean;
};

const SymbolCard: React.FC<SymbolCardProps> =
  ({ id, onClick, isSelected = false, hasActiveCard }) => {
    const { companyName, industry, marketCap, trend } = useAppSelector((state) => state.stocks.entities[id]);
    const price = useAppSelector((state) => state.prices[id]);



    const normalizedTrend: TrendType = useMemo(() => {
      if (trend) {
        const lowerTrend = trend.toLowerCase();
        if (lowerTrend === 'increase') return 'increase';
        if (lowerTrend === 'decrease') return 'decrease';
      }
      return 'neutral';
    }, [trend]);

    const { isShaking, priceChangeEffect } = useAnimationEffects(price, normalizedTrend);
    const cardClassName = useSymbolCardClassName({
      isShaking,
      priceChangeEffect,
      isSelected,
      hasActiveCard,
    });

    const [currentTrendEffect, setCurrentTrendEffect] = useState<'increase' | 'decrease' | null>(
      null
    );

    useEffect(() => {
      if (priceChangeEffect === 'increase' || priceChangeEffect === 'decrease') {
        setCurrentTrendEffect(priceChangeEffect);
      }
    }, [priceChangeEffect]);

    const handleOnClick = useCallback(() => {
      onClick(id);
    }, [onClick, id]);

    const handleKeyDown = useKeyboardClick(handleOnClick);

    return (
      <div
        className={cardClassName}
        onClick={handleOnClick}
        tabIndex={0}
        role="button"
        aria-selected={isSelected}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        <TrendImage trend={currentTrendEffect} />
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
