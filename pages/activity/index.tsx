import React from "react";
import prisma from "../../lib/prisma";
import { InferGetStaticPropsType } from "next";
import Activity from "../../components/Activity";

const index = ({ acts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col items-center justify-center  drac-bg-black space-y-24 min-h-screen">
      {acts.map((act) => (
        <Activity key={act.id} activity={act} />
      ))}
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

export default index;
