import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";
import { TODO_TYPES } from "../../constants/data";
import { promiseRequest } from "../../constants/helpers";
import { Colors } from "../../constants/theme";
import { GroupContext } from "../../store/group";
import { TodoContext } from "../../store/todo";
import { UserContext } from "../../store/user";
import Button from "../Button";
import Modal from "../Modal";

interface ICreateTodoModalProps {
  show: boolean;
  onShow: any;
}

const CreateTodoModal = ({ show, onShow }: ICreateTodoModalProps) => {
  const todoStore = useContext(TodoContext);
  const userStore = useContext(UserContext);

  const [todoName, setTodoName] = useState("");
  const [todoType, setTodoType] = useState(TODO_TYPES.TRIVIAL);

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
    if (!todoName || !todoType) {
      toast.error("Required", {
        position: "top-center",
      });
      return;
    }

    if (todoName.length > 255) {
      toast.error("The todo name must contain a maximum of 255 characters!", {
        position: "top-center",
      });
    } else {
      await promiseRequest({
        event: () =>
          todoStore.createTodo({
            todoText: todoName,
            todoType,
          }),
        msg: {
          success: "Todo created",
          error: "Something went wrong!",
        },
      });
      setTodoName("");
    }
  };

  return (
    <Modal
      cardStyles={{
        flex: 0.3,
        height: "auto",
      }}
      title="New Todo"
      show={show}
      onShow={onShow}
    >
      <textarea
        placeholder="Todo text"
        value={todoName}
        rows={5}
        className="mb-2"
        onChange={(e: any) => setTodoName(e.target.value)}
      ></textarea>

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
            <IoIosAdd color="#fff" size={28} />
            Create
          </>
        }
      />
    </Modal>
  );
};

export default CreateTodoModal;
