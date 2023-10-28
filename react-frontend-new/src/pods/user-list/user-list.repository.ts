import { UserEntity } from "./user-list.vm";
import { getUsers as getUserDetailApi } from "./user-list.api";
import { mapUserCollectionFromApiToVm } from "./user-list.mapper";

export const getUserCollection = (): Promise<UserEntity[]> => {
  return new Promise<UserEntity[]>((resolve) => {
    getUserDetailApi().then((result) => {
      resolve(mapUserCollectionFromApiToVm(result));
    });
  });
};
