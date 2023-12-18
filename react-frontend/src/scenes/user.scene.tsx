import React from 'react';
import { AppLayout } from 'layouts';
import { UserContainer } from 'pods/user';

export const UserScene: React.FC = () => {
  return (
    <AppLayout>
      <UserContainer />
    </AppLayout>
  );
};
