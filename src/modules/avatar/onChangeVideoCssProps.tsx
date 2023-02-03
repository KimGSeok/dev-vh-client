/**
 * Video
 * Description: 녹화상태에 따른 화면노출
 * Date: 2023.01.31
 * Author: Dmon
 */
export const onChangeVideoCssProps = (recordStatus: string, props: string) =>{

  // 녹음대기(wait), 녹음중(recording), 녹음종료(complete), 녹음실패(fail)
  if(props === 'image'){
    switch(recordStatus){
      case 'wait' :
        return "url('/images/tile_background_no-stroke.svg')" // 
      case 'recording':
        return ''
      case 'complete':

        break;
      case 'fail':

        break;
    }
  }
  else if(props === 'repeat'){
    switch(recordStatus){
      case 'wait' :
        return 'no-repeat'
      case 'recording':
        return ''
      case 'complete':

        break;
      case 'fail':

        break;
    }
  }
  else if(props === 'size'){
    switch(recordStatus){
      case 'wait' :
        return 'cover'
      case 'recording':
        return ''
      case 'complete':

        break;
      case 'fail':

        break;
    }
  }
}