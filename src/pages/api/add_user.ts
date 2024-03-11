import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/db/client";
import { lucia } from "@/auth/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await pool.query(
    "INSERT INTO auth_user DEFAULT VALUES RETURNING id"
  );

  console.log(result.rows[0].id);
  const session = await lucia.createSession(result.rows[0].id, {});
  res
    .appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    )
    .status(200)
    .end();
  res.status(200).json(result.rows[0]);
}
