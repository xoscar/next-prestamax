import { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClientProvider } from 'react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/themes/default';
import UserProvider from '../providers/User';
import Layout from './_layout';
import ClientProvider from '../providers/Client/Client.provider';
import queryClient from '../server/utils/QueryClient';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Head>
          <title>PrestaMax</title>
        </Head>
        <ThemeProvider theme={defaultTheme}>
          <UserProvider>
            <ClientProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ClientProvider>
          </UserProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App;
