import "../styles/globals.css";
import { CssBaseline } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
