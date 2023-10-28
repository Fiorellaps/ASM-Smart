import { UserEntity } from "./user.vm";
import { getUsers as getUserDetailApi } from "./user.api";
import { mapUserFromApiToVm } from "./user.mapper";

export const getUserById = (id: string): Promise<UserEntity> => {
  return new Promise<UserEntity>((resolve) => {
    getUserDetailApi(id).then((result) => {
      resolve(mapUserFromApiToVm(result));
    });
  });
};
