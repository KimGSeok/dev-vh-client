import { get } from "@hooks/asyncHooks"
import { QueryClient, useQuery } from "react-query";

const queryClient = new QueryClient();

export const getVirtualHumanList = async (cookie: string) => {
  const response = await get('virtual-human', 'no-cache', cookie);
  return response;
}

/** 
 * Description: preFetch
 * Date: 2023.04.17
 * Author: KimGyeongSeok
 */
export const prefetchVirtualHumanLists = async (cookie: string) => {
  await queryClient.prefetchQuery(['virtual-human'], () => { return getVirtualHumanList(cookie) })
  return queryClient;
}

export const useVirtualHumanLists = () => {
  const response = useQuery(['virtual-human'], async () => { return await getVirtualHumanList('') }, { staleTime: 10 * 1000 })
  return response;
}