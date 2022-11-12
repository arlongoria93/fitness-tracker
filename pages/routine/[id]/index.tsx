import React from "react";
import { InferGetStaticPropsType, InferGetServerSidePropsType } from "next";
import Routine from "../../../components/Routine";
import prisma from "../../../lib/prisma";
import { Text, Heading, Button } from "dracula-ui";
import Link from "next/link";
import Activity from "../../../components/Activity";

type Props = {};

const RoutineById = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { routine, routineActivities } = props;
  console.log(routine);
  const routineActivitiesList = routineActivities.map(
    (activity) => activity.activity
  );
  const countOfActs = routineActivitiesList.length;
  console.log(routineActivitiesList);

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
      {routineActivitiesList?.map((activity) => (
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
};

export default RoutineById;
export const getServerSideProps = async (context) => {
  const { id } = context.params;
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
  for (const key in routine) {
    if (typeof routine[key] === "object") {
      routine[key] = JSON.stringify(routine[key]);
    }
  }
  return {
    props: {
      routine,
      routineActivities: JSON.parse(routine.Routine_Activity),
    },
  };
};
