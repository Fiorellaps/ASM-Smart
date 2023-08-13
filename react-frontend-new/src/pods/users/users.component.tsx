import React from "react";
import { Link } from "react-router-dom";
import { routes } from "core";
import { MemberDetailEntity } from "./users.vm";

interface Props {
  member: MemberDetailEntity;
}

export const UserComponent: React.FC<Props> = (props) => {
  const { member } = props;

  return (
    <>
      <h2>Hello from Users page</h2>

      <Link to={routes.list}>Back to list page</Link>
    </>
  );
};
