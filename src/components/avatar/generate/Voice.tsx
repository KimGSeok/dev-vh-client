'use client';

import { useEffect, useState } from "react";
import { useReactMediaRecorder } from 'react-media-recorder';
import styled from "@emotion/styled";
import { CSS_TYPE, color, RadiusButton, ImageWrap, ImageElement } from "@/src/styles/styles";
import RecordButtonWrapper from "./RecordButton";
import AudioWaveForm from "@/src/modules/AudioWaveForm";

function VoiceGenerate() {

  // Hooks
  const [mounted, setMounted] = useState<boolean>(false);
  const [scriptList, setScriptList] = useState(); // 스크립트 목록
  const [recordStatus, setRecordStatus] = useState('wait'); // 녹음대기(wait), 녹음중(recording), 녹음종료(complete)
  const [recordScriptLists, setRecordScriptLists] = useState(); // 녹음 완료 목록

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStart: (() => {
      console.log("녹음 시작");
    }),
    onStop: ((blobUrl: string, blob: Blob) => {
      console.log(blobUrl)
      console.log(blob)
      console.log("녹음 종료");
    })
  })

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, [])

  return (
    mounted ?
      <VoiceGenerateWrapper>
        <ScriptWrapper>
          <RecordStatus>
            {recordStatus === 'wait' && '녹음 시작 전'}
            {recordStatus === 'recording' && <><AudioWaveForm />녹음중..</>}
            {
            recordStatus === 'complete' &&
              <>
                <ImageWrap
                  position={'relative'}
                  height={'100%'}
                  cursor={'pointer'}
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
          <ScriptPageWrapper>1 / 100</ScriptPageWrapper>
          <Desciprtion>다음 문장을 정확하게 읽어주세요.</Desciprtion>
          <Script>그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.</Script>
          <RecordButtonWrapper
            recordStatus={recordStatus}
            setRecordStatus={setRecordStatus}
            startRecording={startRecording}
            stopRecording={stopRecording}
          />
        </ScriptWrapper>
        <RecordScriptWrapper>
          <Title>녹음 완료 음성 목록</Title>
          <RecordScriptLists>
            <RecordScriptList>
              <RecordScriptInfo>
                <RecordScript>그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.</RecordScript>
                <RecordingTime>00:00:12</RecordingTime>
                <RecordingBtnWrapper>버튼 영역</RecordingBtnWrapper>
              </RecordScriptInfo>
            </RecordScriptList>
            <RecordScriptList>
              <RecordScriptInfo>
                <RecordScript>그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.</RecordScript>
                <RecordingTime>00:00:12</RecordingTime>
                <RecordingBtnWrapper>버튼 영역</RecordingBtnWrapper>
              </RecordScriptInfo>
            </RecordScriptList>
            <RecordScriptList>
              <RecordScriptInfo>
                <RecordScript>그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.</RecordScript>
                <RecordingTime>00:00:12</RecordingTime>
                <RecordingBtnWrapper>버튼 영역</RecordingBtnWrapper>
              </RecordScriptInfo>
            </RecordScriptList>
            <RecordScriptList>
              <RecordScriptInfo>
                <RecordScript>그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.</RecordScript>
                <RecordingTime>00:00:12</RecordingTime>
                <RecordingBtnWrapper>버튼 영역</RecordingBtnWrapper>
              </RecordScriptInfo>
            </RecordScriptList>
            <RecordScriptList>
              <RecordScriptInfo>
                <RecordScript>그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.</RecordScript>
                <RecordingTime>00:00:12</RecordingTime>
                <RecordingBtnWrapper>버튼 영역</RecordingBtnWrapper>
              </RecordScriptInfo>
            </RecordScriptList>
            <RecordScriptList>
              <RecordScriptInfo>
                <RecordScript>그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.</RecordScript>
                <RecordingTime>00:00:12</RecordingTime>
                <RecordingBtnWrapper>버튼 영역</RecordingBtnWrapper>
              </RecordScriptInfo>
            </RecordScriptList>
            <RecordScriptList>
              <RecordScriptInfo>
                <RecordScript>그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.</RecordScript>
                <RecordingTime>00:00:12</RecordingTime>
                <RecordingBtnWrapper>버튼 영역</RecordingBtnWrapper>
              </RecordScriptInfo>
            </RecordScriptList>
            <RecordScriptList>
              <RecordScriptInfo>
                <RecordScript>그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.</RecordScript>
                <RecordingTime>00:00:12</RecordingTime>
                <RecordingBtnWrapper>버튼 영역</RecordingBtnWrapper>
              </RecordScriptInfo>
            </RecordScriptList>
          </RecordScriptLists>
        </RecordScriptWrapper>
      </VoiceGenerateWrapper> : <></>
  )
}

const VoiceGenerateWrapper = styled.div({
  position: 'relative',
  height: '100%'
})
const ScriptWrapper = styled.div({
  height: '60%',
  textAlign: 'center',
  padding: '5% 35%',
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
const RecordScriptInfo = styled.div<CSS_TYPE>(
  {
    fontSize: '1rem',
    display: 'flex'
  },
  props => ({

  })
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

export default VoiceGenerate;