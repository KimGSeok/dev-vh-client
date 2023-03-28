'use client'

import styled from "@emotion/styled";
import RecordRTC from 'recordrtc';
import { v4 as uuidV4 } from 'uuid';
import { CSS_TYPE, color, ImageWrap, ImageElement } from "@styles/styles";
import { useEffect, useState } from "react";
import { post } from "@hooks/asyncHooks";
import { onChangeVideoCssProps } from "@modules/avatar/onChangeVideoCssProps";
import { useRouter } from "next/navigation";
import StopWatch from "@components/stopWatch";
import VideoButtonContainer from "./Button/Video";

let startTime: number;
let endTime: number;
let elapsedTime: number = 0;

const VideoGenerate = ({ type, virtualHumanName }: { type: string, virtualHumanName: string }) => {

  // Hooks
  const router = useRouter();
  const [recordStatus, setRecordStatus] = useState('wait'); //  녹음대기(wait), 녹음준비(ready), 녹음중(recording), 녹음종료(complete), 녹음실패(fail)
  const [duration, setDuration] = useState<number>(0);
  const [timer, setTimer] = useState('init');
  const [videoMedia, setVideoMedia] = useState<any>({
    stream: null,
    recorder: null,
    mediaRecorder: null,
    video: null,
    src: null
  })

  const getUserMedia = async () =>{
    await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: { min: 1280 },
        height: { min: 720 }
      }
    }).then(async (stream) => {

      // Parameter
      const video: any = document.getElementById('video');

      video.muted = false;
      video.volume = 0;
      video.srcObject = stream;

      const recorder: any = new RecordRTC(stream, {
        type: 'video',
        mimeType: 'video/webm',
        checkForInactiveTracks: false,
        disableLogs: true,
      });

      setRecordStatus('ready');
      setVideoMedia({
        recorder: recorder,
        stream: stream,
        video: video
      })
    }).catch((error) => {
      console.error(error);
      setRecordStatus('fail');
      if (error.message === 'Requested device not found') {
        alert('카메라를 찾을 수 없습니다.\n장비를 다시 한 번 확인해주세요.');
      }
    })
  }

  const onClickRecordHandler = async () => {

    setRecordStatus('recording');
    startTime = Date.now();
    await onStartRecordingHandler(videoMedia.stream);
  }

  const onStartRecordingHandler = async (stream: MediaStream) => {

    const { recorder }: any = videoMedia;

    setTimer('start');
    recorder.startRecording();
    recorder.camera = stream;
  }

  const onStopRecordingHandler = () => {

    setTimer('stop');

    endTime = Date.now();
    elapsedTime = Math.floor((endTime - startTime) / 1000);

    if(elapsedTime >= 60){

      const { recorder }: any = videoMedia;
      if (recorder) {

        recorder.camera.stop();
        setRecordStatus('complete');

          recorder.stopRecording(() => {
            const blob = recorder.getBlob();

            const video: any = document.getElementById('previewVideo');
            video.src = URL.createObjectURL(blob);

            setVideoMedia({
              video: blob,
              videoBlobUrl: URL.createObjectURL(blob)
            })
            recorder.reset();
          });
      }
    }
    else{
      alert('최소 1분이상 녹화되지 않았습니다.\n다시 녹화해주세요.');
      setTimer('init');
      setRecordStatus('ready');
    }
  }
  
  const onReRecordHandler = async () =>{

    setTimer('init');
    setRecordStatus('wait');
    elapsedTime = 0;
    getUserMedia();
  }

  const onNextStepHandler = () =>{
    
    if(elapsedTime < 60){
      alert('최소 1분이상 녹화되지 않았습니다.\n다시 녹화해주세요.');
      return false;
    }
    
    // Parameter
    const virtualHumanId = uuidV4();
    const formData = new FormData();

    const videoFile = new File([videoMedia.video], `${virtualHumanName}_video.mp4`, {
      type: 'video/mp4'
    });

    formData.append('files', videoFile);
    formData.append('virtualHumanType', type);
    formData.append('virtualHumanId', virtualHumanId);
    formData.append('virtualHumanName', virtualHumanName);

    const url = 'virtual-human/upload';
    const headers ={
        "Contest-Type": "multipart/form-data",
        "uuid": virtualHumanId
      }
    post(url, formData, headers);

    alert('아바타 생성 요청이 완료되었습니다.');
    router.push('/virtual-human');
  }

  useEffect(() => {

    getUserMedia()
  }, [])

  return (
    <VideoGenerateWrapper>
      <Title>아래 문장을 대화를 하듯 말하며 최소 1분 이상 녹화해주세요.</Title>
      <ScriptWrapper>
        <Script>
          이미지 메이킹이란 무엇일까요?<br />
          타인에게 자신의 이미지를 언제 어디서든지 주어진 상황에 맞게<br />
          재고 시켜주고 자신의 능력을 최대한 발휘할 수 있도록 해 주면서<br />
          자신의 잠재력까지도 표출할 수 있도록 만들어 주는 것이<br />
          바로 이미지 메이킹입니다. 그렇다면 이미지의 어원은 어디서 왔을까요?<br />
          라틴어 동사 '이미타리', 즉 흉내내다라는 뜻의 명사형 어미 '아고'를 붙인<br />
          '이마고'에서 왔습니다. 이것은 사전적인 이미지로 형태, 모양, 느낌, 영상, 관념 등을 뜻합니다. <br />
          <br />
          (2초간 입을 다문채로 대기해주세요)<br />
          <br />
          이미지는 심상을 뜻하는데,<br />
          사전적인 정의는 어떤 사람이나 사물로부터 받는 느낌이나 인상으로 <br />
          사물이나 사람에게 받는 인상과 감각에 의하여 얻어졌던 것이<br />
          마음속에서 재생한 것이라고 할 수 있습니다.<br />
          자신이 의식적이든 무의식적이든 과거의 경험으로부터 여러 감각에 의하여<br />
          얻어진 일들과 현상이 마음속에 구체적인 언어로 재생된 것으로<br />
          일부러 의도하거나 의식하지 않아도 형성됩니다. <br />
          <br />
          (2초간 입을 다문채로 대기해주세요)<br />
          <br />
          현대사회는 사회적으로 이미지 전쟁이라고 불릴 만큼 좋은 이미지를 추구하며<br />
          개인만이 아니라 국가나 단체 기업의 총괄적인 이미지와 단독적인 상품들도<br />
          어떤 이미지로 보여지느냐를 매우 중요하게 여기면서 좋은 이미지를 위해 노력하고 있습니다.<br />
          <br />
          (2초간 입을 다문채로 대기해주세요)  <br />
          <br />
          그렇다면 스타일의 영역에서 말하는 이미지란 무엇일까요?<br />
          여러분들, 스타일이라는 말 많이 쓰시죠? "어우 저 사람 참 스타일이 좋아.",<br />
          혹은 "저 사람은 어떠어떠한 스타일이야." 라는 말을 많이 하시죠?<br />
          이렇듯 자기 자신의 머릿속에 떠올릴 때 타인과 구별되는 특정적인 시각적인 영상이나 느낌<br />
          이런 것들을 총체적으로 이미지라 말합니다. 또, 기대하는 역할의 이미지에<br />
          걸맞은 행위의 결과의 이미지 또한 스타일에서 말하는 이미지입니다.<br />
          <br />
          (2초간 입을 다문채로 대기해주세요)  <br />
          <br />
          이것들은 인상이나 표정, 체격, 음성, 옷차림, 사고방식 등이 결합된 결과물 입니다.<br />
          이미지 메이킹의 목적은 보여지는 시각적인 외모와 스타일을 이상적으로 변화하고<br />
          지속적으로 유지를 하고자 하는 데 있다면 성공적인 이미지 메이킹을 위해서<br />
          먼저 현재 나의 모습을 명확하게 아는 것이 중요합니다.<br />
          <br />
          (2초간 입을 다문채로 대기해주세요)<br />
        </Script>
      </ScriptWrapper>
      <VideoCameraWrapper>
        <VideoArea>
          {
            recordStatus === 'fail' && <DeviceNotFoundWrapper><DeviceNotFound>Device not found</DeviceNotFound></DeviceNotFoundWrapper>
          }
          {
            (recordStatus !== 'complete' && elapsedTime < 60 ) &&
            <Video
              id="video"
              autoPlay
              backgroundImage={onChangeVideoCssProps(recordStatus, 'image')}
              backgroundRepeat={onChangeVideoCssProps(recordStatus, 'repeat')}
              backgroundSize={onChangeVideoCssProps(recordStatus, 'size')}
              transform={'rotateY(180deg)'}
            >
            </Video>
          }
          {
            (recordStatus === 'complete' && elapsedTime >= 60 ) && <Video id="previewVideo" controls />
          }
          {
            (recordStatus === 'ready' || recordStatus === 'recording') &&
              <PersonFormWrapper>
                <ImageWrap
                  position={'absolute'}
                  width={'50%'}
                  height={'95%'}
                  top={'5%'}
                >
                  <ImageElement
                    src="/images/avatar/octicon_person-26.svg"
                    fill
                    style={{
                      inset: 'auto',
                      objectFit: 'contain',
                      opacity: '0.4'
                    }}
                    alt="human figure"
                  />
                </ImageWrap>
              </PersonFormWrapper>
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
                src="/images/avatar/human_figure.svg"
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
        <StopWatch timer={timer} setTimer={setTimer} duration={duration} setDuration={setDuration} />
        <VideoButtonContainer
          recordStatus={recordStatus}
          setRecordStatus={setRecordStatus}
          onRecordHandler={onClickRecordHandler}
          onReRecordHandler={onReRecordHandler}
          onCompleteHandler={onStopRecordingHandler}
          onNextStepHandler={onNextStepHandler}
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
  width: '60%',
  height: 'calc(35% - 16px)',
  backgroundColor: color.DarkWhite,
  borderRadius: '16px',
  border: `1px solid ${color.ModernGrey}`,
  padding: '20px',
  margin: '0 auto',
  textAlign: 'center'
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
  height: '75%',
  margin: '24px 0 16px 0'
})
const Video = styled.video<CSS_TYPE>(
  {
    position: 'relative',
    width: '60%',
    height: '100%',
    display: 'block',
    margin: '0 auto',
  },
  props => ({
    backgroundImage: props.backgroundImage,
    backgroundRepeat: props.backgroundRepeat,
    backgroundSize: props.backgroundSize,
    display: props.display,
    transform: props.transform
  })
)
const PersonFormWrapper = styled.div({
  position: 'relative',
  width: '60%',
  height: '100%',
  margin: '0 auto',
  top: '-100%'
})
const PersonForm = styled.div<CSS_TYPE>({
  position: 'relative',
  width: '40%',
  height: '100%',
  top: '0',
  margin: '0 auto',
  backgroundImage: "url('/images/avatar/octicon_person-26.svg')",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain'
})
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