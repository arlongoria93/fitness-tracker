import { Heading, Box, Button, Input } from "dracula-ui";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { useForm, Resolver } from "react-hook-form";
type FormValues = {
  name: string;
  goal: string;
};
//prop types
type Props = {};

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

const Routine = (props: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  session;
  const onSubmit = async (data: { name: string; goal: string }) => {
    const Routine = await fetch("/api/routine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: session?.user.id, ...data }),
    });
    reset();
    router.push("/routine");
    return Routine;
  };
  if (session) {
    return (
      <div className="flex flex-col space-y-4 items-center drac-bg-black justify-center min-h-screen">
        <form className="sm:max-w-lg w-full" onSubmit={handleSubmit(onSubmit)}>
          <Box className="flex w-full flex-col items-center space-y-4">
            <Input {...register("name")} placeholder="Routine Name" />
            <textarea
              rows={4}
              className="w-full rounded drac-bg-black-secondary p-2 drac-text-white"
              {...register("goal")}
              placeholder="Routine Goal"
            />
            <Button type="submit" variant="outline" size="lg">
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
        <Heading>Sign in to create a routine</Heading>
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
