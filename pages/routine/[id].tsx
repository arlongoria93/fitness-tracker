import React from "react";
import { InferGetStaticPropsType, InferGetServerSidePropsType } from "next";
import Routine from "../../components/Routine";
import prisma from "../../lib/prisma";

type Props = {};

const RoutineById = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { routine } = props;
  return (
    <div>
      <Routine routine={routine} />
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
  });
  for (const key in routine) {
    if (typeof routine[key] === "object") {
      routine[key] = JSON.stringify(routine[key]);
    }
  }
  return {
    props: {
      routine,
    },
  };
};
