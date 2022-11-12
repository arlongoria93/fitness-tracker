import React from "react";
import { InferGetStaticPropsType, InferGetServerSidePropsType } from "next";
import Routine from "../../components/Routine";
import prisma from "../../lib/prisma";

type Props = {};

const RoutineById = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { routine, routineActivities } = props;
  const routineActivitiesList = routineActivities.map(
    (activity) => activity.activity
  );
  console.log(routineActivitiesList);

  return (
    <div>
      <Routine routine={routine} />
      {routineActivitiesList?.map((activity) => (
        <div key={activity.id}>{activity.name}</div>
      ))}
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
