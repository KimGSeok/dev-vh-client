'use client'; // Temporary

import React, { useState, PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot, useRecoilState } from "recoil";
import Head from "./head";
import { color, globalStyles } from "@styles/styles";
import InterceptLayout from '@components/layout/AppLayout';
import { config } from "@lib/react-query/config";

const Layout = ({ children }: PropsWithChildren) => {

  console.log(children);

  // Hooks
  const [queryClient] = useState(() => new QueryClient(config))

  return (
    <Html>
      <Head title={'두:분의 스튜디오'} />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Hydrate>
            <Body>
              {globalStyles}
              <InterceptLayout children={children} />
              <Portal id="portal" />
            </Body>
          </Hydrate>
        </RecoilRoot>
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
const Portal = styled.div({})

export default Layout;