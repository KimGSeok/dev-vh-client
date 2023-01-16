import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { CSS_TYPE, color, ImageElement, ImageWrap } from '@/src/styles/styles';

interface SheetProps {
  isShowBottomSheet: boolean;
  setIsShowBottomSheet: Dispatch<SetStateAction<boolean>>
  title?: string;
  children?: React.ReactNode;
}

const BottomSheet = ({ isShowBottomSheet, setIsShowBottomSheet, title, children }: SheetProps) =>{
  return(
    <SheetWrapper top={isShowBottomSheet ? '0' : '100vh'}>
      <SheetBackground />
      <SheetArea
        height={isShowBottomSheet ? '25%' : '0'}
        minHeight={isShowBottomSheet ? '25%' : '0'}
        padding={isShowBottomSheet ? '20px' : '0'}
      >
        <TitleWrapper>
          <Title>{title ? title : '제목이 없습니다.'}</Title>
          <ImageWrap
            position={'relative'}
            padding={'2px 0'}
            cursor={'pointer'}
            onClick={() => setIsShowBottomSheet(false)}
          >
            <ImageElement
              src="/icons/close.svg"
              width={28}
              height={28}
              alt="close button"
            />
          </ImageWrap>
        </TitleWrapper>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </SheetArea>
    </SheetWrapper>
  )
}

const SheetWrapper = styled.div<CSS_TYPE>(
  {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  props => ({
    top: props.top
  })
)
const SheetBackground = styled.div<CSS_TYPE>(
  {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: color.BasicBlack,
    opacity: '0.7'
  }
)
const SheetArea = styled.div<CSS_TYPE>(
  {
    position: 'absolute',
    width: '100%',
    minHeight: '0',
    bottom: '0',
    backgroundColor: color.White,
    opacity: '1',
    borderRadius: '16px',
    transition: 'all 0.45s'
  },
  props => ({
    height: props.height,
    minHeight: props.minHeight,
    padding: props.padding
  })
)
const TitleWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})
const Title = styled.div({
  fontSize: '1.2rem',
  fontWeight: '800',
  color: color.BasicColor
})
const ChildrenWrapper= styled.div({
  margin: '8px 0 0 0',
})

export default BottomSheet;