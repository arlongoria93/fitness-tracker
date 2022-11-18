import React from "react";
import { Heading, Text } from "dracula-ui";
import Link from "next/link";
import { Routine } from "../typings.d";
import { BsArrowRightCircleFill } from "react-icons/bs";

const Routine = ({ routine }: { routine: Routine }) => {
  console.log(routine);
  return (
    <div
      key={routine.id}
      className="flex flex-col w-full space-x-4 justify-between transition hover:ease-in-out md:flex-row   bg-primary rounded p-4"
    >
      <div className="">
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
        <div className="flex flex-col justify-between sm:space-y-4 items-center">
          <div className="h-full flex flex-col space-y-4 justify-center">
            <Link href={`/routine/${routine.id}`}>
              <BsArrowRightCircleFill className="text-3xl opacity-60 hover:opacity-100" />{" "}
            </Link>
          </div>
          <div className="">
            <Text size="sm" className="opacity-80">
              Created by:{" "}
            </Text>
            <Text color="green">
              {routine.user.username.charAt(0).toLocaleUpperCase() +
                routine.user.username.slice(1)}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default Routine;
