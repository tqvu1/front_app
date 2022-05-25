import { useEffect } from 'react';
import { useLocation } from 'react-router';

const useLocationChange = (action) => {
  const location = useLocation();
  useEffect(() => {
    action(location);
  }, [location.pathname]);
};

export default useLocationChange;
