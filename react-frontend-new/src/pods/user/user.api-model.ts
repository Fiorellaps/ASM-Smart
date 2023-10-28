export interface UserEntityApi {
  username: string;
  roles: String[];
  tags: String[];
  email: string;
  active: Number;
  id?: string;
}

export const emptyUser = (): UserEntityApi => ({
  username: "",
  roles: [],
  tags: [],
  email: "",
  active: 1,
  id: "",
});
