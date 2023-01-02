'use client'; // Temporary

import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { globalStyles } from "@/src/styles/styles";
import Header from "@/src/components/layout/Header";

type AppLayoutProps = {
  children: ReactNode;
}

const Layout = ({ children }: AppLayoutProps) =>{
  return(
    <html>
      <head>

      </head>
      <body>
        {globalStyles}
        <Header />
        <Main>
          {children}
        </Main>
      </body>
    </html>
  )
}

const Main = styled.main({
  padding: '88px 48px 0 48px',
})

export default Layout;