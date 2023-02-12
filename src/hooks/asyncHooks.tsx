import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Get
 * Author: Kim Gyeong Seok
 */
export const get = async (url: string, cache: RequestCache) => {
  try {
    const response = await fetch(`${API_URL}/${url}`, { cache: cache })
    return response.json();
  } catch (error) {
    return error;
  }
}

/**
 * Post
 * Author: Kim Gyeong Seok
 */
export const post = async (url: string, data: any, option: object) => {
  try {

    const result = axios.post(
      `${API_URL}/${url}`,
      data,
      option
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