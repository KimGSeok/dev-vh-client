'use client'; // Temporary

import React, { ReactNode, useEffect, useState } from "react";
import Head from "./head";
import styled from "@emotion/styled";
import { usePathname } from 'next/navigation';
import { RecoilRoot } from 'recoil';
import { color, globalStyles } from "@/src/styles/styles";
import SideNavigation from "@/src/components/layout/SideNavigaiton";
import PageLoading from "@/src/components/loading/PageLoading";

const Layout = ({ children }: { children: ReactNode }) => {

  // Hooks
  const [mount, setMount] = useState<boolean>(false);
  const pathName = usePathname();
  const firstPathName = pathName?.split('/')[1];
  const secondPathName = pathName?.split('/')[2];

  useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, [])

  return (
    <Html>
      <Head title={'VH Studio'} />
      <Body>
        <RecoilRoot>
          <AppLayout>
            {globalStyles}
            {
              (firstPathName === 'project' && secondPathName) || (firstPathName === 'login') ?
                <>{children}</>
                :
                <>
                  <SideNavigation />
                  <MainChildren>
                    {children}
                  </MainChildren>
                </>
            }
          </AppLayout>
          {mount && <PageLoading />}
          <Portal id="portal" />
          <div id="alert"></div>
          <div id="confirm"></div>
        </RecoilRoot>
      </Body>
    </Html>
  )
}
const Html = styled.html({

})
const Body = styled.body({
  backgroundColor: color.BasicBlack,
  width: '100%',
  height: '100vh',
  position: 'relative'
})
const AppLayout = styled.div({
  padding: '24px',
  display: 'flex',
})
const MainChildren = styled.main({
  backgroundColor: color.White,
  width: '85%',
  height: 'calc(100vh - 48px)',
  borderRadius: '16px',
  padding: '24px'
})
const Portal = styled.div({})

export default Layout;