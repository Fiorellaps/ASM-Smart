import React from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/layouts";
import { UsersContainer } from "@/pods/users";

export const UserPage: React.FC = () => {
  const { id } = useParams();

  return (
    <AppLayout>
      <UsersContainer id={id} />
    </AppLayout>
  );
};
