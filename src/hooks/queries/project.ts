import { get } from "@hooks/asyncHooks"
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

export const getProjectList = async () => {
  const response = await get('project', 'no-cache');
  console.log(response);
  return response;
}

export const getProjectDetailInfo = async (id: string) => {
  const response = await get(`project/${id}`, 'no-cache');
  console.log(response);
  return response;
}