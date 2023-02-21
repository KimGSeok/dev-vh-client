/**
 * Description: 날짜 포맷 구하기
 * Date: 2023.02.12
 * Author: Kim Gyeong Seok
 */
const today = new Date();

export const getToday = () =>{
  
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  return year + '-' + month  + '-' + day;
}

export const getTodayTime = () =>{

  const hours = ('0' + today.getHours()).slice(-2); 
  const minutes = ('0' + today.getMinutes()).slice(-2);
  const seconds = ('0' + today.getSeconds()).slice(-2); 
  return hours + ':' + minutes  + ':' + seconds;
}