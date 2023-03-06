import React, { ReactNode, useEffect, useState, PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter, usePathname } from "next/navigation";
import { color } from "@styles/styles";
import { authState } from "src/recoil/states";
import SideNavigation from "@components/layout/SideNavigaiton";
import PageLoading from "@components/loading/PageLoading";

const AppLayout = ({ children }: PropsWithChildren) => {

  console.log(children);

  const router = useRouter();

  const [componentMount, setComponentMount] = useState<boolean>(false);
  const pathName = usePathname();
  const firstPathName = pathName?.split('/')[1];
  const secondPathName = pathName?.split('/')[2];
  const a = useRecoilValue(authState);

  useEffect(() => {

    if (!a) {
      console.log('페이지 이동');
      router.push('/login');
    }
  }, [a])

  useEffect(() => {

    setComponentMount(true);
  }, [])

  return (
    <MainContainer>
      <LayoutWrapper>
        {
          componentMount ?
            firstPathName === 'project' && secondPathName ?
              <>{children}</>
              :
              <>
                <SideNavigation />
                <Children>
                  {children}
                </Children>
              </>
            : <PageLoading />
        }
      </LayoutWrapper>
    </MainContainer>
  )
}
const MainContainer = styled.main({
  backgroundColor: color.BasicBlack,
  width: '100%',
  height: '100vh',
  position: 'relative'
})
const LayoutWrapper = styled.div({
  padding: '24px',
  display: 'flex',
})
const Children = styled.div({
  backgroundColor: color.ModernWhite,
  width: '85%',
  height: 'calc(100vh - 48px)',
  borderRadius: '16px',
  padding: '24px'
})

export default AppLayout