import * as vm from "./user-list.vm";
import * as api from "./user-list.api-model";

export const mapUserFromApiToVm = (user: api.UserEntityApi): vm.UserEntity => ({
  username: user.username,
  roles: user.roles,
  tags: user.tags,
  email: user.email,
  active: user.active == 1 ? true : false,
  id: user.id,
});

export const mapUserCollectionFromApiToVm = (
  memberCollection: api.UserEntityApi[]
): vm.UserEntity[] => memberCollection.map((user) => mapUserFromApiToVm(user));
