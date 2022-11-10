import React from "react";
import { Heading, Text } from "dracula-ui";
import Link from "next/link";

type Props = {
  activity: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

const Activity = ({ activity }: Props) => {
  return (
    <Link href={`/activity/${activity.id}`}>
      <div
        key={activity.id}
        className="flex flex-col space-y-2 bg-primary rounded p-4"
      >
        <Heading color="orange">{activity.name}</Heading>
        <Text size="sm" color="orange" className="opacity-80">
          {activity.createdAt}
        </Text>
      </div>
    </Link>
  );
};

export default Routine;
