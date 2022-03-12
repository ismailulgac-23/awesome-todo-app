import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { ICreateTodoProps, IUpdateTodoProps } from "../@core/interfaces";
import { Group, Todo } from "../@core/models";
import { PRIORITY } from "../constants/helpers";
import httpService from "../services/http";
import socket from "../services/socket";
import { GroupContext } from "./group";
import { UserContext } from "./user";

interface ITodoState {
  createTodo: (props: ICreateTodoProps) => any;
  updateTodo: (props: IUpdateTodoProps) => any;
  deleteTodo: (todoID: string) => any;
  priority: "URGENT" | "TRIVIAL" | "REGULAR";
  setPriority: any;
}

interface ITodoStoreProps {
  children: React.ReactNode;
}

export const TodoContext = createContext({} as ITodoState);

export default function TodoStore({ children }: ITodoStoreProps) {
  const userStore = useContext(UserContext);
  const groupStore = useContext(GroupContext);

  const [priority, setPriority] = useState<"URGENT" | "TRIVIAL" | "REGULAR">(
    "URGENT"
  );

  const createTodo = async (props: ICreateTodoProps) => {
    let payload = {
      ...props,
      todoCreatorID: userStore.user?.userID,
      groupID: groupStore.QUERY,
    };
    const data = await httpService.post("todo", payload);

    if (data.createdTodo) {

      socket.emit("newTodoFromClient", {
        todo: data.createdTodo,
        members: [...groupStore.currentGroup!.members],
        myUserID: userStore.user?.userID
      });

      let lastTodos = [
        { ...data.createdTodo },
        ...groupStore.currentGroup?.todos!,
      ];

      groupStore.setCurrentGroup({
        ...groupStore.currentGroup,
        todos: PRIORITY({
          type: priority,
          todos: lastTodos,
        }),
      });
    }
    return data;
  };

  const deleteTodo = async (todoID: string) => {
    const data = await httpService.delete("todo/" + todoID);

    let findIndex = groupStore.currentGroup!.todos.findIndex(
      (e) => e?.todoID == todoID
    );

    let todos = groupStore.currentGroup?.todos;

    todos?.splice(findIndex!, 1);

    groupStore.setCurrentGroup({
      ...groupStore.currentGroup,
      todos,
    });

    return data;
  };

  const updateTodo = async (props: IUpdateTodoProps) => {
    const data = await httpService.patch("todo/" + props.todoID, {
      todo: { todoType: props.todoType },
    });

    let todos = groupStore.currentGroup!.todos;

    const todoIndex = todos.findIndex(
      (todo: Todo) => todo.todoID == props.todoID
    );

    todos[todoIndex].todoType = props.todoType;

    groupStore.setCurrentGroup({
      ...groupStore.currentGroup,
      todos: PRIORITY({
        type: priority,
        todos,
      }),
    });
    return data;
  };


  useEffect(() => {
    if (groupStore.currentGroup) {
      socket.on("newTodoFromServer", (payload) => {
        groupStore.setCurrentGroup({
          ...groupStore.currentGroup,
          todos: PRIORITY({
            type: priority,
            todos: [{ ...payload }, ...groupStore.currentGroup!.todos]
          })
        });
      });
    }
  }, [groupStore.currentGroup, socket]);

  let initialState = {
    createTodo,
    updateTodo,
    priority,
    setPriority,
    deleteTodo,
  };
  return (
    <TodoContext.Provider value={initialState}>{children}</TodoContext.Provider>
  );
}
