import { get } from "@hooks/asyncHooks"
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

export const getVirtualHumanList = async () => {
  const response = await get('virtual-human', 'no-cache', '');
  return response;
}