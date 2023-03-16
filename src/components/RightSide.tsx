import styled from '@emotion/styled';
import { color, fadeRight } from '@styles/styles';
import { Dispatch, PropsWithChildren, SetStateAction, useRef } from 'react';
import { onClickOutsideHandler } from '@modules/onClickOutside';

interface RightSideProps {
  showRightSide: boolean;
  setShowRightSide: Dispatch<SetStateAction<boolean>>;
}

const RightSide = ({ children, showRightSide, setShowRightSide }: PropsWithChildren<RightSideProps>) => {

  const containerRef = useRef<any>(null);
  onClickOutsideHandler(containerRef, setShowRightSide);

  return (
    <Container>
      <RightSideContainer
        ref={containerRef}
        css={fadeRight}
      >
        {children}
      </RightSideContainer>
    </Container>
  )
}

const Container = styled.div({
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  top: '0',
  backgroundColor: 'rgb(18, 18, 18, 0.7)',
  zIndex: 99
})
const RightSideContainer = styled.div({
  position: 'absolute',
  width: '40vw',
  height: '100vh',
  right: 0,
  backgroundColor: color.LightWhite,
  borderTopLeftRadius: '16px',
  borderBottomLeftRadius: '16px',
})

export default RightSide;