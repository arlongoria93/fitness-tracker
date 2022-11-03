import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { hash } from "argon2";
// POST /api/post
// Required fields in body: title
// Optional fields in body: content

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { username, password } = req.body;
  switch (method) {
    case "GET":
      try {
        const result = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });

        res.send(result);
      } catch (error) {
        console.log(error);
      }

      break;
    case "PUT":
      try {
        const result = await prisma.user.create({
          data: {
            username: username,
            password: hash(password),
          },
        });
        res.send(result);
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
