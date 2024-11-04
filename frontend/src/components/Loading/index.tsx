import { memo } from 'react';
import './loading.css';

const Loading = () => {

  return (
    <div className="loading">
      <div className="loading__pulse" />
    </div>
  );
};

export default memo(Loading);
