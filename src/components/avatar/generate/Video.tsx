'use client'

import styled from "@emotion/styled";
import RecordRTC from 'recordrtc';
import { CSS_TYPE, color, RadiusButton, ImageWrap, ImageElement } from "@/src/styles/styles";
import { useEffect, useState } from "react";
import RecordButtonWrapper from "./RecordButton";
import { onChangeVideoCssProps } from "@/src/modules/avatar/onChangeVideoCssProps";

const VideoGenerate = ({ type }: { type: string }) => {

  // Hooks
  const [recordStatus, setRecordStatus] = useState('wait'); // 녹음대기(wait), 녹음중(recording), 녹음종료(complete), 녹음실패(fail)
  const [videoMedia, setVideoMedia] = useState<object>({
    recorder: null,
    video: null,
    src: null
  })

  const onClickRecordHandler = async () => {
    await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: { min: 1280 },
        height: { min: 720 }
      }
    }).then(async (stream) => {

      setRecordStatus('recording');
      await onStartRecordingHandler(stream);
    }).catch((error) => {
      console.error(error);
      setRecordStatus('fail');
      if (error.message === 'Requested device not found') {
        alert('카메라를 찾을 수 없습니다.\n장비를 다시 한 번 확인해주세요.');
      }
    })
  }

  const onStartRecordingHandler = async (stream: MediaStream) => {

    // Parameter
    const video: any = document.getElementById('video');
    video.muted = false;
    video.volume = 0;
    video.srcObject = stream;

    const recorder: any = new RecordRTC(stream, {
      type: 'video',
      checkForInactiveTracks: false,
      disableLogs: true,
    });

    recorder.startRecording();
    recorder.camera = stream;

    setVideoMedia({
      recorder: recorder,
      video: video
    })
  }

  const onStopRecordingHandler = () => {

    const { recorder }: any = videoMedia;
    if (recorder) {
      recorder.camera.stop();

      const stopRecordingHandler = async () => {
        await recorder.stopRecording(() => {
          const blob = recorder.getBlob();

          setVideoMedia({
            recorder: null,
            video: blob,
            src: URL.createObjectURL(blob)
          })
          recorder.reset();
        });
      }
      stopRecordingHandler();
    }
  }

  useEffect(() => {

    return () => { onStopRecordingHandler() };
  }, [videoMedia])

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
          {
            recordStatus === 'fail' ?
              <DeviceNotFoundWrapper><DeviceNotFound>Device not found</DeviceNotFound></DeviceNotFoundWrapper>
              :
              <Video
                id="video"
                autoPlay
                backgroundImage={onChangeVideoCssProps(recordStatus, 'image')}
                backgroundRepeat={onChangeVideoCssProps(recordStatus, 'repeat')}
                backgroundSize={onChangeVideoCssProps(recordStatus, 'size')}
              />
          }
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
          onCompleteHandler={onStopRecordingHandler}
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
    backgroundImage: props.backgroundImage,
    backgroundRepeat: props.backgroundRepeat,
    backgroundSize: props.backgroundSize
  })
)
const DeviceNotFoundWrapper = styled.div({
  width: '50%',
  height: '100%',
  border: `1px solid ${color.DarkWhite}`,
  color: color.DeActiveColor,
  borderRadius: '16px',
  backgroundColor: color.AliceBlue,
  margin: '0 auto'
})
const DeviceNotFound = styled.div({
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontSize: '1.3rem',
})

export default VideoGenerate;