export interface UserProfile {
  userName: string;
  roles: String[];
  tags: String[];
}

export const createEmptyUserProfile = (): UserProfile => ({
  userName: "",
  roles: [],
  tags: [],
});
