import { get } from "@hooks/asyncHooks"
import { QueryClient } from "react-query";

export const getVirtualHumanList = async () => {
  const response = await get('virtual-human', 'no-cache', '');
  return response;
}