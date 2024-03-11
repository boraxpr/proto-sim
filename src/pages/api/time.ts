import type { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/db/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await pool.query("SELECT NOW()");
  res.status(200).json(result.rows[0]);
  // const user = await lucia.
}
