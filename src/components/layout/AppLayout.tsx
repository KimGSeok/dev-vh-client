import React, { useEffect, useState, PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";
import { color } from "@styles/styles";
import SideNavigation from "@components/layout/SideNavigaiton";
import PageLoading from "@components/loading/PageLoading";
import MobileScreen from "./MobileScreen";

const AppLayout = ({ children }: PropsWithChildren) => {

  const [componentMount, setComponentMount] = useState<boolean>(false);
  const pathName = usePathname();
  const firstPathName = pathName?.split('/')[1];
  const secondPathName = pathName?.split('/')[2];

  useEffect(() => {

    setComponentMount(true);
    return () => setComponentMount(false);
  }, [])

  return (
    <MainContainer>
      <LayoutContainer>
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
      </LayoutContainer>
      <MobileScreen />
    </MainContainer>
  )
}
const MainContainer = styled.main({
  backgroundColor: color.BasicBlack,
  width: '100%',
  height: '100vh',
  position: 'relative'
})
const LayoutContainer = styled.div({
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