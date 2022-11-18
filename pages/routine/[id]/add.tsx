import React from "react";
import prisma from "../../../lib/prisma";
import { useRouter } from "next/router";
import { InferGetStaticPropsType } from "next";
import { Heading, Box, Text } from "dracula-ui";
import Link from "next/link";

type Props = {};

const add = ({ acts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { id } = router.query;
  const routineId = Number(id);
  const handleAddActivity = async (routineId: number, id: number) => {
    await fetch("/api/routine_act", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        routineId,
        activityId: id,
      }),
    });
    routineId, id;
  };
  return (
    <div className="flex flex-col items-center justify-center  drac-bg-black space-y-24 min-h-screen">
      <Box className="flex flex-col space-y-4 items-center">
        <Heading>Activities</Heading>
        <Text>Click on an activity to add it to your routine</Text>
      </Box>
      <div className="flex flex-col space-y-4">
        {acts.map((activity) => (
          <button
            key={activity.id}
            onClick={() => handleAddActivity(routineId, activity.id)}
          >
            <div
              key={activity.id}
              className="flex flex-col space-y-2 bg-primary rounded p-4"
            >
              <Heading color="orange">{activity.name}</Heading>
              <Text size="sm" color="orange" className="opacity-80">
                Created: {activity.createdAt}
              </Text>
            </div>
          </button>
        ))}
      </div>
      <Box>
        <Text>Dont see the activity you want? </Text>
        <Text>
          Create one{" "}
          <Text color="pink" as="span" className="italic" weight="bold">
            <Link href="/activity/create">here</Link>
          </Text>
        </Text>
      </Box>
    </div>
  );
};

export const getStaticProps = async () => {
  const acts = await prisma.activity.findMany();

  const activityViewer = acts.map((act) => {
    return {
      id: act.id,
      name: act.name,
      createdAt: act.createdAt.toLocaleDateString(),
      updatedAt: act.updatedAt.toLocaleDateString(),
    };
  });
  return {
    props: {
      acts: activityViewer,
    },
  };
};
export const getStaticPaths = async () => {
  const routines = await prisma.routine.findMany();
  const paths = routines.map((routine) => ({
    params: { id: routine.id.toString() },
  }));
  return { paths, fallback: false };
};

export default add;
