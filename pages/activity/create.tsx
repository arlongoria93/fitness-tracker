import { Heading, Box, Button, Input } from "dracula-ui";
import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { useSession, signIn } from "next-auth/react";
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
  const { data: session } = useSession();

  console.log(session);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
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
  if (session) {
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
  }
  return (
    <div className="flex flex-col items-center drac-bg-black justify-center min-h-screen">
      <Box className="flex flex-col items-center space-y-4">
        <Heading>Sign in to create a activity</Heading>
        <Button
          onClick={() => signIn()}
          size="lg"
          variant="outline"
          color="red"
        >
          Sign In
        </Button>
      </Box>
    </div>
  );
};

export default Routine;
