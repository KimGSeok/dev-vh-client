import { } from 'react';
import styled from '@emotion/styled';
import { CSS_TYPE, color, RadiusButton } from '@/src/styles/styles';

const Confirm = () => {

  return (
    <ConfirmWrapper >

    </ConfirmWrapper>
  )
}

const ConfirmWrapper = styled.div({
  position: 'fixed',
  width: '100%',
  height: '100vh',
  backgroundColor: color.BasicBlack,
  top: 0,
  left: 0,
  zIndex: 99
})

export default Confirm;