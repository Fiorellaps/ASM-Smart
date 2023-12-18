/*import { mapToCollection } from 'common/mappers';
import * as apiModel from './api/user-list.api-model';
import * as viewModel from './user-list.vm';

const mapEmployeeFromApiToVm = (
  employee: apiModel.Employee
): viewModel.Employee => ({
  ...employee,
});

export const mapEmployeeListFromApiToVm = (
  employeeList: apiModel.Employee[]
): viewModel.Employee[] =>
  mapToCollection(employeeList, (e) => mapEmployeeFromApiToVm(e));
*/

import * as viewModel from './user-list.vm';
import * as apiModel from './api/user-list.api-model';
import { mapToCollection } from 'common/mappers';

export const mapUserFromApiToVm = (
  user: apiModel.UserEntityApi
): viewModel.UserEntity => ({
  username: user.userName,
  roles: user.roles,
  tags: user.tags,
  email: user.email,
  active: user.active == 1 ? true : false,
  id: user.id,
});

export const mapUserCollectionFromApiToVm = (
  memberCollection: apiModel.UserEntityApi[]
): viewModel.UserEntity[] =>
  mapToCollection(memberCollection, (e) => mapUserFromApiToVm(e));
