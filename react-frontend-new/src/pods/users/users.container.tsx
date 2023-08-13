import React from "react";
import { MemberDetailEntity, createDefaultMemberDetail } from "./users.vm";
import { UserComponent } from "./users.component";
import { getMemberCollection } from "./users.repository";

interface Props {
  id: string;
}

export const UsersContainer: React.FC<Props> = (props) => {
  const { id } = props;
  const [member, setMember] = React.useState<MemberDetailEntity>(
    createDefaultMemberDetail()
  );

  React.useEffect(() => {
    //getMemberCollection(id).then((memberDetail) => setMember(memberDetail));
  }, []);

  return <UserComponent member={member} />;
};
