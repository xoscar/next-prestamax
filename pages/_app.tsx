import '../styles/globals.css';
import { ReactElement } from 'react';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps): ReactElement => {
  return <Component {...pageProps} />;
};

export default App;
