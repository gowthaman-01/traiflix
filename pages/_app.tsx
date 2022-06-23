import "../styles/globals.css";
import type { AppProps } from "next/app";
import NProgress from "nprogress";
import { AuthProvider } from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/router";

NProgress.configure({ showSpinner: false, minimum: 0.11, trickleSpeed: 450 });

function MyApp({ Component, pageProps }: AppProps) {
  // Loading indicator on page change
  const { events } = useRouter();
  useEffect(() => {
    events?.on("routeChangeStart", () => NProgress.start());
    events?.on("routeChangeComplete", () => NProgress.done());
    events?.on("routeChangeError", () => NProgress.done());
  }, [events]);
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
