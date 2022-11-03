import React from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Protected: NextPage = (props) => {
  const session = useSession();
  console.log(session);
  return <div>Protected:NextPage</div>;
};

export default Protected;
