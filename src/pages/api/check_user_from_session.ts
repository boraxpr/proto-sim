// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { lucia } from "@/auth/client";
import { User } from "lucia";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  cookieHeader: string;
  user: User | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sessionId = req.cookies[lucia.sessionCookieName];
  if (!sessionId) {
    return null;
  }
  const cookieHeader = req.headers.cookie || "";
  const { session, user } = await lucia.validateSession(sessionId);
  res.status(200).json({ cookieHeader, user });
}
