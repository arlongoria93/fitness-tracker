import { Text, Box, Button, Input, Select, Heading } from "dracula-ui";
import React, { useState } from "react";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import Routine from "../../components/Routine";
import Link from "next/link";
import { Routines as RoutinesType } from "../../typings.d";

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
    const routinesViewer = routines.map((routine) => {
      return {
        id: routine.id,
        name: routine.name,
        goal: routine.goal,
        createdAt: routine.createdAt.toLocaleDateString(),
        updatedAt: routine.updatedAt.toLocaleDateString(),
      };
    });

    return {
      props: { routines: routinesViewer },
    };
  }
}

const Routines = ({ routines }: { routines: RoutinesType }) => {
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
