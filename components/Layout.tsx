import React from "react";
import Nav from "./Nav";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Nav />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
