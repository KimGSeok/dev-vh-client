import { useState } from 'react';
import cookies from "next-cookies";
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from "recoil";
import { config } from "@lib/react-query/config";
import { globalStyles } from "@styles/styles";
import AppLayout from '@components/layout/AppLayout';

const MyApp = ({ Component, pageProps }: any) => {

  const [queryClient] = useState(() => new QueryClient(config))

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Hydrate>
          {globalStyles}
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
          <div id="portal" />
        </Hydrate>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

MyApp.getInitialProps = async(appContext: any) =>{

  const { ctx } = appContext;
  const firstPathName = ctx.pathname.split('/')[1]; // 1 Depth URL
  const allCookies = cookies(ctx);

  // Redirect
  if(firstPathName !== 'login' && !allCookies["userACT"]){

    ctx.res.writeHead(302, {
      Location: '/login',
      'Content-Type': 'text/html; charset=utf-8',
    });
    ctx.res.end();
  }else if(firstPathName === 'login' && allCookies["userACT"]){

    ctx.res.writeHead(302, {
      Location: '/',
      'Content-Type': 'text/html; charset=utf-8',
    });
    ctx.res.end();
  }

  return {}
}

export default MyApp;