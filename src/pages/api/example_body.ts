// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  name: string;
  age: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { name, age } = JSON.parse(req.body);
    res.status(200).json({ name, age });
  } else {
    res.status(405);
  }
}
