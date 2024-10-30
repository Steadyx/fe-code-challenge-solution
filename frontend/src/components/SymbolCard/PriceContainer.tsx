import React, { useMemo } from 'react';
import './symbolCard.css';

type PriceContainerProps = {
  price: number;
};

const PriceContainer: React.FC<PriceContainerProps> = React.memo(({ price }) => {
  const roundedPrice = useMemo(() => (price ? price.toFixed(2) : '--'), [price]);

  return (
    <div className="symbolCard__price-container">
      <div className="symbolCard__price-label">PRICE:</div>
      <div className="symbolCard__price">${roundedPrice}</div>
    </div>
  );
});

export default PriceContainer;
