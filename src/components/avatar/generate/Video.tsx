'use client'

import styled from "@emotion/styled";
import RecordRTC from 'recordrtc';
import { CSS_TYPE, color, RadiusButton, ImageWrap, ImageElement } from "@/src/styles/styles";
import { useState } from "react";
import RecordButtonWrapper from "./RecordButton";

const VideoGenerate = ({ type }: { type: string }) => {

  // Hooks
  const [recordStatus, setRecordStatus] = useState('wait'); // 녹음대기(wait), 녹음중(recording), 녹음종료(complete)
  const [videoMedia, setVideoMedia] = useState<object>({
    recorder: null,
    video: null
  })

  const onClickRecordHandler = () => {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    }).then((camera) => {
      onReadyVideo(camera);
    }).catch((error) => {
      console.error(error);
    })
  }

  const onReadyVideo = (camera: MediaStream) => {

    // Parameter
    const video: any = document.getElementById('video');
    video.muted = false;
    video.volume = 0;
    video.srcObject = camera;

    const recorder: any = new RecordRTC(camera, {
      type: 'video',
    })

    console.log(video);

    recorder.startRecording();
    recorder.camera = camera;

    setVideoMedia({ recorder: recorder })
  }

  const onStopVideo = () => {
    console.log(videoMedia);
  }

  return (
    <VideoGenerateWrapper>
      <Title>아래 문장을 대화를 하듯 말하며 최소 3분 이상 녹화해주세요.</Title>
      <ScriptWrapper>
        <Script>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem Ipsum.
        </Script>
      </ScriptWrapper>
      <VideoCameraWrapper>
        <VideoArea>
          <Video
            id="video"
            recordStatus={recordStatus}
            autoPlay
          />
          {
            recordStatus === 'wait' &&
            <ImageWrap
              position={'absolute'}
              width={'50%'}
              height={'95%'}
              top={'5%'}
            >
              <ImageElement
                src="/images/human_figure.svg"
                fill
                style={{
                  inset: 'auto',
                  objectFit: 'contain'
                }}
                alt="human figure"
              />
            </ImageWrap>
          }
        </VideoArea>
        <RecordButtonWrapper
          type={type}
          recordStatus={recordStatus}
          setRecordStatus={setRecordStatus}
          onRecordHandler={onClickRecordHandler}
        />
      </VideoCameraWrapper>
    </VideoGenerateWrapper >
  )
}

const VideoGenerateWrapper = styled.div({
  position: 'relative',
  height: '100%',
})
const Title = styled.div({
  padding: '12px 0 16px 0',
  fontSize: '1.2rem',
  fontWeight: '500',
  textAlign: 'center'
})
const ScriptWrapper = styled.div({
  height: 'calc(35% - 16px)',
  backgroundColor: color.DarkWhite,
  borderRadius: '16px',
  border: `1px solid ${color.ModernGrey}`,
  padding: '16px',
})
const Script = styled.div({
  height: '100%',
  padding: '0 0 8px 0',
  fontSize: '1rem',
  lineHeight: '24px',
  wordBreak: 'keep-all',
  overflowY: 'scroll'
})
const VideoCameraWrapper = styled.div({
  height: '60%',
  textAlign: 'center'
})
const VideoArea = styled.div({
  position: 'relative',
  height: '80%',
  margin: '24px 0'
})
const Video = styled.video<CSS_TYPE>(
  {
    position: 'relative',
    height: '100%',
    display: 'block',
    margin: '0 auto',
  },
  props => ({
    backgroundImage: props.recordStatus === 'wait' ? `url('/images/tile_background_no-stroke.svg')` : '',
    backgroundRepeat: props.recordStatus === 'wait' ? 'no-repeat' : '',
    backgroundSize: props.recordStatus === 'wait' ? 'cover' : '',
  })
)

export default VideoGenerate;