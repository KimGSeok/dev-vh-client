import { get } from "@hooks/asyncHooks";
import { QueryClient, useQuery } from "react-query"

const queryClient = new QueryClient();

const getUsersLists = async (cookie: string, key: string) => {
  console.log('호출');
  console.log(key);
  const response = await get(`users/${key}`, 'no-cache', cookie);
  return response;
}

export const prefetchUsersLists = async (cookie: string, key: string) => {
  await queryClient.prefetchQuery(['users', { key }], () => { return getUsersLists(cookie, key) })
  return queryClient;
}

export const useUsersLists = (key: string) => {
  console.log(key);
  const response = useQuery(['users', { key }], async () => { return await getUsersLists('', key) }, { staleTime: 10 * 1000 })
  return response;
}