import { useState } from 'react';
import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton } from '@/src/styles/styles';
import ScriptItem from './Item';
import ControlPanel from './ControlPanel';
import BottomSheet from '@/src/components/BottomSheet';

const Script = ({ name }: { name: string }) => {

  // Hooks
  const [bottomSheetTitle, setBottomSheetTitle] = useState<string>('');
  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean>(false);

  /* 슬라이드 변환하기 */
  const onClickTransformHandler = () => {

  }

  return (
    <ScriptWrapper>
      <HeaderWrapper>
        <ProjectName>{name}</ProjectName>
        <AllTransBtn
          padding={'8px 24px'}
          color={color.BasicColor}
          borderColor={color.BasicColor}
          fontWeight={'500'}
        >프로젝트 변환하기</AllTransBtn>
      </HeaderWrapper>
      <ScriptArea>
        <TitleWrapper>
          <Title>스크립트 영역</Title>
          <RadiusButton
            backgroundColor={color.BasicColor}
            borderColor={color.BasicColor}
            color={color.White}
            padding={'8px 24px'}
            onClick={() => onClickTransformHandler()}
          >
            슬라이드 변환하기
          </RadiusButton>
        </TitleWrapper>
        <ScriptItemWrapper>
          <ScriptItem
            setIsShowBottomSheet={setIsShowBottomSheet}
            setBottomSheetTitle={setBottomSheetTitle}
          />
          <ScriptItem
            setIsShowBottomSheet={setIsShowBottomSheet}
            setBottomSheetTitle={setBottomSheetTitle}
          />
          <ScriptItem
            setIsShowBottomSheet={setIsShowBottomSheet}
            setBottomSheetTitle={setBottomSheetTitle}
          />
          <ScriptItem
            setIsShowBottomSheet={setIsShowBottomSheet}
            setBottomSheetTitle={setBottomSheetTitle}
          />
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
      </ScriptArea>
    </ScriptWrapper>
  )
}
const ScriptWrapper = styled.div({
  width: 'calc(50% - 16px)',
  height: '100%',
  position: 'relative',
})
const HeaderWrapper = styled.div({
  width: '100%',
  height: 'calc(7% - 12px)',
  margin: '0 0 12px 0',
  padding: '8px 24px',
  position: 'relative',
  backgroundColor: color.White,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})
const ProjectName = styled.div({
  color: color.BasicColor,
  fontSize: '1.1rem',
  fontWeight: '700'
})
const AllTransBtn = styled(RadiusButton)({

})
const ScriptArea = styled.div({
  width: '100%',
  height: '93%',
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
  fontWeight: '800',

  '@media screen and (max-width: 1440px)': {
    fontSize: '1.2rem',
  },

  '@media screen and (max-width: 1023px)': {
    fontSize: '1.15rem',
  },

  '@media screen and (max-width: 960px)': {
    fontSize: '1.05rem',
  }
})
const ScriptItemWrapper = styled.div({
  position: 'relative',
  height: '87%',
  padding: '16px 24px 0 24px',
  overflowY: 'scroll',

  '::-webkit-scrollbar': {
    scrollBehavior: 'smooth',
    display: 'none'
  }
})

export default Script;