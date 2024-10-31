import React, { memo } from 'react';
import PriceContainer from './PriceContainer';
import InfoList from './InfoList';
import { useAppSelector } from '@/hooks/redux';
import { selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import './symbolCard.css';

type SymbolCardContentProps = {
  price: number;
  companyName: string;
  industry: string;
  marketCap: number;
};

const SymbolCardContent: React.FC<SymbolCardContentProps> = React.memo(({ price, companyName, industry, marketCap }) => {
  const showCardInfo = useAppSelector(selectShowCardInfo);

  return (
    <div className="symbolCard__content">
      <PriceContainer price={price} />
      {showCardInfo && (
        <InfoList
          companyName={companyName}
          industry={industry}
          marketCap={marketCap}
        />
      )}
    </div>
  );
});

export default memo(SymbolCardContent);
