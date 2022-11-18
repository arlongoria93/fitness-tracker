import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Text, Box, Button, Heading, Input } from "dracula-ui";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import Link from "next/link";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        username: userName,
        password,
      });
      res;
    } catch (error) {
      error;
    }
  };
  return (
    <div className="flex flex-col space-y-4 items-center drac-bg-black justify-center min-h-screen">
      <Box className="min-h-screen flex flex-col">
        <Box className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <Box className="px-6 drac-bg-black-secondary py-8 rounded shadow-md  w-full">
            <Heading color="pink" className="mb-8 text-3xl text-center">
              Sign In
            </Heading>{" "}
            <form onSubmit={handleSignIn}>
              <Box className="flex flex-col space-y-4">
                <Input
                  color="white"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  placeholder="Enter your password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button>
                  <Text color="black">Sign In</Text>
                </Button>

                <Text>
                  Not registered? Create a account{" "}
                  <Link href="/auth/register">
                    <Text as="span" color="pink">
                      here
                    </Text>
                  </Link>
                </Text>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  console.log(session);
  if (session?.user) {
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
