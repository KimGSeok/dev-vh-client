import styled from "@emotion/styled";
import { ErrorMessage } from '@hookform/error-message';
import { color, CSS_TYPE } from "@styles/styles";

const Login = ({ register, handleSubmit, errors, onSubmitHandler }: any) => {
  return (
    <MainComponent>
      <MainContainer>
        <LoginContainer onSubmit={handleSubmit(onSubmitHandler)}>
          <PageTitleWrapper>두:분</PageTitleWrapper>
          <InputContainer
            margin={errors?.id && '0 auto 8px auto'}
          >
            <InputWrapper>
              <LoginInputTitle>아이디</LoginInputTitle>
              <LoginInput
                {...register('id')}
                type={'text'}
                placeholder={'아이디를 입력해주세요.'}
                autoComplete={'off'}
              />
            </InputWrapper>
          </InputContainer>
          {
            errors?.id &&
            <ErrorWraaper>
              <ErrorMessage errors={errors} name={'id'} />
            </ErrorWraaper>
          }
          <InputContainer
            margin={errors?.password && '0 auto 8px auto'}
          >
            <InputWrapper>
              <LoginInputTitle>비밀번호</LoginInputTitle>
              <LoginInput
                {...register('password')}
                type={'password'}
                placeholder={'비밀번호를 입력해주세요.'}
                autoComplete={'off'}
              />
            </InputWrapper>
          </InputContainer>
          {
            errors?.password &&
            <ErrorWraaper>
              <ErrorMessage errors={errors} name={'password'} />
            </ErrorWraaper>
          }
          <ButtonWrapper>
            <LoginBtn type={'submit'}>로그인</LoginBtn>
          </ButtonWrapper>
          <VerticalLine />
          <FindUserInfoWrapper>
            <div>아이디 혹은 비밀번호를 잊어버리셨나요?</div>
            <div>아이디 찾기</div>
            <div>비밀번호 찾기</div>
          </FindUserInfoWrapper>
          <FooterWrapper>
            {/* <div>개인정보처리방침</div>
            <div>이용약관</div> */}
            <div>개인정보처리방침</div>
          </FooterWrapper>
        </LoginContainer>
      </MainContainer>
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
const MainContainer = styled.div({
  position: 'relative',
  display: 'flex',
  maxWidth: '640px',
  margin: '5% auto 0 auto',
  padding: '28px',
  borderRadius: '16px',
  backgroundColor: color.White,
  boxShadow: '1px 1px 25px rgba(132, 132, 132, 0.25)',
})
const LoginContainer = styled.form({
  position: 'relative',
  width: '100%',
})
const PageTitleWrapper = styled.div({
  textAlign: 'center',
  color: color.BasicColor,
  fontSize: '2rem',
  fontWeight: '500',
  margin: '16px 0 40px 0'
})
const InputContainer = styled.div<CSS_TYPE>(
  {
    position: 'relative',
    width: '70%',
    height: '44px',
    padding: '4px 8px',
    border: `1px solid ${color.ThumbnailColor}`,
    borderRadius: '4px',
    color: color.BasicColor
  },
  props => ({
    margin: props.margin ? props.margin : '0 auto 24px auto'
  })
)
const ErrorWraaper = styled.div({
  position: 'relative',
  width: '70%',
  margin: '0 auto 24px auto',
  color: color.WaringRed,
  fontSize: '0.85rem',

  ':before': {
    content: '"⚠ "',
    margin: '0 2px 0 6px'
  }
})
const InputWrapper = styled.div({
  position: 'relative',
  height: '100%'
})
const LoginInputTitle = styled.div({
  position: 'absolute',
  display: 'block',
  top: '-14px',
  margin: '0 auto',
  padding: '0 12px',
  backgroundColor: color.White,
  fontSize: '0.95rem',
  fontWeight: '500',
  zIndex: 2
})
const LoginInput = styled.input({
  position: 'relative',
  width: '100%',
  height: '100%',
  top: '2px',
  padding: '0 12px',
  fontSize: '0.9rem',
  border: 0,
  outline: 0,
  zIndex: 3
})
const ButtonWrapper = styled.div({
  textAlign: 'center'
})
const LoginBtn = styled.button({
  position: 'relative',
  width: '70%',
  margin: '0 auto',
  padding: '14px 16px',
  fontSize: '1.15rem',
  fontWeight: '500',
  backgroundColor: color.BasicBlue,
  color: color.White,
  outline: '0',
  border: '0',
  borderRadius: '25px',
  cursor: 'pointer'
})
const VerticalLine = styled.div({
  width: '70%',
  height: '0',
  borderTop: `1px solid ${color.ThumbnailColor}`,
  margin: '32px auto',
  textAlign: 'center',

  ':before': {
    position: 'relative',
    content: '"또는"',
    fontSize: '0.9rem',
    fontWeight: '600',
    backgroundColor: color.White,
    color: color.BasicColor,
    padding: '0 16px',
    top: '-8px'
  }
})
const FindUserInfoWrapper = styled.div({
  width: '70%',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: ' space-between',
  fontSize: '1rem',
  color: color.BasicColor,

  '& div': {
    fontWeight: '600',
    cursor: 'pointer'
  }
})
const FooterWrapper = styled.div({
  width: '70%',
  margin: '24px auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem',
  color: color.ThumbnailColor,

  '& div': {
    fontWeight: '500',
    cursor: 'pointer'
  }
})

export default Login;