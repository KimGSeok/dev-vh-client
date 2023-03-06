import { PropsWithChildren, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import PageLoading from "../loading/PageLoading";

const Layout = ({ children }: PropsWithChildren) =>{

  const router = useRouter();
  const [mount, setMount] = useState<boolean>(false);

  console.log('호출1');

  useEffect(() =>{

    console.log('호출2');
    // console.log(localStorage);
    const { accessToken } = localStorage;
    // console.log(accessToken);
    if(!accessToken)
      router.push('/login')

    setMount(true);

    console.log('호출3');
  }, [])

  return (
    mount ? <LayoutContainer>{children}</LayoutContainer> : <></>
  )
}

const LayoutContainer = styled.div({
  padding: '24px',
  display: 'flex',
})

export default Layout;