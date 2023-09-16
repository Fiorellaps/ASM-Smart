import React from "react";
import { UserDetailEntity } from "./users.vm";
import { UserComponent } from "./users.component";
import { getUserCollection } from "./users.repository";

export const UsersContainer: React.FC = () => {
  const [users, setUsers] = React.useState<UserDetailEntity[]>([]);

  React.useEffect(() => {
    getUserCollection().then((memberDetail) => setUsers(memberDetail));
  }, []);

  return <UserComponent users={users} />;
};
