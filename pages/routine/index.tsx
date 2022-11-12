import { Text, Box, Button, Input, Select, Heading } from "dracula-ui";
import React, { useState } from "react";
import { InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import Routine from "../../components/Routine";
import Link from "next/link";
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
  const { user } = session;
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
      userId: user.id,
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
    <div className="flex flex-col space-y-4 items-center drac-bg-black justify-center min-h-screen">
      <Heading>My Routines</Heading>
      {routines ? (
        routines.map((routine) => <Routine routine={routine} />)
      ) : (
        <>
          <Heading color="pink" className="p-8">
            No Routines...Would you like to create one?
          </Heading>
          <Link href="/routine/create">
            <Button variant="outline" color="orange">
              Yes
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Routines;
