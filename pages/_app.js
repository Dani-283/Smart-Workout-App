import { CssBaseline } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";
import { useEffect } from "react";
import { theme } from "@styles/theme";
import "../src/styles/base.scss";

import GlobalStyles from "@styles/theme/globalStyles";

import { createTheme, ThemeProvider } from "@mui/material/styles";
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  console.log("timi", theme);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const lightTheme = createTheme(theme);

  return (
    <ThemeProvider theme={lightTheme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <GlobalStyles />

        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
