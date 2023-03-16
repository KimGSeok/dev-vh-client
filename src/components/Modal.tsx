import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';
import { CSS_TYPE, color, ImageWrap, ImageElement, fadeUp } from '@styles/styles';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ title, children, setModal }: ModalProps) => {

  return (
    <MainComponent>
      <ModalWrapper css={fadeUp}>
        <TitleWrapper>
          <Title>{title ? title : '프로젝트 모달'}</Title>
          <ImageWrap
            position={'absolute'}
            top={'0'}
            right={'0'}
            cursor={'pointer'}
            onClick={() => setModal(false)}
          >
            <ImageElement
              src="/icons/close.svg"
              width={28}
              height={28}
              alt="close button"
            />
          </ImageWrap>
        </TitleWrapper>
        {children}
      </ModalWrapper>
    </MainComponent>
  )
}

const MainComponent = styled.div({
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  top: '0',
  backgroundColor: 'rgb(18, 18, 18, 0.7)',
  zIndex: 99
})
const ModalWrapper = styled.div<CSS_TYPE>(
  {
    position: 'absolute',
    minWidth: '640px',
    minHeight: '280px',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    padding: '24px',
    backgroundColor: color.White,
    borderRadius: '16px',
    boxShadow: '2px 4px 12px 2px rgb(255 255 255 / 15%)',
  },
)
const TitleWrapper = styled.div({
  position: 'relative',
  textAlign: 'center',
  color: color.BasicColor,
  padding: '4px 0',
  margin: '0 0 24px 0'
})
const Title = styled.div({
  fontSize: '1.2rem',
  fontWeight: '700'
})

export default Modal;