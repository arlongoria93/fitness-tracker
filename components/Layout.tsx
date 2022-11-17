import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Head from "next/head";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Fitness Tracker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      <main className="drac-bg-black p-12">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
