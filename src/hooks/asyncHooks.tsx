import { getCookie } from '@lib/auth/cookie';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Get
 * Author: Kim Gyeong Seok
 */
export const get = async (url: string, cache: RequestCache) => {
  try {
    const response = await fetch(
      `${API_URL}/${url}`,{
        headers: {
          Authorization: `Bearer ${getCookie()}`
        },
        cache: cache
      })

    return response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * Post
 * Author: Kim Gyeong Seok
 */
export const post = async (url: string, data: any, headers: object) => {
  headers = {
    ...headers,
    Authorization: `Bearer ${getCookie()}`
  }
  try {
    const result = axios.post(
      `${API_URL}/${url}`,
      data,
      {
        headers: {... headers}
      }
    ).then((response: any) => {

      // Service Logic
      return response;
    }).catch((error: any) => {

      // Error Handle
      console.error(error);
      return error;
    })
    return result;
  } catch (error) {
    return error;
  }
}