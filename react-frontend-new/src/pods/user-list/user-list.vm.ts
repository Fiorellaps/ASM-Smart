export interface UserEntity {
  username: string;
  roles: String[];
  tags: String[];
  email: string;
  active: boolean;
  id: string;
}

export const createDefaultUserDetail = () => ({
  username: "",
  roles: [],
  tags: [],
  email: "",
  active: true,
  id: "",
});
