import { get } from "@hooks/asyncHooks";
import { QueryClient, useQuery } from "react-query"

const queryClient = new QueryClient();

const getUsersLists = async (cookie: string, key: string) => {
  const response = await get(`users?organization=${key}`, 'no-cache', cookie);
  return response;
}

const getUserDetailInfo = async (cookie: string, id: string) =>{
  const response = await get(`users/${id}`, 'no-cache', cookie);
  return response;
}

/** 
 * Description: preFetch
 * Date: 2023.04.17
 * Author: KimGyeongSeok
 */
export const prefetchUsersLists = async (cookie: string, key: string) => {
  await queryClient.prefetchQuery(['users', { key }], () => { return getUsersLists(cookie, key) })
  return queryClient;
}

export const prefetchUserDetailInfo = async (cookie: string, id: string) =>{
  await queryClient.prefetchQuery(['users', { id }], () => { return getUserDetailInfo(cookie, id) })
  return queryClient;
}

export const useUsersLists = (key: string) => {
  const response = useQuery(['users', { key }], async () => { return await getUsersLists('', key) }, { staleTime: 10 * 1000 })
  return response;
}

export const useUserDetailInfo = (id: string) => {
  const response = useQuery(['users', { id }], async () => { return await getUserDetailInfo('', id) }, { staleTime: 10 * 1000 })
  return response;
}