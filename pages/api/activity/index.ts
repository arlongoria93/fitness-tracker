import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import prisma from "../../../lib/prisma";

type Activity = {
  name: string;
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { name } = req.body;
  switch (method) {
    case "GET":
      const activities = await prisma.activity.findMany();
      res.status(200).json(activities);
      break;
    case "POST":
      try {
        const act = await prisma.activity.create({
          data: {
            name: name,
          },
        });
        res.status(200).json(act);
      } catch (error) {
        console.log(error);
      }

      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
