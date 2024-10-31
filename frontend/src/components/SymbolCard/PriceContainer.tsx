import React, { memo } from 'react';
import './symbolCard.css';

type PriceContainerProps = {
  price: number;
};

const PriceContainer: React.FC<PriceContainerProps> = ({ price }) => {
  const roundedPrice = price ? price.toFixed(2) : '--';

  return (
    <div className="symbolCard__price-container">
      <div className="symbolCard__price-label">PRICE:</div>
      <div className="symbolCard__price">${roundedPrice}</div>
    </div>
  );
};

export default memo(PriceContainer);
