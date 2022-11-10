import { Text, Box, Button, Input, Select } from "dracula-ui";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
type Props = {};

const Routine = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data: { name: string }) => {
    const Routine = await fetch("/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    reset();
    return Routine;
  };

  return (
    <div className="flex flex-col items-center drac-bg-black justify-center min-h-screen">
      <form className="sm:max-w-lg w-full" onSubmit={handleSubmit(onSubmit)}>
        <Box className="flex w-full flex-col items-center space-y-4">
          <Input {...register("name")} placeholder="Activity Name" />
          <Button type="submit" size="lg">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Routine;
