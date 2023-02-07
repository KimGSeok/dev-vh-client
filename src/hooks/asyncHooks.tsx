import axios from 'axios';

/**
 * Get
 * Author: Kim Gyeong Seok
 */
export const get = async (url: string, cache: RequestCache) => {
  try {
    const response = await fetch(url, { cache: cache })
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

    axios.post(
      url,
      data,
      option
    ).then((response: any) => {

      console.log(response);

      return response;
    }).catch((error: any) => {

      console.log(error);

      return error;
    })
  } catch (error) {
    return error;
  }
}