import debounce from 'lodash/debounce';
import {createContext, useCallback, useContext, useEffect, useState} from 'react';

export enum ScreenSize {
  SM = 450,
  MD = 676,
  LG = 1180,
  XL = 1440,
}

export enum ScreenSizeKey {
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
}

export const ScreenSizeContext = createContext<ScreenSizeKey | null>(null);
export const isLessThan = (key: ScreenSizeKey) => window.innerWidth < ScreenSize[key];
export const isGreaterThan = (key: ScreenSizeKey) => window.innerWidth > ScreenSize[key];

export const useObserveScreenSize = () => {
  const [size, setSize] = useState<ScreenSizeKey | null>(null);

  const resizeCallback = useCallback(() => {
    if (window.innerWidth <= ScreenSize.SM) {
      setSize(ScreenSizeKey.SM);
    } else if (window.innerWidth > ScreenSize.SM && window.innerWidth <= ScreenSize.MD) {
      setSize(ScreenSizeKey.MD);
    } else if (window.innerWidth > ScreenSize.MD && window.innerWidth <= ScreenSize.LG) {
      setSize(ScreenSizeKey.LG);
    } else {
      setSize(ScreenSizeKey.XL);
    }
  }, [setSize]);

  useEffect(() => {
    const debouncedResizeCallback = debounce(resizeCallback, 300);

    window.addEventListener('resize', debouncedResizeCallback);

    resizeCallback();

    return () => window.removeEventListener('resize', debouncedResizeCallback);
  }, [resizeCallback]);

  return size;
};

export const useScreenSize = () => {
  const size = useContext(ScreenSizeContext);

  return {size, isLessThan, isGreaterThan};
};
