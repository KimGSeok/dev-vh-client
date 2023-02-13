'use client'; // Temporary

import React, { ReactNode } from "react";

const AppLayout = ({ children, pageProps }: { children: Element[], pageProps: ReactNode }) =>{

  console.log('거쳐가기');

  console.log(children);
  console.log(pageProps);

  return(
    <>{pageProps}</>
  )
}

export default AppLayout;