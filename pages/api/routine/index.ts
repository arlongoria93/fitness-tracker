import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { parse } from "path";
import prisma from "../../../lib/prisma";

type Routine = {
  name: string;
  goal: string;
  userId: string;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { name, goal, id } = req.body;
  console.log(id);
  switch (method) {
    case "GET":
      try {
        const routines = await prisma.routine.findMany({
          where: {
            userId: id,
          },
        });
        res.status(200).json(routines);
      } catch (error) {
        console.log(error);
      }

      break;
    case "POST":
      console.log("made it to put");
      try {
        console.log(req.body);
        const result: Routine = await prisma.routine.create({
          data: { userId: id, name: name, goal: goal },
        });
        return res.send(200);
      } catch (error) {
        console.log(error);
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
