'use client';

import styled from "@emotion/styled";
import { CSS_TYPE, color, RadiusButton, ImageWrap, ImageElement } from "@/src/styles/styles";
import { Dispatch, SetStateAction } from "react";

interface RecordProps {
  recordStatus: string;
  setRecordStatus: Dispatch<SetStateAction<string>>;
  startRecording: () => void;
  stopRecording: () => void;
  setRecordScriptLists: Dispatch<SetStateAction<object[]>>;
}

const RecordButtonWrapper = ({
  recordStatus,
  setRecordStatus,
  startRecording,
  stopRecording,
  setRecordScriptLists
}: RecordProps) => {

  // 녹음대기

  // 녹음중

  // 녹음완료

  // 녹음하기 버튼
  const onClickRecordHandler = () => {
    startRecording();
    setRecordStatus('recording');
  }

  // TODO
  const onClickRecordCompleteHandler = () => {
    stopRecording();
    setRecordStatus('complete');
    setRecordScriptLists((prev) => ([{...prev, 'test': 'zz'}]))
  }

  // 다시녹음하기 버튼

  // 다음으로 버튼

  return (
    <ButtonWrapper>
      {
        recordStatus === 'wait' &&
        <RecordBtn
          backgroundColor={color.Red}
          borderColor={color.Red}
          onClick={() => onClickRecordHandler()}
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
          </ImageWrap>녹음하기
        </RecordBtn>
      }
      {
        recordStatus === 'recording' &&
        <RecordBtn
          backgroundColor={color.Purple}
          borderColor={color.Purple}
          onClick={() => onClickRecordCompleteHandler()}
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
          </ImageWrap>완료하기
        </RecordBtn>
      }
      {
        recordStatus === 'complete' &&
        <RecordBtnWrapper>
          <RecordBtn
            backgroundColor={color.Red}
            borderColor={color.Red}
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
            </ImageWrap>다시 녹음하기
          </RecordBtn>
          <RecordBtn
            backgroundColor={color.BasicColor}
            borderColor={color.BasicColor}
          >다음으로
          </RecordBtn>
        </RecordBtnWrapper>
      }
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div({

})
const RecordBtn = styled(RadiusButton)<CSS_TYPE>(
  {
    fontSize: '1.1rem',
    color: color.White,
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 24px',
    margin: '0 16px 0 0'
  },
  props => ({
    color: props.color,
    backgroundColor: props.backgroundColor
  })
)
const RecordBtnWrapper = styled.div({

})

export default RecordButtonWrapper;