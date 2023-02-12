/**
 * Description: 빈 객체 체크
 * Date: 2023.02.11
 * Author: Kim Gyeong Seok
 */
export const checkEmptyObject = (object: object) =>{
  if(object.constructor === Object && Object.keys(object).length === 0)
    return true;
  else
    return false;
}