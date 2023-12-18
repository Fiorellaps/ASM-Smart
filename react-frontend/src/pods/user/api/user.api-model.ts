export interface UserEntityApi {
  userName: string;
  roles: String[];
  tags: String[];
  email: string;
  active: Number;
  id: string;
}

export const emptyUserApi = (): UserEntityApi => ({
  userName: '',
  roles: [],
  tags: [],
  email: '',
  active: 1,
  id: '',
});
