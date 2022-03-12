export interface User {
  userID: string;
  username: string;
  profileURL: string;
}
export interface Group {
  groupID: string
  groupName: string
  groupLogo: string
  createdAt: number
  todos: Todo[]
  members: GroupMember[]
}

export interface GroupMember {
  ID: string
  groupMemberID: string
  groupID: string
  group?: Group
  user?: User
}

export interface Todo {
  todoID: string
  todoText: string
  todoCreatorID: string
  groupID: string
  todoCreatedAt: number
  todoType: string
  todoCreator?: User
  group?: Group
}