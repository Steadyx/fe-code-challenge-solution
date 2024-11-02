import { memo, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import SymbolCard from '@/components/SymbolCard';
import { fetchAllStocks, selectors, setActiveSymbol } from '@/store/stocksSlice';
import { VirtuosoGrid } from 'react-virtuoso';
import './symbolsGrid.css';

type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
};

const SymbolsGrid = ({ onSymbolClick }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
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
    <VirtuosoGrid
      data={stockSymbols}
      itemContent={(_, id) => (
        <SymbolCard
          key={id}
          id={id}
          onClick={() => handleSymbolClick(id)}
          isSelected={activeSymbolId === id}
          hasActiveCard={hasActiveCard}
        />
      )}
      listClassName="symbols-grid"
      itemClassName="symbol-card"
    />
  );
};

export default memo(SymbolsGrid);
