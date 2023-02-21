import { useQuery, useQueryClient } from 'react-query';

/**
 * Description: 
 * Date: 2023.02.20
 * Author: Kim Gyeong Seok
 */
export const useClientValue = (key: string, initialData: number | string | object | object[] | boolean | undefined | null | '') =>{
  useQuery(key, {
    initialData: initialData,
    staleTime: Infinity
  }).data;
}

/**
 * Description: 
 * Date: 2023.02.20
 * Author: Kim Gyeong Seok
 */
export const useSetClientState = (key: string, state: any) => {
  const queryClient = useQueryClient();
  return (state: any) => queryClient.setQueryData(key, state);
}

const queryClient = useQueryClient();
queryClient.setQueryData('loading', false);