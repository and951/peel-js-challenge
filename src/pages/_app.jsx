import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import theme from '@styles/theme';
import { wrapper } from '@store';

const WrappedApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(WrappedApp)