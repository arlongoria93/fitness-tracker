import React from "react";
import { Heading, Text } from "dracula-ui";

type Props = {
  routine: {
    id: number;
    name: string;
    goal: string;
    createdAt: string;
    updatedAt: string;
  };
};

const Routine = ({ routine }: Props) => {
  return (
    <div
      key={routine.id}
      className="flex flex-col space-y-2 bg-primary rounded p-4"
    >
      <Heading color="orange">{routine.name}</Heading>
      <div className="flex flex-col">
        <Text>Goal:</Text>
        <Text>{routine.goal}</Text>
      </div>
      <div className="flex flex-col">
        <Text size="sm" className="opacity-80">
          Created At:
        </Text>
        <Text size="sm" color="orange" className="opacity-80">
          {routine.createdAt}
        </Text>
      </div>
    </div>
  );
};

export default Routine;
