import { UserDetailEntity } from "./users.vm";
import { getUsers as getUserDetailApi } from "./users.api";
import { mapUserCollectionFromApiToVm } from "./users.mapper";

export const getUserCollection = (): Promise<UserDetailEntity[]> => {
  return new Promise<UserDetailEntity[]>((resolve) => {
    getUserDetailApi().then((result) => {
      resolve(mapUserCollectionFromApiToVm(result));
    });
  });
};
