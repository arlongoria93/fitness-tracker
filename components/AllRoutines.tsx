import React from "react";
import { Heading, Text } from "dracula-ui";
import Routine from "./Routine";
import { Routine as RoutinesType } from "../typings.d";
const AllRoutines = ({ routines }: { routines: RoutinesType[] }) => {
  routines;
  return (
    <div className="space-y-4 flex flex-col">
      <Text className="drac-text-pink">Latest Rotuines Created</Text>
      {routines &&
        routines.map((routine) => (
          <Routine key={routine.id} routine={routine} />
        ))}
    </div>
  );
};

export default AllRoutines;
