'use client';

import styled from "@emotion/styled";
import { CSS_TYPE, color, RadiusButton, ImageWrap, ImageElement } from "@/src/styles/styles";
import { Dispatch, SetStateAction } from "react";

interface RecordProps {
  type: string;
  recordStatus: string;
  scriptList: object[];
  scriptSequence?: number;
  setScriptSequence?: Dispatch<SetStateAction<number>>;
  setRecordStatus?: Dispatch<SetStateAction<string>>;
  setRecordScriptLists?: Dispatch<SetStateAction<object[]>>;
  onRecordHandler?: () => void;
  onCompleteHandler: () => void;
  onReRecordHandler?: () => void;
  onNextStepHandler?: () => void;
}

const RecordButtonWrapper = ({
  type,
  recordStatus,
  scriptList,
  scriptSequence,
  setScriptSequence,
  setRecordStatus,
  setRecordScriptLists,
  onRecordHandler,
  onCompleteHandler,
  onReRecordHandler,
  onNextStepHandler
}: RecordProps) => {

  return (
    <ButtonWrapper>
      {
        (recordStatus === 'wait' || recordStatus === 'fail') &&
        <RecordBtn
          backgroundColor={color.Red}
          borderColor={color.Red}
          onClick={onRecordHandler}
        >
          <ImageWrap
            position={'relative'}
            height={'100%'}
            cursor={'pointer'}
          >
            <ImageElement
              src={type === 'voice' ? '/icons/mic.svg' : '/icons/videocam.svg'}
              width={24}
              height={24}
              style={{
                width: '75%',
                height: '75%',
                position: 'relative',
                top: '2px'
              }}
              alt="mic"
            />
          </ImageWrap>{type === 'voice' ? '녹음하기' : '녹화하기'}
        </RecordBtn>
      }
      {
        recordStatus === 'recording' &&
        <RecordBtn
          backgroundColor={color.Purple}
          borderColor={color.Purple}
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
            onClick={onNextStepHandler}
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