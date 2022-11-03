import Head from "next/head";
import { Box, Button, Heading, Input } from "dracula-ui";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home(props) {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  if (session) {
    return (
      <div className="flex flex-col space-y-4 items-center drac-bg-black justify-center min-h-screen">
        <Heading color="pink">Hello {session?.user?.name || "Vampire"}</Heading>
        <Box className="flex flex-col space-y-8">
          <Button onClick={() => signOut()}>Sign Out</Button>
        </Box>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col space-y-4 items-center drac-bg-black justify-center min-h-screen">
        <Heading color="pink">
          Hello {session?.user?.username || "Vampire"}
        </Heading>
        <Box className="flex flex-col space-y-8">
          <Button onClick={() => signIn()}>Sign In</Button>
          <Button
            onClick={() => {
              router.push("auth/register");
            }}
          >
            Sign Up
          </Button>
        </Box>
      </div>
    );
  }
}
