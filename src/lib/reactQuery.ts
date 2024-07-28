import useUrlString, { IApiParams } from "@/hooks/useUrlString";
import { IErrorResponse } from "@/lib/axios";
import { UseQueryOptions, UseQueryResult, useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const defaultOptions = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
    refectOnMount: true,
    staleTime: 120 * 1000,
    gcTime: 300 * 1000,
  },
};

const queryClient = new QueryClient({ defaultOptions });

type IFetchQueryProps<K> = {
  queryInfo: {
    queryKey: string;
    queryFn: (params: IApiParams) => Promise<K>;
    options?: Omit<UseQueryOptions<K>, "queryKey" | "queryFn">;
  };
  params?: IApiParams;
};

/**
 * Fetches data using the provided query information and parameters.
 *
 * @param {IFetchQueryProps<K>} queryInfo - The query information containing the query key, query function, and options.
 * @param {IApiParams} [params] - Optional parameters to be used in the query. If not provided, the search parameters from the URL string will be used.
 * @return {UseQueryResult<K>} The result of the query.
 */
const useFetchData = <K>({ queryInfo, params }: IFetchQueryProps<K>) => {
  const { queryKey, queryFn, options } = queryInfo;

  const { searchParamsObject } = useUrlString();
  const searchParams = params ?? searchParamsObject;

  const fetchResult: UseQueryResult<K> = useQuery({
    queryKey: [queryKey, searchParams],
    queryFn: () => queryFn(searchParams),
    ...options,
  });

  return fetchResult;
};

type IMutateQueryProps<T, K> = (body: T) => Promise<K>;

/**
 * A custom hook that wraps the useMutation function from react-query.
 *
 * @param {IMutateQueryProps<T, K>} mutationFunction - The function that will be executed when the mutation is triggered.
 * @return {UseMutationResult<K, AxiosError<IErrorResponse, IErrorResponse>, T, unknown>} The result of the mutation.
 */
const useMutate = <T, K>(mutationFunction: IMutateQueryProps<T, K>) => {
  const mutateResult = useMutation<K, AxiosError<IErrorResponse, IErrorResponse>, T, unknown>({
    mutationFn: (body: T) => mutationFunction(body),
  });

  return mutateResult;
};

export { queryClient, useFetchData, useMutate };
