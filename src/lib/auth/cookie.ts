import { Cookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { KeyValueProps } from '@modules/interface';

const cookies = new Cookies();

export const setCookie = (accessToken: string) => {

  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 180); // 3 Hours

  const options = {
    path: '/',
    secure: true,
    expires,
    sameSite: undefined
  }
  return cookies.set("userACT", accessToken, options)
}

export const getCookie = () => {
  return cookies.get("userACT");
}

export const removeCookie = (key: string) => {
  return cookies.remove(key);
}

/**
 * Description: get Account Auth
 * Date: 2023.03.16
 * Author: Kim Gyeong Seok
 */
export const getUserInfo = (key: string) => {

  const accessToken = cookies.get("userACT");
  const userInfo = jwt_decode<KeyValueProps>(accessToken);

  if (key === 'all')
    return userInfo
  else
    return userInfo[key];
}

