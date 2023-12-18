export interface UserEntity {
  username: string;
  roles: String[];
  tags: String[];
  email: string;
  active: boolean;
  id: string;
}

export const createEmptyUser = (): UserEntity => ({
  id: null,
  username: '',
  email: '',
  active: false,
  tags: [],
  roles: [],
});
