import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import prisma from "../../../lib/prisma";
import { Text, Heading, Button } from "dracula-ui";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Activity from "../../../components/Activity";
import { Activity as ActivityType } from "../../../typings.d";

const RoutineById = ({
  routine,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const routineActivitiesList = routine.activites;
  const countOfActs = routineActivitiesList.length;

  if (session) {
    return (
      <div className="flex flex-col items-center justify-center  drac-bg-black space-y-24 min-h-screen">
        <Heading size="2xl" color="orange">
          {routine.name}
        </Heading>
        {countOfActs > 0 ? (
          <Text>
            You have{" "}
            <Text as="span" color="green">
              {countOfActs}
            </Text>{" "}
            activities in your routine.
          </Text>
        ) : (
          ""
        )}
        {routineActivitiesList?.map((activity: ActivityType) => (
          <div key={activity.id} className="w-1/2">
            <Activity activity={activity} />
          </div>
        ))}
        <Link href={`/routine/${routine.id}/add`}>
          <Button variant="outline" color="orange">
            Add Activites
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center  drac-bg-black space-y-24 min-h-screen">
      <Heading size="lg" color="orange">
        If you want to see routines created by others, please sign in or
        <Text as="span" color="pink">
          <Link href="/auth/register"> register</Link>
        </Text>
        .
      </Heading>
      <Button variant="outline" color="orange">
        <Link href="/auth/signin">Sign in</Link>
      </Button>
    </div>
  );
};

export default RoutineById;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  const routine = await prisma.routine.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Routine_Activity: {
        include: {
          activity: true,
        },
      },
    },
  });

  const routineActivities = routine?.Routine_Activity.map((routine) => {
    return {
      id: routine.activity.id,
      name: routine.activity.name,
      createdAt: routine.activity.createdAt.toLocaleString(),
      updatedAt: routine.activity.updatedAt.toLocaleString(),
    };
  });
  const routineViewer = {
    id: routine?.id,
    name: routine?.name,
    goal: routine?.goal,
    userId: routine?.userId,
    createdAt: routine?.createdAt.toLocaleString(),
    updatedAt: routine?.updatedAt.toLocaleString(),
    activites: routineActivities,
  };
  return {
    props: {
      routine: routineViewer,
    },
  };
};
