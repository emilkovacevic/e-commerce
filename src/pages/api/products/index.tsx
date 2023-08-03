import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../libs/prisma'

const fromSlugToName = (slug: string) => {
  return slug
    .split("-")
    .map((s) => {
      return s.charAt(0).toLowerCase() + s.slice(1);
    })
    .join(" ");
};

const parseTagArray = (tagArray: string | string[]) => {
  if (typeof tagArray === 'string') {
    const tags = tagArray.replace(/\[|\]|'/g, '').split(',');
    return tags.map(tag => fromSlugToName(tag.trim()));
  }

  return tagArray.map(tag => fromSlugToName(tag.trim()));
};

const products = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed." });

  const { take, skip, category, tags } = req.query;

  try {
    if (tags) {
      const tagList = Array.isArray(tags) ? parseTagArray(tags) : parseTagArray(tags.replace(/"/g, ''));
      console.log(tagList)
      const response = await prisma.product.findMany({
        take: Number(take) || undefined,
        skip: Number(skip) || undefined,
        where: {
          categoryName: {
            contains: category ? fromSlugToName(category as string) : undefined,
          },
          tags: {
            hasEvery: tagList,
          },
        },
      });

      return res.status(200).json(response);
    }

    const response = await prisma.product.findMany({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      where: {
        categoryName: {
          contains: category ? fromSlugToName(category as string) : undefined,
        },
      },
    });

    return res.status(200).json(response);
  } catch (e: any) {
    return res.status(e.response).json({ message: "Something went wrong." });
  }
};

export default products;
