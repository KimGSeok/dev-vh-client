'use client';

import { useEffect, useState } from "react";
import { useReactMediaRecorder } from 'react-media-recorder';
import styled from "@emotion/styled";
import { CSS_TYPE, color, RadiusButton, ImageWrap, ImageElement } from "@/src/styles/styles";

function VoiceGenerate() {

  // Hooks
  const [scriptList, setScriptList] = useState(); // 스크립트 목록
  const [recordStatus, setRecordStatus] = useState('wait'); // 녹음대기, 녹음중, 녹음종료
  const [recordScriptLists, setRecordScriptLists] = useState(); // 녹음 완료 목록

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStart: (() => {
      console.log("녹음 시작");
    }),
    onStop: (() => {
      console.log("녹음 종료");
    })
  })

  const onClickRecordHandler = () => {
    console.log('녹음 시작 11')
    startRecording();
    setRecordStatus('recording');
  }

  const onClickRecordCompleteHandler = () =>{
    console.log('녹음 종료 11')
    stopRecording();
    setRecordStatus('complete');
  }

  return (
    <VoiceGenerateWrapper>
      <ScriptWrapper>
        {/* TODO 녹음 상태 */}
        <RecordStatus>녹음 시작 전</RecordStatus>
        {/* TODO 전체 스크립트의 길이 및 현재 스크립트의 인덱스 */}
        <ScriptPageWrapper>1 / 100</ScriptPageWrapper>
        <Desciprtion>다음 문장을 정확하게 읽어주세요.</Desciprtion>
        <Script>그렇기 때문에 오히려 아동발달에 있어서도 우리가 더 많은 생각을 할 수 있습니다.</Script>
        <RecordBtn
          color={color.White}
          backgroundColor={recordStatus === 'wait' ? color.Red : color.Purple}
          display={'inline-flex'}
          alignItems={'center'}
          borderColor={recordStatus === 'wait' ? color.Red : color.Purple}
          padding={'8px 24px'}
          margin={'0 16px 0 0'}
          onClick={() => recordStatus === 'wait' ? onClickRecordHandler() : onClickRecordCompleteHandler()}
        >
          <ImageWrap
            position={'relative'}
            height={'100%'}
            cursor={'pointer'}
          >
            <ImageElement
              src="/icons/mic.svg"
              width={28}
              height={28}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                top: '2px'
              }}
              alt="mic"
            />
          </ImageWrap>
          {
            recordStatus === 'wait' ? '녹음하기' : '완료하기'
          }
          </RecordBtn>
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
    </VoiceGenerateWrapper>
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
  verticalAlign: 'center'
})
const RecordStatus = styled.div<CSS_TYPE>(
  {
    fontSize: '1.2rem',
    margin: '24px 0 12px 0'
  },
  props => ({
  })
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
const RecordBtn = styled(RadiusButton)<CSS_TYPE>(
  {
    fontSize: '1.1rem'
  },
  props => ({
    color: props.color,
    backgroundColor: props.backgroundColor
  })
)
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

  ':hover':{
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