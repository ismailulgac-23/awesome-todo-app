import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { User } from "../../@core/models";
import { GET_ERROR_BODY, PRIORITY, VERIFY_JWT } from "../../constants/helpers";
import Database from "../../db";

export const getGroups = async (req: Request, res: Response) => {
  const tokenReq: string = String(req.headers.token);
  const { error, user }: { error?: any; user?: User; } = await VERIFY_JWT(tokenReq);

  if (error) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  } else {
    const groups = await Database.group.findMany({
      orderBy: {
        createdAt: "asc"
      },
      where: {
        members: {
          some: {
            groupMemberID: user!.userID
          }
        }
      },
      include: {
        members: {
          include: {
            user: true
          }
        },
      }
    });
    return res.status(200).json({
      groups
    });
  }


};

export const createGroup = async (req: Request, res: Response) => {
  let groupName = req.body.groupName;
  let groupCreatorID = req.body.groupCreatorID;
  if (groupName && groupName != '' && groupCreatorID && groupCreatorID != '') {

    let payload = {
      groupID: uuid(),
      groupName,
      groupCreatorID,
      createdAt: Math.floor(Date.now() / 1000),
    };

    try {
      const createdGroup = await Database.group.create({
        data: {
          ...payload,
        },
        include: {
          members: {
            include: {
              user: true
            }
          },
        }
      });

      const createdMember = await Database.groupMember.create({
        data: {
          ID: uuid(),
          groupID: createdGroup.groupID,
          groupMemberID: groupCreatorID,
        },
      });

      return res.status(200).json({
        createdGroup,
        createdMember
      });
    } catch {
      return res.status(400).json(GET_ERROR_BODY);
    }

  } else {
    return res.status(400).json({
      error: "Something went wrong! [REQUIRED]"
    });
  }
}

export const addUserToGroup = async (req: Request, res: Response) => {
  const userID = req.body.userID;
  const groupID = req.body.groupID;
  if (groupID && userID && groupID != '' && userID != '') {

    try {

      const controlMember = await Database.groupMember.findFirst({
        where: {
          groupID,
          groupMemberID: userID
        }
      });

      if (controlMember != null) {
        return res.status(400).json({
          error: "This user is already in the group!"
        });
      } else {
        const createdMember = await Database.groupMember.create({
          data: {
            ID: uuid(),
            groupID,
            groupMemberID: userID
          }
        });
        return res.status(200).json({
          createdMember
        });
      }

    } catch {
      return res.status(400).json(GET_ERROR_BODY);
    }

  } else {
    return res.status(400).json(GET_ERROR_BODY);
  }
}

export const getGroup = async (req: Request, res: Response) => {
  const { groupID } = req.params;
  const group = await Database.group.findFirst({
    where: {
      groupID
    },
    include: {
      members: true,
      todos: {
        orderBy: {
          todoCreatedAt: "desc"
        },
        include: {
          todoCreator: true
        }
      }
    }
  });
  if (group != null) {
    return res.status(200).json({
      group: {
        ...group,
        todos: PRIORITY({ type: "URGENT", todos: group.todos })
      }
    });
  } else {
    return res.status(400).json(GET_ERROR_BODY);
  }
};