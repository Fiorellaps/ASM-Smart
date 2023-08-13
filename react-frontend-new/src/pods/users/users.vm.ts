export interface MemberDetailEntity {
  userName: string;
  roles: String[];
  tags: String[];
}

export const createDefaultMemberDetail = () => ({
  userName: "",
  roles: [],
  tags: [],
});
