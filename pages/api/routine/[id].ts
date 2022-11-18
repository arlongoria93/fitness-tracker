import { NextApiResponse, NextApiRequest } from "next";
import prisma from "../../../lib/prisma";
export default async function routineIdHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      // Get data from your database

      break;
    case "PUT":
      // Update or create data in your database

      break;

    case "DELETE":
      try {
        //delete routine with all associated activities
        console.log("in delete", req.body.id);

        const routine_activities = await prisma.routine_Activity.deleteMany({
          where: {
            routineId: req.body.id,
          },
        });

        const routine = await prisma.routine.delete({
          where: {
            id: parseInt(id as string),
          },
        });

        res.status(200).json(routine);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
