import styled from '@emotion/styled';
import { color, ImageWrap, ImageElement } from '@styles/styles';
import { Dispatch, SetStateAction } from 'react';

interface MasterAuthSideComponentProps {
  setShowComponent: Dispatch<SetStateAction<boolean>>;
}

const MasterAuthRightSideComponent = ({ setShowComponent }: MasterAuthSideComponentProps) => {
  return (
    <Container>
      <HeaderContaier>
        <Title>DRX Beryl의 촬영 및 녹음 목록</Title>
        <ImageWrap
          position={'relative'}
          cursor={'pointer'}
          top={'1px'}
          onClick={() => setShowComponent(false)}
        >
          <ImageElement
            src="/icons/close.svg"
            width={24}
            height={24}
            alt="close button"
          />
        </ImageWrap>
      </HeaderContaier>
      <SummaryContainer>
        <div>UUID</div>
        <div>버튼 영역</div>
      </SummaryContainer>
      <ContentContainer>몸통</ContentContainer>
    </Container>
  )
}

const Container = styled.div({
  position: 'relative',
  height: '100%',
})
const HeaderContaier = styled.div({
  position: 'relative',
  height: '6%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${color.ModernGrey}`,
  padding: '0 20px',
  fontSize: '1.2rem',
})
const Title = styled.div({
  fontWeight: '700'
})
const SummaryContainer = styled.div({
  position: 'relative',
  height: '12%',
  padding: '8px 16px'
})
const ContentContainer = styled.div({
  position: 'relative',
  height: '82%'
})

export default MasterAuthRightSideComponent;