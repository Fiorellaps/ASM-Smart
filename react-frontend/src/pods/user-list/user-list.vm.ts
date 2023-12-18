/*export interface Employee {
  id: string;
  isActive: boolean;
  name: string;
  email: string;
  lastDateIncurred: string;
}*/

export interface UserEntity {
  username: string;
  roles: String[];
  tags: String[];
  email: string;
  active: boolean;
  id: string;
}
