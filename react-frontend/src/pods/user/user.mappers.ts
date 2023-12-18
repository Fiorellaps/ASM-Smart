import * as apiModel from './api/user.api-model';
import * as viewModel from './user.vm';

export const mapUserFromApiToVm = (
  user: apiModel.UserEntityApi
): viewModel.UserEntity => {
  return Boolean(user)
    ? {
        username: user.userName,
        roles: user.roles,
        tags: user.tags,
        email: user.email,
        active: user.active == 1 ? true : false,
        id: user.id,
      }
    : viewModel.createEmptyUser();
};
