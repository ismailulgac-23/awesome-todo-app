import React from "react";
import GroupStore from "./group";
import TodoStore from "./todo";
import UserStore from "./user";

export default function Store({ children }: { children: React.ReactNode }) {
  return (
    <UserStore>
      <GroupStore>
        <TodoStore>{children}</TodoStore>
      </GroupStore>
    </UserStore>
  );
}
