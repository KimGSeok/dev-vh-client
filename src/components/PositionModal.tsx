import styled from "@emotion/styled";
import { color, CSS_TYPE, ImageWrap, ImageElement } from "@styles/styles";
import { Dispatch, SetStateAction } from "react";

interface PositionProps {
  active: boolean;
  xPosition: number;
  yPosition: number;
}

interface PositionModalProps extends PositionProps {
  title: string;
  children: React.ReactNode;
  setModal: Dispatch<SetStateAction<PositionProps>>;
}

const PositionModal = ({ title, active, xPosition, yPosition, children, setModal }: PositionModalProps) => {

  return (
    <Container
      transform={active ? 'scale(1)' : 'scale(0)'}
    >
      <ModalContainer>
        <TitleWrapper>
          <Title>{title ? title : '프로젝트 모달'}</Title>
          <ImageWrap
            position={'absolute'}
            top={'0'}
            right={'0'}
            cursor={'pointer'}
            onClick={() => setModal({
              active: false,
              xPosition: 0,
              yPosition: 0
            })}
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
      </ModalContainer>
    </Container>
  )
}

const Container = styled.div<CSS_TYPE>(
  {
    position: 'fixed',
    backgroundColor: 'rgb(18, 18, 18, 0.7)',
    width: '100vw',
    height: '100%',
    top: '0',
    left: '0',
    transition: 'transform 0.45s ease-in-out',
    zIndex: 99
  },
  props => ({
    transform: props.transform,
    transition: props.transition
  })
);
const ModalContainer = styled.div<CSS_TYPE>(
  {
    position: 'absolute',
    minWidth: '640px',
    minHeight: '460px',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    padding: '24px',
    backgroundColor: color.White,
    borderRadius: '16px',
    boxShadow: '2px 4px 12px 2px rgb(255 255 255 / 15%)',
  }
);
const TitleWrapper = styled.div({
  position: 'relative',
  textAlign: 'center',
  color: color.BasicColor,
  padding: '4px 0',
  margin: '0 0 24px 0'
});
const Title = styled.div({
  fontSize: '1.2rem',
  fontWeight: '700'
});

export default PositionModal;