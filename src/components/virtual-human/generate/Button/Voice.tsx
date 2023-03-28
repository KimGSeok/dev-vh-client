'use client';

import styled from "@emotion/styled";
import { CSS_TYPE, color, RadiusButton, ImageWrap, ImageElement } from "@styles/styles";

interface RecordProps {
  recordStatus: string;
  scriptSequence: number;
  onRecordHandler: () => void;
  onListenAgainHandler: () => void;
  onCompleteHandler: () => void;
  onReRecordHandler: () => void;
  onNextStepHandler: () => void;
}

const VoiceButtonContainer = ({
  recordStatus,
  scriptSequence,
  onRecordHandler,
  onListenAgainHandler,
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
              src={'/icons/mic.svg'}
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
          </ImageWrap>녹음시작
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
            </ImageWrap>다시 녹음하기
          </RecordBtn>
          <RecordBtn
            backgroundColor={color.BasicOrange}
            borderColor={color.BasicOrange}
            onClick={onListenAgainHandler}
          >들어보기
          </RecordBtn>
          {
            <RecordBtn
              backgroundColor={color.BasicColor}
              borderColor={color.BasicColor}
              onClick={scriptSequence >= 99 ? (e) => {e.stopPropagation} : onNextStepHandler}
              opacity={scriptSequence >= 99 ? 0.5 : 1}
              cursor={scriptSequence >= 99 ? 'initial' : 'cursor'}
            >다음으로
            </RecordBtn>
          }
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
    backgroundColor: props.backgroundColor,
    opacity: props.opacity,
    cursor: props.cursor,
  })
)
const RecordBtnWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

export default VoiceButtonContainer;