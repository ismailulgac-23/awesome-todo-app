import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { IAddUserToGroupProps, ICreateGroupProps } from "../@core/interfaces";
import { Group, User } from "../@core/models";
import httpService from "../services/http";
import socket from "../services/socket";
import { UserContext } from "./user";

interface IGroupState {
  createGroup: (props: ICreateGroupProps) => any;
  fetchGroups: () => any;
  fetchGroup: () => any;
  currentGroup: Group | undefined;
  setCurrentGroup: any;
  currentGroupLoading: boolean;
  groups: Group[] | [];
  groupsLoading: boolean;
  addUserToGroup: (props: IAddUserToGroupProps) => any;
  QUERY: string | null;
}

interface IGroupStoreProps {
  children: React.ReactNode;
}

export const GroupContext = createContext({} as IGroupState);

export default function GroupStore({ children }: IGroupStoreProps) {
  const router = useRouter();
  const QUERY: string | null = String(router.query.groupID) || null;

  const [currentGroup, setCurrentGroup] = useState<Group>();
  const [currentGroupLoading, setCurrentGroupLoading] = useState(false);

  const [groups, setGroups] = useState<Group[] | []>([]);
  const [groupsLoading, setGroupsLoading] = useState(false);

  const createGroup = async ({
    groupName,
    groupCreatorID,
  }: ICreateGroupProps) => {
    const data = await httpService.post("group", { groupName, groupCreatorID });
    if (data.createdGroup) {
      socket.emit("newGroupFromClient", data.createdGroup);
      setGroups((prevState) => [{ ...data.createdGroup }, ...prevState]);
    }
    return data;
  };

  const fetchGroups = async () => {
    if (!groupsLoading) {
      setGroupsLoading(true);
      const data = await httpService.get("group", {
        token: localStorage.getItem("token"),
      });
      setGroups(data.groups);
      setGroupsLoading(false);
    }
  };

  const addUserToGroup = async ({ userID, groupID }: IAddUserToGroupProps) => {
    const data = await httpService.post("group/user", { userID, groupID });
    if (data.createdMember) {

      const index = groups.findIndex((e: Group) => e.groupID == data.createdMember.groupID);

      let blobGroups = [...groups];
      let blobGroup = groups[index];


      blobGroup.members.push(data.createdMember);
      blobGroups[index] = blobGroup;

      setGroups(blobGroups)
      socket.emit("inviteFriendFromClient", {
        userID: data.createdMember.groupMemberID,
        groupID: data.createdMember.groupID
      });
    }
    return data;
  };

  const fetchGroup = async () => {
    setCurrentGroupLoading(true);
    let url = `group/${QUERY}`;
    const data = await httpService.get(url);
    if (data.group) {
      setCurrentGroup(data.group);
      setCurrentGroupLoading(false);
      socket.emit("connectGroup", data.group.groupID);
    }
    return data;
  };

  useEffect(() => {
    if (QUERY != null) {
      fetchGroup();
    }
  }, [QUERY]);

  useEffect(() => {
    if (socket) {
      socket.on("inviteFriendFromServer", (payload) => {
        setGroups((prevState) => [{ ...payload }, ...prevState]);
      });
    }
  }, [socket]);

  let initialState = {
    createGroup,
    fetchGroups,
    fetchGroup,
    groups,
    groupsLoading,
    addUserToGroup,
    currentGroup,
    currentGroupLoading,
    setCurrentGroup,
    QUERY,
  };
  return (
    <GroupContext.Provider value={initialState}>
      {children}
    </GroupContext.Provider>
  );
}
