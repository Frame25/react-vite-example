import {useState} from 'react';

export function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {}

    return initialValue;
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {}
  };

  return [storedValue, setValue];
}

export function useSessionStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {}

    return initialValue;
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {}
  };

  return [storedValue, setValue];
}
