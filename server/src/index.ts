import "dotenv/config";
import express from 'express';
import cors from 'cors';

import user from './app/user';
import auth from './app/auth';
import todo from './app/todo';
import group from './app/group';

import { json as BodyParserJson } from 'body-parser';

async function main() {

  const app = express();
  app.use(cors());
  app.use(BodyParserJson());

  app.use("/uploads/user", express.static("./src/uploads/user"))
  app.use("/uploads/group", express.static("./src/uploads/group"))

  app.use("/api/user", user);
  app.use("/api/auth", auth);
  app.use("/api/todo", todo);
  app.use("/api/group", group);

  app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT} port!`));

}

main();