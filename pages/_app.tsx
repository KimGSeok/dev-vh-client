import { useState } from 'react';
import cookies from "next-cookies";
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from "recoil";
import { config } from "@lib/react-query/config";
import { globalStyles } from "@styles/styles";
import AppLayout from '@components/layout/AppLayout';
import { DefaultSeo } from 'next-seo';

const MyApp = ({ Component, pageProps }: any) => {

  const DEFAULT_SEO = {
    title: "두:분의 스튜디오",
    description: "우리의 가상 인간(Virtual Human)의 궁극적인 목표는 실제 사람과 디지털 버전의 사람의 외모와 행동 모두에서 구별할 수 없을 정도의 사실적인 가상 인간(Virtual Human)를 만드는 것입니다.",
    keywords: "가상인간, 인공지능, 버츄얼 휴먼, 스튜디오, 디지털 휴먼, AI휴먼, Virtual Human, AI, Studio, Digital Human, AI Human",
    canonical: "https://www.studio.cidev.kr",
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: "https://www.studio.cidev.kr",
      title: "",
      site_name: "",
      images :[
        {
          url: "",
          width: 0,
          height: 0,
          alt: ""
        }
      ]
    },
  }

  const [queryClient] = useState(() => new QueryClient(config))

  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Hydrate state={pageProps?.dehydrateState}>
            {globalStyles}
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
            <div id="portal" />
          </Hydrate>
        </RecoilRoot>
      </QueryClientProvider>
    </>
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