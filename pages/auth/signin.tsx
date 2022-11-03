import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Box, Button, Heading, Input } from "dracula-ui";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await signIn("credentials", {
        username: userName,
        password,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col space-y-4 items-center drac-bg-black justify-center min-h-screen">
      <Heading color="pink">Hello Vampire</Heading>
      <Box className="flex flex-col space-y-8">
        <Heading color="pink">{userName}</Heading>
        <Input
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Heading color="orange">{password}</Heading>
        <Input
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleRegister}>Sign In</Button>
      </Box>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
