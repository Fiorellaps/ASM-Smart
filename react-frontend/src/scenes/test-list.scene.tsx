import React from 'react';
import { AppLayout } from 'layouts';
import { TestListContainer } from 'pods/test-list';

export const TestListScene: React.FC = () => {
  return (
    <AppLayout>
      <TestListContainer />
    </AppLayout>
  );
};
