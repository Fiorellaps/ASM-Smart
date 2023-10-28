import * as vm from "./user.vm";
import * as api from "./user.api-model";

/*export const mapUserFromApiToVm = (user: api.UserEntityApi): vm.UserEntity => ({
  username: user.username,
  roles: user.roles,
  tags: user.tags,
  email: user.email,
  active: user.active == 1 ? true : false,
  id: user.id,
});*/

export const mapUserFromApiToVm = (user: api.UserEntityApi): vm.UserEntity => ({
  username: user.username,
  roles: user.roles,
  tags: user.tags,
  email: user.email,
  active: user.active == 1 ? true : false,
  id: user.id,
});
