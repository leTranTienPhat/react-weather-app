/* eslint-disable react-refresh/only-export-components */
import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react";

type ISearchState = {
  geoLocation: { lat: number; lon: number } | null;
  setGeoLocation: Dispatch<SetStateAction<{ lat: number; lon: number } | null>>;
};

const initialState: ISearchState = {
  geoLocation: { lat: 0, lon: 0 },
  setGeoLocation: () => null,
};

const SearchProviderContext = createContext<ISearchState>(initialState);

type IProps = {
  children: React.ReactNode;
};

export function SearchProvider({ children }: Readonly<IProps>) {
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lon: number } | null>(null);

  const value = useMemo(() => {
    return {
      geoLocation,
      setGeoLocation,
    };
  }, [geoLocation]);

  return <SearchProviderContext.Provider value={value}>{children}</SearchProviderContext.Provider>;
}

export const useSearch = () => {
  const context = useContext(SearchProviderContext);

  if (context === undefined) throw new Error("useSearch must be used within a SearchProvider");

  return context;
};
