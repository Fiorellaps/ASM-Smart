import * as vm from "./users.vm";
import * as api from "./users.api-model";

export const mapMemberFromApiToVm = (
  member: api.MemberUserEntityApi
): vm.MemberDetailEntity => ({
  userName: member.userName,
  roles: member.roles,
  tags: member.tags,
});
