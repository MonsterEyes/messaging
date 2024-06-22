import { NextApiRequest, NextApiResponse } from "next";
import api from "../../../utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { customerId } = req.query;

  if (req.method === "GET") {
    const { token } = req.query;
    try {
      const response = await api.get(`cp/messages/${customerId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      res.status(200).json(response.data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  } else if (req.method === "POST") {
    const { token, message } = req.body;
    try {
      await api.post(
        `cp/messages/${customerId}/`,
        { message },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      res.status(200).json({ message: "Message sent successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to send message" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
