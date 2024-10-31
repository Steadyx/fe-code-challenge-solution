import { memo } from 'react';
import upTrendImage from '@/assets/up.png';
import downTrendImage from '@/assets/down.png';

type TrendImageProps = {
  trend: 'increase' | 'decrease' | null;
};

const TrendImage: React.FC<TrendImageProps> = ({ trend }) => {
  const trendSrc = trend === 'increase' ? upTrendImage : trend === 'decrease' ? downTrendImage : null;

  if (!trendSrc) return null;

  return (
    <img
      className="symbolCard__trend-image"
      src={trendSrc}
      alt={`${trend} trend`}
    />
  );
};

export default memo(TrendImage);
