import { CssBaseline } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";
import { useEffect } from "react";
import { theme } from "@styles/theme";
import "../src/styles/base.scss";

import GlobalStyles from "@styles/theme/globalStyles";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { queryClient } from "@api/base";

import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const lightTheme = createTheme(theme);

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={lightTheme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <GlobalStyles />
          {/* <Protected router={router}> */}
          <Component {...pageProps} />
          {/* </Protected> */}
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
