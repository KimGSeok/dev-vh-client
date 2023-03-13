import { color } from "@styles/styles";

/**
 * Description: 녹화상태에 따른 화면노출
 * Date: 2023.03.14
 * Author: Kim Gyeong Seok
 */
export const getVirtualHumanStatusToKorean = (type: string, status: string) =>{

  // 학습요청(start), 학습중(learning), 학습실패(fail)
  if(type === 'string'){
    switch(status){
      case 'start' :
        return '학습요청'
      case 'learning':
        return '학습중'
      case 'fail':
        return '학습실패'
      case 'complete':
        return '학습완료'
    }
  }
  else if(type === 'color'){
    switch(status){
      case 'start' :
        return color.BasicBlack;
      case 'learning':
        return color.BasicOrange;
      case 'fail':
        return color.WaringRed;
      case 'complete':
        return color.BasicBlue;
    }
  }
}