import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../libs/prisma'


const categories = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed." });

  try {
    const response = await prisma.category.findMany({});

    return res.status(200).json(response);
  } catch (e: any) {
    return res.status(e.response).json({ message: "Something went wrong." });
  }
};

export default categories;
