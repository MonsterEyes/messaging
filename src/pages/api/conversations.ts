import { NextApiRequest, NextApiResponse } from "next";
import api from "../../utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { token } = req.query;
    try {
      const response = await api.get("cp/conversations/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      res.status(200).json(response.data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
