import { ReactNode } from "react";
import { AppProps } from "next/app";

import { NextPage } from "next";
import "../styles/globals.css";
import Layout from "@/components/Layout";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactNode) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout> {page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
