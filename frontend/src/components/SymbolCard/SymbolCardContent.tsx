import React from 'react';
import PriceContainer from './PriceContainer';
import InfoList from './InfoList';
import './symbolCard.css';

type SymbolCardContentProps = {
  price: number;
  companyName: string;
  industry: string;
  marketCap: number;
};

const SymbolCardContent: React.FC<SymbolCardContentProps> = React.memo(({ price, companyName, industry, marketCap }) => {
  return (
    <div className="symbolCard__content">
      <PriceContainer price={price} />
      <InfoList
        companyName={companyName}
        industry={industry}
        marketCap={marketCap}
      />
    </div>
  );
});

export default SymbolCardContent;
