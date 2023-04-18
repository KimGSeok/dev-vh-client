'use client';

import styled from '@emotion/styled';
import { color, SelectBox, RadiusSubmitButton } from '@styles/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { post } from '@hooks/asyncHooks';

const ModalContent = () => {

  // Hooks
  const router = useRouter();

  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/; 

  const schema = yup.object().shape({
    id: yup.string()
      .required('아이디를 입력해주세요.'),
    password: yup.string()
      .required('비밀번호를 입력해주세요.')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{8,20}$/,
        '비밀번호는 영어 소문자, 숫자, 특수문자를 조합하여 8자리 이상으로 입력해주세요.'
      ),
    passwordConfirm: yup.string()
      .required('비밀번호를 다시 한 번 입력해주세요.')
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않아요.'),
    phoneNumber: yup.string()
      .min(6, '연락처의 길이가 짧아요.')
      .max(12, '연락처의 길이가 너무 길어요.')
      // .matches(phoneRegExp, '연락처의 양식이 올바르지 않아요.')
      .required('연락처를 입력해주세요.'),
    name: yup.string()
      .required('이름을 입력해주세요.'),
    email: yup.string().email('이메일의 형식이 아니에요.')
      .required('이메일을 입력해주세요.'),
  })

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  const mutation = useMutation('userGenerate', (data) => post('users', data, {}), {
    onSuccess: (res) => {

      const { data } = res;

      if(data.status === 409){
        alert('아이디가 사용할 수 없거나 중복이에요.');
      }
      else{
        if(data.affectedRows > 0){
          alert('사용자가 생성되었어요.');
          router.refresh();
        }
        else{
          alert('사용자 생성중 에러가 발생했어요.\n관리자에게 문의해주세요.');
          console.error(data);
        }
      }
    },
    onError: (data) => {
      alert('사용자 생성중 에러가 발생했어요.\n관리자에게 문의해주세요.');
      console.log('userGenerate onError');
      console.error(data);
    }
  })

  const onSubmitHandler = (formData: any) =>{
    mutation.mutate(formData);
  }

  return (
    <Container>
      <UsersInfoContainer
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <InfoRow>
          <InfoHeader>아이디</InfoHeader>
          <InfoInputContainer>
            <InputWrapper
              {...register('id')}
              type={'text'}
              placeholder={'아이디를 입력해주세요.'}
              autoComplete={'off'}
            />
          </InfoInputContainer>
        </InfoRow>
        {
          errors?.id &&
          <ErrorWraaper>
            <ErrorMessage errors={errors} name={'id'} />
          </ErrorWraaper>
        }
        <InfoRow>
          <InfoHeader>비밀번호</InfoHeader>
          <InfoInputContainer>
            <InputWrapper
              {...register('password')}
              type={'password'}
              placeholder={'비밀번호를 입력해주세요.'}
              autoComplete={'off'}
            />
          </InfoInputContainer>
        </InfoRow>
        {
          errors?.password &&
          <ErrorWraaper>
            <ErrorMessage errors={errors} name={'password'} />
          </ErrorWraaper>
        }
        <InfoRow>
          <InfoHeader>비밀번호 확인</InfoHeader>
          <InfoInputContainer>
            <InputWrapper
              {...register('passwordConfirm')}
              type={'password'}
              placeholder={'비밀번호를 다시 입력해주세요.'}
              autoComplete={'off'}
            />
          </InfoInputContainer>
        </InfoRow>
        {
          errors?.passwordConfirm &&
          <ErrorWraaper>
            <ErrorMessage errors={errors} name={'passwordConfirm'} />
          </ErrorWraaper>
        }
        <InfoRow>
          <InfoHeader>이름</InfoHeader>
          <InfoInputContainer>
            <InputWrapper
              {...register('name')}
              type={'text'}
              placeholder={'이름을 입력해주세요.'}
              autoComplete={'off'}
            />
          </InfoInputContainer>
        </InfoRow>
        {
          errors?.name &&
          <ErrorWraaper>
            <ErrorMessage errors={errors} name={'name'} />
          </ErrorWraaper>
        }
        <InfoRow>
          <InfoHeader>연락처</InfoHeader>
          <InfoInputContainer>
            <InputWrapper
              {...register('phoneNumber')}
              type={'text'}
              placeholder={'연락처를 입력해주세요. ex)01012345678'}
              autoComplete={'off'}
            />
          </InfoInputContainer>
        </InfoRow>
        {
          errors?.phoneNumber &&
          <ErrorWraaper>
            <ErrorMessage errors={errors} name={'phoneNumber'} />
          </ErrorWraaper>
        }
        <InfoRow>
          <InfoHeader>이메일</InfoHeader>
          <InfoInputContainer>
            <InputWrapper
              {...register('email')}
              type={'text'}
              placeholder={'이메일을 입력해주세요.'}
            />
          </InfoInputContainer>
        </InfoRow>
        {
          errors?.email &&
          <ErrorWraaper>
            <ErrorMessage errors={errors} name={'email'} />
          </ErrorWraaper>
        }
        <InfoRow>
          <InfoHeader>권한</InfoHeader>
          <InfoInputContainer>
            <SelectBox
              {...register('auth')}
              name={'auth'}
              width={'50%'}
              height={'100%'}
              padding={'0 0 0 16px'}
              border={`1px solid ${color.ModernGrey}`}
              borderRadius={'8px'}
            >
              <option value={'admin'}>관리자</option>
              <option value={'normal'}>사용자</option>
            </SelectBox>
          </InfoInputContainer>
        </InfoRow>
        <ButtonWrapper>
          <RegisterBtn
            type={'submit'}
            padding={'8px 24px'}
            backgroundColor={color.BrightBlue}
            border={`1px solid ${color.BrightBlue}`}
            color={color.White}
          >생성하기</RegisterBtn>
        </ButtonWrapper>
      </UsersInfoContainer>
    </Container>
  )
}
const Container = styled.div({
  margin: '36px 12px 0 12px',
  padding: '0 0 12px 0'
})
const UsersInfoContainer = styled.form({
  position: 'relative',
  width: '100%',
  fontSize: '1.1rem'
})
const InfoRow = styled.div({
  position: 'relative',
  display: 'flex',
  margin: '0 0 16px 0'
})
const InfoHeader = styled.div({
  position: 'relative',
  width: 'calc(25% - 12px)',
  backgroundColor: color.BasicColor,
  color: color.LightWhite,
  textAlign: 'center',
  padding: '12px 0',
  borderRadius: '8px',
  fontWeight: '500',
  border: '0',
  margin: '0 12px 0 0',
})
const InfoInputContainer = styled.div({
  position: 'relative',
  width: '80%'
})
const InputWrapper = styled.input({
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: '6px 16px 6px 12px',
  border: `1px solid ${color.ModernGrey}`,
  borderRadius: '8px',

  '&::placeholder': {
    padding: '0 0 0 4px',
    textIndent: '0'
  }
})
const ButtonWrapper = styled.div({
  textAlign: 'right'
})
const RegisterBtn = styled(RadiusSubmitButton)({})
const ErrorWraaper = styled.div({
  position: 'relative',
  width: '70%',
  margin: '0 auto 12px calc(25% - 12px)',
  color: color.WaringRed,
  fontSize: '0.85rem',

  ':before': {
    content: '"⚠ "',
    margin: '0 2px 0 6px'
  }
})

export default ModalContent;