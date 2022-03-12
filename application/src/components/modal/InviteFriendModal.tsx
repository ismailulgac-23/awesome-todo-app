import React, { useContext, useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { User } from "../../@core/models";
import { USER_UPLOADS } from "../../constants/config";
import { promiseRequest } from "../../constants/helpers";
import { Colors } from "../../constants/theme";
import { GroupContext } from "../../store/group";
import { UserContext } from "../../store/user";
import Button from "../Button";
import Loading from "../Loading";
import Modal from "../Modal";

interface IInviteFriendModalProps {
  show: boolean;
  onShow: any;
  groupID: string | null;
}

interface IUserItemProps {
  user: User;
  groupID: string | null;
}

const UserItem = ({ user, groupID }: IUserItemProps) => {
  const groupStore = useContext(GroupContext);
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <img
          src={USER_UPLOADS + user.profileURL}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            marginRight: 12,
          }}
          alt=""
        />
        <h6>@{user.username}</h6>
      </div>
      <Button
        event={async () => {
          await promiseRequest({
            event: () =>
              groupStore.addUserToGroup({
                groupID: groupID!,
                userID: user.userID,
              }),
            msg: {
              success: "This user added to group",
              error: "This user is already in the group!",
            },
          });
        }}
        bg={Colors.Primary}
        title={
          <>
            <IoIosAdd size={22} color="#fff" />
          </>
        }
        buttonStyles={{
          padding: 10,
        }}
        textStyles={{
          color: "#fff",
        }}
      />
    </div>
  );
};

const InviteFriendModal = ({
  show,
  onShow,
  groupID,
}: IInviteFriendModalProps) => {
  const userStore = useContext(UserContext);

  const [value, setValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(false);

  useEffect(() => {
    if (value && value != "") {
      setUsersLoading(true);
      setTimeout(async () => {
        const data = await userStore.users.searchUsers(value);
        let filteredData = await data.users.filter(
          (item: User) =>
            item.userID.toLowerCase() != userStore.user?.userID.toLowerCase()
        );
        setUsers(filteredData);
        setUsersLoading(false);
      }, 100);
    }
  }, [value]);

  return (
    <Modal
      cardStyles={{
        flex: 0.5,
      }}
      title="Add to Group People"
      show={show}
      onShow={onShow}
    >
      <input
        type="text"
        placeholder="Search for username"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      />

      {usersLoading && (
        <Loading
          styles={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100 + "%",
          }}
          isLoading={usersLoading}
          properties={{
            size: 32,
            color: Colors.Primary,
          }}
        />
      )}

      <div
        style={{
          marginTop: 20,
        }}
      >
        {!usersLoading &&
          users.length > 0 &&
          users.map((user: User, idx: number) => (
            <UserItem groupID={groupID} user={user} key={idx} />
          ))}
      </div>
    </Modal>
  );
};

export default InviteFriendModal;
