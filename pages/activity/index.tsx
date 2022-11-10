import React from "react";
import prisma from "../../lib/prisma";
import { InferGetStaticPropsType } from "next";
import { Heading, Box, Text } from "dracula-ui";
import Routine from "../../components/Routine";

type Props = {};

const index = ({ acts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="min-w-screen flex flex-col items-center space-y-4 justify-center min-h-screen">
      {acts.map((act) => (
        <Routine key={act.id} routine={act} />
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
