import { Cookies } from 'react-cookie';

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