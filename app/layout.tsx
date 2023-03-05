'use client'; // Temporary

import React, { useEffect, PropsWithChildren, useState } from "react";
import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import Head from "./head";
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useRouter, usePathname } from 'next/navigation';
import { color, globalStyles } from "@/src/styles/styles";
const LayoutContainer = dynamic(() => import('@/src/components/layout/Layout'));
import SideNavigation from "@/src/components/layout/SideNavigaiton";
import { config } from "src/lib/react-query-config";

const Layout = ({ children }: PropsWithChildren) => {

  // Hooks
  const [queryClient] = useState(() => new QueryClient(config))
  const router = useRouter();
  const pathName = usePathname();
  const firstPathName = pathName?.split('/')[1];
  const secondPathName = pathName?.split('/')[2];

  console.log('호출0');

  return (
    <Html>
      <Head title={'VH Studio'} />
      <QueryClientProvider client={queryClient}>
        <Hydrate>
          <Body>
            {globalStyles}
            <LayoutContainer>
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
            </LayoutContainer>
            <Portal id="portal" />
          </Body>
        </Hydrate>
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
const MainChildren = styled.main({
  backgroundColor: color.ModernWhite,
  width: '85%',
  height: 'calc(100vh - 48px)',
  borderRadius: '16px',
  padding: '24px'
})
const Portal = styled.div({})

export default Layout;