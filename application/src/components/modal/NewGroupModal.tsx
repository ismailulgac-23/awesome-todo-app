import React, { useContext, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { promiseRequest } from "../../constants/helpers";
import { Colors } from "../../constants/theme";
import { GroupContext } from "../../store/group";
import { UserContext } from "../../store/user";
import Button from "../Button";
import Modal from "../Modal";

interface INewGroupModalProps {
  show: boolean;
  onShow: any;
}

const NewGroupModal = ({ show, onShow }: INewGroupModalProps) => {
  const groupStore = useContext(GroupContext);
  const userStore = useContext(UserContext);

  const [groupName, setGroupName] = useState("");

  return (
    <Modal
      cardStyles={{
        flex: 0.3,
        height: "auto",
      }}
      title="New Group"
      show={show}
      onShow={onShow}
    >
      <input
        type="text"
        placeholder="Group name"
        value={groupName}
        onChange={(e: any) => setGroupName(e.target.value)}
      />

      <Button
        event={async () => {
          await promiseRequest({
            event: () =>
              groupStore.createGroup({
                groupName,
                groupCreatorID: userStore.user!.userID,
              }),
            msg: {
              success: "Group created",
              error: "Something went wrong!",
            },
          });
          setGroupName("");
        }}
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

export default NewGroupModal;
