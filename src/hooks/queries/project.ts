import { get } from "@hooks/asyncHooks"
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

export const getProjectList = async () =>{
  const response = await get('project', 'no-cache');
  return response;
}

/**
 * Description: fetch Project List
 * Date: 2023.03.10
 * Author: Kim Gyeong Seok
 */
export const useProjectList = async () =>{

}