import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <main className="drac-bg-black p-12">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
