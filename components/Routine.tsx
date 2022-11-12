import React from "react";
import { Heading, Text } from "dracula-ui";
import Link from "next/link";

type Props = {
  routine: {
    id: number;
    name: string;
    goal: string;
    createdAt: string;
    updatedAt: string;
    user: {
      username: string;
    };
  };
};

const Routine = ({ routine }: Props) => {
  return (
    <Link href={`/routine/${routine.id}`}>
      <div
        key={routine.id}
        className="flex flex-row space-y-2 justify-between  bg-primary rounded p-4"
      >
        <div>
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
        {routine.user && (
          <div className="self-end opacity-75">
            <Text size="sm" className="opacity-80">
              Created by:{" "}
            </Text>
            <Text color="green">
              {routine.user.username.charAt(0).toLocaleUpperCase() +
                routine.user.username.slice(1)}
            </Text>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Routine;
