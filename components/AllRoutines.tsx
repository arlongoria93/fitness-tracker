import React from "react";
import { Heading, Text } from "dracula-ui";
import Routine from "./Routine";

const AllRoutines = ({ routines }) => {
  console.log(routines);
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
