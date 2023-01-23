'use client'; // Temporary

import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { usePathname } from 'next/navigation';
import { color, globalStyles } from "@/src/styles/styles";
import SideNavigation from "@/src/components/layout/SideNavigaiton";
import Head from "./head";

const Layout = ({ children }: { children: ReactNode }) => {

  // Hooks
  const pathName = usePathname();
  const firstPathName = pathName?.split('/')[1];
  const secondPathName = pathName?.split('/')[2];

  return (
    <html>
      <Head />
      <Body>
        <AppLayout>
          {globalStyles}
          {
            firstPathName === 'project' && secondPathName ?
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
        <Portal id="portal" />
        <div id="alert"></div>
        <div id="confirm"></div>
      </Body>
    </html>
  )
}

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