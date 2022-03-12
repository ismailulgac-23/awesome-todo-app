import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { User } from '../@core/models';
class DatabaseService {

  async saveUser(user: User) {
    try {
      const data: any = readFileSync(resolve("./src/db/users.json"), "utf-8");
      let newUsers: any = [...data, user];
      await writeFileSync(resolve("./src/db/users.json"), JSON.stringify(newUsers));
      return {
        statusCode: 200,
        message: "Successfuly",
        created: user,
      }
    } catch (error) {
      return {
        statusCode: 400,
        error: "Something went wrong!",
        payload: error
      };
    }
  }

  async selectUser(username: string) {
    try {
      const data: any = readFileSync(resolve("./src/db/users.json"), "utf-8");
      const user = data.find((item: User) => item.username.toLowerCase() == username.toLowerCase());
      if (user) {
        return {
          statusCode: 200,
          message: "User finded",
          user
        };
      } else {
        return {
          statusCode: 400,
          error: "User not found",
          user: null
        };
      }
    } catch (error) {
      return {
        statusCode: 400,
        error: "Something went wrong!",
        payload: error
      };
    }
  }

  /* async updateUser(user: User) {
    try {
      const data: any = JSON.parse(readFileSync(resolve("./src/db/users.json"), "utf-8"));

      let findedUserIndex = data.findIndex((item: User) => item.userID.toLowerCase() == user.userID.toLowerCase());

      data[findedUserIndex] = {
        ...data[findedUserIndex],
        ...user
      };

      await writeFileSync(resolve("./src/db/users.json"), JSON.stringify(data));
      return {
        statusCode: 200,
        message: "Successfuly",
        updated: user,
      }
    } catch (error) {
      console.log("error => ", error);
      return {
        statusCode: 400,
        error: "Something went wrong!",
        payload: error
      };
    }
  } */

}

const databaseService = new DatabaseService();
export default databaseService;