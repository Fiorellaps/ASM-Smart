import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthRoute } from 'common-app/auth';
import { routes } from './routes';
import {
  LoginScene,
  SubmoduleListScene,
  UserListScene,
  TestListScene,
  UserScene,
  TestViewScene,
} from 'scenes';

export const RouterComponent: React.FunctionComponent = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={routes.root} element={<LoginScene />} />
        <Route path={routes.login} element={<LoginScene />} />
        <Route path={routes.users} element={<UserListScene />} />
        <Route path={routes.tests} element={<TestListScene />} />
        <Route
          path={routes.submoduleList}
          element={
            <AuthRoute>
              <SubmoduleListScene />
            </AuthRoute>
          }
        />
        <Route path={routes.editUser()} element={<UserScene />} />
        <Route path={routes.testView()} element={<TestViewScene />} />
      </Routes>
    </HashRouter>
  );
};
