import React from "react";
import { UserEntity } from "./user-list.vm";
import { UserListComponent } from "./user-list.component";
import { getUserCollection } from "./user-list.repository";

export const UserListContainer: React.FC = () => {
  const [users, setUsers] = React.useState<UserEntity[]>([]);

  React.useEffect(() => {
    getUserCollection().then((memberDetail) => setUsers(memberDetail));
  }, []);

  return <UserListComponent users={users} />;
};
