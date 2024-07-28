import { OPEN_WEATHER_ERR_MESSAGE } from "@/constants/variables";
import { IApiParams } from "@/hooks/useUrlString";
import { toastNotification } from "@/lib/toastAction";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export type IErrorResponse = {
  cod: string;
  message: string;
};

export const API_TIMEOUT_DURATION = 30000;

// Create Axios Instance
export const axiosClient = axios.create({
  timeout: API_TIMEOUT_DURATION,
  headers: {
    "Content-Type": "application/json",
  },
});

const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
  return config;
};

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

// Intercept request before they are handled by "then"
axiosClient.interceptors.request.use(requestInterceptor, (error: Error) => Promise.reject(error));

// Intercept response before they are handled by "catch"
axiosClient.interceptors.response.use(responseInterceptor, async (error: AxiosError<IErrorResponse, IErrorResponse>) => {
  return Promise.reject(error);
});

type IRequestPostPut<T> = {
  method: "get" | "post" | "put" | "delete";
  endpoint: string;
  params?: IApiParams;
  body?: T;
  options?: AxiosRequestConfig;
  notification?: boolean;
};

// Request Wrapper
const apiCallHandler = async <T>({ method, endpoint, params, body, options, notification = true }: IRequestPostPut<T>) => {
  let apiEndpoint = endpoint;
  if (params && Object.keys(params).length !== 0)
    apiEndpoint +=
      "?" +
      Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");

  const response = await axiosClient[method]<T>(apiEndpoint, body, options)
    .then((res: AxiosResponse) => {
      // Show toast only if there is a message in response data
      if (notification && res.data.message) toastNotification({ description: res.data.message, variant: "success" });
      return res.data;
    })
    .catch((error: AxiosError<IErrorResponse, IErrorResponse>) => {
      if (!notification) throw error;

      // Default client's error message
      const errorResponse = error.response?.data;
      let errorMessage = "Something went wrong. Please try again.";

      // Switch to using error message returned from server
      const errorDetail = errorResponse?.cod === "400";
      if (errorDetail) {
        if (errorResponse?.message === OPEN_WEATHER_ERR_MESSAGE.BAD_QUERY.base)
          errorMessage = OPEN_WEATHER_ERR_MESSAGE.BAD_QUERY.convert;
        toastNotification({ description: errorMessage });
        throw error;
      }
    });
  return response;
};

export default apiCallHandler;
