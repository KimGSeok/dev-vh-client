'use client'

import styled from "@emotion/styled";
import RecordRTC from 'recordrtc';
import dynamic from "next/dynamic";
import { v4 as uuidV4 } from 'uuid';
import { CSS_TYPE, color, ImageWrap, ImageElement } from "@styles/styles";
import { useEffect, useState } from "react";
import { post } from "@hooks/asyncHooks";
import RecordButtonContainer from "./RecordButton";
import { onChangeVideoCssProps } from "@modules/avatar/onChangeVideoCssProps";
import { useRouter } from "next/navigation";
const StopWatch = dynamic(() => import('@components/stopWatch'), {
  ssr: false
});

const VideoGenerate = ({ type, virtualHumanName }: { type: string, virtualHumanName: string }) => {

  // Hooks
  const router = useRouter();
  const [recordStatus, setRecordStatus] = useState('wait'); // 녹음대기(wait), 녹음중(recording), 녹음종료(complete), 녹음실패(fail)
  const [duration, setDuration] = useState<number>(0);
  const [timer, setTimer] = useState('init');
  const [videoMedia, setVideoMedia] = useState<any>({
    uploading: false,
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
      mimeType: 'video/webm',
      // recorderType: RecordRTC.WhammyRecorder
      checkForInactiveTracks: false,
      disableLogs: true,
    });

    setTimer('start');
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
      setTimer('stop');
      recorder.camera.stop();

      const stopRecordingHandler = async () => {
        await recorder.stopRecording(() => {
          const blob = recorder.getBlob();

          setVideoMedia({
            uploading: true,
            recorder: null,
            video: blob,
            videoBlobUrl: URL.createObjectURL(blob)
          })
          recorder.reset();
          setRecordStatus('complete');
        });
      }
      stopRecordingHandler();
    }
  }

  const onReRecordHandler = () =>{

    setTimer('init');
    setRecordStatus('recording');
    onClickRecordHandler();
  }

  const onNextStepHandler = () =>{

    // Parameter
    const virtualHumanId = uuidV4();
    const formData = new FormData();
    const scriptArr = Array();
    const blobUrl = videoMedia.videoBlobUrl;

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
    const response = post(url, formData, headers);

    console.log(response);

    alert('아바타 생성 요청이 완료되었습니다.');
    router.push('/virtual-human');
  }

  useEffect(() => {

    if(recordStatus === 'complete'){
      const video: any = document.getElementById('previewVideo');
      video.src = URL.createObjectURL(videoMedia.video);
    }

    // if(recordStatus === 'complete' && duration < 180){
    //   alert('최소 3분이상 녹화되지 않았습니다.\n다시 녹화해주세요.');
    //   setTimer('init');
    // }
    // else if(recordStatus === 'complete' && duration >= 180){
      // const video: any = document.getElementById('previewVideo');
      // video.src = URL.createObjectURL(videoMedia.video);
    // }
  }, [recordStatus])

  return (
    <VideoGenerateWrapper>
      <Title>아래 문장을 대화를 하듯 말하며 최소 3분 이상 녹화해주세요.</Title>
      <ScriptWrapper>
        <Script>
          한돈 고급화를 위해선 고품질 돼지고기를 판별할 수 있는 새로운 등급판정 기준이 필요하다는 연구결과가 나와 주목된다.<br />

          대한한돈협회(회장 손세희) 주관으로 2일 서울 서초구 제2축산회관에서 진행된 '한돈 고급화전략 수립을 위한 유통 소비행태 및 소비친화적 품질 등 개선방안 연구 중간보고회'에서 이러한 내용이 제시됐다.

          현재 돼지고기 등급은 도체중과 등지방두께를 중심으로 모두 4개(1+, 1, 2, 등외)등급으로 나뉜다. 가령 가장 높은 등급인 1+를 받으려면 도체중이 83~93㎏, 등지방두께가 17~25㎜ 범위에 들어야 한다. 같은 등급을 받은 돼지고기라고 하더라도 개체에 따라 품질차이가 큰 경우가 많은 것으로 알려졌다. 소비지에선 삼겹살과 목심 부위에 대한 선호도가 큰데, 높은 등급의 돼지고기라도 해당 부위의 품질을 보장하지 않기 때문에 육가공업체는 물론 소비자들도 등급제 효용이 떨어진다는 지적의 목소리가 컸다.<br />

          실제로 2021년 등급별 돼지(거세, 1㎏기준) 전국 평균 경락값을 보면, 1+등급 5115원, 1등급 5065원, 2등급 5114원으로 낮은 등급인 2등급의 평균 경락값이 1등급 가격보다 높게 형성되는 역전현상이 발생하기도 했다.<br />

          이에 육색·마블링·보수력 등 품질평가가 가능한 추가적인 형질의 개발이 필요하다는 게 이번 연구결과의 주된 내용이다. 육색의 경우 적색도가 높을수록 고품질로 판단된다. 미국에서도 적색도를 6가지로 나눠 해당 평가기준을 육질판정에 활용할 예정으로 알려졌다.<br />

          마블링의 경우 풍미·연도·다즙성과 연관이 있는 지표다. 우리나라에서 선호도가 높은 삼겹살의 경우 근육 지방의 적정 비율의 기준을 세우는 것이 필요하다. <br />

          보수력은 육색·연도·다즙성에 영향을 주는 지표다. 보수력이 높을수록 육즙손실이 적고 고기 수율을 증가시키기 때문에 역시 고품질로 인정받을 수 있다. <br />

          다만 현재 등급판정 체계 아래에선 해당 지표들을 당장 적용하기 어렵기 때문에 시중에 보급된 자동등급판정기기를 활용할 수 있는 육색 정도가 품질평가 기준으로 이용할 가능성이 있다는 지적이다. <br />

          서강석 순천대학교 교수는 “해당 요인들을 종합적으로 검토해 추가 연구를 진행해야 하며 육질형질과 밀접히 연관된 이화학적 형질의 유전상관계수를 검토 비교해 앞으로 개량 방향을 설정해야 한다”고 밝혔다.<br />

          한돈협회는 해당 연구를 바탕으로 올해도 추가 연구를 진행해 프리미엄 돼지고기에 대한 기준을 정립하고 제도화도 진행하겠다는 입장이다.
        </Script>
      </ScriptWrapper>
      <VideoCameraWrapper>
        <VideoArea>
          {
            recordStatus === 'fail' && <DeviceNotFoundWrapper><DeviceNotFound>Device not found</DeviceNotFound></DeviceNotFoundWrapper>
          }
          {
            (recordStatus === 'wait' || recordStatus === 'recording') && <Video
              id="video"
              autoPlay
              backgroundImage={onChangeVideoCssProps(recordStatus, 'image')}
              backgroundRepeat={onChangeVideoCssProps(recordStatus, 'repeat')}
              backgroundSize={onChangeVideoCssProps(recordStatus, 'size')}
            />
          }

          {/* <Video display={recordStatus === 'complete' ? 'block' : 'none'} id="previewVideo" controls/> */}
          {
            recordStatus === 'complete' && <Video id="previewVideo" controls/> 
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
        <RecordButtonContainer
          type={type}
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
  width: '70%',
  height: 'calc(35% - 16px)',
  backgroundColor: color.DarkWhite,
  borderRadius: '16px',
  border: `1px solid ${color.ModernGrey}`,
  padding: '16px',
  margin: '0 auto'
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
    height: '100%',
    display: 'block',
    margin: '0 auto',
  },
  props => ({
    backgroundImage: props.backgroundImage,
    backgroundRepeat: props.backgroundRepeat,
    backgroundSize: props.backgroundSize,
    display: props.display
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