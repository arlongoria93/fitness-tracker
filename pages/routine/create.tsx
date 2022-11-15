import { Box, Button, Input } from "dracula-ui";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { useForm, Resolver } from "react-hook-form";
type FormValues = {
  name: string;
  goal: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

const Routine = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const session = useSession();

  const onSubmit = async (data: { name: string; goal: string }) => {
    const Routine = await fetch("/api/routine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: session?.data?.user.id, ...data }),
    });
    reset();
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
