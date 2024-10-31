import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '@/components/SymbolCard';
import { fetchAllStocks, selectors, setActiveSymbol } from '@/store/stocksSlice';
import './symbolsGrid.css';

type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
};

const SymbolsGrid = ({ onSymbolClick }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const activeSymbolId = useAppSelector(selectors.selectActiveSymbolId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);


  const handleSymbolClick = useCallback(
    (symbolId: string) => {
      const newActiveSymbol = activeSymbolId === symbolId ? null : symbolId;
      dispatch(setActiveSymbol(newActiveSymbol));
      onSymbolClick(symbolId);
    },
    [dispatch, activeSymbolId, onSymbolClick]
  );

  const hasActiveCard = Boolean(activeSymbolId);

  return (
    <div className="symbols-grid">
      {stockSymbols.map((id) => (
        <SymbolCard
          key={id}
          id={id}
          price={prices[id]}
          onClick={handleSymbolClick}
          isSelected={activeSymbolId === id}
          hasActiveCard={hasActiveCard}
        />
      ))}
    </div>
  );
};

export default SymbolsGrid;
