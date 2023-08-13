import { MemberDetailEntity } from "./users.vm";
import { getUsers as getMemberDetailApi } from "./users.api";
import { mapMemberFromApiToVm } from "./users.mapper";

export const getMemberCollection = (
  id: string
): Promise<MemberDetailEntity> => {
  return new Promise<MemberDetailEntity>((resolve) => {
    getMemberDetailApi(id).then((result) => {
      resolve(mapMemberFromApiToVm(result));
    });
  });
};
