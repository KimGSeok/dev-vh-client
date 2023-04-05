import { get } from "@hooks/asyncHooks"
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

export const getProjectList = async () => {
  const response = await get('project', 'no-cache', '');
  return response;
}

export const getPreFetchProjectDetailInfo = async (id: string, cookie: string) => {
  const response = await get(`project/${id}`, 'no-cache', cookie);
  return response;
}