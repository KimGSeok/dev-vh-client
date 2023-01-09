'use client'; // Temporary

import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { color, globalStyles } from "@/src/styles/styles";
import SideNavigation from "@/src/components/layout/SideNavigaiton";
import Head from "./head";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <Head />
      <Body>
        {globalStyles}
        <AppLayout>
          <SideNavigation />
          <MainChildren>
            {children}
          </MainChildren>
        </AppLayout>
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

export default Layout;