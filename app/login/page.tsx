'use client';

import { color, CSS_TYPE } from "@/src/styles/styles";
import styled from "@emotion/styled";
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';
import { post } from "src/hooks/asyncHooks";
import { checkEmptyObject } from "@/src/modules/validation";
import { useRouter } from "next/navigation";

const Login = () => {

  const queryClient = useQueryClient();
  const router = useRouter();

  const schema = yup.object().shape({
    id: yup.string()
      .required('아이디를 입력해주세요.'),
    password: yup.string()
      .required('비밀번호를 입력해주세요.')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{8,20}$/,
        '영어 소문자, 숫자, 특수문자를 조합하여 8자리 이상으로 입력해주세요.')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const loginMutation = useMutation('userInfo', (data) => post('auth/login', data, {}), {
    onSuccess: (res) => {

      // Response
      const { status, code, response, message, data } = res;

      if (code === 'ERR_BAD_REQUEST' && response.status === 401) {
        alert('일치하는 회원정보가 존재하지 않습니다.');
      }
      else if(!checkEmptyObject(data) && data.accessToken && status === 201){

        // TODO
        const { accessToken } = data;

        localStorage.setItem('accessToken', accessToken);
        router.push('/');
      }else{
        alert('로그인 도중 에러가 발생하였습니다.\n관리자에게 문의해주세요.');
      }
    },
    onError: (data) => {
      console.log('login onError');
      console.error(data);
    }
  })

  const onSubmitHandler = (data: any) => {
    loginMutation.mutate(data)
  }

  return (
    <MainComponent>
      <MainContainer>
        <LoginContainer onSubmit={handleSubmit(onSubmitHandler)}>
          <PageTitleWrapper>Warping</PageTitleWrapper>
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
            <div>개인정보처리방침</div>
            <div>이용약관</div>
            <div>Warping</div>
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