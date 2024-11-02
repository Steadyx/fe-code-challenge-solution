import React from 'react';
import { toggleShowCardInfo, selectShowCardInfo } from '@/store/dashboardOptionsSlice';
import './toggleCardInfo.css';
import { useAppDispatch, useAppSelector } from '@/hooks';
const ToggleCardInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const showCardInfo = useAppSelector(selectShowCardInfo);

  const handleChange = () => {
    dispatch(toggleShowCardInfo());
  };

  return (
    <label className="toggleCardInfo">
      +Info
      <input type="checkbox" checked={showCardInfo} onChange={handleChange} />
    </label>
  );
};

export default ToggleCardInfo;
