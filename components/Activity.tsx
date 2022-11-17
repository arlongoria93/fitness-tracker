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
    <div
      key={activity.id}
      className="flex flex-col w-full space-y-2 bg-primary rounded p-4"
    >
      <Text color="orange" className="opacity-80">
        Name:
      </Text>
      <Heading color="white">{activity.name}</Heading>
      <Text color="orange" className="opacity-80">
        Created At:
      </Text>
      <Text size="sm" color="white" className="opacity-80">
        {activity.createdAt}
      </Text>
    </div>
  );
};

export default Activity;
