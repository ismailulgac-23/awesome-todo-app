import toast from "react-hot-toast";
import { IPromiseRequestProps } from "../@core/interfaces";
import { Todo } from "../@core/models";

export const promiseRequest = async (props: IPromiseRequestProps) => {
  const res = await toast.promise(props.event(), {
    loading: "Loading...",
    success: <b>{props.msg?.success ? props.msg.success : "Successfuly!"}</b>,
    error: (
      <b>{props.msg?.error ? props.msg.error : "Error, please try again!"}</b>
    ),
  });
  return res;
};

interface IPriorityProps {
  todos: Todo[];
  type: "URGENT" | "TRIVIAL" | "REGULAR";
}

export const PRIORITY = ({ type, todos }: IPriorityProps) => {
  switch (type) {
    case "REGULAR":
      var newTodos = todos;

      var top1 = newTodos.filter((e: Todo) => e.todoType == "REGULAR");
      var top2 = newTodos.filter((e: Todo) => e.todoType == "URGENT");
      var top3 = newTodos.filter((e: Todo) => e.todoType == "TRIVIAL");

      var lastTodos = [...top1, ...top2, ...top3];

      return lastTodos;

    case "TRIVIAL":
      var newTodos = todos;

      var top1 = newTodos.filter((e: Todo) => e.todoType == "TRIVIAL");
      var top2 = newTodos.filter((e: Todo) => e.todoType == "URGENT");
      var top3 = newTodos.filter((e: Todo) => e.todoType == "REGULAR");

      var lastTodos = [...top1, ...top2, ...top3];

      return lastTodos;

    case "URGENT":
      var newTodos = todos;

      var top1 = newTodos.filter((e: Todo) => e.todoType == "URGENT");
      var top2 = newTodos.filter((e: Todo) => e.todoType == "REGULAR");
      var top3 = newTodos.filter((e: Todo) => e.todoType == "TRIVIAL");

      var lastTodos = [...top1, ...top2, ...top3];

      return lastTodos;

    default:
    case "URGENT":
      var newTodos = todos;

      var top1 = newTodos.filter((e: Todo) => e.todoType == "URGENT");
      var top2 = newTodos.filter((e: Todo) => e.todoType == "REGULAR");
      var top3 = newTodos.filter((e: Todo) => e.todoType == "TRIVIAL");

      var lastTodos = [...top1, ...top2, ...top3];

      return lastTodos;
  }
};
