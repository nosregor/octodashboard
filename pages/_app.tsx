import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../style';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  </ThemeProvider>
);

export default MyApp;
