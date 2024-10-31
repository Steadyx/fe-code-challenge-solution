import { useCallback } from 'react';

type UseKeyboardClickProps = (onClick: () => void) => (e: React.KeyboardEvent) => void;

const useKeyboardClick: UseKeyboardClickProps = (onClick) => {
  return useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);
};

export default useKeyboardClick;
