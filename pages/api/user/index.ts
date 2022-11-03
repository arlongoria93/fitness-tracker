import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { hash } from "argon2";
import { type } from "os";
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
type User = {
  username: String;
  password: String;
};

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
    case "POST":
      console.log("made it to put");
      try {
        const result: User = await prisma.user.create({
          data: {
            username: username,
            password: await hash(password),
          },
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
