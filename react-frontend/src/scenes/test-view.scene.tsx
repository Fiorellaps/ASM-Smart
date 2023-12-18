import React from 'react';
import { AppLayout } from 'layouts';
import { TestViewContainer } from 'pods/test-view';

export const TestViewScene: React.FC = () => {
  return (
    <AppLayout>
      <TestViewContainer />
    </AppLayout>
  );
};
