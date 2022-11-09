import React from "react";
import { Heading, Text } from "dracula-ui";
import Routine from "./Routine";

const AllRoutines = ({ routines }) => {
  return (
    <div>
      {routines && routines.map((routine) => <Routine routine={routine} />)}
    </div>
  );
};

export default AllRoutines;
