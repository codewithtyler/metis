import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Get initial value from localStorage or use provided initial value
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage and handle dependencies when value changes
  useEffect(() => {
    try {
      // Store the current value
      window.localStorage.setItem(key, JSON.stringify(storedValue));
      
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}