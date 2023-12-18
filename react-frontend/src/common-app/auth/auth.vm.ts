export interface UserSession {
  userName: string;
  roles: String[];
  tags: String[];
  id: string;
  active: Boolean;
}

export const createEmptyUserSession = (): UserSession => ({
  userName: '',
  roles: [],
  tags: [],
  id: '',
  active: false,
});
