import { Text, Box, Button, Input, Select, Heading } from "dracula-ui";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { GoPlus } from "react-icons/go";
type Props = {};
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const routines = await prisma.routine.findMany({
    where: {
      userId: session?.data?.user.id,
    },
  });
  routines.map((routine) => {
    routine.createdAt = routine.createdAt.toString();
    routine.updatedAt = routine.updatedAt.toString();
  });
  return {
    props: { routines },
  };
}

const Routine = ({
  routines,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex flex-col items-center drac-bg-black justify-center min-h-screen">
      {routines &&
        routines.map((routine) => (
          <Box className="bg-primary p-8 rounded max-w-xl w-full flex flex-row justify-between items-center">
            <Box className="flex flex-col">
              <Text color="blackSecondary">Name</Text>{" "}
              <Heading>{routine.name}</Heading>
              <Text color="blackSecondary">Goal</Text>
              <Text>{routine.goal}</Text>
            </Box>
            <GoPlus
              className="drac-text-black-secondary hover:text-white"
              size={30}
            />
          </Box>
        ))}
    </div>
  );
};

export default Routine;
