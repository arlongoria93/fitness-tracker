import { Text, Box, Button, Input, Select, Heading } from "dracula-ui";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import { GoPlus } from "react-icons/go";
import Routine from "../../components/Routine";
type Routine = {
  id: number;
  name: string;
  goal: string;
  createdAt: string;
  updatedAt: string;
};
type Props = {
  routines: Routine[];
};
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

const Routines = ({
  routines,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex flex-col items-center drac-bg-black justify-center min-h-screen">
      {routines && routines.map((routine) => <Routine routine={routine} />)}
    </div>
  );
};

export default Routines;
