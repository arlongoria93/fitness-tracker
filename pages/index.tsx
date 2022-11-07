import Head from "next/head";
import { Box, Button, Heading, Input, Text } from "dracula-ui";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home(props) {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  if (session) {
    return (
      <div className="flex flex-col space-y-4 items-center drac-bg-black justify-center min-h-screen">
        <Heading color="pink">Hello {session?.user?.name || "Vampire"}</Heading>
        <Box className="flex flex-col space-y-8">
          <Link href="/routine">Head to your routines</Link>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </Box>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col space-y-4 items-center drac-bg-black justify-center min-h-screen">
        <Box className="min-h-screen flex flex-col">
          <Box className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
            <Box className="px-6 drac-bg-black-secondary py-8 rounded shadow-md  w-full">
              <Heading color="pink" className="p-8">
                Hello {session?.user?.username || "Vampire"}
              </Heading>
              <Box className="flex flex-col space-y-8">
                <Button onClick={() => signIn()}>
                  <Text color="black">Sign In</Text>
                </Button>
                <Button
                  onClick={() => {
                    router.push("auth/register");
                  }}
                >
                  <Text color="black">Register</Text>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
}
