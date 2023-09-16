export interface UserDetailEntity {
  username: string;
  roles: String[];
  tags: String[];
}

export const createDefaultUserDetail = () => ({
  username: "",
  F: [],
  tags: [],
});
