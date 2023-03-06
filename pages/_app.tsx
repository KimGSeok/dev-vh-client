import { useState } from 'react';
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

export default MyApp;