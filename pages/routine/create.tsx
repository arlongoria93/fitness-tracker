import { Text, Box, Button, Input, Select } from "dracula-ui";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
type Props = {};

const Routine = (props) => {
  const { register, handleSubmit } = useForm();
  const session = useSession();

  const onSubmit = async (data: { name: string; goal: string }) => {
    const Routine = await fetch("/api/routine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: session?.data?.user.id, ...data }),
    });
    return Routine;
  };

  return (
    <div className="flex flex-col items-center drac-bg-black justify-center min-h-screen">
      <form className="sm:max-w-lg w-full" onSubmit={handleSubmit(onSubmit)}>
        <Box className="flex w-full flex-col items-center space-y-4">
          <Input {...register("name")} placeholder="Routine Name" />
          <textarea
            rows={4}
            className="w-full rounded drac-bg-black-secondary p-2 drac-text-white"
            {...register("goal")}
            placeholder="Routine Goal"
          />
          <Button type="submit" size="lg">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Routine;
