import React, { memo, useMemo } from 'react';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/market_cap.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/industry.svg';
import ListItem from '@/components/ListItem';
import './symbolCard.css';

type InfoListProps = {
  companyName: string;
  industry: string;
  marketCap: number;
};

const InfoList: React.FC<InfoListProps> = ({ companyName, industry, marketCap }) => {
  const formattedMarketCap = useMemo(() => {
    if (marketCap == null || isNaN(marketCap)) {
      return 'N/A';
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    });

    return formatter.format(marketCap);
  }, [marketCap]);

  return (
    <div className="symbolCard__info">
      <ListItem Icon={<CompanyIcon />} label={companyName} />
      <ListItem Icon={<IndustryIcon />} label={industry} />
      <ListItem Icon={<MarketCapIcon />} label={formattedMarketCap} />
    </div>
  );
};

export default memo(InfoList);
