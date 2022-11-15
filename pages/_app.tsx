import "../styles/globals.css";
import "dracula-ui/styles/dracula-ui.css";
import type { AppProps as NextAppProps } from "next/app";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";

// make app a function component with props layout
const App = ({ Component, pageProps }: NextAppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};
export default App;
