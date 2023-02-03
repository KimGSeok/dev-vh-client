'use client';

import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton, Warning } from '@/src/styles/styles';

interface ModalProps {

}

const ModalContent = () => {
  return (
    <MainComponent>
      <ContentWrapper>
        <ContentTitle>프로젝트의 이름을 입력해주세요.</ContentTitle>
        <ContentArea>
          <TitleInput type="text" placeholder={'프로젝트 이름을 입력해주세요.'} />
        </ContentArea>
      </ContentWrapper>
    </MainComponent>
  )
}

const MainComponent = styled.div({
  margin: '0 12px',
  padding: '0 0 24px 0'
})
const ContentWrapper = styled.div({
  margin: '0 0 24px 0'
})
const ContentTitle = styled.div<CSS_TYPE>(
  {
    fontSize: '1rem',
    fontWeight: '700',
    margin: '12px 0'
  },
  props => ({
    color: props.color
  })
)
const ContentArea = styled.div(
  {
    display: 'flex',
    alignItems: 'center'
  }
)
const TitleInput = styled.input({
  minWidth: '480px',
  fontSize: '0.9rem',
  borderRadius: '8px',
  padding: '6px 32px 6px 12px',
  border: `1px solid ${color.ModernGrey}`,

  '&::placeholder': {
    textAlign: 'left',
    textIndent: '0'
  }
})

export default ModalContent;