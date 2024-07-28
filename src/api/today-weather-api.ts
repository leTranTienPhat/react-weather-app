import { IApiParams } from "@/hooks/useUrlString";
import apiCallHandler from "@/lib/axios";
import { useFetchData } from "@/lib/reactQuery";
import { UseQueryOptions } from "@tanstack/react-query";

const endpoint = `https://api.openweathermap.org/data/2.5/weather`;

export type ITodayWeatherResponse = {
  id: number;
  name: string;
  cod?: number;
  timezone?: number;

  coord: {
    lon: number;
    lat: number;
  };
  weather?: {
    id: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  base?: string;
  main?: {
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    humidity?: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility?: number;
  wind?: {
    speed?: number;
    deg?: number;
    gust?: number;
  };
  rain?: {
    [key: string]: number;
  };
  clouds?: {
    all?: number;
  };
  dt?: number;
  sys?: {
    id: number;
    type?: number;
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  timestamp?: string;
};

type IParams = IApiParams & { lat: number; lon: number; appId: string; unit?: string };

const getTodayWeatherApi = (params?: IParams | IApiParams): Promise<ITodayWeatherResponse> =>
  apiCallHandler({ method: "get", endpoint, params });

export const useApiTodayWeather = (
  options?: Omit<UseQueryOptions<ITodayWeatherResponse>, "queryKey" | "queryFn">,
  params?: IParams
) => {
  const todayWeatherResponse = useFetchData({
    queryInfo: {
      queryKey: "todayWeather",
      queryFn: getTodayWeatherApi,
      options,
    },
    params,
  });

  return todayWeatherResponse;
};
