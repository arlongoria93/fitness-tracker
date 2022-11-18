import { Box, Button, Heading, Input, Text } from "dracula-ui";
import prisma from "../lib/prisma";
import { InferGetServerSidePropsType } from "next";
import AllRoutines from "../components/AllRoutines";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const routines = await prisma.routine.findMany({
    include: {
      user: {
        select: {
          username: true,
          id: true,
        },
      },
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
      user: routine.user,
    };
  });
  if (!routines) {
    return {
      props: {
        routines: null,
      },
    };
  } else {
    return {
      props: {
        routines: RoutinesView,
      },
    };
  }
};

export default function Home({
      routines,
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex flex-col  drac-bg-black space-y-24 min-h-screen">
      <Box className="flex flex-col mt-12 space-y-4 p-8 justify-start">
        <Heading>Browse through the hundrends of routines</Heading>
        <Heading>created by others</Heading>
      </Box>
      <AllRoutines routines={routines.slice(0, 5)} />
    </div>
  );
}
