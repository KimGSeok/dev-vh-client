import styled from "@emotion/styled";
import { color } from "@styles/styles";

const MobileScreen = () =>{
  return (
    <MobileContainer>
      <MobileWrapper>
        두:분 스튜디오는 현재의 해상도를 지원하지 않아요.<br />
        화면 크기 혹은 해상도를 조절해주세요.<br />
        최소 가로 크기 1024px 이상의 환경에서 이용해 주세요.
      </MobileWrapper>
    </MobileContainer>
  )
}

const MobileContainer = styled.div({
  backgroundColor: color.BasicBlack,
  width: '100%',
  height: '100vh',
  position: 'absolute',
  top: '0',
  display: 'none',

  '@media screen and (max-width: 1024px)':{
    display: 'block',
    zIndex: '9999'
  }
})
const MobileWrapper = styled.div({
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: color.BrightGrey,
  lineHeight: '32px',
  fontSize: '1rem',
  fontWeight: '700',

  'span': {
    color: color.DeActiveColor
  }
})

export default MobileScreen;