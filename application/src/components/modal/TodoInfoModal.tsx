import React, { useContext, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { promiseRequest } from "../../constants/helpers";
import { Colors } from "../../constants/theme";
import { GroupContext } from "../../store/group";
import { UserContext } from "../../store/user";
import Button from "../Button";
import Modal from "../Modal";

interface ITodoInfoModalProps {
  show: boolean;
  onShow: any;
  text: string;
}

const TodoInfoModal = ({ show, onShow, text }: ITodoInfoModalProps) => {
  const groupStore = useContext(GroupContext);
  const userStore = useContext(UserContext);

  const [groupName, setGroupName] = useState("");

  return (
    <Modal
      cardStyles={{
        flex: 0.3,
        height: "auto",
        maxWidth: 768,
      }}
      title="Todo"
      show={show}
      onShow={onShow}
    >
      <p
        style={{
          textOverflow: "ellipsis ellipsis",
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      ></p>
    </Modal>
  );
};

export default TodoInfoModal;
