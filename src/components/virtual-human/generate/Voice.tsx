'use client';

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useReactMediaRecorder } from "react-media-recorder";
import { v4 as uuidV4 } from 'uuid';
import { color, ImageWrap, ImageElement, RadiusButton } from "@styles/styles";
import RecordButtonWrapper from "./RecordButton";
import AudioWaveForm from "@modules/AudioWaveForm";
import { get, post } from "@hooks/asyncHooks";
import Portal from '@components/Portal';
import Modal from '@components/Modal';
import VoiceModalContent from '@components/virtual-human/generate/VoiceModalContent';
import { useRouter } from "next/navigation";

const VoiceGenerate = ({ type, virtualHumanName }: { type: string, virtualHumanName: string }) => {

  // Parameter
  const audio: any = document.getElementById("audio") // Audio 객체 취득

  // Hooks
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [scriptList, setScriptList] = useState<any>([]); // 스크립트 목록
  const [scriptSequence, setScriptSequence] = useState<number>(0); // 현재 녹음 스크립트 순서
  const [recordStatus, setRecordStatus] = useState('wait'); // 녹음대기(wait), 녹음중(recording), 녹음종료(complete)
  const [recordScriptLists, setRecordScriptLists] = useState<object[]>([]); // 녹음 완료 목록

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    video: false,
    audio: true,
  });

  const onStartRecordingHandler = () => {
    startRecording();
    setRecordStatus('recording');
  };

  const onStopRecordingHandler = () => {
    stopRecording();
    setRecordStatus('complete');
  };

  const onReRecordingHandler = () => {
    startRecording();
    setRecordStatus('recording');
  }

  const onNextStepHandler = async () => {
    if (mediaBlobUrl) {

      // Parameter
      const blobUrl = mediaBlobUrl;

      console.log(blobUrl);

      fetch(blobUrl)
        .then(async (res) => {

          const audioBlob = await res.blob();
          if (audioBlob.size < 1) {
            alert('녹음이 제대로 진행되지 않았습니다.\n다시 진행해주세요.');
            return false;
          }

          const audioFile = new File([audioBlob], `${scriptList[scriptSequence].script}_audio.wav`, {
            type: 'audio/wav'
          });

          setRecordScriptLists((prev) => ([...prev, {
            ...scriptList[scriptSequence],
            blobUrl: mediaBlobUrl,
            blob: audioBlob,
            file: audioFile,
          }]))
          setScriptSequence(scriptSequence + 1);
          setRecordStatus('wait');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('녹음이 제대로 진행되지 않았습니다.\n녹음을 다시 진행해주세요.');
    }
  }

  const onClickGenerateVoiceModelHandler = async () => {

    // Parameter
    const avatarId = uuidV4();
    const formData = new FormData();
    const scriptArr = Array();

    recordScriptLists.forEach((item: any) => {

      // Preparing to send to the server
      // formData.append('blobs', item.blob);
      formData.append('files', item.file);
      scriptArr.push({
        id: item.id,
        type: item.type,
        script: item.script
      })
    })
    formData.append('data', JSON.stringify(scriptArr));
    formData.append('virtualHumanType', type);
    formData.append('virtualHumanId', avatarId);
    formData.append('virtualHumanName', virtualHumanName);

    const url = 'virtual-human/upload';
    const headers ={
        "Contest-Type": "multipart/form-data",
        "uuid": avatarId
      }
    const response = post(url, formData, headers);

    console.log(response);

    alert('아바타 생성이 요청이 완료되었습니다.');

    // TODO

    // if (response.status === 201 && response.statusText === 'Created') {
      
      // router.push('/virtual-human');
    // }
    // else {
      // alert('아바타 생성중 에러가 발생하였습니다.\n 관리자에게 문의해주세요.');
      // router.refresh();
    // }
  }

  const VoiceModalChildren =
    <VoiceModalContent
      totalLength={parseInt(scriptList.length)}
      recordScriptLists={recordScriptLists}
      onClickGenerateVoiceModelHandler={onClickGenerateVoiceModelHandler}
    />

  useEffect(() => {
    const onSaveBlobUrl = async (blobUrl: string) => {
      audio.src = blobUrl;
    }
    mediaBlobUrl && onSaveBlobUrl(mediaBlobUrl)
  }, [mediaBlobUrl])

  useEffect(() => {

    const getData = async () => {

      const script = await get('virtual-human/getScripts', 'no-cache');
      setScriptList(script);
      setMounted(true);
    }
    getData();
  }, [])

  return (
    mounted ?
      <VoiceGenerateWrapper>
        {
          recordScriptLists.length >= 20 &&
          <RadiusButton
            position={'absolute'}
            right={'0'}
            backgroundColor={color.BrightBlue}
            borderColor={color.BrightBlue}
            color={color.White}
            zIndex={2}
            onClick={() => setShowModal(true)}
          >녹음 종료하기</RadiusButton>
        }
        <ScriptWrapper>
          <ScriptArea>
            <RecordStatus>
              <audio id="audio" />
              {recordStatus === 'wait' && '녹음 시작 전'}
              {recordStatus === 'recording' && <><AudioWaveForm />녹음중..</>}
              {
                recordStatus === 'complete' &&
                <>
                  <ImageWrap
                    position={'relative'}
                    height={'100%'}
                    cursor={'pointer'}
                    onClick={() => {
                      audio.play()
                        .then(() => {
                          audio.play()
                        })
                        .catch((error: any) => {
                          alert('오디오가 제대로 녹음되지 않았습니다.\n다시 녹음해주세요.');
                          console.error(error);
                        })
                    }}
                  >
                    <ImageElement
                      src="/icons/play.svg"
                      width={24}
                      height={24}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        top: '-1px',
                        margin: '0 12px 0 0'
                      }}
                      alt="play"
                    />
                  </ImageWrap>녹음완료
                </>
              }
            </RecordStatus>
            {/* TODO 전체 스크립트의 길이 및 현재 스크립트의 인덱스 */}
            <ScriptPageWrapper>{scriptSequence + 1} / {scriptList && scriptList.length}</ScriptPageWrapper>
            <Desciprtion>다음 문장을 정확하게 읽어주세요.</Desciprtion>
            <Script>{scriptList && scriptList[scriptSequence].script}</Script>
            <RecordButtonWrapper
              type={type}
              recordStatus={recordStatus}
              scriptList={scriptList[scriptSequence]}
              scriptSequence={scriptSequence}
              setScriptSequence={setScriptSequence}
              setRecordStatus={setRecordStatus}
              setRecordScriptLists={setRecordScriptLists}
              onRecordHandler={onStartRecordingHandler}
              onCompleteHandler={onStopRecordingHandler}
              onReRecordHandler={onReRecordingHandler}
              onNextStepHandler={onNextStepHandler}
            />
          </ScriptArea>
        </ScriptWrapper>
        <RecordScriptWrapper>
          <Title>녹음 완료 음성 목록</Title>
          {
            recordScriptLists && recordScriptLists.length > 0 ?
              <RecordScriptLists>
                {recordScriptLists.map((item: any, index) => {
                  return (
                    <RecordScriptList key={index}>
                      <RecordScriptInfo>
                        <RecordScript>{item.script}</RecordScript>
                        <RecordingTime>음성 길이</RecordingTime>
                        <RecordingBtnWrapper>버튼 영역</RecordingBtnWrapper>
                      </RecordScriptInfo>
                    </RecordScriptList>
                  )
                })}
              </RecordScriptLists> : <EmptyList>녹음이 완료된 음성 목록이 존재하지 않습니다.</EmptyList>
          }
        </RecordScriptWrapper>
        {
          showModal &&
          <Portal>
            <Modal
              title={'음성 아바타 생성'}
              modal={showModal}
              setModal={setShowModal}
              children={VoiceModalChildren}
            />
          </Portal>
        }
      </VoiceGenerateWrapper > : <></>
  )
}

const VoiceGenerateWrapper = styled.div({
  position: 'relative',
  height: '100%'
})
const ScriptWrapper = styled.div({
  height: '60%',
  position: 'relative',
  textAlign: 'center',
})
const ScriptArea = styled.div({
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
})
const RecordStatus = styled.div(
  {
    height: '24px',
    fontSize: '1.1rem',
    margin: '0 0 12px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color.BasicColor,
    fontWeight: '600'
  },
)
const ScriptPageWrapper = styled.div({
  color: color.Purple,
  fontSize: '1.1rem',
  fontWeight: '500'
})
const Desciprtion = styled.div({
  fontSize: '1.5rem',
  fontWeight: '400',
  margin: '36px 0'
})
const Script = styled.div({
  lineHeight: '40px',
  fontSize: '1.8rem',
  fontWeight: '600',
  margin: '24px 0 48px 0',
  whiteSpace: 'break-spaces',
  wordBreak: 'keep-all',
})
const RecordScriptWrapper = styled.div({
  height: '40%'
})
const Title = styled.div({
  fontSize: '1.3rem',
  fontWeight: '600',
  padding: '0 0 12px 0',
  borderBottom: `1px solid ${color.ModernGrey}`
})
const RecordScriptLists = styled.ul({
  height: '90%',
  overflowY: 'scroll',

  '::-webkit-scrollbar': {
    scrollBehavior: 'smooth',
    display: 'none'
  }
})
const RecordScriptList = styled.li({
  borderBottom: `1px solid ${color.ModernGrey}`,
  padding: '12px 0',

  ':nth-of-type(2n-1)': {
    backgroundColor: color.DarkWhite
  },

  ':hover': {
    backgroundColor: color.AliceBlue,
  },
})
const RecordScriptInfo = styled.div(
  {
    fontSize: '1rem',
    display: 'flex'
  }
)
const RecordScript = styled.div({
  width: '80%',
  padding: '0 12px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})
const RecordingTime = styled.div({
  width: '10%'
})
const RecordingBtnWrapper = styled.div({
  width: '10%'
})
const EmptyList = styled.div({
  fontSize: '1rem',
  fontWeight: '300',
  textAlign: 'center',
  color: color.DeActiveColor,
  backgroundColor: color.DarkWhite,
  padding: '24px 0'
})

export default VoiceGenerate;