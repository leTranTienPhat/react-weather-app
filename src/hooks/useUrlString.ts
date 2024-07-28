import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export type IDataTypes = string | number;
export type IApiParams = Record<string, IDataTypes>;

export const parseValue = (searchValues: IApiParams, key: string): IDataTypes => {
  const value = searchValues[key];
  return value;
};
const useUrlString = (defaultValue?: URLSearchParamsInit) => {
  const [searchParams, setSearchParams] = useSearchParams(defaultValue);
  const searchParamsObject: IApiParams = {};

  for (const [key, value] of searchParams) {
    const searchValue: string | string[] = value;
    searchParamsObject[key] = searchValue;
  }

  const defaultUpdateUrlParams = (searchValues: IApiParams) => {
    for (const key in searchValues) {
      const parsedValue = parseValue(searchValues, key);
      setSearchParams(
        (prev) => {
          if (parsedValue) {
            prev.set(key, parsedValue as string);
            return prev;
          }
          prev.delete(key);
          return prev;
        },
        { replace: true }
      );
    }
  };

  const clearUrl = (searchValues: IApiParams, defaultObj: IApiParams) => {
    for (const key in searchValues) {
      setSearchParams(
        (prev) => {
          if (defaultObj.hasOwnProperty.call(defaultObj, key)) {
            prev.set(key, searchValues[key] as string);
            return prev;
          }
          prev.delete(key);
          return prev;
        },
        { replace: true }
      );
    }
  };

  const fullClearParams = () => {
    for (const key in searchParamsObject) {
      setSearchParams(
        (prev) => {
          prev.delete(key);
          return prev;
        },
        { replace: true }
      );
    }
  };

  return { searchParamsObject, setSearchParams, defaultUpdateUrlParams, clearUrl, fullClearParams };
};

export default useUrlString;
