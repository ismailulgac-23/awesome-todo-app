export interface ILoginProps {
  username: string;
  password: string;
}

export interface ICreateGroupProps {
  groupName: string;
  groupCreatorID: string;
}

export interface IAddUserToGroupProps {
  userID: string;
  groupID: string;
}

export interface ICreateTodoProps {
  todoText: string;
  todoType: string;
}

export interface IUpdateTodoProps {
  todoType: string;
  todoID: string;
}

export interface IPromiseRequestProps {
  event: any;
  msg?: {
    success?: string;
    error?: string;
  };
}
