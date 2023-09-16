import * as vm from "./users.vm";
import * as api from "./users.api-model";

export const mapUserFromApiToVm = (
  user: api.UserEntityApi
): vm.UserDetailEntity => ({
  username: user.username,
  roles: user.roles,
  tags: user.tags,
});

export const mapUserCollectionFromApiToVm = (
  memberCollection: api.UserEntityApi[]
): vm.UserDetailEntity[] =>
  memberCollection.map((user) => mapUserFromApiToVm(user));
