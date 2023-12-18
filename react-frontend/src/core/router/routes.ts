import { generatePath } from 'react-router-dom';

interface BaseRoutes {
  root: string;
  login: string;
  users: string;
  tests: string;
  testView: string;
  submoduleList: string;
  projects: string;
  editProject: string;
  employees: string;
  editEmployee: string;
  editUser: string;
}

const baseRoutes: BaseRoutes = {
  root: '/',
  login: '/login',
  users: '/users',
  tests: '/tests',
  submoduleList: '/submodule-list',
  projects: '/projects',
  editProject: '/projects/:id',
  employees: '/employees',
  editEmployee: '/employees/:id',
  editUser: '/user/:id',
  testView: '/test-view/:id',
};

interface Routes
  extends Omit<
    BaseRoutes,
    'editUser' | 'editEmployee' | 'editProject' | 'testView'
  > {
  editUser: (id?: string) => string;
  editProject: (id?: string) => string;
  editEmployee: (id?: string) => string;
  testView: (id?: string) => string;
}

export const routes: Routes = {
  ...baseRoutes,
  editProject: (id) =>
    id ? generatePath(baseRoutes.editProject, { id }) : baseRoutes.editProject,
  editEmployee: (id) =>
    id
      ? generatePath(baseRoutes.editEmployee, { id })
      : baseRoutes.editEmployee,
  editUser: (id) =>
    id ? generatePath(baseRoutes.editUser, { id }) : baseRoutes.editUser,

  testView: (id) =>
    id ? generatePath(baseRoutes.testView, { id }) : baseRoutes.testView,
};
