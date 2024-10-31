import SymbolsGrid from '@/components/SymbolsGrid';
import PriceChart from '@/components/PriceChart';
import DesktopInfo from './src/DesktopInfo';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectors, setActiveSymbol } from '@/store/stocksSlice';
import './symbolsView.css';

const SymbolsView = () => {
  const dispatch = useAppDispatch();

  const activeSymbol = useAppSelector(selectors.selectActiveSymbolId);

  const handleSymbolClick = (symbolId: string) => {
    const newActiveSymbol = activeSymbol === symbolId ? null : symbolId;
    dispatch(setActiveSymbol(newActiveSymbol));
  };

  return (
    <div className="symbolsView">
      <DesktopInfo />

      <div className="symbolsView__content">
        <div className="symbolsView__cards">
          <SymbolsGrid onSymbolClick={handleSymbolClick} />
        </div>

        <div className="symbolsView__chart-container">
          <h3>PRICE HISTORY</h3>
          <PriceChart symbolId={activeSymbol} />
        </div>
      </div>
    </div>
  );
};

export default SymbolsView;
