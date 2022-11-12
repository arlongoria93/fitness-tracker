import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type RoutineAtivity = {
  id: number;
  routineId: number;
  activityId: number;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { routineId, activityId } = req.body;
  switch (method) {
    case "GET":
      try {
        const routineActivities = await prisma.routine.findMany();
        res.status(200).json(routineActivities);
      } catch (error) {
        console.log(error);
      }

      break;
    case "POST":
      console.log("made it to put");
      try {
        console.log(req.body);
        const result: RoutineAtivity = await prisma.routine_Activity.create({
          data: {
            routineId: routineId,
            activityId: activityId,
          },
        });
        return res.status(200).json(result);
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
