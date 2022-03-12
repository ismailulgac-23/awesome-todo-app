import { Request, Response } from "express";
import Database from "../../db";

export const searchUsers = async (req: Request, res: Response) => {
  const query: string = String(req.query.q);
  if (query && query != '') {
    const users = await Database.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: query
            }
          }
        ],
      },
      select: {
        profileURL: true,
        userID: true,
        username: true,
      }
    });
    return res.status(200).json({
      users
    });
  } else {
    return res.status(400).json({
      error: "Something went wrong! [REQUIRED]"
    });
  }
};