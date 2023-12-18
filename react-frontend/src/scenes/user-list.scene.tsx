import React from 'react';
import { AppLayout } from 'layouts';
import { UserListContainer } from 'pods/user-list';

export const UserListScene: React.FC = () => {
  return (
    <AppLayout>
      <UserListContainer />
    </AppLayout>
  );
};
