import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { IoIosPerson } from "react-icons/io";
import { Group } from "../../@core/models";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import InviteFriendModal from "../../components/modal/InviteFriendModal";
import { GROUP_UPLOADS, USER_UPLOADS } from "../../constants/config";
import { Colors } from "../../constants/theme";
import { GroupContext } from "../../store/group";

const GroupItem = ({
  group,
  onInviteFriendModal,
}: {
  group: Group;
  onInviteFriendModal: any;
}) => {
  return (
    <div className="group-item">
      <Link href={`/group/${group.groupID}`}>
        <a>
          <div className="info">
            <img
              src={GROUP_UPLOADS + group.groupLogo}
              className="rounded-circle"
              style={{
                width: 100,
                height: 100,
              }}
            />
            <h5 className="text-main-primary text-center">{group.groupName}</h5>
          </div>
        </a>
      </Link>
      <div className="right-info">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            gap: 20,
          }}
        >
          {group.members.map((member, idx) => {
            if (idx == 5) {
              return;
            } else {
              return (
                <img
                  key={idx}
                  className="rounded-circle"
                  src={USER_UPLOADS + member.user?.profileURL}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              );
            }
          })}
        </div>
        <Button
          event={() => onInviteFriendModal(true, group.groupID)}
          bg={Colors.Primary}
          title={
            <>
              <IoIosPerson size={22} color="#fff" />
              Add People
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
    </div>
  );
};

const Groups = () => {
  const groupStore = useContext(GroupContext);

  const [inviteFriendModal, onInviteFriendModal] = useState(false);
  const [selectedGroupID, setSelectedGroupID] = useState<string | null>(null);

  useEffect(() => {
    groupStore.fetchGroups();
  }, []);

  const _onInviteFriendModal = (status: boolean, groupID: string) => {
    onInviteFriendModal(status);
    setSelectedGroupID(groupID);
  };

  return (
    <>
      <div className="mt-3">
        <h4>Groups</h4>

        {groupStore.groupsLoading && (
          <Loading
            styles={{
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 100 + "%",
            }}
            isLoading={groupStore.groupsLoading}
            properties={{
              size: 32,
              color: Colors.Primary,
            }}
          />
        )}
        {!groupStore.groupsLoading && groupStore.groups?.length > 0 && (
          <div className="mt-3">
            {groupStore.groups.map((group: Group, idx: number) => (
              <GroupItem
                onInviteFriendModal={_onInviteFriendModal}
                group={group}
                key={idx}
              />
            ))}
          </div>
        )}

        {!groupStore.groupsLoading && groupStore.groups?.length == 0 && (
          <h6 className="text-main-primary mt-2">You have not some group!</h6>
        )}
      </div>
      <InviteFriendModal
        show={inviteFriendModal}
        onShow={onInviteFriendModal}
        groupID={selectedGroupID}
      />
    </>
  );
};

export default Groups;
