/* eslint-disable react-refresh/only-export-components */
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useMemo, useState } from "react";

type ILocalStorageContext = {
  storedValue: string | null; // Stored value, can be null if nothing is stored
  setStoredValue: Dispatch<SetStateAction<string | null>>; // Setter function
};

const initialState: ILocalStorageContext = {
  storedValue: null,
  setStoredValue: () => undefined,
};
const LocalStorageProviderContext = createContext<ILocalStorageContext>(initialState);

type IProps = {
  children: React.ReactNode;
};

export function LocalStorageProvider({ children }: Readonly<IProps>) {
  const [storedValue, setStoredValue] = useState<string | null>(null);

  const value = useMemo(() => {
    return {
      storedValue,
      setStoredValue,
    };
  }, [storedValue]);

  return <LocalStorageProviderContext.Provider value={value}>{children}</LocalStorageProviderContext.Provider>;
}

type UseLocalStorage<T> = {
  setStorage: (value: T) => void; // Setter function
  getStorage: () => T | null; // Getter function
  deleteStorage: () => void; // Delete function
};

export const useLocalStorage = <T,>(key: string): UseLocalStorage<T> => {
  const context = useContext(LocalStorageProviderContext);

  const { setStoredValue } = context;

  // Set value to local storage and update state
  const setStorage = useCallback(
    (value: T) => {
      try {
        const stringifiedValue = JSON.stringify(value);
        setStoredValue(stringifiedValue);
        window.localStorage.setItem(key, stringifiedValue);
      } catch (error) {
        console.error("Error setting localStorage key “" + key + "”", error);
      }
    },
    [key]
  );

  // Get value from local storage
  const getStorage = useCallback((): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting localStorage key “" + key + "”", error);
      return null;
    }
  }, [key]);

  // Delete value from local storage and update state
  const deleteStorage = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error("Error deleting localStorage key “" + key + "”", error);
    }
  }, [key]);

  if (context === undefined) throw new Error("useSearch must be used within a LocalStorageProvider");

  return { setStorage, getStorage, deleteStorage };
};
