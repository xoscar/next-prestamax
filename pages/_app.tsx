import { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/themes/default';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
