import { useQuery } from '@tanstack/react-query'

import { IQueryKeyToResponse } from '@/types'
import { getEntity, getEntityById } from '@/utils/fetch'

// useGetEntity is a custom React hook that leverages react-query's useQuery
// to fetch data from an API. It uses generic parameter QueryKey which should
// be a key from the QueryKeyToResponseType interface, enabling automatic
// type inference for the response data.

// queryKey: API endpoint as a key in QueryKeyToResponseType interface.
// queryParams: An optional parameter, it's an object that contains any query
export const useGetEntity = <QueryKey extends keyof IQueryKeyToResponse>(
  queryKey: QueryKey,
  queryParams = {},
) => {
  const queryString = Object.keys(queryParams)
    .map(key => key + '=' + queryParams[key])
    .join('&')

  return useQuery<IQueryKeyToResponse[QueryKey]>({
    queryKey: [queryKey],
    queryFn: () => getEntity(`/api/${queryKey}?${queryString}`),
    staleTime: 1000 * 60,
  })
}

export const useGetEntityById = (entity: string, id: number | string) =>
  useQuery({
    queryKey: [`${entity}/${id}`],
    queryFn: () => getEntityById(entity, id),
    staleTime: 1000 * 60,
  })
