import {useLocation} from 'react-router-dom';

export const MEMORIZED_ROUTE_KEY = 'b2b-memorized-route';

export const useMemorizedRoute = () => {
  const location = useLocation();

  const setMemoRoute = (path?: string) => {
    if (typeof path !== 'string') {
      path = location.pathname;
    }

    if (path) {
      window.localStorage.setItem(MEMORIZED_ROUTE_KEY, path);
    }
  };
  const getMemoRoute = () => {
    const saved = window.localStorage.getItem(MEMORIZED_ROUTE_KEY);

    if (saved) {
      return saved;
    }

    return '/';
  };
  const resetMemoRoute = () => {
    window.localStorage.removeItem(MEMORIZED_ROUTE_KEY);
  };

  return {getMemoRoute, setMemoRoute, resetMemoRoute};
};
