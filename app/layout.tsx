'use client'; // Temporary

import React, { ReactNode, useEffect, useState, Suspense } from "react";
import styled from "@emotion/styled";
import { QueryClient, QueryClientProvider } from 'react-query';
import Head from "./head";
import { usePathname } from 'next/navigation';
import { color, globalStyles } from "@/src/styles/styles";
import SideNavigation from "@/src/components/layout/SideNavigaiton";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      suspense: true
    }
  }
})

const Layout = ({ children }: { children: ReactNode }) => {

  // Hooks
  const pathName = usePathname();
  const firstPathName = pathName?.split('/')[1];
  const secondPathName = pathName?.split('/')[2];

  return (
    <Html>
      <QueryClientProvider client={client}>
        <Head title={'VH Studio'} />
        <Body>
          {globalStyles}
            <LayoutWrapper>
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
            </LayoutWrapper>
            <Portal id="portal" />
        </Body>
      </QueryClientProvider>
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
const LayoutWrapper = styled.div({
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