import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import defaultTheme from '../styles/themes/default';
import store from '../tools/configureStore';
import Layout from './_layout';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <>
      <Head>
        <title>PrestaMax</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={defaultTheme}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
