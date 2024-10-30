import './symbolCard.css';
import { useAppSelector } from '@/hooks/redux';
import SymbolCardHeader from './SymbolCardHeader'
import SymbolCardContent from './SymbolCardContent';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { companyName, industry, marketCap } = useAppSelector((state) => state.stocks.entities[id]);

  const handleOnClick = () => {
    onClick(id);
  };
  return (
    <div onClick={handleOnClick} className="symbolCard">
      <SymbolCardHeader id={id} />
      <SymbolCardContent price={price} companyName={companyName} industry={industry} marketCap={marketCap} />
    </div>
  );
};
export default SymbolCard;
