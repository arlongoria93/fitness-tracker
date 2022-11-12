import React from "react";
import prisma from "../../lib/prisma";
import { InferGetStaticPropsType } from "next";
import { Heading, Box, Text } from "dracula-ui";
import Activity from "../../components/Activity";

type Props = {};

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
  acts.map((act) => {
    act.createdAt = act.createdAt.toString();
    act.updatedAt = act.updatedAt.toString();
  });

  return {
    props: {
      acts,
    },
  };
};

export default index;
