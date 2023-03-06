import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { post } from "src/hooks/asyncHooks";
import { checkEmptyObject } from "@modules/validation";
import { useRouter } from "next/navigation";
import LoginComponent from '@components/login/Login';
import { useSetRecoilState } from 'recoil';
import { authState } from '@recoil/states';

const Login = () => {

  // Hooks
  const router = useRouter();
  const setAuthState = useSetRecoilState(authState);

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

  // TODO useMutation Fn Handler 처리
  const loginMutation = useMutation('userInfo', (data) => post('auth/login', data, {}), {
    onSuccess: (res) => {

      console.log(res);
      const { status, code, response, message, data } = res;

      // TODO Handler 깔끔하게 처리

      if (code === 'ERR_BAD_REQUEST' && response.status === 401) {
        alert('일치하는 회원정보가 존재하지 않습니다.');
      }
      else if (!checkEmptyObject(data) && data.accessToken && status === 201) {

        const { accessToken } = data;
        setAuthState(accessToken);
        router.push('/');
      } else {
        alert('로그인 도중 에러가 발생하였습니다.\n관리자에게 문의해주세요.');
      }
    },
    onError: (data) => {
      console.log('login onError');
      console.error(data);
    }
  })

  return <LoginComponent
    register={register}
    handleSubmit={handleSubmit}
    errors={errors}
    onSubmitHandler={(data: any) => loginMutation.mutate(data)}
  />
}

export default Login;