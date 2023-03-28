'use client';

import styled from "@emotion/styled";
import { CSS_TYPE, color, RadiusButton, ImageWrap, ImageElement } from "@styles/styles";
import { Dispatch, SetStateAction } from "react";

interface RecordProps {
  recordStatus: string;
  setRecordStatus: Dispatch<SetStateAction<string>>;
  onRecordHandler: () => void;
  onCompleteHandler: () => void;
  onReRecordHandler: () => void;
  onNextStepHandler: () => void;
}

const VideoButtonContainer = ({
  recordStatus,
  onRecordHandler,
  onCompleteHandler,
  onReRecordHandler,
  onNextStepHandler
}: RecordProps) => {

  return (
    <ButtonWrapper>
      {
        (recordStatus === 'wait' || recordStatus === 'ready' || recordStatus === 'fail') &&
        <RecordBtn
          backgroundColor={color.Red}
          border={'0'}
          margin={'0 0 0 0'}
          onClick={onRecordHandler}
        >
          <ImageWrap
            position={'relative'}
            height={'100%'}
            cursor={'pointer'}
          >
            <ImageElement
              src={'/icons/videocam.svg'}
              width={28}
              height={28}
              style={{
                width: '70%',
                height: '70%',
                position: 'relative',
                top: '3px'
              }}
              alt="mic"
            />
          </ImageWrap>녹화시작
        </RecordBtn>
      }
      {
        recordStatus === 'recording' &&
        <RecordBtn
          backgroundColor={color.Purple}
          border={'0'}
          margin={'0 0 0 0'}
          onClick={onCompleteHandler}
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
                top: '3px'
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
            border={'0'}
            onClick={onReRecordHandler}
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
                  top: '3px'
                }}
                alt="mic"
              />
            </ImageWrap>다시 녹화하기
          </RecordBtn>
          <RecordBtn
            backgroundColor={color.BasicColor}
            borderColor={color.BasicColor}
            onClick={onNextStepHandler}
          >아바타 생성하기
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
  },
  props => ({
    color: props.color,
    margin: props.margin ? props.margin : '0 16px 0 0',
    backgroundColor: props.backgroundColor
  })
)
const RecordBtnWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export default VideoButtonContainer;