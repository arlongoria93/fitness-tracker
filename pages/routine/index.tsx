import { Text, Box, Button, Input, Select, Heading } from "dracula-ui";
import React, { useState } from "react";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import Routine from "../../components/Routine";
import Link from "next/link";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (session?.user) {
    const routines = await prisma.routine.findMany({
      where: {
        userId: session.user.id,
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
