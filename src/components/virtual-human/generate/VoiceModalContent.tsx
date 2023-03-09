'use client';

import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton, Warning } from '@styles/styles';
import { Dispatch, SetStateAction, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  totalLength: number;
  recordScriptLists: object[];
  onClickGenerateVoiceModelHandler: () => void;
}

const ModalContent = ({ totalLength, recordScriptLists, onClickGenerateVoiceModelHandler }: ModalProps) => {

  // Hooks
  const router = useRouter();

  return (
    <MainComponent>
      <ContentWrapper>
        <ScriptLengthWrapper>{recordScriptLists.length} / {totalLength}</ScriptLengthWrapper>
        <ContentArea>
          <RecordScriptLists>
            {
              recordScriptLists && recordScriptLists.length > 0 &&
              recordScriptLists.map((item: any, index: number) => {
                return (
                  <RecordScriptList key={index}>
                    <RecordScriptInfo>
                      <RecordScript>{item.script}</RecordScript>
                      <RecordingBtnWrapper>버튼 영역</RecordingBtnWrapper>
                    </RecordScriptInfo>
                  </RecordScriptList>
                )
              })
            }
          </RecordScriptLists>
        </ContentArea>
        <IsCheckMessageWrapper>{recordScriptLists.length}개의 녹음한 데이터로 음성 아바타를 생성하시겠습니까?</IsCheckMessageWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <RadiusButton
          padding={'8px 24px'}
          backgroundColor={color.BasicColor}
          borderColor={color.BasicColor}
          color={color.White}
          fontSize={'1.2rem'}
          onClick={onClickGenerateVoiceModelHandler}
        >생성하기</RadiusButton>
      </ButtonWrapper>
    </MainComponent>
  )
}
const MainComponent = styled.div({
  margin: '0 12px',
  padding: '0 0 16px 0'
})
const ContentWrapper = styled.div({
  margin: '0 0 24px 0'
})
const ScriptLengthWrapper = styled.div({
  textAlign: 'right',
  color: color.Purple,
  fontSize: '1.1rem'
})
const ContentArea = styled.div(
  {
  }
)
const RecordScriptLists = styled.ul({
  maxHeight: '320px',
  overflowY: 'scroll',
  margin: '24px 0',

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
  width: '85%',
  padding: '0 12px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
})
const RecordingBtnWrapper = styled.div({
  width: '15%'
})
const IsCheckMessageWrapper = styled.div({
  textAlign: 'center',
  color: color.Purple,
  fontSize: '1.3rem',
  fontWeight: '600',
  margin: '36px 0'
})
const ButtonWrapper = styled.div({
  textAlign: 'center'
})

export default ModalContent;