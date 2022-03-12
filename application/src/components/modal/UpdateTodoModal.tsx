import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosAdd, IoIosCreate } from "react-icons/io";
import { Todo } from "../../@core/models";
import { TODO_TYPES } from "../../constants/data";
import { promiseRequest } from "../../constants/helpers";
import { Colors } from "../../constants/theme";
import { GroupContext } from "../../store/group";
import { TodoContext } from "../../store/todo";
import { UserContext } from "../../store/user";
import Button from "../Button";
import Modal from "../Modal";

interface IUpdateTodoModalProps {
  show: boolean;
  onShow: any;
  todo: {
    todoType: string;
    todoID: string;
  };
}

const UpdateTodoModal = ({ show, todo, onShow }: IUpdateTodoModalProps) => {
  const todoStore = useContext(TodoContext);

  const [todoType, setTodoType] = useState(TODO_TYPES.TRIVIAL);

  useEffect(() => {
    if (todo.todoType) setTodoType(todo.todoType);
  }, [todo.todoType]);

  const renderColor = () => {
    switch (todoType) {
      case TODO_TYPES.TRIVIAL:
        return Colors.Skyblue;
      case TODO_TYPES.REGULAR:
        return Colors.WarningNormal;

      case TODO_TYPES.URGENT:
        return Colors.Danger;

      default:
      case TODO_TYPES.TRIVIAL:
        return Colors.Skyblue;
    }
  };

  const onCreate = async () => {
    if (!todoType) {
      toast.custom("Please do not leave any blank spaces!", {
        position: "top-center",
      });
    } else {
      await promiseRequest({
        event: () =>
          todoStore.updateTodo({
            todoType,
            todoID: todo.todoID,
          }),
        msg: {
          success: "Todo updated",
          error: "Something went wrong!",
        },
      });
    }
  };

  return (
    <Modal
      cardStyles={{
        flex: 0.3,
        height: "auto",
      }}
      title="Update Todo"
      show={show}
      onShow={onShow}
    >
      <select
        className={todoType}
        style={{
          borderColor: renderColor(),
        }}
        onChange={(e: any) => setTodoType(e.target.value)}
        value={todoType}
      >
        <option className="blue" value={TODO_TYPES.TRIVIAL}>
          TRIVIAL
        </option>
        <option className="warning" value={TODO_TYPES.REGULAR}>
          REGULAR
        </option>
        <option className="red" value={TODO_TYPES.URGENT}>
          URGENT
        </option>
      </select>

      <Button
        event={() => onCreate()}
        containerStyles={{
          marginTop: 12,
        }}
        bg={Colors.Primary}
        textStyles={{
          color: "#fff",
        }}
        buttonStyles={{
          padding: 6,
        }}
        title={
          <>
            <IoIosCreate color="#fff" size={28} />
            Update
          </>
        }
      />
    </Modal>
  );
};

export default UpdateTodoModal;
