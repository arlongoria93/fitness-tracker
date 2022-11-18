import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import prisma from "../../../lib/prisma";
import { Text, Heading, Button } from "dracula-ui";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Activity from "../../../components/Activity";
import { Activity as ActivityType } from "../../../typings.d";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
const RoutineById = ({
  routine,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const router = useRouter();
  const routineActivitiesList = routine.activites;
  const countOfActs = routineActivitiesList.length;
  if (session?.user.id !== routine.userId) {
    router.push("/");
  }
  const notify = () => {
    //wait 1 second then redirect to home page
    setTimeout(() => {
      router.push("/routine");
    }, 1200);
  };

  const deleteRoutine = async (id: number) => {
    const deleteRoutine = new Promise((resolve) =>
      fetch(`/api/routine/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            return response;
          }
          return Promise.reject(response);
        })
        .then((json) => setTimeout(() => resolve(json)))
    );
    const test = await toast
      .promise(deleteRoutine, {
        pending: "Deleting...",
        success: "Routine deleted!",
        error: "Error deleting routine",
      })
      .then(notify);
    // delete routine
  };
  if (session) {
    return (
      <div className="flex flex-col w-full items-center justify-center  drac-bg-black space-y-24 min-h-screen">
        <ToastContainer />
        <Heading size="2xl" color="orange">
          {routine.name}
        </Heading>
        {countOfActs > 0 ? (
          <Text>
            You have{" "}
            <Text as="span" color="green">
              {countOfActs}
            </Text>{" "}
            activities in your routine.
          </Text>
        ) : (
          ""
        )}
        {routineActivitiesList?.map((activity: ActivityType) => (
          <Activity activity={activity} />
        ))}
        <div className="flex flex-row space-x-8">
          <Link href={`/routine/${routine.id}/add`}>
            <Button variant="outline" color="orange">
              Add Activites
            </Button>
          </Link>
          <div className="opacity-60 hover:opacity-100  transition  duration-300 ease-in-out">
            <Button
              variant="outline"
              color="red"
              onClick={() => deleteRoutine(routine.id)}
            >
              Delete Routine
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center  drac-bg-black space-y-24 min-h-screen">
      <Heading size="lg" color="orange">
        If you want to see routines created by others, please sign in or
        <Text as="span" color="pink">
          <Link href="/auth/register"> register</Link>
        </Text>
        .
      </Heading>
      <Button variant="outline" color="orange">
        <Link href="/auth/signin">Sign in</Link>
      </Button>
    </div>
  );
};

export default RoutineById;
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  const routine = await prisma.routine.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Routine_Activity: {
        include: {
          activity: true,
        },
      },
    },
  });

  const routineActivities = routine?.Routine_Activity.map((routine) => {
    return {
      id: routine.activity.id,
      name: routine.activity.name,
      createdAt: routine.activity.createdAt.toLocaleString(),
      updatedAt: routine.activity.updatedAt.toLocaleString(),
    };
  });
  const routineViewer = {
    id: routine?.id,
    name: routine?.name,
    goal: routine?.goal,
    userId: routine?.userId,
    createdAt: routine?.createdAt.toLocaleString(),
    updatedAt: routine?.updatedAt.toLocaleString(),
    activites: routineActivities,
  };
  return {
    props: {
      routine: routineViewer,
    },
  };
};
