'use client'

import styled from "@emotion/styled";
import { CSS_TYPE, color } from "@/src/styles/styles";

const VideoGenerate = () => {

  const onClickRecordHandler = () => {

    // TODO 카메라 위치
    // { audio: true, video: { facingMode: "user" } }
    // { audio: true, video: { facingMode: { exact: "environment" } } }

    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: {
          min: 1280
        },
        height: {
          min: 720
        }
      }
    }).then(() => {
      alert('권한 획득');
    }).catch(() => {

    })
  }

  return (
    <>
      비디오 생성하기
    </>
  )
}

const MainComponent = styled.div({

})

export default VideoGenerate;