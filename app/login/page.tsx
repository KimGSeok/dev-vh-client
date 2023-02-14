'use client';

import { color } from "@/src/styles/styles";
import styled from "@emotion/styled";

const Login = () => {
  return (
    <MainComponent>
      <MainWrapper>
        <LoginWrapper>
          <PageTitleWrapper>제목</PageTitleWrapper>
          <InputWrapper>인풋 창</InputWrapper>
          <ButtonWrapper>버튼 창</ButtonWrapper>
          <div>눈금선</div>
          <FindUserInfoWrapper>아이디 비밀번호 찾기 창</FindUserInfoWrapper>
          <FooterWrapper>약관 창</FooterWrapper>
        </LoginWrapper>
        <AdvertiseWrapper>
          광고 영역
        </AdvertiseWrapper>
      </MainWrapper>
    </MainComponent>
  )
}

const MainComponent = styled.main({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: color.BrightGrey,
})
const MainWrapper = styled.div({
  position: 'relative',
  display: 'flex',
  width: '960px',
  margin: '5% auto 0 auto',
  padding: '28px',
  borderRadius: '16px',
  backgroundColor: color.White,
  boxShadow: '1px 1px 25px rgba(132, 132, 132, 0.25)',
})
const LoginWrapper = styled.div({
  width: '50%'
})
const PageTitleWrapper = styled.div({

})
const InputWrapper = styled.div({

})
const ButtonWrapper = styled.div({

})
const FindUserInfoWrapper = styled.div({

})
const FooterWrapper = styled.div({

})
const AdvertiseWrapper = styled.div({
  width: '50%'
})

export default Login;