import { useState } from 'react';
import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton } from '@/src/styles/styles';
import ScriptItem from './Item';
import ControlPanel from './ControlPanel';
import BottomSheet from '../../layout/BottomSheet';

const Script = () => {

  // Hooks
  const [bottomSheetTitle, setBottomSheetTitle] = useState<string>('');
  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean>(false);

  return (
    <ScriptWrapper>
      <TitleWrapper>
        <Title>스크립트 영역</Title>
        <RadiusButton
          backgroundColor={color.BasicColor}
          color={color.White}
          padding={'8px 24px'}
        >
          변환하기
        </RadiusButton>
      </TitleWrapper>
      <ScriptItemWrapper>
        <ScriptItem
          setIsShowBottomSheet={setIsShowBottomSheet}
          setBottomSheetTitle={setBottomSheetTitle}
        />
      </ScriptItemWrapper>
      <ControlPanel />

      {/* Web Bottom Sheet */}
      <BottomSheet
        isShowBottomSheet={isShowBottomSheet}
        setIsShowBottomSheet={setIsShowBottomSheet}
        title={bottomSheetTitle}
      /> : ''
    </ScriptWrapper>
  )
}
const ScriptWrapper = styled.div({
  width: 'calc(50% - 16px)',
  position: 'relative',
  backgroundColor: color.White,
  borderRadius: '16px',
  padding: '24px 0 0 0',
})
const TitleWrapper = styled.div({
  height: '5%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '0 24px'
})
const Title = styled.div({
  fontSize: '1.25rem',
  fontWeight: '800'
})
const ScriptItemWrapper = styled.div({
  position: 'relative',
  height: '87%',
  padding: '16px 24px 0 24px',
  overflowY: 'scroll',

  '::-webkit-scrollbar':{
    scrollBehavior: 'smooth',
    display: 'none'
  }
})

export default Script;