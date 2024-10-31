import { memo, useEffect, useMemo } from 'react';
import './priceChart.css';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import Loading from '@/components/Loading';

type PriceChartProps = {
  symbolId: string | null;
};

const PriceChart = ({ symbolId }: PriceChartProps) => {
  const dispatch = useAppDispatch();
  const apiState = useAppSelector(selectors.apiState);
  const data = useAppSelector(selectors.selectPriceHistory);
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);

  useEffect(() => {
    if (symbolId) {
      dispatch(fetchPriceHistory(symbolId));
    }

    return () => {
      if (apiState.loading) {
        dispatch({ type: 'priceHistory/abortFetch' });
      }
    };
  }, [dispatch, symbolId]);

  const chartData = useMemo(() => {
    if (data && data.length > 0) {
      return data.map((e) => ({
        ...e,
        time: new Date(e.time).toLocaleTimeString(),
      }));
    }
    return [];
  }, [data]);

  if (apiState.loading && symbolId) {
    return (
      <div className="priceChart">
        <Loading />
      </div>
    );
  }
  if (apiState.error) return <div className="priceChart">Failed to get price history!</div>;
  if (!symbolId) return <div className="priceChart">Select stock</div>;

  return (
    <div className="priceChart">
      <div>{symbolInfo}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          <XAxis dataKey="time" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(PriceChart);
