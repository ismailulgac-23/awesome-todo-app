import "dotenv/config";
import express from 'express';
import cors from 'cors';

import user from './app/user';
import auth from './app/auth';
import todo from './app/todo';
import group from './app/group';

import { json as BodyParserJson } from 'body-parser';
import { IInviteFriendFromClientProps } from "./@core/interfaces";
import Database from "./db";

async function main() {

  const app = express();

  const http = require("http").createServer(app);

  const io = require("socket.io")(http, {
    cors: {
      methods: ["POST", "GET"],
      origin: "http://localhost:3000"
    }
  });

  app.use(cors());
  app.use(BodyParserJson());

  app.use("/uploads/user", express.static("./src/uploads/user"))
  app.use("/uploads/group", express.static("./src/uploads/group"))

  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use("/api/todo", todo);
  app.use("/api/group", group);

  http.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT} port!`));


  io.on("connection", (socket: any) => {
    socket.on("connectUser", (userID: string) => {
      socket.join(userID);
    });
    socket.on("inviteFriendFromClient", async (payload: IInviteFriendFromClientProps) => {
      const groupInfo = await Database.group.findFirst({
        where: {
          groupID: payload.groupID,
        },
        include: {
          members: {
            include: {
              user: true
            }
          },
        }
      });
      io.to(payload.userID).emit("inviteFriendFromServer", groupInfo)
    });
    socket.on("connectGroup", (groupID: string) => {
      socket.join(groupID);
    });
    socket.on("newTodoFromClient", ({ todo, members, myUserID }: any) => {
      members.forEach((member: any) => {
        if (member.groupMemberID != myUserID) {
          io.to(member.groupMemberID).emit("newTodoFromServer", todo);
        }
      });
    });
  });

}

main();

