import { NextApiRequest, NextApiResponse } from "next";
import { login } from "../../utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    try {
      const data = await login(username, password);
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
