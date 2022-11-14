import { Box, Button, Heading, Input, Text } from "dracula-ui";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import prisma from "../lib/prisma";
import { InferGetServerSidePropsType } from "next";
import AllRoutines from "../components/AllRoutines";
import { GetServerSideProps } from "next";
import { type } from "os";

export const getServerSideProps: GetServerSideProps = async () => {
  //fetch latest routines

  const routines = await prisma.routine.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const RoutinesView = routines.map((routine) => {
    return {
      id: routine.id,
      name: routine.name,
      goal: routine.goal,
      userId: routine.userId,
      createdAt: routine.createdAt.toLocaleString(),
      updatedAt: routine.updatedAt.toLocaleString(),
    };
  });

  return {
    props: {
      routines: RoutinesView,
    },
  };
};

type session = {
  user: {
    id: string;
    name: string;
  };
  expires: string;
};

export default function Home({
      routines,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session } = useSession();

  const router = useRouter();
  console.log(session);

  if (session) {
    return (
      <div className="flex flex-col  drac-bg-black space-y-24 min-h-screen">
        <Box className="flex flex-col mt-12 space-y-4 p-8 justify-start">
          <Heading>Browse through the hundrends of routines</Heading>
          <Heading>created by others</Heading>
        </Box>
        <AllRoutines routines={routines.slice(0, 5)} />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col space-y-4 items-center drac-bg-black justify-center min-h-screen">
        <Box className="min-h-screen flex flex-col">
          <Box className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 ">
            <Box className="px-6 drac-bg-black-secondary py-8 rounded shadow-md  w-full">
              <Heading color="pink" className="p-8">
                Hello {session ? session["user"] : "Guest"}
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
