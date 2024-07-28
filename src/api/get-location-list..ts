import { IApiParams } from "@/hooks/useUrlString";
import apiCallHandler from "@/lib/axios";
import { useFetchData } from "@/lib/reactQuery";
import { UseQueryOptions } from "@tanstack/react-query";

const endpoint = `http://api.openweathermap.org/geo/1.0/direct`;

export type ILocationListResponse = {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state: string;
};

type IParams = IApiParams & { q: string; limit: number; appId: string };

const getLocationListApi = (params?: IParams | IApiParams): Promise<ILocationListResponse[]> =>
  apiCallHandler({ method: "get", endpoint, params });

export const useApiGetLocationList = (
  options?: Omit<UseQueryOptions<ILocationListResponse[]>, "queryKey" | "queryFn">,
  params?: IParams
) => {
  const locationListReponse = useFetchData<ILocationListResponse[]>({
    queryInfo: {
      queryKey: "locationList",
      queryFn: getLocationListApi,
      options,
    },
    params,
  });
  return locationListReponse;
};
