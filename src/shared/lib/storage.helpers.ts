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

export function saveEncodedDataToStorage(key: string, value: any, storage = window.localStorage) {
  try {
    const str = JSON.stringify(value);
    const encoded = window.btoa(encodeURIComponent(str));

    storage.setItem(key, encoded);
  } catch (e) {}
}

export function getEncodedDataFromStorage(key: string, storage = window.localStorage) {
  try {
    const encoded = storage.getItem(key);

    if (encoded) {
      const str = decodeURIComponent(window.atob(encoded));

      return JSON.parse(str);
    }
  } catch (e) {}

  return null;
}
