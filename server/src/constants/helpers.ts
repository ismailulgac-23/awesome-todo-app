import { Todo } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";
import { User } from "../@core/models";

export const GET_ERROR_BODY = { error: "Something went wrong!" };

interface IDecodedProps {
  user: User;
}

export const VERIFY_JWT = async (token: string) => {
  if (token && token != '') {
    try {
      const decoded = await verify(token, process.env.SECRET_KEY_FOR_USER!);
      const newDecoded = decoded as IDecodedProps;
      if (newDecoded?.user) {
        return {
          user: newDecoded.user,
          token: sign({ user: newDecoded.user }, process.env.SECRET_KEY_FOR_USER!)
        };
      } else {
        return {
          error: "Unauthorized"
        };
      }
    } catch {
      return {
        error: "Unauthorized or Server error"
      };
    }
  } else {
    return {
      error: "Unauthorized or Server error"
    };
  }
}

interface IPriorityProps {
  todos: Todo[];
  type: "URGENT" | "TRIVIAL" | "REGULAR";
}

export const PRIORITY = ({ type, todos }: IPriorityProps) => {
  switch (type) {
    case "REGULAR":

      var newTodos = todos;

      var top1 = newTodos.filter((e) => e.todoType == 'REGULAR');
      var top2 = newTodos.filter((e) => e.todoType == 'URGENT');
      var top3 = newTodos.filter((e) => e.todoType == 'TRIVIAL');

      var lastTodos = [
        ...top1,
        ...top2,
        ...top3
      ]

      return lastTodos;


    case "TRIVIAL":
      var newTodos = todos;

      var top1 = newTodos.filter((e) => e.todoType == 'TRIVIAL');
      var top2 = newTodos.filter((e) => e.todoType == 'URGENT');
      var top3 = newTodos.filter((e) => e.todoType == 'REGULAR');

      var lastTodos = [
        ...top1,
        ...top2,
        ...top3
      ]

      return lastTodos;

    case "URGENT":
      var newTodos = todos;

      var top1 = newTodos.filter((e) => e.todoType == 'URGENT');
      var top2 = newTodos.filter((e) => e.todoType == 'REGULAR');
      var top3 = newTodos.filter((e) => e.todoType == 'TRIVIAL');

      var lastTodos = [
        ...top1,
        ...top2,
        ...top3
      ]

      return lastTodos;

    default:
    case "URGENT":
      var newTodos = todos;

      var top1 = newTodos.filter((e) => e.todoType == 'URGENT');
      var top2 = newTodos.filter((e) => e.todoType == 'REGULAR');
      var top3 = newTodos.filter((e) => e.todoType == 'TRIVIAL');

      var lastTodos = [
        ...top1,
        ...top2,
        ...top3
      ]

      return lastTodos;
  }
};