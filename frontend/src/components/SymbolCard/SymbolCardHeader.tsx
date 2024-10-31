import React, { memo } from 'react';
import './symbolCard.css';

type SymbolCardProps = {
  id: string;
  trend?: string;
}

const SymbolCardHeader: React.FC<SymbolCardProps> = ({ id }) => {
  return (
    <div className="symbolCard__header">
      <span className="symbolCard__symbol">{id}</span>
    </div>
  )
}

export default memo(SymbolCardHeader);
