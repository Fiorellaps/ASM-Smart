import React from "react";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/layouts";
import { UserListContainer } from "@/pods/user-list";

export const UserPage: React.FC = () => {
  const { id } = useParams();

  return (
    <AppLayout>
      <UserListContainer />
    </AppLayout>
  );
};
