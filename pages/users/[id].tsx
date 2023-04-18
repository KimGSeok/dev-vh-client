import { useState } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useMutation, QueryClient, dehydrate } from "react-query";
import styled from "@emotion/styled";
import { color, SelectBox, RadiusButton, RadiusSubmitButton } from "@styles/styles";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import useOnChangeRouterHandler from '@hooks/useOnChangeRouter';
import * as yup from 'yup';
import { prefetchUserDetailInfo, useUserDetailInfo } from "@hooks/queries/users";
import { useRouter } from "next/navigation";
import { put, handleDelete } from '@hooks/asyncHooks';

const UserDetail = ({ id }: { id: string }) => {

  const router = useRouter();
  const { data, refetch } = useUserDetailInfo(id);
  const [ beforeUnloadPage, setBeforeUnloadPage ] = useState<boolean>(false);

  const schema = yup.object().shape({
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

  const putMutation = useMutation('userModify', (data) => put('users', data, {}), {
    onSuccess: (res) => {

      const { data } = res;
      if(data.affectedRows > 0)
        alert('사용자 정보가 수정되었어요.');
      else{
        alert('사용자 정보 수정중 에러가 발생했어요.\n관리자에게 문의해주세요.');
        console.error(data.message);
      }

      refetch();
    },
    onError: (data) => {
      alert('사용자 정보 수정중 에러가 발생했어요.\n관리자에게 문의해주세요.');
      console.log('userModify onError');
      console.error(data);
    }
  })

  const onSubmitHandler = (formData: any) =>{
    formData.id = id;
    putMutation.mutate(formData);
  }

  const onDeleteHandler = async (id: string) =>{

    setBeforeUnloadPage(true);

    try{
      const response = await handleDelete('users', id);
      const { data } = response;

      if(data.affectedRows > 0){
        alert('사용자가 삭제되었어요.');
      }else{
        alert('사용자 정보 수정중 에러가 발생했어요.\n관리자에게 문의해주세요.');
        console.error(data.message);
      }

      router.push('/users');
    }catch(error){
      alert('사용자 정보 수정중 에러가 발생했어요.\n관리자에게 문의해주세요.');
      console.log(error);
      console.error(error);
    }
  }

  // onLeave Page Event
  useOnChangeRouterHandler(beforeUnloadPage);

  return(
    <Container>
      <TitleWrapper>사용자의 정보를 수정할 수 있어요.</TitleWrapper>
      <UserDetailInfoContainer
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <DetailInfoContainer>
          <InfoRow>
            <InfoHeader>아이디</InfoHeader>
            <InfoInputContainer>
              <InfoWrapper>{data.account}</InfoWrapper>
            </InfoInputContainer>
          </InfoRow>
          {
            errors?.id &&
            <ErrorWraaper>
              <ErrorMessage errors={errors} name={'id'} />
            </ErrorWraaper>
          }
          <InfoRow>
            <InfoHeader>소속</InfoHeader>
            <InfoInputContainer>
              <InfoWrapper>{data.organization_name}</InfoWrapper>
            </InfoInputContainer>
          </InfoRow>
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
                defaultValue={data.name}
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
                placeholder={'연락처를 입력해주세요.'}
                autoComplete={'off'}
                defaultValue={data.phone}
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
                autoComplete={'off'}
                defaultValue={data.email}
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
                {...register('role')}
                name={'role'}
                width={'50%'}
                height={'100%'}
                padding={'10px 0 10px 16px'}
                border={`1px solid ${color.ModernGrey}`}
                borderRadius={'8px'}
                defaultValue={data.role}
              >
                <option value={'admin'}>관리자</option>
                <option value={'normal'}>사용자</option>
              </SelectBox>
            </InfoInputContainer>
          </InfoRow>
        </DetailInfoContainer>
        <ButtonWrapper>
          <RadiusButton
            fontSize={'1.1rem'}
            padding={'10px 28px'}
            onClick={() => router.push('/users')}
          >목록가기</RadiusButton>
          <ActionButtonWrapper>
            <RadiusSubmitButton
              type={'submit'}
              backgroundColor={color.BrightBlue}
              borderColor={color.BrightBlue}
              color={color.White}
              fontSize={'1.1rem'}
              padding={'10px 28px'}
            >수정하기</RadiusSubmitButton>
            <RadiusButton
              backgroundColor={color.Red}
              borderColor={color.Red}
              color={color.White}
              fontSize={'1.1rem'}
              padding={'10px 28px'}
              margin={'0 0 0 16px'}
              onClick={() => onDeleteHandler(data.id)}
            >삭제하기</RadiusButton>
          </ActionButtonWrapper>
        </ButtonWrapper>
      </UserDetailInfoContainer>
    </Container>
  )
}

const Container = styled.div({
  position: 'relative',
  height: '100%'
})
const UserDetailInfoContainer = styled.form({
  position: 'relative',
  height: 'calc(95% - 20px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});
const TitleWrapper = styled.div({
  height: '5%',
  fontSize: '1.2rem',
  fontWeight: '600',
  color: color.BasicColor,
  margin: '0 0 20px 0',
  padding: '0 0 12px 0',
  borderBottom: `1px solid ${color.ModernGrey}`
});
const DetailInfoContainer = styled.div({
  position: 'relative',
  width: '100%',
  fontSize: '1.1rem'
});
const InfoRow = styled.div({
  position: 'relative',
  display: 'flex',
  margin: '0 0 12px 0',
  alignItems: 'center'
})
const InfoHeader = styled.div({
  position: 'relative',
  width: '10%',
  backgroundColor: color.BasicColor,
  color: color.LightWhite,
  textAlign: 'center',
  padding: '10px 0',
  borderRadius: '8px',
  fontWeight: '500',
  border: '0',
  margin: '0 12px 0 0',
});
const InfoInputContainer = styled.div({
  position: 'relative',
  width: '30%'
})
const InputWrapper = styled.input({
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: '10px 16px 10px 12px',
  border: `1px solid ${color.ModernGrey}`,
  borderRadius: '8px',

  '&::placeholder': {
    padding: '0 0 0 4px',
    textIndent: '0'
  }
})
const InfoWrapper = styled.div({
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: '11px 16px 11px 12px',
  borderRadius: '8px',
  backgroundColor: color.BrightGrey
})
const ButtonWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})
const ActionButtonWrapper = styled.div({})
const ErrorWraaper = styled.div({
  position: 'relative',
  width: '70%',
  margin: '0 auto 12px calc(10% + 12px)',
  color: color.WaringRed,
  fontSize: '0.95rem',

  ':before': {
    content: '"⚠ "',
    margin: '0 2px 0 6px'
  }
})

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) =>{

  let queryClient = new QueryClient();
  const { query } = context;
  const id = query.id as unknown as string;

  try {
    let cookie: any = context.req.headers.cookie; // Session Cookie
    cookie = cookie ? cookie.split("=")[1] : '';

    queryClient = await prefetchUserDetailInfo(cookie, id);

    return {
      props: {
        id: id,
        dehydrateState: dehydrate(queryClient),
      }
    }
  } catch (error) {
    return {
      notFound: true,
    }
  } finally {
    queryClient.clear()
  }
}

export default UserDetail;